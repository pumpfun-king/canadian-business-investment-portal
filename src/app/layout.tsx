import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Commercial Bakery Venture Onboarding & Investment Roadmap | CBIP",
  description:
    "A transparent, step-by-step breakdown of capital allocation, corporate setup, and operational deployment for the Canadian Business Investment Program.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-emerald-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
