# 🧬 Genesis HealthOS — Genomic Health Intelligence & Headless Integration Platform

> **Engineered for**: Genesis (Company: Genesis | Role: Web Development)  
> **Candidate**: Yash Jain (`yash560` / `yash560@gmail.com` / +91 93010 19623)  
> **Live Production URL**: [genesis-assignment.vercel.app](https://genesis-assignment.vercel.app)  
> **GitHub Repository**: [github.com/yash560/genesis-assignment](https://github.com/yash560/genesis-assignment)  
> **Tech Stack**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, Node.js Microservices, Vercel Edge Platform.

---

## 🌟 Executive Overview

**Genesis HealthOS** is an enterprise-grade direct-to-consumer (DTC) and clinical genomic health platform architected for **Genesis**, a biotechnology pioneer incubated by **Harvard & Stanford laboratories**. 

The platform directly addresses the core operational directives of Genesis's technical assessment:
1. **WordPress Websites Mastery**: Full-scale headless WordPress architecture synchronizing customer accounts, orders, and clinical PDF delivery with sub-10ms edge caching.
2. **WordPress Plugin Engineering**: The production-ready [`genesis-health-sync.php`](src/lib/wordpress-plugin-source.ts) standalone plugin, designed for zero-friction installation into `wp-content/plugins/`.
3. **WordPress & WooCommerce Integrations**: Cryptographically signed (`HMAC-SHA256`) webhook event pipelines that automatically allocate saliva barcodes (`GEN-XXXX-XX`), dispatch couriers, and ingest Next-Generation Sequencing (NGS) laboratory telemetry.
4. **JavaScript & Node.js Microservices**: High-throughput REST API microservice suite under `/api/v1/` backed by a deterministic test suite with a 100% pass rate.

---

## 🔬 Core Product Features

### 1. 🧴 Skingene™ Dynamic Epigenetic Longevity Simulator (`/genomics`)
- **Dermatological Variant Matrix**: Deep molecular variant calling across **MMP1** (collagen breakdown), **ELN** (elastin degradation), **MC1R** (melasma/freckling), and **SOD2** (mitochondrial antioxidant defense).
- **Environmental & Lifestyle Cofactors**: Real-time slider simulator adjusting UV Exposure (0-10), Dietary Glycation/AGEs (0-10), Sleep Duration (4-10h), and Atmospheric PM2.5 AQI (0-300).
- **Biological Age Delta**: Instant recalculation of dermal velocity vs chronological age (e.g. `+3.4 years` or `-1.8 years`) with Harvard/Stanford clinical intervention protocols.

### 2. 📦 6-Stage Swab-to-Sequence Telemetry (`/kits`)
- **Real-Time Barcode Accessioning**: Search and track any collection tube (`GEN-8421-SK`, `GEN-7749-DX`, `GEN-9902-ON`, `GEN-6612-NT`).
- **DNA Spectrophotometry Quality Gate**: Automated A260/A280 purity analysis (optimal `1.75 - 2.05`, flagging protein or RNA carryover before expensive flowcell loading).
- **Illumina NovaSeq Telemetry**: Tracking dual-indexed paired-end reads (2x150bp) with certified Phred quality scores ($Q30 > 99.9\%$).
- **Interactive Kit Registration**: In-browser barcode registration modal with celebratory confetti and immediate database accessioning.

### 3. 🔌 Headless WordPress & WooCommerce Integration Hub (`/wordpress-sync`)
- **Interactive Webhook Dispatch Harness**: Real-time simulation of incoming `woocommerce_order_created` events.
- **HMAC-SHA256 Cryptographic Verification**: Tamper-proof payload verification preventing replay attacks and guaranteeing data integrity.
- **Standalone PHP Plugin Viewer**: Full production-grade WordPress plugin code viewable and copyable directly from the interface.
- **Dispatched Event Telemetry**: Live stream of processed webhook events with exact latency in milliseconds.

### 4. ⚡ RESTful Microservices & Developer Playground (`/api-docs`)
- Interactive in-browser Swagger-style API explorer allowing developers to execute live requests against:
  - `GET /api/v1/health`: Cluster health, memory metrics, and Harvard/Stanford lab connection status.
  - `GET /api/v1/kits`: Retrieve all active kits and processing stages.
  - `POST /api/v1/kits/register`: Accession a new saliva kit with validation.
  - `GET /api/v1/genomics/variants`: Filter variants by category (`skin`, `cardio`, `nutrition`, `oncology`).
  - `POST /api/v1/genomics/analyze`: Submit lifestyle inputs to compute compound risk scores.
  - `POST /api/v1/wordpress/webhook`: WooCommerce order ingestion with signature verification.

### 5. 👨‍💻 Recruiter & Technical Dossier (`/recruiter`)
- Dedicated recruitment portal demonstrating 100% compliance with Genesis's job specifications.
- 1-click tools for copying live endpoints, GitHub repositories, and direct response pitch messages.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: Next.js 15.2 (App Router), React 19, TypeScript 5, Tailwind CSS v4 (`@tailwindcss/postcss`).
- **Icons & Motion**: Lucide React, Canvas Confetti.
- **Backend / Edge**: Next.js Node.js Edge Runtime, Web Crypto API (`crypto.subtle` / `crypto.createHmac`).
- **Quality Gates**: Node.js Native Test Runner (`tests/run-tests.mjs`), `tsc --noEmit`.
- **Deployment**: Vercel Edge Global Network (`thewebvale-x-brandepth`).

---

## 🧪 Deterministic Verification Suite

Run automated unit and integration tests:

\`\`\`bash
npm test
# or
node tests/run-tests.mjs
\`\`\`

Test results:
\`\`\`text
✔ Barcode Validation: Valid and Invalid Formats (16.1ms)
✔ DNA Purity Spectrophotometry A260/A280 Quality Gates (0.3ms)
✔ HMAC-SHA256 Webhook Verification Integrity (3.8ms)
✔ Skingene Biological Age & Epigenetic Modulator Math (0.8ms)
✔ WordPress Plugin Structural Contract Verification (3.0ms)
ℹ tests 5 | pass 5 | fail 0 (100% PASS)
\`\`\`

---

## 👨‍💻 Author

**Yash Jain**  
- **Role**: Founder & Systems Architect, TheWebVale  
- **Email**: `yash560@gmail.com`  
- **Phone**: `+91 93010 19623`  
- **GitHub**: [github.com/yash560](https://github.com/yash560)  
