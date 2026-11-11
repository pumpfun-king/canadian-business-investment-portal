import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: "#8c2b33",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "Canada Business Venture Structure (CBVS) | Investor Portal",
    template: "%s | CBVS Canada",
  },
  description:
    "Official Canada Business Venture Structure (CBVS) investor portal. Verified commercial investment pathway to Canadian Permanent Residency (PR) with zero age or language barriers, Month 1 immediate legal stay documentation, and transparent $75,000 CAD capital split.",
  applicationName: "CBVS Investor Portal",
  authors: [
    {
      name: "Canada Business Venture Structure (CBVS)",
      url: "https://canadian-business-investment-portal.vercel.app",
    },
  ],
  generator: "Next.js",
  keywords: [
    "Canada Business Venture Structure",
    "CBVS",
    "Canada Investor Portal",
    "Canadian Permanent Residency",
    "Canada PR Pathway",
    "Commercial Venture Investment",
    "Month 1 Legal Stay Canada",
    "No Age Barrier Canada",
    "No Language Barrier Canada",
    "$75,000 CAD Investment",
    "Ontario Business Corporations Act",
    "Commercial Bakery Venture",
    "CRA Payroll Compliance",
    "Schedule I Bank Escrow",
  ],
  creator: "Canada Business Venture Structure (CBVS)",
  publisher: "CBVS Corporate Operations",
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      "https://canadian-business-investment-portal.vercel.app"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://canadian-business-investment-portal.vercel.app",
    title: "Canada Business Venture Structure (CBVS) | Investor Portal",
    description:
      "Verified Canadian commercial investment portal with $75,000 CAD capital split, Month 1 legal stay documentation, and full Permanent Residency (PR) pathway without age or language restrictions.",
    siteName: "Canada Business Venture Structure (CBVS)",
    images: [
      {
        url: "/favicon.svg",
        width: 512,
        height: 512,
        alt: "Canada Business Venture Structure - Canadian Maple Leaf Crest",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Canada Business Venture Structure (CBVS) | Investor Portal",
    description:
      "Verified Canadian commercial investment portal with $75,000 CAD capital split, Month 1 legal stay documentation, and full Permanent Residency (PR) pathway.",
    images: ["/favicon.svg"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/apple-touch-icon.svg",
  },
  manifest: "/site.webmanifest",
  category: "business",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
      </head>
      <body className="min-h-screen bg-[#8c2b33] text-stone-900 font-sans selection:bg-[#681920] selection:text-white antialiased">
        {children}
      </body>
    </html>
  );
}
