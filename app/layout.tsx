import type { Metadata } from "next";
import { Playfair_Display, Nunito } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Seedling Stories — Bible Stories for Kids",
    template: "%s | Seedling Stories",
  },
  description:
    "Beautiful, interactive Bible story packs for kids ages 2-12. Print, scan, and bring God's Word alive with audio narration, worship songs, and animated videos.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://seedlingstories.co"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Seedling Stories",
    title: "Seedling Stories — Planting God's Word in Little Hearts",
    description:
      "Beautiful Bible story packs with audio narration, worship songs & animated videos for kids ages 2-12.",
    images: [{ url: "/images/hero-children-tree.png", width: 1200, height: 630, alt: "Seedling Stories — Bible stories for kids" }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${nunito.variable}`}>
      <body className="min-h-screen flex flex-col font-body antialiased">
        {children}
      </body>
    </html>
  );
}
