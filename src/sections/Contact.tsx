import { type FormEvent, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Copy,
  Loader2,
  Mail,
  MapPin,
  Send,
} from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '@/components/BrandIcons';
import { SectionHeader } from '@/components/SectionHeader';
import { profile } from '@/data/profile';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string; // honeypot
}

const INITIAL_FORM: FormState = {
  name: '',
  email: '',
  subject: '',
  message: '',
  website: '',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Contact() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<{
    type: 'success' | 'error';
    message: string;
    showMailtoFallback?: boolean;
  } | null>(null);
  const mountedAtRef = useRef<number>(Date.now());

  const validate = (): string | null => {
    if (form.name.trim().length < 2) return 'Please enter your name (at least 2 characters).';
    if (!EMAIL_PATTERN.test(form.email.trim())) return 'Please enter a valid email address.';
    if (form.subject.trim().length < 3) return 'Please enter a subject (at least 3 characters).';
    if (form.message.trim().length < 10) return 'Please enter a message of at least 10 characters.';
    return null;
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);

    const validationError = validate();
    if (validationError) {
      setStatus({ type: 'error', message: validationError });
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
          website: form.website,
          submittedAfterMs: Date.now() - mountedAtRef.current,
        }),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        code?: string;
        message?: string;
        error?: string;
      };

      if (!response.ok || !data.ok) {
        setStatus({
          type: 'error',
          message:
            data.error || 'Could not send your message. Please try emailing directly.',
          showMailtoFallback: data.code === 'EMAIL_SERVICE_UNCONFIGURED' || response.status >= 500,
        });
        return;
      }

      setStatus({
        type: 'success',
        message: data.message || 'Message sent successfully! I will get back to you soon.',
      });
      setForm(INITIAL_FORM);
    } catch {
      setStatus({
        type: 'error',
        message: 'Network error while sending your message. You can email me directly below.',
        showMailtoFallback: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const mailtoHref = `mailto:${profile.email}?subject=${encodeURIComponent(
    form.subject || 'Portfolio Inquiry'
  )}&body=${encodeURIComponent(
    `Hi Ganesh,\n\n${form.message}\n\nBest,\n${form.name} (${form.email})`
  )}`;

  return (
    <section id="contact" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="06"
          eyebrow="Contact"
          title="Have an Idea? Let's Build"
          highlight="Something Great."
          subtitle="Have a website, app, or automation in mind? I take on freelance builds and technical collaborations."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4 }}
            className="space-y-4 lg:col-span-5"
          >
            <div className="surface-card rounded-2xl p-6">
              <h3 className="font-display text-lg font-semibold text-white">
                Direct Channels
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                Reach out directly by email or connect on GitHub and LinkedIn. I typically respond within 24 hours.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] p-3.5">
                  <div className="flex min-w-0 items-center gap-3">
                    <Mail className="h-4 w-4 shrink-0 text-indigo-400" aria-hidden="true" />
                    <div className="min-w-0">
                      <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                        Email
                      </p>
                      <a
                        href={`mailto:${profile.email}`}
                        className="block truncate text-sm font-medium text-white hover:text-indigo-300"
                      >
                        {profile.email}
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label="Copy email address"
                    className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-xs text-slate-300 transition-colors hover:border-white/20 hover:text-white"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] p-3.5 transition-colors hover:border-white/20"
                >
                  <LinkedInIcon className="h-4 w-4 shrink-0 text-indigo-400" />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                      LinkedIn
                    </p>
                    <p className="text-sm font-medium text-white">
                      linkedin.com/in/ganesh-macharla
                    </p>
                  </div>
                </a>

                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] p-3.5 transition-colors hover:border-white/20"
                >
                  <GitHubIcon className="h-4 w-4 shrink-0 text-indigo-400" />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                      GitHub
                    </p>
                    <p className="text-sm font-medium text-white">
                      github.com/GaneshMacharla
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] p-3.5">
                  <MapPin className="h-4 w-4 shrink-0 text-indigo-400" aria-hidden="true" />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                      Location
                    </p>
                    <p className="text-sm font-medium text-white">{profile.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              className="surface-card space-y-5 rounded-2xl p-6 sm:p-8"
            >
              {/* Hidden Honeypot Field for Spam Protection */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(e) => setForm((prev) => ({ ...prev, website: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-300"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Your name"
                    className="w-full rounded-xl border border-white/10 bg-[#07080d]/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-300"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-white/10 bg-[#07080d]/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-300"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => setForm((prev) => ({ ...prev, subject: e.target.value }))}
                  placeholder="Website, App, or AI Automation Project"
                  className="w-full rounded-xl border border-white/10 bg-[#07080d]/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-300"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                  placeholder="Tell me about the role, project, or idea you'd like to discuss..."
                  className="w-full resize-y rounded-xl border border-white/10 bg-[#07080d]/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                />
              </div>

              {status ? (
                <div
                  role="alert"
                  className={`rounded-xl border p-4 text-sm ${
                    status.type === 'success'
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200'
                      : 'border-rose-500/30 bg-rose-500/10 text-rose-200'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    {status.type === 'success' ? (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    ) : (
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
                    )}
                    <div className="space-y-2">
                      <p>{status.message}</p>
                      {status.showMailtoFallback ? (
                        <a
                          href={mailtoHref}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/15"
                        >
                          <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Open in Email App</span>
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              ) : null}

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-indigo-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" aria-hidden="true" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
