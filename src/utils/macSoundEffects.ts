// Pure Web Audio API macOS Sequoia / Sonoma subtle UI & notification sound synthesizer

export type MacSoundType =
  | 'click'
  | 'open'
  | 'close'
  | 'minimize'
  | 'notification'
  | 'toggle';

export interface MacSoundDescriptor {
  type: MacSoundType;
  frequencies: number[];
  durationMs: number;
  maxGain: number;
}

const SOUND_PRESETS: Record<MacSoundType, MacSoundDescriptor> = {
  click: {
    type: 'click',
    frequencies: [1180, 640],
    durationMs: 22,
    maxGain: 0.04,
  },
  toggle: {
    type: 'toggle',
    frequencies: [880, 1174.66],
    durationMs: 48,
    maxGain: 0.045,
  },
  open: {
    type: 'open',
    frequencies: [523.25, 783.99],
    durationMs: 115,
    maxGain: 0.045,
  },
  close: {
    type: 'close',
    frequencies: [659.25, 440],
    durationMs: 90,
    maxGain: 0.038,
  },
  minimize: {
    type: 'minimize',
    frequencies: [740, 493.88],
    durationMs: 105,
    maxGain: 0.038,
  },
  notification: {
    type: 'notification',
    frequencies: [659.25, 987.77, 1318.51],
    durationMs: 420,
    maxGain: 0.06,
  },
};

export function getMacSoundDescriptor(type: MacSoundType): MacSoundDescriptor {
  return SOUND_PRESETS[type];
}

let sharedAudioCtx: AudioContext | null = null;
let soundEnabledState = true;
let lastClickTime = 0;

export function isMacSoundEnabled(): boolean {
  return soundEnabledState;
}

export function setMacSoundEnabled(enabled: boolean): void {
  soundEnabledState = enabled;
}

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AudioCtx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AudioCtx) return null;

  if (!sharedAudioCtx) {
    try {
      sharedAudioCtx = new AudioCtx();
    } catch {
      return null;
    }
  }

  if (sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume().catch(() => {
      // Ignore autoplay restriction until user gesture
    });
  }

  return sharedAudioCtx;
}

export function playMacSound(type: MacSoundType): void {
  if (!soundEnabledState) return;

  const nowMs = Date.now();
  if (type === 'click' && nowMs - lastClickTime < 35) {
    return;
  }
  if (type === 'click') {
    lastClickTime = nowMs;
  }

  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const preset = SOUND_PRESETS[type];

    if (type === 'click') {
      // Subtle macOS Force Touch / "Tink" acoustic click
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(preset.frequencies[0], now);
      osc.frequency.exponentialRampToValueAtTime(
        preset.frequencies[1],
        now + 0.02
      );

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(preset.maxGain, now + 0.002);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.022);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.024);
      return;
    }

    if (type === 'toggle') {
      // Crisp two-step switch click
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(preset.frequencies[0], now);
      osc.frequency.setValueAtTime(preset.frequencies[1], now + 0.018);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(preset.maxGain, now + 0.004);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.048);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.052);
      return;
    }

    if (type === 'open' || type === 'close' || type === 'minimize') {
      // Soft glassy window transition tone
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const durSec = preset.durationMs / 1000;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(preset.frequencies[0], now);
      osc.frequency.exponentialRampToValueAtTime(
        preset.frequencies[1],
        now + durSec * 0.85
      );

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(preset.maxGain, now + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + durSec);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + durSec + 0.01);
      return;
    }

    if (type === 'notification') {
      // Authentic macOS crystal chime triad (E5 -> B5 -> E6)
      preset.frequencies.forEach((freq, idx) => {
        const noteStart = now + idx * 0.068;
        const noteDuration = 0.28;

        const osc = ctx.createOscillator();
        const overtone = ctx.createOscillator();
        const noteGain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteStart);

        overtone.type = 'triangle';
        overtone.frequency.setValueAtTime(freq * 2, noteStart);

        const overtoneGain = ctx.createGain();
        overtoneGain.gain.setValueAtTime(0.15, noteStart);

        noteGain.gain.setValueAtTime(0.0001, noteStart);
        noteGain.gain.linearRampToValueAtTime(
          preset.maxGain * (1 - idx * 0.12),
          noteStart + 0.008
        );
        noteGain.gain.exponentialRampToValueAtTime(
          0.0001,
          noteStart + noteDuration
        );

        osc.connect(noteGain);
        overtone.connect(overtoneGain);
        overtoneGain.connect(noteGain);
        noteGain.connect(ctx.destination);

        osc.start(noteStart);
        overtone.start(noteStart);
        osc.stop(noteStart + noteDuration + 0.02);
        overtone.stop(noteStart + noteDuration + 0.02);
      });
    }
  } catch {
    // Ignore Web Audio errors in restricted environments
  }
}
