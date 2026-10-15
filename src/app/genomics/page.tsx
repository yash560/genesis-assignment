"use client";

import { useState } from "react";
import { INITIAL_VARIANTS, GenomicVariant } from "@/lib/genomics-data";
import { calculateSkingeneRisk, LifestyleFactors } from "@/lib/risk-calculator";
import {
  Sparkles,
  Search,
  Filter,
  Activity,
  ShieldAlert,
  ShieldCheck,
  Dna,
  Sun,
  Moon,
  Wind,
  Cookie,
  Download,
  ExternalLink,
  Info,
} from "lucide-react";

export default function GenomicsPage() {
  const [variants] = useState<GenomicVariant[]>(INITIAL_VARIANTS);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeVariant, setActiveVariant] = useState<GenomicVariant | null>(null);

  // Lifestyle Simulator State
  const [lifestyle, setLifestyle] = useState<LifestyleFactors>({
    uvIndex: 7,
    sugarDietIndex: 6,
    sleepHours: 6,
    pollutionPmAqi: 140,
  });

  // Calculate Skingene risk dynamically
  const riskResult = calculateSkingeneRisk(variants, lifestyle);

  // Filter variants
  const filteredVariants = variants.filter((v) => {
    const matchesCat = selectedCategory === "all" || v.category === selectedCategory;
    const matchesQuery =
      searchQuery === "" ||
      v.gene.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.rsId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.trait.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const exportReportJson = () => {
    const data = {
      patientId: "PAT-DEMO-GENESIS",
      generatedAt: new Date().toISOString(),
      labStandards: "Harvard Cambridge Lab & Stanford Core Genomics",
      skingeneRiskAssessment: riskResult,
      lifestyleProfile: lifestyle,
      variantsAnalyzed: variants,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `genesis-genomic-report-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/80 border border-teal-500/40 text-teal-300 text-xs font-mono mb-3">
          <Sparkles className="w-3.5 h-3.5 text-teal-400" />
          <span>Genesis Flagship Clinical Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Skingene™ Dermal Profiling & Genomic Variant Explorer
        </h1>
        <p className="text-sm sm:text-base text-gray-400 mt-2 max-w-3xl">
          Direct-to-consumer molecular analysis grounded in Harvard & Stanford peer-reviewed datasets. Simulate how individual lifestyle cofactors modulate your baseline genetic skin aging velocity and cellular antioxidant defenses.
        </p>
      </div>

      {/* Skingene Interactive Simulator HUD */}
      <section className="rounded-2xl border border-teal-500/30 bg-gradient-to-br from-gray-950 via-teal-950/20 to-gray-950 p-6 md:p-8 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-teal-900/40">
          <div>
            <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider">
              Flagship Direct-to-Consumer Engine
            </span>
            <h2 className="text-2xl font-bold text-white mt-1 flex items-center gap-2">
              Skingene™ Dynamic Epigenetic Longevity Simulator
            </h2>
          </div>
          <button
            onClick={exportReportJson}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-gray-950 font-semibold text-xs font-mono shadow-md transition-all"
          >
            <Download className="w-4 h-4" />
            Export Certified Clinical JSON
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 items-center">
          {/* Sliders (Left: 7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-sm font-semibold text-gray-200 font-mono uppercase tracking-wide">
              Adjust Environmental & Lifestyle Cofactors
            </h3>

            {/* Slider 1: UV Index */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-gray-300 flex items-center gap-1.5">
                  <Sun className="w-4 h-4 text-amber-400" />
                  Ultraviolet Radiation (UV Exposure Index)
                </span>
                <span className="text-teal-400 font-bold">{lifestyle.uvIndex} / 10 UV</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={lifestyle.uvIndex}
                onChange={(e) => setLifestyle({ ...lifestyle, uvIndex: Number(e.target.value) })}
                className="w-full accent-teal-400 h-2 bg-gray-800 rounded-lg cursor-pointer"
              />
              <p className="text-[11px] text-gray-500">
                Triggers MMP1 gene transcription, accelerating collagen peptide cleavage.
              </p>
            </div>

            {/* Slider 2: Dietary Glycation */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-gray-300 flex items-center gap-1.5">
                  <Cookie className="w-4 h-4 text-orange-400" />
                  Dietary Glycation (Refined Sugars / AGEs)
                </span>
                <span className="text-teal-400 font-bold">{lifestyle.sugarDietIndex} / 10 Index</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={lifestyle.sugarDietIndex}
                onChange={(e) => setLifestyle({ ...lifestyle, sugarDietIndex: Number(e.target.value) })}
                className="w-full accent-teal-400 h-2 bg-gray-800 rounded-lg cursor-pointer"
              />
              <p className="text-[11px] text-gray-500">
                Advanced glycation cross-links elastin fibers, reducing tensile elasticity.
              </p>
            </div>

            {/* Slider 3: Sleep Duration */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-gray-300 flex items-center gap-1.5">
                  <Moon className="w-4 h-4 text-indigo-400" />
                  Sleep Duration & Melatonin Cycle
                </span>
                <span className="text-teal-400 font-bold">{lifestyle.sleepHours} Hours / Night</span>
              </div>
              <input
                type="range"
                min="4"
                max="10"
                value={lifestyle.sleepHours}
                onChange={(e) => setLifestyle({ ...lifestyle, sleepHours: Number(e.target.value) })}
                className="w-full accent-teal-400 h-2 bg-gray-800 rounded-lg cursor-pointer"
              />
              <p className="text-[11px] text-gray-500">
                Critical window for mitochondrial free-radical clearance via SOD2 buffering.
              </p>
            </div>

            {/* Slider 4: Urban Pollution */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-gray-300 flex items-center gap-1.5">
                  <Wind className="w-4 h-4 text-cyan-400" />
                  Atmospheric Particulate Matter (PM2.5 AQI)
                </span>
                <span className="text-teal-400 font-bold">{lifestyle.pollutionPmAqi} AQI</span>
              </div>
              <input
                type="range"
                min="20"
                max="300"
                step="10"
                value={lifestyle.pollutionPmAqi}
                onChange={(e) => setLifestyle({ ...lifestyle, pollutionPmAqi: Number(e.target.value) })}
                className="w-full accent-teal-400 h-2 bg-gray-800 rounded-lg cursor-pointer"
              />
              <p className="text-[11px] text-gray-500">
                Exogenous reactive oxygen species deplete cellular glutathione levels.
              </p>
            </div>
          </div>

          {/* Dynamic Output Card (Right: 5 Cols) */}
          <div className="lg:col-span-5 bg-gray-900/80 rounded-2xl border border-gray-800 p-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-800">
              <span className="text-xs font-mono uppercase text-gray-400">Biological Skin Aging</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-teal-950 text-teal-400 border border-teal-800">
                {riskResult.riskCategory}
              </span>
            </div>

            {/* Score Display */}
            <div className="text-center py-2">
              <div className="text-5xl font-extrabold text-white font-mono">
                {riskResult.skinBiologicalAgeDeltaYears > 0 ? `+${riskResult.skinBiologicalAgeDeltaYears}` : riskResult.skinBiologicalAgeDeltaYears}
                <span className="text-lg font-normal text-teal-400 ml-1">Years</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Dermal Biological Velocity vs Chronological Baseline
              </p>
            </div>

            {/* Score Comparison Bars */}
            <div className="space-y-3 font-mono text-xs">
              <div>
                <div className="flex justify-between mb-1 text-gray-400">
                  <span>Base Genetic Score (Fixed)</span>
                  <span>{riskResult.baseGenomicRisk} / 100</span>
                </div>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${riskResult.baseGenomicRisk}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1 text-gray-400">
                  <span>Modulated Epigenetic Risk</span>
                  <span className="text-teal-400 font-bold">{riskResult.modulatedRiskScore} / 100</span>
                </div>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-400 rounded-full" style={{ width: `${riskResult.modulatedRiskScore}%` }} />
                </div>
              </div>
            </div>

            {/* Clinical Summary */}
            <div className="p-3.5 rounded-xl bg-teal-950/30 border border-teal-800/40 text-xs text-teal-200 leading-relaxed">
              <div className="font-bold text-teal-300 font-mono mb-1 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" />
                Actionable Clinical Recommendation
              </div>
              {riskResult.clinicalSummary}
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Variant Matrix */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Genomic Variant Library & Actionability</h2>
            <p className="text-xs text-gray-400">
              Filtered across Harvard/Stanford validated SNPs for Skingene, CardioPrime, NutriGen & OncoScreen.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search gene (MMP1, APOE)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 font-mono"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 font-mono text-xs">
          {[
            { id: "all", label: "All Panels (9)" },
            { id: "skin", label: "Skingene™ Dermal (4)" },
            { id: "cardio", label: "CardioPrime™ (2)" },
            { id: "nutrition", label: "NutriGen™ (2)" },
            { id: "oncology", label: "OncoScreen™ (1)" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? "bg-teal-500 text-gray-950 font-bold"
                  : "bg-gray-900 text-gray-400 hover:text-white border border-gray-800"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Variant Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVariants.map((v) => {
            const isHighRisk = v.clinicalSignificance === "Actionable High Risk";
            const isProtective = v.clinicalSignificance === "Protective";

            return (
              <div
                key={v.id}
                className="rounded-2xl border border-gray-800/80 bg-gray-900/40 p-6 flex flex-col justify-between hover:border-teal-500/40 hover:bg-gray-900/60 transition-all shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs text-gray-400">{v.chromosome} • {v.rsId}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                        isHighRisk
                          ? "bg-rose-950 text-rose-300 border-rose-800"
                          : isProtective
                          ? "bg-emerald-950 text-emerald-300 border-emerald-800"
                          : "bg-gray-800 text-gray-300 border-gray-700"
                      }`}
                    >
                      {v.clinicalSignificance}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2 mb-2">
                    <h3 className="text-xl font-bold text-white font-mono">{v.gene}</h3>
                    <span className="text-xs text-teal-400 font-mono font-semibold">
                      Genotype: {v.patientGenotype}
                    </span>
                  </div>

                  <h4 className="text-sm font-semibold text-gray-200 mb-2">{v.trait}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4">{v.biologicalMechanism}</p>
                </div>

                <div className="pt-4 border-t border-gray-800/80 space-y-3">
                  <div className="p-2.5 rounded-lg bg-gray-950/80 border border-gray-800/80 text-[11px] text-gray-300">
                    <span className="font-bold text-teal-400 font-mono block mb-0.5">Clinical Protocol:</span>
                    {v.actionableRecommendation}
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono text-gray-500">
                    <span>{v.evidenceLevel}</span>
                    <span className="text-teal-400 font-semibold">{v.testName.split(" ")[0]}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
