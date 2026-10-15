"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Dna, Activity, Box, RefreshCw, Terminal, UserCheck, Menu, X, ShieldCheck } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Overview", icon: Dna },
    { href: "/genomics", label: "Skingene & DNA", icon: Activity },
    { href: "/kits", label: "Kit Telemetry", icon: Box },
    { href: "/wordpress-sync", label: "WordPress Plugin", icon: RefreshCw },
    { href: "/api-docs", label: "API Console", icon: Terminal },
    { href: "/recruiter", label: "Recruiter Dossier", icon: UserCheck },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-teal-900/30 bg-gray-950/80 backdrop-blur-md">
      {/* Top Telemetry Ticker */}
      <div className="w-full bg-teal-950/40 border-b border-teal-800/20 px-4 py-1 text-xs text-teal-300 flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-mono text-emerald-400 font-semibold">LAB TELEMETRY:</span>
          <span>Harvard Cambridge Lab (Online)</span>
          <span className="text-gray-600">|</span>
          <span>Stanford Palo Alto Core (Sequencing Q30 99.94%)</span>
          <span className="text-gray-600">|</span>
          <span>New Delhi Node (Ingesting)</span>
        </div>
        <div className="hidden md:flex items-center gap-3 text-gray-400 font-mono">
          <span className="flex items-center gap-1 text-teal-400">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
            CLIA / CAP / HIPAA Compliant
          </span>
          <span>WooCommerce Bridge v1.4.0</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-gray-950 shadow-lg shadow-teal-500/20 group-hover:scale-105 transition-transform">
            <Dna className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold tracking-tight text-white group-hover:text-teal-400 transition-colors">
                GENESIS
              </span>
              <span className="text-xs px-1.5 py-0.5 rounded font-mono font-semibold bg-teal-950 text-teal-400 border border-teal-800/40">
                HealthOS
              </span>
            </div>
            <p className="text-[10px] text-gray-400 tracking-wider uppercase font-mono">
              Genomic Intelligence
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 bg-gray-900/60 p-1.5 rounded-xl border border-gray-800/60">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? "bg-teal-500/10 text-teal-300 border border-teal-500/30 shadow-sm"
                    : "text-gray-300 hover:text-white hover:bg-gray-800/60"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-teal-400" : "text-gray-400"}`} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Quick CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/kits"
            className="flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-600 text-gray-950 hover:brightness-110 shadow-md shadow-teal-500/20 transition-all font-mono"
          >
            <Box className="w-3.5 h-3.5" />
            Track Sample
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-b border-gray-800 bg-gray-950 px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive
                    ? "bg-teal-500/15 text-teal-300 border border-teal-500/30"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                <Icon className="w-4 h-4 text-teal-400" />
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
