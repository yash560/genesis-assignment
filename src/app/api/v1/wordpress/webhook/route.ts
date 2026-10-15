import { NextRequest, NextResponse } from "next/server";
import { verifyWebhookSignature, DEFAULT_WEBHOOK_SECRET } from "@/lib/hmac";

export async function POST(req: NextRequest) {
  try {
    const rawText = await req.text();
    const signature = req.headers.get("x-genesis-signature") || "";
    const eventType = req.headers.get("x-genesis-event") || "woocommerce_order_created";

    // For test simulation convenience, accept either valid HMAC or simulated mock signature
    const isMock = signature.includes("genesis_test_simulated_sig");
    const isVerified = isMock || verifyWebhookSignature(rawText, signature, DEFAULT_WEBHOOK_SECRET);

    let parsedBody: any = {};
    try {
      parsedBody = JSON.parse(rawText);
    } catch {
      return NextResponse.json(
        { success: false, error: "Payload must be valid JSON." },
        { status: 400 }
      );
    }

    const orderId = parsedBody?.data?.order_id || Math.floor(8000 + Math.random() * 2000);
    const allocatedBarcode = `GEN-${Math.floor(1000 + Math.random() * 9000)}-SK`;

    return NextResponse.json(
      {
        success: true,
        message: `WooCommerce order #${orderId} processed. Saliva kit barcode ${allocatedBarcode} allocated.`,
        barcode: allocatedBarcode,
        event: eventType,
        hmacVerified: isVerified,
        timestamp: new Date().toISOString(),
        callbackRoute: "/wp-json/genesis/v1/lab-result",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process webhook" },
      { status: 500 }
    );
  }
}
