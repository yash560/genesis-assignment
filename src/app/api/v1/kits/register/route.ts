import { NextRequest, NextResponse } from "next/server";
import { validateBarcode } from "@/lib/risk-calculator";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { barcode, patientName, testType, sampleType } = body;

    if (!barcode || !validateBarcode(barcode)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid barcode format. Expected pattern: GEN-XXXX-XX (e.g. GEN-8421-SK)",
        },
        { status: 400 }
      );
    }

    if (!patientName || typeof patientName !== "string" || !patientName.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "patientName is mandatory.",
        },
        { status: 400 }
      );
    }

    const patientId = `PAT-${Math.floor(10000 + Math.random() * 90000)}`;

    return NextResponse.json(
      {
        success: true,
        message: `Sample kit ${barcode.toUpperCase()} successfully accessioned into Illumina NovaSeq queue.`,
        record: {
          barcode: barcode.toUpperCase(),
          patientId,
          patientName: patientName.trim(),
          testType: testType || "Skingene™ Dermatological Profile",
          sampleType: sampleType || "Saliva Buccal Swab",
          status: "sample_received",
          currentStage: 2,
          dnaConcentrationNgUl: 49.2,
          purityRatio260_280: 1.87,
          sequencerPlatform: "Illumina NovaSeq 6000",
          q30ScorePercent: 99.95,
          registeredAt: new Date().toISOString(),
          labNode: "Genesis South Asia Genomics Node, New Delhi",
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to parse JSON body" },
      { status: 400 }
    );
  }
}
