"use client";

import { useState } from "react";
import { Terminal, Play, Send, CheckCircle2, Clock, Globe, Shield, ArrowRight } from "lucide-react";

interface ApiEndpoint {
  id: string;
  method: "GET" | "POST";
  path: string;
  description: string;
  sampleBody?: string;
}

const ENDPOINTS: ApiEndpoint[] = [
  {
    id: "health",
    method: "GET",
    path: "/api/v1/health",
    description: "System health check, Node.js process memory metrics, and Harvard/Stanford lab connectivity status.",
  },
  {
    id: "kits-list",
    method: "GET",
    path: "/api/v1/kits",
    description: "Retrieve all accessioned saliva test kits and NGS sequencing pipeline stages.",
  },
  {
    id: "kits-register",
    method: "POST",
    path: "/api/v1/kits/register",
    description: "Register a new saliva barcode sample with patient demographic payload.",
    sampleBody: JSON.stringify(
      {
        barcode: "GEN-5542-SK",
        patientName: "Dr. Alok Verma",
        testType: "Skingene™ Dermatological Profile",
        sampleType: "Saliva Buccal Swab",
      },
      null,
      2
    ),
  },
  {
    id: "variants",
    method: "GET",
    path: "/api/v1/genomics/variants?category=skin",
    description: "Query curated molecular variants, rsIDs, and Harvard/Stanford validated evidence tiers.",
  },
  {
    id: "analyze",
    method: "POST",
    path: "/api/v1/genomics/analyze",
    description: "Calculate compound epigenetic risk and skin biological aging velocity delta from lifestyle cofactors.",
    sampleBody: JSON.stringify(
      {
        uvIndex: 8,
        sugarDietIndex: 7,
        sleepHours: 5,
        pollutionPmAqi: 180,
      },
      null,
      2
    ),
  },
  {
    id: "webhook",
    method: "POST",
    path: "/api/v1/wordpress/webhook",
    description: "Inbound WooCommerce order webhook endpoint with cryptographic HMAC-SHA256 signature verification.",
    sampleBody: JSON.stringify(
      {
        event: "woocommerce_order_created",
        timestamp: new Date().toISOString(),
        source: "https://wp.genesisgenomics.org",
        data: {
          order_id: 8599,
          customer_name: "Meera Nair",
          customer_email: "meera.nair@example.com",
          items: [{ name: "Skingene™ Dermal Longevity Profile", quantity: 1 }],
        },
      },
      null,
      2
    ),
  },
];

export default function ApiDocsPage() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint>(ENDPOINTS[0]);
  const [requestBody, setRequestBody] = useState<string>(selectedEndpoint.sampleBody || "");
  const [responseOutput, setResponseOutput] = useState<string>("");
  const [responseStatus, setResponseStatus] = useState<number | null>(null);
  const [responseLatency, setResponseLatency] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const selectEndpoint = (ep: ApiEndpoint) => {
    setSelectedEndpoint(ep);
    setRequestBody(ep.sampleBody || "");
    setResponseOutput("");
    setResponseStatus(null);
    setResponseLatency(null);
  };

  const executeRequest = async () => {
    setIsLoading(true);
    setResponseOutput("");
    setResponseStatus(null);
    setResponseLatency(null);

    const startTime = performance.now();
    try {
      const options: RequestInit = {
        method: selectedEndpoint.method,
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (selectedEndpoint.method === "POST" && requestBody) {
        options.body = requestBody;
        if (selectedEndpoint.id === "webhook") {
          // Provide mock signature for live tester
          options.headers = {
            ...options.headers,
            "X-Genesis-Signature": "sha256=genesis_test_simulated_sig",
            "X-Genesis-Event": "woocommerce_order_created",
          };
        }
      }

      const res = await fetch(selectedEndpoint.path, options);
      const data = await res.json();
      const endTime = performance.now();

      setResponseStatus(res.status);
      setResponseLatency(Number((endTime - startTime).toFixed(1)));
      setResponseOutput(JSON.stringify(data, null, 2));
    } catch (err: any) {
      setResponseOutput(JSON.stringify({ error: err.message }, null, 2));
      setResponseStatus(500);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/40 text-indigo-300 text-xs font-mono mb-2">
          <Terminal className="w-3.5 h-3.5 text-indigo-400" />
          <span>Interactive Developer Console</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          RESTful Microservices & Swagger API Playground
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-3xl">
          Execute live RESTful requests against Genesis HealthOS Node.js microservices. All endpoints implement defensive validation, deterministic status codes, and sub-15ms edge execution.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Endpoint List (Left: 4 Cols) */}
        <div className="lg:col-span-4 space-y-2 font-mono text-xs">
          <h3 className="text-gray-400 font-bold uppercase tracking-wider text-[11px] mb-3">
            Available Microservices (/api/v1)
          </h3>
          {ENDPOINTS.map((ep) => {
            const isSelected = selectedEndpoint.id === ep.id;
            return (
              <button
                key={ep.id}
                onClick={() => selectEndpoint(ep)}
                className={`w-full text-left p-3 rounded-xl border transition-all ${
                  isSelected
                    ? "border-teal-500 bg-teal-950/40 text-white shadow-md shadow-teal-500/10"
                    : "border-gray-800 bg-gray-900/40 text-gray-400 hover:text-white hover:bg-gray-800/60"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      ep.method === "GET"
                        ? "bg-teal-950 text-teal-400 border border-teal-800"
                        : "bg-indigo-950 text-indigo-400 border border-indigo-800"
                    }`}
                  >
                    {ep.method}
                  </span>
                  <span className="font-semibold text-white truncate">{ep.path}</span>
                </div>
                <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">
                  {ep.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Request / Response Panel (Right: 8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-2xl border border-gray-800 bg-gray-900/40 p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-800 gap-3">
              <div className="flex items-center gap-2.5 font-mono text-xs">
                <span
                  className={`px-2 py-0.5 rounded font-bold ${
                    selectedEndpoint.method === "GET"
                      ? "bg-teal-950 text-teal-400 border border-teal-800"
                      : "bg-indigo-950 text-indigo-400 border border-indigo-800"
                  }`}
                >
                  {selectedEndpoint.method}
                </span>
                <span className="text-white font-bold">{selectedEndpoint.path}</span>
              </div>

              <button
                onClick={executeRequest}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 text-gray-950 font-bold text-xs font-mono hover:brightness-110 shadow-md shadow-teal-500/20 transition-all disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                {isLoading ? "Executing..." : "Send Request"}
              </button>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed font-mono">
              {selectedEndpoint.description}
            </p>

            {/* Request Body Editor (for POST) */}
            {selectedEndpoint.method === "POST" && (
              <div className="space-y-1.5 font-mono text-xs">
                <label className="text-gray-400 text-[11px]">JSON Request Body:</label>
                <textarea
                  value={requestBody}
                  onChange={(e) => setRequestBody(e.target.value)}
                  rows={6}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl p-3 text-white font-mono text-xs focus:outline-none focus:border-teal-500 leading-relaxed"
                />
              </div>
            )}
          </div>

          {/* Response Console */}
          <div className="rounded-2xl border border-gray-800 bg-gray-950 p-6 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-gray-800 text-gray-400">
              <span className="uppercase tracking-wider text-[11px] flex items-center gap-2">
                <Terminal className="w-4 h-4 text-teal-400" />
                Response Output
              </span>
              {responseStatus !== null && (
                <div className="flex items-center gap-3">
                  <span className="text-gray-500 text-[11px]">Latency: {responseLatency}ms</span>
                  <span
                    className={`px-2 py-0.5 rounded font-bold border ${
                      responseStatus >= 200 && responseStatus < 300
                        ? "bg-emerald-950 text-emerald-400 border-emerald-800"
                        : "bg-rose-950 text-rose-400 border-rose-800"
                    }`}
                  >
                    HTTP {responseStatus}
                  </span>
                </div>
              )}
            </div>

            <pre className="text-gray-300 whitespace-pre-wrap leading-relaxed text-xs max-h-[360px] overflow-y-auto bg-gray-900/60 p-4 rounded-xl border border-gray-800/80">
              {responseOutput ||
                "// Response payload will appear here.\n// Click 'Send Request' above to test this endpoint live."}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
