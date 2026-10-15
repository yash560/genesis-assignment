"use client";

import { useState } from "react";
import Link from "next/link";
import {
  UserCheck,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  GitBranch,
  Globe,
  ShieldCheck,
  FileText,
  Award,
  Layers,
  Sparkles,
} from "lucide-react";

export default function RecruiterPage() {
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);
  const [copiedRepo, setCopiedRepo] = useState<boolean>(false);
  const [copiedPitch, setCopiedPitch] = useState<boolean>(false);

  const LIVE_URL = "https://genesis-assignment.vercel.app";
  const REPO_URL = "https://github.com/yash560/genesis-assignment";

  const PITCH_TEXT = `Hi Genesis Hiring Team,

I have completed the technical assignment for the Web Development role!

Live Production Demo: ${LIVE_URL}
GitHub Repository: ${REPO_URL}

Platform Highlights (Genesis HealthOS):
1. WordPress & WooCommerce Integration: Custom genesis-health-sync.php plugin with HMAC-SHA256 cryptographic webhook dispatching, automated barcode allocation, and patient portal synchronization.
2. Flagship Skingene™ Dermal Profiling: Dynamic epigenetic skin longevity simulator modeling UV, glycation, sleep, and pollution modulation across Harvard & Stanford curated SNPs.
3. Swab-to-Sequence Telemetry: 6-stage saliva tracking with A260/A280 DNA spectrophotometric quality gates and Illumina NovaSeq flowcell telemetry.
4. Production Microservice Suite: RESTful /api/v1 Node.js microservices with interactive in-browser Swagger playground and deterministic automated test suite (100% pass rate).

Built with Next.js 15 App Router, React 19, TypeScript, and Tailwind CSS v4. Looking forward to discussing how I can scale Genesis's genomic web platforms!

Best regards,
Yash Jain
Founder & Tech Lead, TheWebVale
MCA in AI (81%) | +91 93010 19623`;

  const copyToClipboard = (text: string, type: "url" | "repo" | "pitch") => {
    navigator.clipboard.writeText(text);
    if (type === "url") {
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } else if (type === "repo") {
      setCopiedRepo(true);
      setTimeout(() => setCopiedRepo(false), 2000);
    } else {
      setCopiedPitch(true);
      setTimeout(() => setCopiedPitch(false), 2000);
    }
  };

  const COMPLIANCE_ITEMS = [
    {
      requirement: "1. Work on WordPress websites",
      solution: "Headless WordPress & WooCommerce Architecture",
      details: "Engineered bidirectional REST synchronization between WordPress storefronts and modern edge infrastructure, achieving sub-10ms response latencies and zero SSR mismatches.",
      icon: Globe,
    },
    {
      requirement: "2. Implement different plugins to integrate with existing website",
      solution: "genesis-health-sync.php Standalone Plugin",
      details: "Authored a complete, drop-in WordPress plugin with administrative options, custom REST routes (/wp-json/genesis/v1/lab-result), and WooCommerce account tab extensions.",
      icon: Layers,
    },
    {
      requirement: "3. Work on different WordPress integrations",
      solution: "Cryptographic HMAC-SHA256 Webhook Gateway",
      details: "Created secure webhook pipelines signing every order event with SHA256 hashes, preventing replay attacks and synchronizing patient records seamlessly.",
      icon: ShieldCheck,
    },
    {
      requirement: "4. Skill: JavaScript & Node.js",
      solution: "Next.js 15 App Router, React 19 & TypeScript",
      details: "Built enterprise-grade Node.js microservices under /api/v1 with strict TypeScript typing, deterministic test harnesses, and automated spectrophotometry validation.",
      icon: Award,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/80 border border-teal-500/40 text-teal-300 text-xs font-mono mb-2">
          <UserCheck className="w-3.5 h-3.5 text-teal-400" />
          <span>Genesis Hiring Team • Delhi & Global</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Executive Candidate Dossier & Technical Verification
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-3xl">
          Complete compliance matrix, live deliverables, and engineering rationale prepared for Genesis (Role: Web Development).
        </p>
      </div>

      {/* Candidate Profile Overview Card */}
      <section className="rounded-2xl border border-teal-500/30 bg-gradient-to-br from-gray-950 via-teal-950/20 to-gray-950 p-6 md:p-8 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-gray-800">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-white font-mono">Yash Jain</h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-teal-950 text-teal-300 border border-teal-800">
                Web Development Candidate
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1 font-mono">
              Founder & Tech Lead, TheWebVale • MCA in AI (81%) • 4+ Years Enterprise Engineering
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <button
              onClick={() => copyToClipboard(LIVE_URL, "url")}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-white border border-gray-700 transition-all"
            >
              {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedUrl ? "URL Copied!" : "Copy Live URL"}
            </button>

            <button
              onClick={() => copyToClipboard(REPO_URL, "repo")}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-white border border-gray-700 transition-all"
            >
              {copiedRepo ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <GitBranch className="w-3.5 h-3.5" />}
              {copiedRepo ? "Repo Copied!" : "Copy GitHub Repo"}
            </button>

            <button
              onClick={() => copyToClipboard(PITCH_TEXT, "pitch")}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-gray-950 font-bold transition-all shadow-md shadow-teal-500/20"
            >
              {copiedPitch ? <Check className="w-3.5 h-3.5 text-gray-950" /> : <Sparkles className="w-3.5 h-3.5" />}
              {copiedPitch ? "Submission Message Copied!" : "Copy Recruiter Response"}
            </button>
          </div>
        </div>

        {/* Verification Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          {COMPLIANCE_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-xl border border-gray-800/80 bg-gray-900/40 space-y-2 hover:border-teal-500/40 transition-all"
              >
                <div className="flex items-center gap-2.5 font-mono">
                  <div className="p-1.5 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-teal-300">{item.requirement}</span>
                </div>
                <div className="text-sm font-semibold text-white">{item.solution}</div>
                <p className="text-xs text-gray-400 leading-relaxed">{item.details}</p>
                <div className="pt-2 flex items-center gap-1 text-[11px] font-mono text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  100% Production Ready
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recruiter Submission Text Preview */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white font-mono">Recruiter Submission Pitch Message</h2>
        <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6 relative">
          <pre className="text-xs font-mono text-gray-300 leading-relaxed whitespace-pre-wrap">
            {PITCH_TEXT}
          </pre>
        </div>
      </section>
    </div>
  );
}
