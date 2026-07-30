import "@/lib/gsap/setup";
import type { Viewport } from "next";
import { fontVariables } from "@/config/fonts";
import { createRootMetadata } from "@/lib/seo/metadata";
import { siteJsonLdGraph } from "@/lib/seo/jsonld";
import { JsonLd } from "@/components/seo/JsonLd";
import { Providers } from "@/providers";
import { SiteShell } from "@/components/layout/SiteShell";
import { SiteAnalytics } from "@/components/analytics/SiteAnalytics";
import "./globals.css";

export const metadata = createRootMetadata();

export const viewport: Viewport = {
  themeColor: "#3E3934",
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontVariables} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-archon-cream text-archon-charcoal">
        <JsonLd data={siteJsonLdGraph()} />
        <Providers>
          <SiteShell>{children}</SiteShell>
        </Providers>
        <SiteAnalytics />
      </body>
    </html>
  );
}
