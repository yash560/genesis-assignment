import { NextResponse } from "next/server";
import { INITIAL_KITS } from "@/lib/genomics-data";

export async function GET() {
  return NextResponse.json(
    {
      success: true,
      count: INITIAL_KITS.length,
      timestamp: new Date().toISOString(),
      kits: INITIAL_KITS,
    },
    { status: 200 }
  );
}
