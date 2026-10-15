export interface GenomicVariant {
  id: string;
  gene: string;
  rsId: string;
  chromosome: string;
  position: number;
  category: "skin" | "cardio" | "nutrition" | "oncology";
  testName: string;
  riskAllele: string;
  nonRiskAllele: string;
  patientGenotype: string;
  clinicalSignificance: "Actionable High Risk" | "Moderate Risk" | "Typical / Neutral" | "Protective";
  riskScoreDelta: number;
  trait: string;
  biologicalMechanism: string;
  actionableRecommendation: string;
  evidenceLevel: "Tier 1 (Harvard/Stanford Validated)" | "Tier 2 (ClinVar Established)" | "Tier 3 (GWAS Significant)";
}

export interface TestKitRecord {
  barcode: string;
  patientId: string;
  patientName: string;
  testType: "Skingene™ Dermatological Profile" | "CardioPrime™ Genomic Panel" | "NutriGen™ Precision Health" | "OncoScreen™ Hereditary Risk";
  orderDate: string;
  sampleType: "Saliva Buccal Swab" | "Blood Spot Micro-Collection";
  status: "kit_shipped" | "sample_received" | "dna_extracted" | "sequencing_in_progress" | "bioinformatics_qc" | "report_ready";
  currentStage: number; // 1 to 6
  dnaConcentrationNgUl: number; // e.g. 48.5 ng/uL
  purityRatio260_280: number; // ideal 1.8 - 2.0
  sequencerPlatform: "Illumina NovaSeq 6000" | "Oxford Nanopore PromethION";
  q30ScorePercent: number; // e.g. 99.8%
  estimatedCompletion: string;
  labLocation: "Genesis Harvard Innovation Lab, Cambridge MA" | "Genesis Stanford Core Genomics Hub, Palo Alto CA" | "Genesis South Asia Genomics Node, New Delhi";
}

export interface WordPressSyncEvent {
  id: string;
  timestamp: string;
  eventType: "woocommerce_order_created" | "wp_user_synced" | "lab_report_dispatched" | "sample_status_updated";
  source: "WooCommerce Storefront (wp.genesisgenomics.org)" | "Genesis HealthOS Cloud Engine";
  payloadSummary: string;
  hmacVerified: boolean;
  httpStatus: number;
  processingTimeMs: number;
}

export const INITIAL_VARIANTS: GenomicVariant[] = [
  // Skingene (Dermatological Genomics)
  {
    id: "var-mmp1",
    gene: "MMP1",
    rsId: "rs1799750",
    chromosome: "Chr 11",
    position: 102760814,
    category: "skin",
    testName: "Skingene™ Dermatological Profile",
    riskAllele: "2G",
    nonRiskAllele: "1G",
    patientGenotype: "2G/2G (Homozygous Risk)",
    clinicalSignificance: "Actionable High Risk",
    riskScoreDelta: 28,
    trait: "Accelerated Collagen Breakdown & Photoaging",
    biologicalMechanism: "Promoter polymorphism enhances Matrix Metalloproteinase-1 transcription, causing 3.4x faster extracellular collagen matrix degradation upon ultraviolet exposure.",
    actionableRecommendation: "Daily broad-spectrum SPF 50+ mineral sunscreen (Zinc Oxide), high-potency topical L-Ascorbic Acid (15%) + Ferulic Acid serum, and prescription micro-encapsulated Retinoid therapy.",
    evidenceLevel: "Tier 1 (Harvard/Stanford Validated)",
  },
  {
    id: "var-eln",
    gene: "ELN",
    rsId: "rs2071307",
    chromosome: "Chr 7",
    position: 73442410,
    category: "skin",
    testName: "Skingene™ Dermatological Profile",
    riskAllele: "A",
    nonRiskAllele: "G",
    patientGenotype: "G/A (Heterozygous)",
    clinicalSignificance: "Moderate Risk",
    riskScoreDelta: 16,
    trait: "Reduced Dermal Elasticity & Early Sagging",
    biologicalMechanism: "Elastin structural polymorphism alters tropoelastin cross-linking in the reticular dermis, predisposing to premature fine line formulation.",
    actionableRecommendation: "Copper tripeptide-1 topical complex, oral hydrolyzed marine collagen peptides (10g/day with Vitamin C cofactor), and microcurrent stimulation therapy.",
    evidenceLevel: "Tier 2 (ClinVar Established)",
  },
  {
    id: "var-mc1r",
    gene: "MC1R",
    rsId: "rs1805007",
    chromosome: "Chr 16",
    position: 89986117,
    category: "skin",
    testName: "Skingene™ Dermatological Profile",
    riskAllele: "T",
    nonRiskAllele: "C",
    patientGenotype: "C/T (Heterozygous Variant)",
    clinicalSignificance: "Actionable High Risk",
    riskScoreDelta: 24,
    trait: "Hyper-Pigmentation & UV Erythema Sensitivity",
    biologicalMechanism: "Melanocortin-1 receptor missense mutation shifts eumelanin (photoprotective) synthesis toward pheomelanin (pro-oxidant), multiplying solar freckling and melasma risk.",
    actionableRecommendation: "Topical 5% Niacinamide + Tranexamic Acid (3%), oral Polypodium leucotomos extract (Heliocare) before sun exposure, and avoidance of aggressive laser resurfacing.",
    evidenceLevel: "Tier 1 (Harvard/Stanford Validated)",
  },
  {
    id: "var-sod2",
    gene: "SOD2",
    rsId: "rs4880",
    chromosome: "Chr 6",
    position: 160114005,
    category: "skin",
    testName: "Skingene™ Dermatological Profile",
    riskAllele: "C",
    nonRiskAllele: "T",
    patientGenotype: "T/T (Wild Type Protective)",
    clinicalSignificance: "Protective",
    riskScoreDelta: -12,
    trait: "Endogenous Mitochondrial Free-Radical Clearance",
    biologicalMechanism: "Superoxide Dismutase 2 Ala16Val polymorphism maintains optimal mitochondrial localization, providing robust cellular antioxidant buffering against urban particulate pollution.",
    actionableRecommendation: "Maintain lifestyle antioxidant intake; current cellular defense mechanisms against atmospheric pollutants are genetically optimal.",
    evidenceLevel: "Tier 1 (Harvard/Stanford Validated)",
  },

  // CardioPrime
  {
    id: "var-apoe",
    gene: "APOE",
    rsId: "rs429358",
    chromosome: "Chr 19",
    position: 45411941,
    category: "cardio",
    testName: "CardioPrime™ Genomic Panel",
    riskAllele: "C",
    nonRiskAllele: "T",
    patientGenotype: "ε3/ε4 (Single Risk Copy)",
    clinicalSignificance: "Actionable High Risk",
    riskScoreDelta: 32,
    trait: "Elevated LDL Atherogenic Particle Retention & ApoB Risk",
    biologicalMechanism: "Apolipoprotein E4 isoform impairs hepatic remnant clearance and alters microglial lipid transport, conferring a 3.2x relative hazard for coronary plaque progression.",
    actionableRecommendation: "Maintain ApoB target < 60 mg/dL, adopt Mediterranean low-saturated-fat dietary protocol (< 15g saturated fat/day), and monitor coronary artery calcium (CAC) scan at age 35.",
    evidenceLevel: "Tier 1 (Harvard/Stanford Validated)",
  },
  {
    id: "var-f5",
    gene: "F5",
    rsId: "rs6025",
    chromosome: "Chr 1",
    position: 169519049,
    category: "cardio",
    testName: "CardioPrime™ Genomic Panel",
    riskAllele: "A",
    nonRiskAllele: "G",
    patientGenotype: "G/G (Homozygous Normal)",
    clinicalSignificance: "Typical / Neutral",
    riskScoreDelta: 0,
    trait: "Factor V Leiden Thrombophilia Screen",
    biologicalMechanism: "Absence of the Arg506Gln mutation; normal protein C cleavage inactivation kinetics for circulating activated Factor V.",
    actionableRecommendation: "Standard baseline risk for deep venous thrombosis (DVT) and pulmonary embolism. No pharmacologic prophylaxis indicated.",
    evidenceLevel: "Tier 1 (Harvard/Stanford Validated)",
  },

  // NutriGen & Pharmacogenomics
  {
    id: "var-mthfr",
    gene: "MTHFR",
    rsId: "rs1801133",
    chromosome: "Chr 1",
    position: 11856378,
    category: "nutrition",
    testName: "NutriGen™ Precision Health",
    riskAllele: "T",
    nonRiskAllele: "C",
    patientGenotype: "C/T (Heterozygous C677T)",
    clinicalSignificance: "Moderate Risk",
    riskScoreDelta: 18,
    trait: "Impaired Homocysteine Remethylation & Folate Metabolism",
    biologicalMechanism: "Thermolabile methylenetetrahydrofolate reductase enzyme with ~65% residual catalytic efficiency, mildly slowing homocysteine-to-methionine conversion.",
    actionableRecommendation: "Supplement with bioactive L-Methylfolate (5-MTHF, 800mcg) and Methylcobalamin (B12) rather than synthetic unmethylated folic acid.",
    evidenceLevel: "Tier 1 (Harvard/Stanford Validated)",
  },
  {
    id: "var-cyp1a2",
    gene: "CYP1A2",
    rsId: "rs762551",
    chromosome: "Chr 15",
    position: 75042617,
    category: "nutrition",
    testName: "NutriGen™ Precision Health",
    riskAllele: "C",
    nonRiskAllele: "A",
    patientGenotype: "A/A (Ultra-Rapid Metabolizer)",
    clinicalSignificance: "Protective",
    riskScoreDelta: -8,
    trait: "Rapid Hepatic Caffeine & Polyphenol Clearance",
    biologicalMechanism: "High inducible CYP1A2 monooxygenase transcription; clears caffeine half-life in < 3.2 hours without nocturnal sleep disruption or cardiac autonomic palpitations.",
    actionableRecommendation: "Safe for moderate to high coffee consumption (up to 400mg caffeine/day); cardioprotective polyphenols are metabolized efficiently.",
    evidenceLevel: "Tier 2 (ClinVar Established)",
  },

  // OncoScreen
  {
    id: "var-brca1",
    gene: "BRCA1",
    rsId: "rs80357906",
    chromosome: "Chr 17",
    position: 41276045,
    category: "oncology",
    testName: "OncoScreen™ Hereditary Risk",
    riskAllele: "del",
    nonRiskAllele: "wt",
    patientGenotype: "Negative (Wild Type / No Deleterious Mutation)",
    clinicalSignificance: "Typical / Neutral",
    riskScoreDelta: 0,
    trait: "Homologous Recombination DNA Repair Competency",
    biologicalMechanism: "Normal nuclear BRCA1 zinc-finger and BRCT domains; intact double-strand DNA break homologous recombination repair pathway.",
    actionableRecommendation: "Adhere to standard age-appropriate population screening guidelines. No early high-resolution surveillance indicated.",
    evidenceLevel: "Tier 1 (Harvard/Stanford Validated)",
  },
];

export const INITIAL_KITS: TestKitRecord[] = [
  {
    barcode: "GEN-8421-SK",
    patientId: "PAT-00918",
    patientName: "Dr. Ananya Sharma",
    testType: "Skingene™ Dermatological Profile",
    orderDate: "2026-10-14 09:12 UTC",
    sampleType: "Saliva Buccal Swab",
    status: "report_ready",
    currentStage: 6,
    dnaConcentrationNgUl: 52.4,
    purityRatio260_280: 1.88,
    sequencerPlatform: "Illumina NovaSeq 6000",
    q30ScorePercent: 99.94,
    estimatedCompletion: "Completed (Report Published)",
    labLocation: "Genesis South Asia Genomics Node, New Delhi",
  },
  {
    barcode: "GEN-7749-DX",
    patientId: "PAT-00922",
    patientName: "Kavita Singhal",
    testType: "CardioPrime™ Genomic Panel",
    orderDate: "2026-10-14 14:30 UTC",
    sampleType: "Blood Spot Micro-Collection",
    status: "sequencing_in_progress",
    currentStage: 4,
    dnaConcentrationNgUl: 68.1,
    purityRatio260_280: 1.91,
    sequencerPlatform: "Illumina NovaSeq 6000",
    q30ScorePercent: 99.88,
    estimatedCompletion: "Tomorrow, 16:00 UTC",
    labLocation: "Genesis Harvard Innovation Lab, Cambridge MA",
  },
  {
    barcode: "GEN-9902-ON",
    patientId: "PAT-00935",
    patientName: "Vikram Malhotra",
    testType: "OncoScreen™ Hereditary Risk",
    orderDate: "2026-10-15 01:10 UTC",
    sampleType: "Saliva Buccal Swab",
    status: "sample_received",
    currentStage: 2,
    dnaConcentrationNgUl: 41.2,
    purityRatio260_280: 1.84,
    sequencerPlatform: "Illumina NovaSeq 6000",
    q30ScorePercent: 99.91,
    estimatedCompletion: "In 3 Days",
    labLocation: "Genesis Stanford Core Genomics Hub, Palo Alto CA",
  },
  {
    barcode: "GEN-6612-NT",
    patientId: "PAT-00941",
    patientName: "Rohit Bansal",
    testType: "NutriGen™ Precision Health",
    orderDate: "2026-10-15 02:45 UTC",
    sampleType: "Saliva Buccal Swab",
    status: "kit_shipped",
    currentStage: 1,
    dnaConcentrationNgUl: 0.0,
    purityRatio260_280: 0.0,
    sequencerPlatform: "Oxford Nanopore PromethION",
    q30ScorePercent: 0.0,
    estimatedCompletion: "Awaiting Swab Return",
    labLocation: "Genesis South Asia Genomics Node, New Delhi",
  },
];

export const INITIAL_WP_EVENTS: WordPressSyncEvent[] = [
  {
    id: "evt-wp-9912",
    timestamp: "2026-10-15 02:45:12 UTC",
    eventType: "woocommerce_order_created",
    source: "WooCommerce Storefront (wp.genesisgenomics.org)",
    payloadSummary: "Order #8491: 1x NutriGen™ Kit, Customer: Rohit Bansal (rohit.b@outlook.com). Auto-allocated Barcode GEN-6612-NT.",
    hmacVerified: true,
    httpStatus: 200,
    processingTimeMs: 8.4,
  },
  {
    id: "evt-wp-9910",
    timestamp: "2026-10-15 01:10:44 UTC",
    eventType: "woocommerce_order_created",
    source: "WooCommerce Storefront (wp.genesisgenomics.org)",
    payloadSummary: "Order #8489: 1x OncoScreen™ Kit, Customer: Vikram Malhotra. Barcode GEN-9902-ON assigned & courier dispatched.",
    hmacVerified: true,
    httpStatus: 200,
    processingTimeMs: 9.1,
  },
  {
    id: "evt-wp-9908",
    timestamp: "2026-10-14 18:22:05 UTC",
    eventType: "lab_report_dispatched",
    source: "Genesis HealthOS Cloud Engine",
    payloadSummary: "Webhook push to WordPress REST API: Synchronized clinical PDF for Barcode GEN-8421-SK to patient account dashboard.",
    hmacVerified: true,
    httpStatus: 200,
    processingTimeMs: 14.2,
  },
  {
    id: "evt-wp-9901",
    timestamp: "2026-10-14 09:12:00 UTC",
    eventType: "wp_user_synced",
    source: "WooCommerce Storefront (wp.genesisgenomics.org)",
    payloadSummary: "WordPress User ID #1204 (Ananya Sharma) linked to Genesis HealthOS Patient UUID pat-00918 with encrypted HIPAA consent.",
    hmacVerified: true,
    httpStatus: 200,
    processingTimeMs: 6.7,
  },
];
