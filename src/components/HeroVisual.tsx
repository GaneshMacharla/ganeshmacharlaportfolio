import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Cpu, Database, Layers, PhoneCall } from 'lucide-react';

interface SystemNode {
  id: string;
  label: string;
  title: string;
  stack: string;
  detail: string;
  icon: typeof PhoneCall;
}

const SYSTEM_NODES: SystemNode[] = [
  {
    id: 'voice',
    label: '01 · VOICE AI',
    title: 'Choranta Voice Agents',
    stack: 'React · FastAPI · Supabase · Telephony',
    detail: 'Inbound & outbound voice employees with knowledge-base grounding and call analytics.',
    icon: PhoneCall,
  },
  {
    id: 'rag',
    label: '02 · RAG SYSTEMS',
    title: 'BookMind Vector Retrieval',
    stack: 'Python · ChromaDB · Embeddings · LLMs',
    detail: 'PDF chunking, semantic indexing, cross-encoder reranking, and contextual Q&A.',
    icon: Database,
  },
  {
    id: 'fullstack',
    label: '03 · FULL-STACK',
    title: 'LabXpert Platform',
    stack: 'Django · React · PostgreSQL · Docker',
    detail: 'Automated lab workflows, scheduled tasks, and campus location-based authentication.',
    icon: Layers,
  },
  {
    id: 'agents',
    label: '04 · AUTOMATION',
    title: 'Agents & ML Inference',
    stack: 'LangChain · LangGraph · Flask · PyTorch',
    detail: 'Tool-calling workflows, multi-step orchestration, and real-time ML inference APIs.',
    icon: Bot,
  },
];

export function HeroVisual() {
  const [selectedId, setSelectedId] = useState<string>(SYSTEM_NODES[0].id);
  const selected = SYSTEM_NODES.find((node) => node.id === selectedId) ?? SYSTEM_NODES[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="surface-card relative overflow-hidden rounded-2xl p-5 sm:p-6"
    >
      {/* Top Window Chrome */}
      <div className="mb-5 flex items-center justify-between border-b border-white/[0.07] pb-3.5">
        <div className="flex items-center gap-2">
          <Cpu className="h-4 w-4 text-indigo-400" aria-hidden="true" />
          <span className="font-mono text-xs text-slate-300">
            system.architecture
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[11px] text-emerald-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Shipping Products
        </span>
      </div>

      {/* Interactive Domain Nodes */}
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {SYSTEM_NODES.map((node) => {
          const Icon = node.icon;
          const isSelected = node.id === selectedId;
          return (
            <button
              key={node.id}
              type="button"
              onClick={() => setSelectedId(node.id)}
              className={`group flex flex-col items-start rounded-xl border p-3.5 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                isSelected
                  ? 'border-indigo-400/50 bg-indigo-500/[0.10]'
                  : 'border-white/[0.07] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]'
              }`}
            >
              <div className="mb-2 flex w-full items-center justify-between">
                <span className="font-mono text-[10px] tracking-wider text-slate-400">
                  {node.label}
                </span>
                <Icon
                  className={`h-4 w-4 transition-colors ${
                    isSelected ? 'text-indigo-300' : 'text-slate-500 group-hover:text-slate-300'
                  }`}
                  aria-hidden="true"
                />
              </div>
              <span className="text-sm font-semibold text-white">{node.title}</span>
              <span className="mt-1 font-mono text-[11px] text-slate-400">
                {node.stack}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Node Inspector */}
      <div className="mt-4 rounded-xl border border-white/[0.07] bg-[#07080d]/80 p-4">
        <div className="mb-1.5 flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-wider text-indigo-300">
            Active Focus · {selected.title}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-slate-300">{selected.detail}</p>
      </div>
    </motion.div>
  );
}
