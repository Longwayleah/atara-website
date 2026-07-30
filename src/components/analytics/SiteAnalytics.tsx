import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAds } from "@/components/analytics/GoogleAds";
import { MetaPixel } from "@/components/analytics/MetaPixel";

/**
 * Site analytics:
 * - Vercel Web Analytics (traffic — enable in Vercel project → Analytics)
 * - Vercel Speed Insights (Core Web Vitals — enable in Vercel project → Speed Insights)
 * - Google Analytics 4 when NEXT_PUBLIC_GA_MEASUREMENT_ID is set (G-XXXXXXXX)
 * - Google Ads tag when NEXT_PUBLIC_GOOGLE_ADS_ID is set (AW-XXXXXXXXXX)
 * - Meta Pixel when NEXT_PUBLIC_META_PIXEL_ID is set
 */
export function SiteAnalytics() {
  const gaId =
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "G-H995Z0N0CZ";

  return (
    <>
      <Analytics />
      <SpeedInsights />
      <GoogleAnalytics gaId={gaId} />
      <GoogleAds />
      <MetaPixel />
    </>
  );
}
