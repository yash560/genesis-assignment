"use client";

import { useEffect, useState } from "react";
import { Dna, ShieldAlert, CheckCircle2 } from "lucide-react";

interface BasePair {
  id: number;
  leftBase: "A" | "T" | "C" | "G";
  rightBase: "T" | "A" | "G" | "C";
  gene: string;
  isMutated?: boolean;
}

const SAMPLE_PAIRS: BasePair[] = [
  { id: 1, leftBase: "A", rightBase: "T", gene: "MMP1" },
  { id: 2, leftBase: "G", rightBase: "C", gene: "MMP1", isMutated: true },
  { id: 3, leftBase: "C", rightBase: "G", gene: "ELN" },
  { id: 4, leftBase: "T", rightBase: "A", gene: "MC1R", isMutated: true },
  { id: 5, leftBase: "G", rightBase: "C", gene: "SOD2" },
  { id: 6, leftBase: "A", rightBase: "T", gene: "APOE", isMutated: true },
  { id: 7, leftBase: "C", rightBase: "G", gene: "MTHFR" },
  { id: 8, leftBase: "T", rightBase: "A", gene: "BRCA1" },
];

export default function DnaHelixVisualizer() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % SAMPLE_PAIRS.length);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  const baseColors: Record<string, string> = {
    A: "bg-emerald-500 text-emerald-950",
    T: "bg-teal-400 text-teal-950",
    C: "bg-cyan-500 text-cyan-950",
    G: "bg-indigo-400 text-indigo-950",
  };

  return (
    <div className="rounded-2xl border border-teal-800/30 bg-gradient-to-br from-gray-950 via-teal-950/20 to-gray-950 p-6 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/30">
            <Dna className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-wide uppercase font-mono">
              Next-Gen Sequencing (NGS) Flowcell
            </h3>
            <p className="text-xs text-gray-400">Illumina NovaSeq 6000 • Flowcell ID #NV-9842</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-emerald-950/60 text-emerald-300 border border-emerald-800/50">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            Live Q30: 99.96%
          </span>
        </div>
      </div>

      {/* Interactive Base Pair Rungs */}
      <div className="space-y-2 font-mono">
        {SAMPLE_PAIRS.map((pair, idx) => {
          const isCurrent = activeStep === idx;
          return (
            <div
              key={pair.id}
              className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                isCurrent
                  ? "border-teal-500 bg-teal-950/40 shadow-md shadow-teal-500/10 scale-[1.01]"
                  : "border-gray-800/60 bg-gray-900/40 opacity-75 hover:opacity-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-gray-500 w-6">0{pair.id}</span>
                <span className="text-xs font-bold text-teal-300 w-16">{pair.gene}</span>
              </div>

              {/* DNA Rung Display */}
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded flex items-center justify-center font-bold text-xs ${baseColors[pair.leftBase]}`}>
                  {pair.leftBase}
                </span>
                <div className="w-16 h-0.5 bg-gradient-to-r from-teal-500/40 via-cyan-400 to-indigo-500/40 relative">
                  {pair.isMutated && (
                    <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-amber-400/80 animate-ping" />
                  )}
                </div>
                <span className={`w-6 h-6 rounded flex items-center justify-center font-bold text-xs ${baseColors[pair.rightBase]}`}>
                  {pair.rightBase}
                </span>
              </div>

              {/* Status */}
              <div className="text-[11px] flex items-center gap-1.5 w-32 justify-end">
                {pair.isMutated ? (
                  <span className="inline-flex items-center gap-1 text-amber-400 font-semibold">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    Variant Alert
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-gray-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Consensus WT
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-800/80 flex items-center justify-between text-xs text-gray-400">
        <span className="font-mono text-gray-500">Dual-indexed paired-end reads (2x150bp)</span>
        <span className="text-teal-400 font-mono">1.48 Billion Reads / Run</span>
      </div>
    </div>
  );
}
