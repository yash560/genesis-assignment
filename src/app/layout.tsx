import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://genesis-assignment.vercel.app"),
  title: "Genesis HealthOS | Genomic Health Intelligence & WordPress Headless Platform",
  description: "Enterprise genetic testing cloud, Skingene™ dermal profiling, and headless WordPress/WooCommerce synchronization engine engineered for Genesis. Powered by TheWebVale.",
  keywords: [
    "Genesis",
    "Genetic Testing",
    "Skingene",
    "Genomics",
    "WordPress Plugin",
    "WooCommerce Integration",
    "Next.js 15",
    "React 19",
    "TypeScript",
    "TheWebVale Architecture"
  ],
  authors: [{ name: "TheWebVale Architecture Team", url: "https://thewebvale.com" }],
  creator: "TheWebVale",
  publisher: "TheWebVale",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Genesis HealthOS | Genomic Health Intelligence & WordPress Headless Platform",
    description: "Enterprise genetic testing cloud, Skingene™ dermal profiling, and headless WordPress/WooCommerce synchronization engine. Powered by TheWebVale.",
    url: "https://genesis-assignment.vercel.app",
    siteName: "Genesis HealthOS",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Genesis HealthOS Genomic Platform",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Genesis HealthOS | Genomic Health Intelligence Cloud",
    description: "Enterprise genetic testing & headless WordPress platform. Powered by TheWebVale.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-gray-950 text-gray-100 flex flex-col selection:bg-teal-500 selection:text-gray-950 antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
