import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import MotionProvider from "@/components/MotionProvider";
import { event, site } from "@/data/training";
import "./globals.css";

/** Plus Jakarta Sans — sans-serif geometris modern (variable font 200–800). */
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

/** URL dasar untuk Open Graph: data → env manual → domain produksi Vercel → localhost. */
function resolveSiteUrl(): URL {
  const candidates = [
    site.url,
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL &&
      `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`,
  ];
  for (const candidate of candidates) {
    if (!candidate) continue;
    try {
      return new URL(candidate);
    } catch {
      // abaikan URL tidak valid, coba kandidat berikutnya
    }
  }
  return new URL("http://localhost:3000");
}

export const metadata: Metadata = {
  metadataBase: resolveSiteUrl(),
  title: site.title,
  description: site.description,
  keywords: site.keywords,
  authors: [{ name: event.organizer }],
  creator: event.organizer,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName: event.organizer,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#111418",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="id"
      className={`${jakarta.variable} antialiased`}
    >
      <body className="min-h-dvh bg-white font-sans text-brand-charcoal">
        <a
          href="#konten"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-brand-red focus:px-4 focus:py-2 focus:font-semibold focus:text-white"
        >
          Lewati ke konten utama
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
