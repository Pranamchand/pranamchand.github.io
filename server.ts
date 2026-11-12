import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import {
  buildRagSystemInstruction,
  retrieveKnowledgeChunks,
  synthesizeLocalRagResponse,
} from './src/utils/ragEngine.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '1mb' }));

interface ChatTurn {
  role: 'user' | 'assistant';
  content: string;
}

interface ProviderSlot {
  id: string;
  name: string;
  cooldownUntil: number;
  call: (
    systemInstruction: string,
    message: string,
    history: ChatTurn[]
  ) => Promise<string>;
}

const COOLDOWN_MS = 3 * 60 * 1000; // 3-minute cooldown when a key hits quota

function withTimeout<T>(promise: Promise<T>, ms = 6000): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Provider timeout')), ms)
    ),
  ]);
}

async function callGeminiWithKey(
  apiKey: string,
  systemInstruction: string,
  message: string,
  history: ChatTurn[]
): Promise<string> {
  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  const conversationTranscript = [
    ...history
      .slice(-6)
      .map((h) => `${h.role === 'user' ? 'Visitor' : 'Pranam AI'}: ${h.content}`),
    `Visitor: ${message}`,
  ].join('\n\n');

  const response = await withTimeout(
    ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: conversationTranscript,
      config: {
        systemInstruction,
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
      },
    }),
    6000
  );

  const text = response.text?.trim();
  if (!text) {
    throw new Error('Empty response from Gemini');
  }
  return text;
}

async function callGroq(
  apiKey: string,
  systemInstruction: string,
  message: string,
  history: ChatTurn[]
): Promise<string> {
  const messages = [
    { role: 'system', content: systemInstruction },
    ...history.slice(-6).map((h) => ({ role: h.role, content: h.content })),
    { role: 'user', content: message },
  ];

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    signal: AbortSignal.timeout(6000),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages,
      max_tokens: 420,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Groq HTTP ${res.status}: ${errText}`);
  }

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const reply = data.choices?.[0]?.message?.content?.trim();
  if (!reply) throw new Error('Empty Groq response');
  return reply;
}

async function callNvidia(
  apiKey: string,
  systemInstruction: string,
  message: string,
  history: ChatTurn[]
): Promise<string> {
  const messages = [
    { role: 'system', content: systemInstruction },
    ...history.slice(-6).map((h) => ({ role: h.role, content: h.content })),
    { role: 'user', content: message },
  ];

  const res = await fetch(
    'https://integrate.api.nvidia.com/v1/chat/completions',
    {
      method: 'POST',
      signal: AbortSignal.timeout(6000),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'meta/llama-3.1-70b-instruct',
        messages,
        max_tokens: 420,
      }),
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`NVIDIA HTTP ${res.status}: ${errText}`);
  }

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const reply = data.choices?.[0]?.message?.content?.trim();
  if (!reply) throw new Error('Empty NVIDIA response');
  return reply;
}

async function callCohere(
  apiKey: string,
  systemInstruction: string,
  message: string,
  history: ChatTurn[]
): Promise<string> {
  const messages = [
    { role: 'system', content: systemInstruction },
    ...history.slice(-6).map((h) => ({ role: h.role, content: h.content })),
    { role: 'user', content: message },
  ];

  const res = await fetch('https://api.cohere.com/v2/chat', {
    method: 'POST',
    signal: AbortSignal.timeout(6000),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'command-r-08-2024',
      messages,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Cohere HTTP ${res.status}: ${errText}`);
  }

  const data = (await res.json()) as {
    message?: { content?: { text?: string }[] };
  };
  const reply = data.message?.content?.[0]?.text?.trim();
  if (!reply) throw new Error('Empty Cohere response');
  return reply;
}

function buildProviderPool(): ProviderSlot[] {
  const pool: ProviderSlot[] = [];

  if (process.env.GEMINI_API_KEY) {
    const key = process.env.GEMINI_API_KEY;
    pool.push({
      id: 'gemini-primary',
      name: 'Gemini',
      cooldownUntil: 0,
      call: (sys, msg, hist) => callGeminiWithKey(key, sys, msg, hist),
    });
  }

  if (
    process.env.GEMINI_FALLBACK_API_KEY &&
    process.env.GEMINI_FALLBACK_API_KEY !== process.env.GEMINI_API_KEY
  ) {
    const key = process.env.GEMINI_FALLBACK_API_KEY;
    pool.push({
      id: 'gemini-fallback',
      name: 'Gemini (Key 2)',
      cooldownUntil: 0,
      call: (sys, msg, hist) => callGeminiWithKey(key, sys, msg, hist),
    });
  }

  if (process.env.GROQ_API_KEY) {
    const key = process.env.GROQ_API_KEY;
    pool.push({
      id: 'groq',
      name: 'Groq Llama 3.3',
      cooldownUntil: 0,
      call: (sys, msg, hist) => callGroq(key, sys, msg, hist),
    });
  }

  if (process.env.NVIDIA_API_KEY) {
    const key = process.env.NVIDIA_API_KEY;
    pool.push({
      id: 'nvidia',
      name: 'NVIDIA NIM',
      cooldownUntil: 0,
      call: (sys, msg, hist) => callNvidia(key, sys, msg, hist),
    });
  }

  if (process.env.COHERE_API_KEY) {
    const key = process.env.COHERE_API_KEY;
    pool.push({
      id: 'cohere',
      name: 'Cohere Command-R',
      cooldownUntil: 0,
      call: (sys, msg, hist) => callCohere(key, sys, msg, hist),
    });
  }

  return pool;
}

const providerPool = buildProviderPool();

app.options('/api/agent/chat', (_req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.status(204).end();
});

app.post('/api/agent/chat', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  try {
    const rawMessage =
      typeof req.body?.message === 'string' ? req.body.message.trim() : '';
    const history: ChatTurn[] = Array.isArray(req.body?.history)
      ? req.body.history
      : [];

    if (!rawMessage) {
      res.status(400).json({ error: 'Please enter a question for Pranam AI.' });
      return;
    }

    const chunks = retrieveKnowledgeChunks(rawMessage, 4);
    const systemInstruction = buildRagSystemInstruction(chunks);
    const sources = chunks.map((c) => c.section);

    const now = Date.now();
    // Try active providers first, then cooldown providers if needed
    const orderedProviders = [
      ...providerPool.filter((p) => p.cooldownUntil <= now),
      ...providerPool.filter((p) => p.cooldownUntil > now),
    ];

    for (const provider of orderedProviders) {
      try {
        const reply = await provider.call(
          systemInstruction,
          rawMessage,
          history
        );
        provider.cooldownUntil = 0;
        res.json({
          reply,
          sources,
          provider: provider.name,
        });
        return;
      } catch {
        // Mark this key as exhausted/cooldown and automatically shift to the next API key
        provider.cooldownUntil = Date.now() + COOLDOWN_MS;
      }
    }

    // If all 5 external API keys reached quota, synthesize directly from RAG knowledge base
    const fallbackReply = synthesizeLocalRagResponse(rawMessage, chunks);
    res.json({
      reply: fallbackReply,
      sources,
      provider: 'RAG Knowledge Engine',
    });
  } catch {
    const chunks = retrieveKnowledgeChunks('', 3);
    res.json({
      reply: synthesizeLocalRagResponse('', chunks),
      sources: chunks.map((c) => c.section),
      provider: 'RAG Knowledge Engine',
    });
  }
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const port = Number(process.env.PORT) || 3000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${port}`);
  });
}

startServer();
