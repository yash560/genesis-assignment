import { NextRequest, NextResponse } from "next/server";
import { INITIAL_VARIANTS } from "@/lib/genomics-data";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  let result = INITIAL_VARIANTS;
  if (category && category !== "all") {
    result = result.filter((v) => v.category === category.toLowerCase());
  }

  return NextResponse.json(
    {
      success: true,
      count: result.length,
      categoryFilter: category || "all",
      timestamp: new Date().toISOString(),
      variants: result,
    },
    { status: 200 }
  );
}
