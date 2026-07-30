import Script from "next/script";

/**
 * Google Ads (gtag) — override with NEXT_PUBLIC_GOOGLE_ADS_ID if needed.
 */
export function GoogleAds() {
  const adsId =
    process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim() || "AW-18341238550";

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${adsId}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-ads"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${adsId}');
          `,
        }}
      />
    </>
  );
}
