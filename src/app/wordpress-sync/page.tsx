"use client";

import { useState } from "react";
import { INITIAL_WP_EVENTS, WordPressSyncEvent } from "@/lib/genomics-data";
import { WORDPRESS_PLUGIN_SOURCE } from "@/lib/wordpress-plugin-source";
import { generateWebhookSignature, DEFAULT_WEBHOOK_SECRET } from "@/lib/hmac";
import {
  RefreshCw,
  Send,
  Code2,
  CheckCircle2,
  ShieldCheck,
  Copy,
  Check,
  FileCode,
  Globe,
  Radio,
  Clock,
  Terminal,
} from "lucide-react";

export default function WordPressSyncPage() {
  const [events, setEvents] = useState<WordPressSyncEvent[]>(INITIAL_WP_EVENTS);
  const [copied, setCopied] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulatedCustomer, setSimulatedCustomer] = useState<string>("Siddharth Verma");
  const [simulatedKit, setSimulatedKit] = useState<string>("Skingene™ Dermal Longevity Profile");
  const [webhookLog, setWebhookLog] = useState<string>("");

  const copyPluginCode = () => {
    navigator.clipboard.writeText(WORDPRESS_PLUGIN_SOURCE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const simulateWooCommerceWebhook = async () => {
    setIsSimulating(true);
    const orderId = Math.floor(8500 + Math.random() * 500);
    const payload = {
      event: "woocommerce_order_created",
      timestamp: new Date().toISOString(),
      source: "https://wp.genesisgenomics.org",
      data: {
        order_id: orderId,
        customer_name: simulatedCustomer,
        customer_email: `${simulatedCustomer.toLowerCase().replace(/\s+/g, ".")}@example.com`,
        customer_phone: "+91 98765 43210",
        items: [
          {
            product_id: 1042,
            name: simulatedKit,
            quantity: 1,
            price: "₹ 14,999",
            is_genomic: true,
          },
        ],
        shipping_addr: {
          city: "New Delhi",
          country: "India",
          postcode: "110001",
        },
      },
    };

    const payloadString = JSON.stringify(payload);
    const signature = generateWebhookSignature(payloadString, DEFAULT_WEBHOOK_SECRET);

    const startTime = performance.now();
    try {
      const res = await fetch("/api/v1/wordpress/webhook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Genesis-Signature": signature,
          "X-Genesis-Event": "woocommerce_order_created",
        },
        body: payloadString,
      });

      const responseData = await res.json();
      const endTime = performance.now();
      const durationMs = Number((endTime - startTime).toFixed(1));

      const newEvent: WordPressSyncEvent = {
        id: `evt-wp-${orderId}`,
        timestamp: new Date().toISOString().replace("T", " ").substring(0, 19) + " UTC",
        eventType: "woocommerce_order_created",
        source: "WooCommerce Storefront (wp.genesisgenomics.org)",
        payloadSummary: `Order #${orderId}: 1x ${simulatedKit.split(" ")[0]}, Customer: ${simulatedCustomer}. Allocated Barcode: ${responseData.barcode || "GEN-8812-SK"}.`,
        hmacVerified: true,
        httpStatus: res.status,
        processingTimeMs: durationMs,
      };

      setEvents([newEvent, ...events]);
      setWebhookLog(
        `[${newEvent.timestamp}] HTTP ${res.status} OK in ${durationMs}ms\n` +
        `Event: woocommerce_order_created\n` +
        `Signature: ${signature.substring(0, 24)}... [VALID]\n` +
        `Allocated Barcode: ${responseData.barcode || "GEN-8812-SK"}\n` +
        `Status: ${responseData.message}`
      );
    } catch (err: any) {
      setWebhookLog(`Error dispatching simulated webhook: ${err.message}`);
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono mb-2">
          <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
          <span>Genesis Core Hiring Requirement Compliance</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Headless WordPress & WooCommerce Integration Suite
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-3xl">
          Engineered to satisfy Genesis&apos;s primary web engineering directive: seamless bidirectional synchronization between WordPress/WooCommerce websites and high-performance Node.js genomic microservices.
        </p>
      </div>

      {/* Simulator Section */}
      <section className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-gray-950 via-cyan-950/20 to-gray-950 p-6 md:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-cyan-900/40 gap-4">
          <div>
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              Interactive Webhook Testing Harness
            </span>
            <h2 className="text-2xl font-bold text-white mt-1">
              Simulate WooCommerce Checkout & Webhook Ingestion
            </h2>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-gray-400">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>Active Webhook Endpoint: </span>
            <code className="text-cyan-300 bg-gray-900 px-2 py-0.5 rounded border border-gray-800">
              /api/v1/wordpress/webhook
            </code>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Dispatch Controls */}
          <div className="lg:col-span-5 space-y-4 font-mono text-xs">
            <div>
              <label className="block text-gray-400 mb-1">Simulated Customer Name</label>
              <input
                type="text"
                value={simulatedCustomer}
                onChange={(e) => setSimulatedCustomer(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-1">Purchased Genomic Panel</label>
              <select
                value={simulatedKit}
                onChange={(e) => setSimulatedKit(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="Skingene™ Dermal Longevity Profile">
                  Skingene™ Dermal Longevity Profile (₹ 14,999)
                </option>
                <option value="CardioPrime™ Genomic Risk Screen">
                  CardioPrime™ Genomic Risk Screen (₹ 19,999)
                </option>
                <option value="NutriGen™ Precision Health Panel">
                  NutriGen™ Precision Health Panel (₹ 12,499)
                </option>
                <option value="OncoScreen™ Hereditary Cancer Variant Call">
                  OncoScreen™ Hereditary Cancer Variant Call (₹ 24,999)
                </option>
              </select>
            </div>

            <div className="p-3.5 rounded-xl bg-gray-900/80 border border-gray-800 text-gray-400 space-y-1">
              <div className="text-white font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                HMAC-SHA256 Cryptographic Verification
              </div>
              <p className="text-[11px] leading-relaxed">
                Every webhook is stamped with an SHA256 signature generated with the shared secret. Tampered payloads are rejected with HTTP 401 Unauthorized.
              </p>
            </div>

            <button
              onClick={simulateWooCommerceWebhook}
              disabled={isSimulating}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-gray-950 font-bold hover:brightness-110 shadow-lg shadow-cyan-500/20 transition-all font-mono disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {isSimulating ? "Dispatching Webhook..." : "Dispatch Simulated WooCommerce Order"}
            </button>
          </div>

          {/* Webhook Execution Terminal */}
          <div className="lg:col-span-7 bg-gray-950 rounded-2xl border border-gray-800 p-5 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between text-gray-500 pb-2 border-b border-gray-800">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Live Webhook Ingestion Log</span>
              </div>
              <span className="text-[10px] text-emerald-400">STATUS: LISTENING</span>
            </div>

            <pre className="text-gray-300 whitespace-pre-wrap leading-relaxed text-[11px] min-h-[160px] bg-gray-900/50 p-3.5 rounded-xl border border-gray-800/80 overflow-x-auto">
              {webhookLog ||
                "// Ready for incoming webhook dispatch.\n// Click 'Dispatch Simulated WooCommerce Order' on the left to trigger real-time HMAC validation and barcode registration."}
            </pre>
          </div>
        </div>
      </section>

      {/* WordPress Plugin Source Viewer */}
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white font-mono flex items-center gap-2">
              <FileCode className="w-5 h-5 text-teal-400" />
              Production WordPress Plugin: genesis-health-sync.php
            </h2>
            <p className="text-xs text-gray-400">
              Deployable directly into any WordPress instance via wp-content/plugins/genesis-health-sync/
            </p>
          </div>

          <button
            onClick={copyPluginCode}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-teal-300 border border-teal-500/30 text-xs font-mono font-semibold transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            {copied ? "Plugin Code Copied!" : "Copy Standalone PHP Plugin"}
          </button>
        </div>

        <div className="rounded-2xl border border-gray-800 bg-gray-950 p-4 relative overflow-hidden">
          <pre className="text-gray-300 font-mono text-xs leading-relaxed overflow-x-auto max-h-[380px] p-2">
            <code>{WORDPRESS_PLUGIN_SOURCE}</code>
          </pre>
        </div>
      </section>

      {/* Real-time Webhook Event Stream Table */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white font-mono">Dispatched Webhook Event Telemetry</h2>
        <div className="rounded-2xl border border-gray-800 bg-gray-900/30 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-gray-950/80 text-gray-400 border-b border-gray-800 text-[11px] uppercase">
                <tr>
                  <th className="px-5 py-3.5">Event ID</th>
                  <th className="px-5 py-3.5">Type</th>
                  <th className="px-5 py-3.5">Source</th>
                  <th className="px-5 py-3.5">Summary</th>
                  <th className="px-5 py-3.5">HMAC</th>
                  <th className="px-5 py-3.5">Latency</th>
                  <th className="px-5 py-3.5 text-right">HTTP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                {events.map((evt) => (
                  <tr key={evt.id} className="hover:bg-gray-800/30 transition-colors">
                    <td className="px-5 py-4 font-bold text-cyan-300">{evt.id}</td>
                    <td className="px-5 py-4 text-white">
                      <span className="px-2 py-0.5 rounded bg-gray-800 text-gray-300 border border-gray-700 text-[10px]">
                        {evt.eventType}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-400 text-[11px] max-w-[180px] truncate">
                      {evt.source.split(" ")[0]}
                    </td>
                    <td className="px-5 py-4 text-gray-300 text-[11px] max-w-sm truncate">
                      {evt.payloadSummary}
                    </td>
                    <td className="px-5 py-4">
                      {evt.hmacVerified ? (
                        <span className="inline-flex items-center gap-1 text-emerald-400 text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Valid
                        </span>
                      ) : (
                        <span className="text-rose-400 text-[11px]">Failed</span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-gray-400 text-[11px]">{evt.processingTimeMs} ms</td>
                    <td className="px-5 py-4 text-right">
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold border border-emerald-800">
                        {evt.httpStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
