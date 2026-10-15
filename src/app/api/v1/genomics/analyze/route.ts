import { NextRequest, NextResponse } from "next/server";
import { INITIAL_VARIANTS } from "@/lib/genomics-data";
import { calculateSkingeneRisk, LifestyleFactors } from "@/lib/risk-calculator";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const lifestyle: LifestyleFactors = {
      uvIndex: Number(body.uvIndex ?? 7),
      sugarDietIndex: Number(body.sugarDietIndex ?? 6),
      sleepHours: Number(body.sleepHours ?? 6),
      pollutionPmAqi: Number(body.pollutionPmAqi ?? 140),
    };

    const assessment = calculateSkingeneRisk(INITIAL_VARIANTS, lifestyle);

    return NextResponse.json(
      {
        success: true,
        lifestyleInputs: lifestyle,
        assessment,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Invalid JSON payload" },
      { status: 400 }
    );
  }
}
