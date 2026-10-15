"use client";

import { useState } from "react";
import { INITIAL_KITS, TestKitRecord } from "@/lib/genomics-data";
import { validateBarcode, evaluateDnaPurity } from "@/lib/risk-calculator";
import confetti from "canvas-confetti";
import {
  Box,
  Search,
  Plus,
  CheckCircle2,
  Clock,
  Dna,
  ShieldCheck,
  AlertTriangle,
  FlaskConical,
  Activity,
  ArrowRight,
  X,
} from "lucide-react";

export default function KitsPage() {
  const [kits, setKits] = useState<TestKitRecord[]>(INITIAL_KITS);
  const [searchBarcode, setSearchBarcode] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [activeKit, setActiveKit] = useState<TestKitRecord | null>(kits[0]);

  // Form State for New Kit Registration
  const [newBarcode, setNewBarcode] = useState<string>("");
  const [newPatient, setNewPatient] = useState<string>("");
  const [newTestType, setNewTestType] = useState<TestKitRecord["testType"]>("Skingene™ Dermatological Profile");
  const [formError, setFormError] = useState<string>("");

  const handleRegisterKit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    const upperBarcode = newBarcode.trim().toUpperCase();
    if (!validateBarcode(upperBarcode)) {
      setFormError("Invalid barcode format! Must match pattern GEN-XXXX-XX (e.g. GEN-4591-SK).");
      return;
    }

    if (!newPatient.trim()) {
      setFormError("Patient name is required.");
      return;
    }

    const createdRecord: TestKitRecord = {
      barcode: upperBarcode,
      patientId: `PAT-00${Math.floor(100 + Math.random() * 900)}`,
      patientName: newPatient.trim(),
      testType: newTestType,
      orderDate: new Date().toISOString().replace("T", " ").substring(0, 16) + " UTC",
      sampleType: "Saliva Buccal Swab",
      status: "sample_received",
      currentStage: 2,
      dnaConcentrationNgUl: 46.8,
      purityRatio260_280: 1.86,
      sequencerPlatform: "Illumina NovaSeq 6000",
      q30ScorePercent: 99.92,
      estimatedCompletion: "In 2 Days",
      labLocation: "Genesis South Asia Genomics Node, New Delhi",
    };

    setKits([createdRecord, ...kits]);
    setActiveKit(createdRecord);
    setModalOpen(false);
    setNewBarcode("");
    setNewPatient("");

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // Ignore if confetti not supported
    }
  };

  const filteredKits = kits.filter((k) =>
    k.barcode.toLowerCase().includes(searchBarcode.toLowerCase()) ||
    k.patientName.toLowerCase().includes(searchBarcode.toLowerCase())
  );

  const STAGE_NAMES = [
    "Kit Shipped & Swab Dispatched",
    "Sample Received & Accessioned",
    "DNA Extraction & Spectrophotometry QC",
    "Illumina NovaSeq NGS Sequencing",
    "Bioinformatics Variant Calling (VCF)",
    "Certified Clinical Report Published",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/80 border border-teal-500/40 text-teal-300 text-xs font-mono mb-2">
            <Box className="w-3.5 h-3.5 text-teal-400" />
            <span>Sample Logistics & NGS Telemetry</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Swab-to-Sequence Kit Tracking & Laboratory Ingestion
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Real-time tracking of saliva collection tubes through DNA extraction, spectrophotometric quality control, and Illumina NovaSeq flowcell runs.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 text-gray-950 font-semibold text-xs font-mono shadow-lg hover:brightness-110 transition-all"
        >
          <Plus className="w-4 h-4" />
          Register New Sample Kit
        </button>
      </div>

      {/* Active Sample HUD (Interactive Timeline) */}
      {activeKit && (
        <section className="rounded-2xl border border-teal-500/30 bg-gray-900/40 p-6 md:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-800 gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-white font-mono">{activeKit.barcode}</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-teal-950 text-teal-300 border border-teal-800">
                  {activeKit.testType}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-400 mt-1 font-mono">
                <span>Patient: <strong className="text-white">{activeKit.patientName}</strong> ({activeKit.patientId})</span>
                <span>•</span>
                <span>Ordered: {activeKit.orderDate}</span>
                <span>•</span>
                <span className="text-teal-400">{activeKit.labLocation}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 font-mono">
              <div className="text-right">
                <div className="text-xs text-gray-400">Current Phase</div>
                <div className="text-sm font-bold text-teal-300">
                  Stage {activeKit.currentStage} of 6
                </div>
              </div>
            </div>
          </div>

          {/* 6-Stage Progress Pipeline */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            {STAGE_NAMES.map((name, index) => {
              const stageNum = index + 1;
              const isPast = stageNum < activeKit.currentStage;
              const isCurrent = stageNum === activeKit.currentStage;

              return (
                <div
                  key={stageNum}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    isCurrent
                      ? "border-teal-500 bg-teal-950/40 shadow-md shadow-teal-500/10"
                      : isPast
                      ? "border-emerald-800/40 bg-emerald-950/20 opacity-90"
                      : "border-gray-800/60 bg-gray-950/40 opacity-40"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold text-gray-400">
                      PHASE 0{stageNum}
                    </span>
                    {isPast ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : isCurrent ? (
                      <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
                    ) : (
                      <Clock className="w-3.5 h-3.5 text-gray-600" />
                    )}
                  </div>
                  <div className="text-xs font-semibold text-white leading-snug">{name}</div>
                </div>
              );
            })}
          </div>

          {/* Detailed Lab Metrics for Current Active Kit */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-800/80 font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-gray-950 border border-gray-800">
              <div className="text-gray-500 text-[10px] uppercase">DNA Concentration</div>
              <div className="text-base font-bold text-white mt-0.5">
                {activeKit.dnaConcentrationNgUl} ng/μL
              </div>
              <div className="text-[10px] text-teal-400 mt-1">High Molecular Weight Genomic DNA</div>
            </div>

            <div className="p-3.5 rounded-xl bg-gray-950 border border-gray-800">
              <div className="text-gray-500 text-[10px] uppercase">Spectrophotometry A260/A280</div>
              <div className="text-base font-bold text-white mt-0.5">
                {activeKit.purityRatio260_280}
              </div>
              <div className="text-[10px] text-emerald-400 mt-1">
                {evaluateDnaPurity(activeKit.purityRatio260_280).status} (Optimal)
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-gray-950 border border-gray-800">
              <div className="text-gray-500 text-[10px] uppercase">Sequencing Hardware</div>
              <div className="text-base font-bold text-white mt-0.5">
                {activeKit.sequencerPlatform}
              </div>
              <div className="text-[10px] text-cyan-400 mt-1">Paired-End 2x150bp Flowcell</div>
            </div>

            <div className="p-3.5 rounded-xl bg-gray-950 border border-gray-800">
              <div className="text-gray-500 text-[10px] uppercase">Sequencing Fidelity (Q30)</div>
              <div className="text-base font-bold text-white mt-0.5">
                {activeKit.q30ScorePercent}%
              </div>
              <div className="text-[10px] text-teal-400 mt-1">&lt; 1 error per 1,000 base pairs</div>
            </div>
          </div>
        </section>
      )}

      {/* Kit Inventory Table */}
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-white font-mono">Sample Accession Registry</h2>
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search barcode (GEN-8421)..."
              value={searchBarcode}
              onChange={(e) => setSearchBarcode(e.target.value)}
              className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 font-mono"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-gray-800 bg-gray-900/30 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-gray-950/80 text-gray-400 border-b border-gray-800 text-[11px] uppercase">
                <tr>
                  <th className="px-5 py-3.5">Barcode</th>
                  <th className="px-5 py-3.5">Patient</th>
                  <th className="px-5 py-3.5">Panel</th>
                  <th className="px-5 py-3.5">Stage</th>
                  <th className="px-5 py-3.5">DNA Yield</th>
                  <th className="px-5 py-3.5">Lab Node</th>
                  <th className="px-5 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                {filteredKits.map((k) => (
                  <tr
                    key={k.barcode}
                    onClick={() => setActiveKit(k)}
                    className={`cursor-pointer transition-colors ${
                      activeKit?.barcode === k.barcode ? "bg-teal-950/30" : "hover:bg-gray-800/40"
                    }`}
                  >
                    <td className="px-5 py-4 font-bold text-teal-300">{k.barcode}</td>
                    <td className="px-5 py-4 text-white">
                      <div>{k.patientName}</div>
                      <div className="text-[10px] text-gray-500">{k.patientId}</div>
                    </td>
                    <td className="px-5 py-4 text-gray-300">{k.testType.split(" ")[0]}</td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] bg-teal-950 text-teal-300 border border-teal-800">
                        Stage {k.currentStage}/6
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-300">
                      {k.dnaConcentrationNgUl > 0 ? `${k.dnaConcentrationNgUl} ng/μL` : "In Transit"}
                    </td>
                    <td className="px-5 py-4 text-gray-400 text-[11px] max-w-[200px] truncate">
                      {k.labLocation.split(",")[0]}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveKit(k);
                        }}
                        className="text-xs text-teal-400 hover:text-teal-300 font-bold"
                      >
                        Inspect →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Modal: Register New Kit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-gray-900 border border-teal-500/40 rounded-2xl p-6 shadow-2xl relative space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800">
              <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
                <Box className="w-4 h-4 text-teal-400" />
                Register Saliva Collection Swab
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-lg bg-rose-950/80 border border-rose-800 text-rose-300 text-xs">
                {formError}
              </div>
            )}

            <form onSubmit={handleRegisterKit} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-gray-400 mb-1">
                  Kit Barcode (GEN-XXXX-XX)
                </label>
                <input
                  type="text"
                  placeholder="e.g. GEN-5124-SK"
                  value={newBarcode}
                  onChange={(e) => setNewBarcode(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-teal-500 uppercase"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-1">Patient Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Siddharth Verma"
                  value={newPatient}
                  onChange={(e) => setNewPatient(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-teal-500"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-1">Genomic Panel Selection</label>
                <select
                  value={newTestType}
                  onChange={(e) => setNewTestType(e.target.value as TestKitRecord["testType"])}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-teal-500"
                >
                  <option value="Skingene™ Dermatological Profile">
                    Skingene™ Dermatological Profile (Collagen/Photoaging)
                  </option>
                  <option value="CardioPrime™ Genomic Panel">
                    CardioPrime™ Genomic Panel (ApoB/Atherosclerosis)
                  </option>
                  <option value="NutriGen™ Precision Health">
                    NutriGen™ Precision Health (Methylation/Metabolism)
                  </option>
                  <option value="OncoScreen™ Hereditary Risk">
                    OncoScreen™ Hereditary Risk (BRCA1/2 / Lynch)
                  </option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-gray-800 text-gray-300 hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-gray-950 font-bold shadow-md shadow-teal-500/20"
                >
                  Commit Sample to NGS Pipeline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
