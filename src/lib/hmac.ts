import crypto from "crypto";

export const DEFAULT_WEBHOOK_SECRET = "genesis_sec_99a8b1c4d7e2f5";

/**
 * Generates an HMAC-SHA256 signature for outgoing WordPress/WooCommerce webhook payloads.
 */
export function generateWebhookSignature(payload: string, secret: string = DEFAULT_WEBHOOK_SECRET): string {
  return "sha256=" + crypto.createHmac("sha256", secret).update(payload).digest("hex");
}

/**
 * Deterministically verifies an incoming HMAC-SHA256 signature from WordPress.
 */
export function verifyWebhookSignature(payload: string, signature: string, secret: string = DEFAULT_WEBHOOK_SECRET): boolean {
  if (!signature) return false;
  const cleanSig = signature.startsWith("sha256=") ? signature : `sha256=${signature}`;
  const expected = generateWebhookSignature(payload, secret);
  try {
    return crypto.timingSafeEqual(Buffer.from(cleanSig), Buffer.from(expected));
  } catch {
    return false;
  }
}
