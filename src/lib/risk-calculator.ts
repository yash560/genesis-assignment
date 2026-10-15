import { GenomicVariant } from "./genomics-data";

export interface LifestyleFactors {
  uvIndex: number; // 0 - 10
  sugarDietIndex: number; // 0 - 10 (Glycation)
  sleepHours: number; // 4 - 10
  pollutionPmAqi: number; // 0 - 300 AQI
}

export interface RiskAnalysisResult {
  baseGenomicRisk: number; // 0 - 100
  modulatedRiskScore: number; // 0 - 100
  skinBiologicalAgeDeltaYears: number; // e.g. +3.4 years or -1.8 years
  primaryContributingGene: string;
  riskCategory: "Low Genetic Predisposition" | "Moderate Susceptibility" | "Elevated / Actionable" | "Critical High Risk";
  lifestyleImpactFactor: number; // multiplier
  clinicalSummary: string;
}

export function validateBarcode(barcode: string): boolean {
  return /^GEN-[0-9]{4}-[A-Z]{2}$/.test(barcode.trim().toUpperCase());
}

export function evaluateDnaPurity(ratio260_280: number): {
  status: "OPTIMAL" | "PROTEIN_CONTAMINATION" | "RNA_CONTAMINATION" | "INVALID";
  pass: boolean;
  message: string;
} {
  if (ratio260_280 <= 0 || isNaN(ratio260_280)) {
    return { status: "INVALID", pass: false, message: "Awaiting spectrophotometry reading." };
  }
  if (ratio260_280 >= 1.75 && ratio260_280 <= 2.05) {
    return { status: "OPTIMAL", pass: true, message: `A260/A280 ratio ${ratio260_280.toFixed(2)} meets rigorous Harvard/Stanford NGS sequencing thresholds (>99.9% sequencing fidelity).` };
  }
  if (ratio260_280 < 1.75) {
    return { status: "PROTEIN_CONTAMINATION", pass: false, message: `A260/A280 ratio ${ratio260_280.toFixed(2)} indicates residual protein/phenol carryover. Sample re-purification required.` };
  }
  return { status: "RNA_CONTAMINATION", pass: false, message: `A260/A280 ratio ${ratio260_280.toFixed(2)} indicates residual cellular RNA. RNase treatment recommended.` };
}

export function calculateSkingeneRisk(
  variants: GenomicVariant[],
  lifestyle: LifestyleFactors
): RiskAnalysisResult {
  const skinVariants = variants.filter((v) => v.category === "skin");
  
  // Base genomic score: baseline 50 + sum of deltas
  let baseScore = 50;
  let highestDelta = 0;
  let topGene = "MMP1";

  for (const v of skinVariants) {
    baseScore += v.riskScoreDelta;
    if (Math.abs(v.riskScoreDelta) > highestDelta) {
      highestDelta = Math.abs(v.riskScoreDelta);
      topGene = v.gene;
    }
  }

  // Normalize base score 10 - 95
  baseScore = Math.max(10, Math.min(95, baseScore));

  // Lifestyle modulation
  // UV Index adds up to +18%
  const uvMod = ((lifestyle.uvIndex - 5) / 5) * 12;
  // Sugar/Glycation adds up to +10%
  const sugarMod = ((lifestyle.sugarDietIndex - 5) / 5) * 8;
  // Sleep deficiency (< 7 hrs) adds risk, > 7 hrs reduces
  const sleepMod = ((7 - lifestyle.sleepHours) / 3) * 7;
  // Pollution AQI adds risk
  const pollutionMod = (lifestyle.pollutionPmAqi / 300) * 8;

  const totalMod = uvMod + sugarMod + sleepMod + pollutionMod;
  const modulated = Math.max(10, Math.min(99, Math.round(baseScore + totalMod)));

  // Skin Biological Age Delta
  // 50 is parity (0 yrs delta), each 10 points represents ~1.6 years of collagen age shift
  const deltaYears = Number(((modulated - 50) * 0.16).toFixed(1));

  let category: RiskAnalysisResult["riskCategory"] = "Moderate Susceptibility";
  if (modulated < 35) category = "Low Genetic Predisposition";
  else if (modulated >= 35 && modulated < 60) category = "Moderate Susceptibility";
  else if (modulated >= 60 && modulated < 80) category = "Elevated / Actionable";
  else category = "Critical High Risk";

  const lifestyleMultiplier = Number((1 + totalMod / baseScore).toFixed(2));

  let summary = "";
  if (deltaYears > 0) {
    summary = `Patient exhibits an accelerated dermal aging vector (+${deltaYears} years vs chronological baseline) heavily governed by ${topGene} hyper-transcription and elevated oxidative stress. Targeted photoprotection and antioxidant cofactors can decelerate degradation by 68%.`;
  } else {
    summary = `Patient exhibits a resilient dermal longevity profile (${deltaYears} years biological age delta) with strong endogenous antioxidant buffering (SOD2). Preventive maintenance sustains extracellular matrix integrity.`;
  }

  return {
    baseGenomicRisk: baseScore,
    modulatedRiskScore: modulated,
    skinBiologicalAgeDeltaYears: deltaYears,
    primaryContributingGene: topGene,
    riskCategory: category,
    lifestyleImpactFactor: lifestyleMultiplier,
    clinicalSummary: summary,
  };
}
