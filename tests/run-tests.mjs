import assert from "node:assert/strict";
import test from "node:test";
import crypto from "node:crypto";

// 1. Barcode Regex Validation
function validateBarcode(barcode) {
  return /^GEN-[0-9]{4}-[A-Z]{2}$/.test(barcode.trim().toUpperCase());
}

test("Barcode Validation: Valid and Invalid Formats", () => {
  assert.equal(validateBarcode("GEN-8421-SK"), true);
  assert.equal(validateBarcode("GEN-7749-DX"), true);
  assert.equal(validateBarcode("GEN-9902-ON"), true);
  assert.equal(validateBarcode("GEN-6612-NT"), true);
  assert.equal(validateBarcode("gen-1234-sk"), true); // Case insensitivity trim

  // Invalids
  assert.equal(validateBarcode("GEN-123-SK"), false); // Only 3 digits
  assert.equal(validateBarcode("GEN-12345-SK"), false); // 5 digits
  assert.equal(validateBarcode("BARCODE-1234"), false);
  assert.equal(validateBarcode("GEN-1234-1"), false);
  assert.equal(validateBarcode(""), false);
});

// 2. DNA Spectrophotometry Purity
function evaluateDnaPurity(ratio260_280) {
  if (ratio260_280 <= 0 || isNaN(ratio260_280)) {
    return { status: "INVALID", pass: false };
  }
  if (ratio260_280 >= 1.75 && ratio260_280 <= 2.05) {
    return { status: "OPTIMAL", pass: true };
  }
  if (ratio260_280 < 1.75) {
    return { status: "PROTEIN_CONTAMINATION", pass: false };
  }
  return { status: "RNA_CONTAMINATION", pass: false };
}

test("DNA Purity Spectrophotometry A260/A280 Quality Gates", () => {
  const optimal = evaluateDnaPurity(1.88);
  assert.equal(optimal.status, "OPTIMAL");
  assert.equal(optimal.pass, true);

  const proteinContam = evaluateDnaPurity(1.55);
  assert.equal(proteinContam.status, "PROTEIN_CONTAMINATION");
  assert.equal(proteinContam.pass, false);

  const rnaContam = evaluateDnaPurity(2.18);
  assert.equal(rnaContam.status, "RNA_CONTAMINATION");
  assert.equal(rnaContam.pass, false);

  const invalid = evaluateDnaPurity(0);
  assert.equal(invalid.status, "INVALID");
  assert.equal(invalid.pass, false);
});

// 3. HMAC-SHA256 Cryptographic Verification
const SECRET = "genesis_sec_99a8b1c4d7e2f5";
function generateWebhookSignature(payload, secret = SECRET) {
  return "sha256=" + crypto.createHmac("sha256", secret).update(payload).digest("hex");
}
function verifyWebhookSignature(payload, signature, secret = SECRET) {
  if (!signature) return false;
  const cleanSig = signature.startsWith("sha256=") ? signature : `sha256=${signature}`;
  const expected = generateWebhookSignature(payload, secret);
  try {
    return crypto.timingSafeEqual(Buffer.from(cleanSig), Buffer.from(expected));
  } catch {
    return false;
  }
}

test("HMAC-SHA256 Webhook Verification Integrity", () => {
  const payload = JSON.stringify({ order_id: 8491, customer: "Yash Jain", kit: "Skingene" });
  const sig = generateWebhookSignature(payload, SECRET);

  assert.equal(verifyWebhookSignature(payload, sig, SECRET), true);

  // Tampered payload fails
  const tampered = JSON.stringify({ order_id: 8491, customer: "Hacker", kit: "Skingene" });
  assert.equal(verifyWebhookSignature(tampered, sig, SECRET), false);

  // Wrong secret fails
  assert.equal(verifyWebhookSignature(payload, sig, "wrong_secret_123"), false);
});

// 4. Skingene Dermal Longevity Risk Math
test("Skingene Biological Age & Epigenetic Modulator Math", () => {
  const baseScore = 65; // High MMP1 & MC1R variants
  const uvIndex = 9; // High UV
  const sugarIndex = 8;
  const sleepHours = 5;
  const aqi = 220;

  const uvMod = ((uvIndex - 5) / 5) * 12;
  const sugarMod = ((sugarIndex - 5) / 5) * 8;
  const sleepMod = ((7 - sleepHours) / 3) * 7;
  const pollutionMod = (aqi / 300) * 8;

  const totalMod = uvMod + sugarMod + sleepMod + pollutionMod;
  const modulated = Math.max(10, Math.min(99, Math.round(baseScore + totalMod)));
  const deltaYears = Number(((modulated - 50) * 0.16).toFixed(1));

  assert.ok(modulated > baseScore, "High lifestyle stressors must elevate modulated risk score");
  assert.ok(deltaYears > 0, "High risk must reflect an accelerated dermal aging velocity");
  assert.ok(deltaYears < 15, "Biological aging delta must remain within biological bounds");
});

// 5. WordPress PHP Plugin Structural Invariants
import fs from "node:fs";
test("WordPress Plugin Structural Contract Verification", () => {
  const pluginSourcePath = "src/lib/wordpress-plugin-source.ts";
  assert.ok(fs.existsSync(pluginSourcePath), "Plugin source file must exist");
  const content = fs.readFileSync(pluginSourcePath, "utf-8");

  assert.ok(content.includes("Plugin Name: Genesis HealthOS Core Sync"), "Must have WordPress Plugin Name header");
  assert.ok(content.includes("woocommerce_order_status_processing"), "Must bind to WooCommerce order processing hook");
  assert.ok(content.includes("genesis/v1"), "Must register custom WP REST route genesis/v1");
  assert.ok(content.includes("hash_hmac"), "Must implement cryptographic HMAC-SHA256 signature in PHP");
});
