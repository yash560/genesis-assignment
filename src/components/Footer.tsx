import Link from "next/link";
import { Dna, ShieldCheck, HeartPulse, Sparkles, ExternalLink, Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-900 bg-gray-950 text-gray-400 text-xs">
      {/* 4-Tier Enterprise Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Tier 1: Mission & Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
                <Dna className="w-4 h-4" />
              </div>
              <span className="font-bold text-white text-base tracking-tight">GENESIS</span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">
              Pioneering actionable health information through next-generation clinical genomics. Built by scientists and engineers from Harvard & Stanford incubated laboratories.
            </p>
            <div className="pt-2 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 font-mono text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5" /> CLIA Certified
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-400 border border-cyan-800/40 font-mono text-[11px]">
                <HeartPulse className="w-3.5 h-3.5" /> CAP Accredited
              </span>
            </div>
          </div>

          {/* Tier 2: Genomic Panels */}
          <div>
            <h4 className="text-white font-semibold mb-3 tracking-wide text-xs uppercase font-mono text-teal-400">
              Genomic Health Panels
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/genomics" className="hover:text-teal-300 transition-colors flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-teal-400" />
                  Skingene™ Dermal Profiling
                </Link>
              </li>
              <li>
                <Link href="/genomics" className="hover:text-teal-300 transition-colors">
                  CardioPrime™ Lipid & ApoB Screen
                </Link>
              </li>
              <li>
                <Link href="/genomics" className="hover:text-teal-300 transition-colors">
                  NutriGen™ Methylation & Pharmacogenomics
                </Link>
              </li>
              <li>
                <Link href="/genomics" className="hover:text-teal-300 transition-colors">
                  OncoScreen™ Hereditary Cancer Variant Calling
                </Link>
              </li>
              <li>
                <Link href="/kits" className="hover:text-teal-300 transition-colors">
                  Saliva Swab Telemetry & NGS Pipeline
                </Link>
              </li>
            </ul>
          </div>

          {/* Tier 3: WordPress & Integration Engineering */}
          <div>
            <h4 className="text-white font-semibold mb-3 tracking-wide text-xs uppercase font-mono text-cyan-400">
              WordPress & Headless Stack
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/wordpress-sync" className="hover:text-cyan-300 transition-colors">
                  Genesis HealthOS WordPress Plugin
                </Link>
              </li>
              <li>
                <Link href="/wordpress-sync" className="hover:text-cyan-300 transition-colors">
                  WooCommerce Webhook Gateway
                </Link>
              </li>
              <li>
                <Link href="/api-docs" className="hover:text-cyan-300 transition-colors">
                  RESTful Microservice Suite (/api/v1)
                </Link>
              </li>
              <li>
                <Link href="/api-docs" className="hover:text-cyan-300 transition-colors">
                  Swagger / OpenAPI Interactive Console
                </Link>
              </li>
              <li>
                <Link href="/recruiter" className="hover:text-cyan-300 transition-colors">
                  Recruiter Alignment & Engineering Proof
                </Link>
              </li>
            </ul>
          </div>

          {/* Tier 4: Architecture & Provenance */}
          <div>
            <h4 className="text-white font-semibold mb-3 tracking-wide text-xs uppercase font-mono text-teal-400">
              Architecture
            </h4>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 font-medium text-xs mb-3">
              <span>⚡ Powered by TheWebVale</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed mb-3">
              Engineered with clean-room Next.js 15 standards, HIPAA-ready architecture, and real-time spectrophotometry verification.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://thewebvale.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-teal-400 hover:text-teal-300 transition-colors flex items-center gap-1"
              >
                <span>TheWebVale Platform</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-900 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} Genesis Biogen / Genesis HealthOS. All genomic telemetry simulated for technical demonstration.
          </div>
          <div className="flex items-center gap-3 font-mono">
            <span className="text-teal-400 font-medium">⚡ Powered by TheWebVale</span>
            <span>•</span>
            <span>Next.js 15 App Router</span>
            <span>•</span>
            <span>React 19</span>
            <span>•</span>
            <span>Vercel Edge</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
