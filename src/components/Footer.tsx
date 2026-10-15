import Link from "next/link";
import { Dna, ShieldCheck, HeartPulse, Sparkles, ExternalLink } from "lucide-react";

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

          {/* Tier 4: Developer & Recruiter Contact */}
          <div>
            <h4 className="text-white font-semibold mb-3 tracking-wide text-xs uppercase font-mono text-indigo-400">
              Candidate & Technical Contact
            </h4>
            <p className="text-xs text-gray-400 mb-2">
              Architected by <span className="text-white font-medium">Yash Jain</span> for the Genesis Web Development Engineering Selection.
            </p>
            <div className="space-y-1.5 font-mono text-[11px]">
              <div className="text-gray-300">Email: yash560@gmail.com</div>
              <div className="text-gray-300">Phone: +91 93010 19623</div>
              <div className="text-gray-300">GitHub: github.com/yash560</div>
            </div>
            <div className="pt-3">
              <Link
                href="/recruiter"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-900 hover:bg-gray-800 text-teal-300 border border-teal-500/30 text-xs font-mono transition-colors"
              >
                <span>View Full Recruiter Dossier</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-900 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} Genesis Biogen / Genesis HealthOS. All genomic telemetry simulated for technical demonstration.
          </div>
          <div className="flex items-center gap-4 font-mono">
            <span>Next.js 15 App Router</span>
            <span>•</span>
            <span>React 19</span>
            <span>•</span>
            <span>Tailwind CSS v4</span>
            <span>•</span>
            <span>Vercel Edge</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
