import React, { useState } from 'react';
import {
  Send,
  CheckCircle2,
  Copy,
  Check,
  AlertCircle,
  ArrowUpRight,
  Loader2,
} from 'lucide-react';
import { PORTFOLIO_CONTENT } from '../data/content';
import { useWindowManager } from '../hooks/useWindowManager';
import { isPlaceholderLink } from '../utils/portfolioLogic';
import { Window } from '../components/Window';

export const ContactWindow: React.FC = () => {
  const { identity } = PORTFOLIO_CONTENT;
  const { pushNotification } = useWindowManager();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [deliveredDirect, setDeliveredDirect] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    try {
      navigator.clipboard?.writeText(identity.email).catch(() => {});
    } catch {
      // ignore clipboard error
    }
    setCopiedEmail(true);
    pushNotification(
      'Mail',
      `Copied ${identity.email} to clipboard`,
      '/assets/aistudio/icon_mail_clean.png'
    );
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMsg = message.trim();
    const finalSubject =
      subject.trim() || `Portfolio Inquiry from ${trimmedName}`;

    if (!trimmedName || !trimmedEmail || !trimmedMsg) {
      setError('Please enter your name, email address, and message.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSending(true);
    let sentSuccessfully = false;

    // 1. Connect to EmailJS using service_93ir2tr
    if (identity.emailjsServiceId) {
      try {
        const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service_id: identity.emailjsServiceId,
            template_id: identity.emailjsTemplateId,
            user_id: identity.emailjsPublicKey,
            template_params: {
              from_name: trimmedName,
              from_email: trimmedEmail,
              reply_to: trimmedEmail,
              to_name: identity.displayName,
              to_email: identity.email,
              subject: finalSubject,
              message: trimmedMsg,
            },
          }),
        });
        if (res.ok) {
          sentSuccessfully = true;
        }
      } catch {
        // Fallback below if network or template/public key pending
      }
    }

    // 2. Optional Formspree fallback if configured
    if (!sentSuccessfully && !isPlaceholderLink(identity.formspreeId)) {
      try {
        const res = await fetch(
          `https://formspree.io/f/${identity.formspreeId}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: trimmedName,
              email: trimmedEmail,
              subject: finalSubject,
              message: trimmedMsg,
            }),
          }
        );
        if (res.ok) {
          sentSuccessfully = true;
        }
      } catch {
        // Fallback to mailto
      }
    }

    setIsSending(false);
    setDeliveredDirect(sentSuccessfully);
    setIsSubmitted(true);
    pushNotification(
      'Mail',
      sentSuccessfully
        ? 'Message delivered to Pranam Chand'
        : 'Message ready to send to Pranam Chand',
      '/assets/aistudio/icon_mail_clean.png'
    );
  };

  const mailtoHref = `mailto:${identity.email}?subject=${encodeURIComponent(
    subject.trim() || `Portfolio Inquiry from ${name || 'Visitor'}`
  )}&body=${encodeURIComponent(
    `Hi Pranam,\n\n${message}\n\nBest regards,\n${name}\n${email}`
  )}`;

  return (
    <Window
      id="contact"
      headerRight={
        <button
          type="button"
          onClick={handleCopyEmail}
          aria-label="Copy email address"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/[0.04] dark:bg-white/10 hover:bg-black/[0.08] dark:hover:bg-white/15 text-[11px] font-medium text-[#1d1d1f] dark:text-[#f5f5f7] transition-colors cursor-pointer"
        >
          {copiedEmail ? (
            <>
              <Check className="w-3 h-3 text-[#34c759]" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3 text-[#86868b] dark:text-[#98989d]" />
              <span>{identity.email}</span>
            </>
          )}
        </button>
      }
    >
      <div className="flex flex-col h-full min-h-[460px] bg-white dark:bg-[#1c1c1e] text-[#1d1d1f] dark:text-[#f5f5f7]">
        {isSubmitted ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white dark:bg-[#1c1c1e]">
            <div className="w-12 h-12 rounded-full bg-[#34c759]/12 text-[#34c759] flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h2 className="text-[18px] font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7]">
              {deliveredDirect ? 'Message Sent' : 'Message Prepared'}
            </h2>
            <p className="text-[13.5px] text-[#6e6e73] dark:text-[#a1a1a6] mt-1 max-w-sm leading-relaxed">
              {deliveredDirect ? (
                <>
                  Your message has been delivered to{' '}
                  <span className="text-[#1d1d1f] dark:text-[#f5f5f7] font-medium">
                    {identity.email}
                  </span>
                  .
                </>
              ) : (
                <>
                  You can also send your message directly through your default
                  mail app to{' '}
                  <span className="text-[#1d1d1f] dark:text-[#f5f5f7] font-medium">
                    {identity.email}
                  </span>
                  .
                </>
              )}
            </p>
            <div className="flex items-center gap-2.5 mt-6">
              <a
                href={mailtoHref}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0a84ff] hover:bg-[#0070e0] text-white text-[13px] font-medium transition-colors shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send via Mail App</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setDeliveredDirect(false);
                  setName('');
                  setEmail('');
                  setSubject('');
                  setMessage('');
                }}
                className="px-4 py-2 rounded-full bg-black/[0.05] dark:bg-white/10 hover:bg-black/[0.09] dark:hover:bg-white/15 text-[13px] font-medium text-[#1d1d1f] dark:text-[#f5f5f7] transition-colors cursor-pointer"
              >
                New Message
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex-1 flex flex-col justify-between bg-white dark:bg-[#1c1c1e]"
          >
            {/* Minimalist Apple Mail Header Rows */}
            <div className="divide-y divide-black/[0.06] dark:divide-white/10 px-6 sm:px-8 bg-white dark:bg-[#1c1c1e]">
              {/* To: Row */}
              <div className="flex items-center justify-between py-3 text-[13.5px]">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-[#86868b] dark:text-[#98989d] w-16 shrink-0">
                    To:
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#0a84ff]/10 dark:bg-[#0a84ff]/20 text-[#0a84ff] text-[12.5px] font-medium truncate">
                    Pranam Chand &lt;{identity.email}&gt;
                  </span>
                </div>
              </div>

              {/* From (Name & Email): Row */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 py-3 text-[13.5px]">
                <div className="flex items-center gap-3 flex-1">
                  <label
                    htmlFor="contact-name"
                    className="text-[#86868b] dark:text-[#98989d] w-16 shrink-0"
                  >
                    From:
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full bg-transparent text-[#1d1d1f] dark:text-[#f5f5f7] placeholder:text-[#86868b]/70 dark:placeholder:text-[#98989d]/70 focus:outline-none"
                  />
                </div>
                <div className="flex items-center gap-3 flex-1 sm:border-l sm:border-black/[0.06] dark:sm:border-white/10 sm:pl-4">
                  <label
                    htmlFor="contact-email"
                    className="text-[#86868b] dark:text-[#98989d] w-16 sm:w-auto shrink-0"
                  >
                    Email:
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-transparent text-[#1d1d1f] dark:text-[#f5f5f7] placeholder:text-[#86868b]/70 dark:placeholder:text-[#98989d]/70 focus:outline-none"
                  />
                </div>
              </div>

              {/* Subject: Row */}
              <div className="flex items-center gap-3 py-3 text-[13.5px]">
                <label
                  htmlFor="contact-subject"
                  className="text-[#86868b] dark:text-[#98989d] w-16 shrink-0"
                >
                  Subject:
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Data Analyst Internship / Project Inquiry"
                  className="w-full bg-transparent text-[#1d1d1f] dark:text-[#f5f5f7] font-medium placeholder:font-normal placeholder:text-[#86868b]/70 dark:placeholder:text-[#98989d]/70 focus:outline-none"
                />
              </div>
            </div>

            {/* Apple Mail Body Canvas */}
            <div className="flex-1 px-6 sm:px-8 py-4 flex flex-col bg-white dark:bg-[#1c1c1e]">
              <label htmlFor="contact-message" className="sr-only">
                Message
              </label>
              <textarea
                id="contact-message"
                rows={7}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here..."
                className="w-full flex-1 bg-transparent text-[14px] leading-relaxed text-[#1d1d1f] dark:text-[#f5f5f7] placeholder:text-[#86868b]/65 dark:placeholder:text-[#98989d]/65 focus:outline-none resize-none"
              />

              {error && (
                <div
                  role="alert"
                  className="mt-2 flex items-center gap-2 px-3 py-2 rounded-lg bg-[#ff3b30]/8 dark:bg-[#ff453a]/15 text-[12.5px] text-[#ff3b30] dark:text-[#ff453a]"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
            </div>

            {/* Bottom Action Bar */}
            <div className="px-6 sm:px-8 py-3.5 border-t border-black/[0.06] dark:border-white/10 bg-white dark:bg-[#1c1c1e] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-4 text-[12.5px] text-[#86868b] dark:text-[#98989d]">
                <a
                  href={identity.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-0.5 hover:text-[#1d1d1f] dark:hover:text-white transition-colors"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
                <a
                  href={identity.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-0.5 hover:text-[#1d1d1f] dark:hover:text-white transition-colors"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
                <a
                  href={identity.kaggle}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-0.5 hover:text-[#1d1d1f] dark:hover:text-white transition-colors"
                >
                  <span>Kaggle</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#0a84ff] hover:bg-[#0070e0] disabled:opacity-60 text-white text-[13px] font-medium transition-colors shadow-2xs cursor-pointer"
              >
                {isSending ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </Window>
  );
};
