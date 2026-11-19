import {
  BookOpen,
  CalendarClock,
  CheckCircle2,
  CreditCard,
  MapPin,
  MessageCircle,
  PhoneCall,
  Smartphone,
  Sparkles,
  Upload,
} from 'lucide-react';
import chorantaLogo from '@/assets/choranta-logo.png';
import digitSample from '@/assets/digit-sample.png';
import type { Project } from '@/data/projects';

interface ProjectPreviewProps {
  previewType: Project['previewType'];
  name: string;
}

export function ProjectPreview({ previewType, name }: ProjectPreviewProps) {
  if (previewType === 'choranta') {
    return (
      <div className="relative flex h-48 w-full flex-col justify-between overflow-hidden rounded-xl border border-white/[0.07] bg-[#080b12] p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src={chorantaLogo}
              alt={`${name} logo`}
              loading="lazy"
              width={28}
              height={28}
              className="h-7 w-7 rounded-md object-contain"
            />
            <span className="font-display text-sm font-semibold text-white">
              Choranta Studio
            </span>
          </div>
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-300">
            VOICE AGENT
          </span>
        </div>

        <div className="my-2 grid grid-cols-3 gap-2">
          {['Inbound Call', 'KB Grounded', 'Call Logs'].map((item) => (
            <div
              key={item}
              className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-2.5 py-2 text-center font-mono text-[10px] text-slate-300"
            >
              {item}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 font-mono text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5 text-emerald-300">
            <PhoneCall className="h-3.5 w-3.5" aria-hidden="true" />
            Telephony + LLM Pipeline
          </span>
          <span>FastAPI · Supabase</span>
        </div>
      </div>
    );
  }

  if (previewType === 'poojari') {
    return (
      <div className="relative flex h-48 w-full flex-col justify-between overflow-hidden rounded-xl border border-white/[0.07] bg-[#080b12] p-4">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 font-display text-sm font-semibold text-white">
            <Smartphone className="h-4 w-4 text-orange-400" aria-hidden="true" />
            Poojari App
          </span>
          <span className="rounded-full border border-orange-400/30 bg-orange-500/10 px-2 py-0.5 font-mono text-[10px] text-orange-300">
            ANDROID
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 font-mono text-[10px]">
          {['Choose Puja', 'Pick Pujari', 'Pay Dakshina'].map((step, i) => (
            <div
              key={step}
              className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-2 py-2 text-center text-slate-300"
            >
              <div className="text-orange-300">0{i + 1}</div>
              {step}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 font-mono text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5 text-orange-300">
            <CreditCard className="h-3.5 w-3.5" aria-hidden="true" />
            Razorpay + FCM
          </span>
          <span>Kotlin · Firebase</span>
        </div>
      </div>
    );
  }

  if (previewType === 'publisher') {
    return (
      <div className="relative flex h-48 w-full flex-col justify-between overflow-hidden rounded-xl border border-white/[0.07] bg-[#080b12] p-4">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 font-display text-sm font-semibold text-white">
            <Upload className="h-4 w-4 text-rose-400" aria-hidden="true" />
            Shorts Auto-Publisher
          </span>
          <span className="rounded-full border border-rose-400/30 bg-rose-500/10 px-2 py-0.5 font-mono text-[10px] text-rose-300">
            AUTOMATION
          </span>
        </div>

        <div className="space-y-1.5 font-mono text-[11px]">
          {[
            ['reel_001.mp4', 'Published'],
            ['reel_002.mp4', 'Tomorrow 6:00 PM'],
            ['reel_003.mp4', 'Scheduled'],
          ].map(([file, status], i) => (
            <div
              key={file}
              className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-1 text-slate-300"
            >
              <span className="flex items-center gap-1.5">
                {i === 0 ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-rose-300" aria-hidden="true" />
                ) : (
                  <CalendarClock className="h-3.5 w-3.5 text-slate-500" aria-hidden="true" />
                )}
                {file}
              </span>
              <span className={i === 0 ? 'text-rose-300' : 'text-slate-400'}>{status}</span>
            </div>
          ))}
        </div>

        <div className="font-mono text-[10px] text-slate-400">
          Python · Flask · YouTube Data API · OAuth
        </div>
      </div>
    );
  }

  if (previewType === 'website') {
    return (
      <div className="relative flex h-48 w-full flex-col overflow-hidden rounded-xl border border-white/[0.07] bg-[#080b12]">
        <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-red-400/70" />
          <span className="h-2 w-2 rounded-full bg-amber-400/70" />
          <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
          <span className="ml-2 flex-1 truncate rounded-md bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] text-slate-400">
            powerfitnessgym-psi.vercel.app
          </span>
        </div>
        <div className="relative flex flex-1 flex-col justify-center bg-gradient-to-br from-orange-500/20 via-transparent to-red-500/10 px-4">
          <span className="font-mono text-[10px] tracking-widest text-orange-300">MEDCHAL · HYDERABAD</span>
          <span className="mt-1 font-display text-xl leading-tight font-bold text-white">
            POWER <span className="text-orange-400">FITNESS</span> GYM
          </span>
          <div className="mt-3 flex gap-2">
            <span className="rounded-md bg-orange-500 px-2.5 py-1 text-[10px] font-semibold text-white">Join Now</span>
            <span className="flex items-center gap-1 rounded-md border border-emerald-400/40 bg-emerald-500/10 px-2.5 py-1 text-[10px] text-emerald-300">
              <MessageCircle className="h-3 w-3" aria-hidden="true" /> WhatsApp
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (previewType === 'bookmind') {
    return (
      <div className="relative flex h-48 w-full flex-col justify-between overflow-hidden rounded-xl border border-white/[0.07] bg-[#080b12] p-4">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 font-display text-sm font-semibold text-white">
            <BookOpen className="h-4 w-4 text-indigo-400" aria-hidden="true" />
            BookMind RAG
          </span>
          <span className="rounded-full border border-indigo-400/30 bg-indigo-500/10 px-2 py-0.5 font-mono text-[10px] text-indigo-300">
            SEMANTIC Q&amp;A
          </span>
        </div>

        <div className="space-y-2 font-mono text-[11px]">
          <div className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-slate-300">
            <span>PDF → Chunks → Embeddings</span>
            <span className="text-indigo-300">ChromaDB</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-indigo-400/20 bg-indigo-500/[0.08] px-3 py-1.5 text-slate-200">
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-indigo-300" aria-hidden="true" />
              CrossEncoder Rerank + LLM
            </span>
            <span className="text-indigo-300">Grounded</span>
          </div>
        </div>

        <div className="font-mono text-[10px] text-slate-400">
          Python · Streamlit · Vector Retrieval
        </div>
      </div>
    );
  }

  if (previewType === 'labxpert') {
    return (
      <div className="relative flex h-48 w-full flex-col justify-between overflow-hidden rounded-xl border border-white/[0.07] bg-[#080b12] p-4">
        <div className="flex items-center justify-between">
          <span className="font-display text-sm font-semibold text-white">
            LabXpert Console
          </span>
          <span className="rounded-full border border-violet-400/30 bg-violet-500/10 px-2 py-0.5 font-mono text-[10px] text-violet-300">
            CAMPUS LABS
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-2.5 text-slate-300">
            <div className="mb-1 flex items-center gap-1.5 text-violet-300">
              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
              Quests &amp; Quizzes
            </div>
            <span className="text-[10px] text-slate-400">Scheduled windows</span>
          </div>
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-2.5 text-slate-300">
            <div className="mb-1 flex items-center gap-1.5 text-violet-300">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              Location Auth
            </div>
            <span className="text-[10px] text-slate-400">Campus verified</span>
          </div>
        </div>

        <div className="font-mono text-[10px] text-slate-400">
          Django · React · PostgreSQL · Docker
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-48 w-full flex-col justify-between overflow-hidden rounded-xl border border-white/[0.07] bg-[#080b12] p-4">
      <div className="flex items-center justify-between">
        <span className="font-display text-sm font-semibold text-white">
          Digit Inference Canvas
        </span>
        <span className="rounded-full border border-sky-400/30 bg-sky-500/10 px-2 py-0.5 font-mono text-[10px] text-sky-300">
          NEURAL NET
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-white/15 bg-black">
          <img
            src={digitSample}
            alt="Sample handwritten digit input for the classifier"
            loading="lazy"
            width={80}
            height={80}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex-1 space-y-1.5 font-mono text-[11px]">
          <div className="flex justify-between text-slate-300">
            <span>Input Grid</span>
            <span className="text-sky-300">28 × 28 px</span>
          </div>
          <div className="flex justify-between text-slate-300">
            <span>Backend API</span>
            <span className="text-sky-300">Flask Inference</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Output</span>
            <span>Digit + Confidence</span>
          </div>
        </div>
      </div>

      <div className="font-mono text-[10px] text-slate-400">
        Python · Flask · React · MNIST ML
      </div>
    </div>
  );
}
