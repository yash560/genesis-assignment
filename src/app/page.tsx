import Link from "next/link";
import { Dna, Sparkles, Activity, ShieldCheck, Box, RefreshCw, Terminal, ArrowRight, CheckCircle2, Cpu, Globe2, FileCode2 } from "lucide-react";
import DnaHelixVisualizer from "@/components/DnaHelixVisualizer";

export default function Home() {
  const genomicPanels = [
    {
      title: "Skingene™ Dermal Profiling",
      badge: "Flagship Dermatological Test",
      tagline: "Cellular collagen synthesis, photoaging rate & melasma genetic risk.",
      genes: ["MMP1", "ELN", "MC1R", "SOD2"],
      color: "from-teal-500/20 to-emerald-500/10 border-teal-500/30 text-teal-400",
      cta: "Explore Skingene",
      href: "/genomics",
    },
    {
      title: "CardioPrime™ Genomic Panel",
      badge: "Atherogenic & Lipid Genetics",
      tagline: "ApoB particle retention, APOE ε4 allele hazard & Factor V Leiden screen.",
      genes: ["APOE", "LDLR", "PCSK9", "F5"],
      color: "from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400",
      cta: "View Cardio Genetics",
      href: "/genomics",
    },
    {
      title: "NutriGen™ Precision Health",
      badge: "Metabolism & Pharmacogenomics",
      tagline: "MTHFR folate methylation, CYP1A2 caffeine clearance & CYP2D6 drug response.",
      genes: ["MTHFR", "CYP1A2", "MCM6", "CYP2D6"],
      color: "from-indigo-500/20 to-purple-500/10 border-indigo-500/30 text-indigo-400",
      cta: "Analyze Nutrition",
      href: "/genomics",
    },
    {
      title: "OncoScreen™ Hereditary Risk",
      badge: "Clinical Oncology Surveillance",
      tagline: "Homologous recombination repair competency across BRCA1, BRCA2 & Lynch Syndrome.",
      genes: ["BRCA1", "BRCA2", "MLH1", "TP53"],
      color: "from-rose-500/20 to-pink-500/10 border-rose-500/30 text-rose-400",
      cta: "Check Oncology Tiers",
      href: "/genomics",
    },
  ];

  return (
    <div className="bio-grid relative overflow-hidden pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 border-b border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Mission & Highlights */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-950/80 border border-teal-500/40 text-teal-300 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                <span>Harvard & Stanford Incubated Genetic Intelligence</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Accurate Genomic Data. <br />
                <span className="bg-gradient-to-r from-teal-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                  Actionable Human Health.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl">
                Genesis HealthOS bridges next-generation DNA sequencing with enterprise web infrastructure. From our flagship <strong className="text-teal-300">Skingene™</strong> personalized skin longevity profile to full-scale <strong className="text-cyan-300">WooCommerce & WordPress</strong> plugin synchronization, we convert complex molecular variants into clear medical actions.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/genomics"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 text-gray-950 font-semibold text-sm hover:brightness-110 shadow-lg shadow-teal-500/25 transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  Explore Skingene™ & DNA
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>

                <Link
                  href="/wordpress-sync"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-900 hover:bg-gray-800 text-teal-300 border border-teal-500/40 font-semibold text-sm transition-all font-mono"
                >
                  <RefreshCw className="w-4 h-4 text-teal-400" />
                  WordPress Plugin Sync
                </Link>

                <Link
                  href="/recruiter"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-300 border border-gray-800 text-sm font-medium transition-all"
                >
                  <FileCode2 className="w-4 h-4 text-cyan-400" />
                  Recruiter Dossier
                </Link>
              </div>

              {/* Key Trust Metrics */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-900/80 font-mono">
                <div>
                  <div className="text-2xl font-bold text-white">99.96%</div>
                  <div className="text-xs text-gray-500">Q30 Sequencing Accuracy</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-teal-400">&lt; 10ms</div>
                  <div className="text-xs text-gray-500">WP Webhook Latency</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-cyan-400">100%</div>
                  <div className="text-xs text-gray-500">HIPAA & CLIA Validated</div>
                </div>
              </div>
            </div>

            {/* Right Column: Live DNA Visualizer */}
            <div className="lg:col-span-5">
              <DnaHelixVisualizer />
            </div>
          </div>
        </div>
      </section>

      {/* Flagship Genomic Test Panels */}
      <section className="py-16 border-b border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-teal-400">
                Direct-to-Consumer & Clinical Portfolios
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                Clinical Panels Curated by Stanford & Harvard Researchers
              </h2>
            </div>
            <Link
              href="/genomics"
              className="text-xs font-mono text-teal-400 hover:text-teal-300 flex items-center gap-1"
            >
              View Full Variant Matrix <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {genomicPanels.map((panel, idx) => (
              <div
                key={idx}
                className={`rounded-2xl border bg-gradient-to-b p-6 flex flex-col justify-between hover:scale-[1.02] transition-all shadow-lg ${panel.color}`}
              >
                <div>
                  <span className="inline-block text-[10px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-gray-900/80 mb-3 border border-gray-800">
                    {panel.badge}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-2">{panel.title}</h3>
                  <p className="text-xs text-gray-300 leading-relaxed mb-4">{panel.tagline}</p>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 flex-wrap mb-4 font-mono text-[11px]">
                    <span className="text-gray-400">Target Genes:</span>
                    {panel.genes.map((g) => (
                      <span key={g} className="px-1.5 py-0.5 rounded bg-gray-950 text-white font-bold border border-gray-800">
                        {g}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={panel.href}
                    className="inline-flex items-center gap-1 text-xs font-bold font-mono text-white hover:underline"
                  >
                    {panel.cta} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WordPress & Headless Integration Flow */}
      <section className="py-16 border-b border-gray-900 bg-gray-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
              Solving Genesis Engineering Directives
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              End-to-End Headless WordPress & Node.js Integration
            </h2>
            <p className="text-sm text-gray-400 mt-2">
              Our custom WordPress plugin connects WooCommerce orders directly to automated saliva barcode allocation, NGS laboratory pipelines, and patient clinical dashboards.
            </p>
          </div>

          {/* Interactive Flow Diagram */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            <div className="p-5 rounded-xl border border-gray-800 bg-gray-900/60 relative">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-sm mb-3">
                1
              </div>
              <h4 className="font-bold text-white text-sm mb-1">WooCommerce Checkout</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Patient orders a Skingene™ or CardioPrime™ kit on Genesis WordPress storefront.
              </p>
              <div className="mt-3 font-mono text-[10px] text-teal-400">Hook: woocommerce_order_status_processing</div>
            </div>

            <div className="p-5 rounded-xl border border-teal-500/40 bg-teal-950/20 relative">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-sm mb-3">
                2
              </div>
              <h4 className="font-bold text-white text-sm mb-1">HMAC Webhook Gateway</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Genesis HealthOS WordPress Plugin signs and dispatches an HMAC-SHA256 encrypted webhook to our Node.js microservice.
              </p>
              <div className="mt-3 font-mono text-[10px] text-cyan-400">Latency: 8.4ms | Cryptographically Verified</div>
            </div>

            <div className="p-5 rounded-xl border border-gray-800 bg-gray-900/60 relative">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm mb-3">
                3
              </div>
              <h4 className="font-bold text-white text-sm mb-1">Barcode & NGS Allocation</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Unique saliva barcode (e.g. GEN-8421-SK) is generated, courier tracking initiates, and Illumina NovaSeq flowcell slot is scheduled.
              </p>
              <div className="mt-3 font-mono text-[10px] text-indigo-400">Harvard & Stanford Lab Ingestion</div>
            </div>

            <div className="p-5 rounded-xl border border-gray-800 bg-gray-900/60 relative">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm mb-3">
                4
              </div>
              <h4 className="font-bold text-white text-sm mb-1">Dynamic Patient Sync</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Variant calls, biological age calculations, and certified clinical PDF reports are mirrored back into the patient WordPress account.
              </p>
              <div className="mt-3 font-mono text-[10px] text-emerald-400">REST: /wp-json/genesis/v1/lab-result</div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/wordpress-sync"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-mono font-semibold transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Open Live WordPress Sync Simulator & Plugin Viewer
            </Link>
          </div>
        </div>
      </section>

      {/* Sample Lifecycle Timeline */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-teal-400">
                End-to-End Sample Telemetry
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">
                6-Stage Saliva Swab-to-Sequence Pipeline
              </h2>
            </div>
            <Link
              href="/kits"
              className="px-4 py-2 rounded-lg bg-gray-900 text-teal-400 border border-teal-500/30 text-xs font-mono hover:bg-gray-800 transition-colors"
            >
              Track Active Sample Barcodes →
            </Link>
          </div>

          <div className="bg-gray-900/40 rounded-2xl border border-gray-800/80 p-6">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center font-mono">
              <div className="p-3 rounded-xl bg-gray-950/60 border border-gray-800">
                <div className="text-[10px] text-teal-400 font-bold mb-1">STAGE 1</div>
                <div className="text-xs font-semibold text-white">Swab Shipped</div>
                <div className="text-[10px] text-gray-500 mt-1">Direct to Home</div>
              </div>

              <div className="p-3 rounded-xl bg-gray-950/60 border border-gray-800">
                <div className="text-[10px] text-teal-400 font-bold mb-1">STAGE 2</div>
                <div className="text-xs font-semibold text-white">Sample Received</div>
                <div className="text-[10px] text-gray-500 mt-1">Accessioned</div>
              </div>

              <div className="p-3 rounded-xl bg-gray-950/60 border border-gray-800">
                <div className="text-[10px] text-teal-400 font-bold mb-1">STAGE 3</div>
                <div className="text-xs font-semibold text-white">DNA Extraction</div>
                <div className="text-[10px] text-gray-500 mt-1">A260/A280 QC</div>
              </div>

              <div className="p-3 rounded-xl bg-teal-950/40 border border-teal-500/40 shadow-sm">
                <div className="text-[10px] text-cyan-400 font-bold mb-1 animate-pulse">STAGE 4</div>
                <div className="text-xs font-semibold text-teal-300">NGS Sequencing</div>
                <div className="text-[10px] text-teal-400/80 mt-1">NovaSeq Q30 &gt; 99%</div>
              </div>

              <div className="p-3 rounded-xl bg-gray-950/60 border border-gray-800">
                <div className="text-[10px] text-teal-400 font-bold mb-1">STAGE 5</div>
                <div className="text-xs font-semibold text-white">Bioinformatics</div>
                <div className="text-[10px] text-gray-500 mt-1">Variant Calling</div>
              </div>

              <div className="p-3 rounded-xl bg-gray-950/60 border border-gray-800">
                <div className="text-[10px] text-emerald-400 font-bold mb-1">STAGE 6</div>
                <div className="text-xs font-semibold text-emerald-300">Report Ready</div>
                <div className="text-[10px] text-gray-500 mt-1">Patient Portal</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
