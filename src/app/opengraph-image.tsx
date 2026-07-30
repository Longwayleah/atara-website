import { ImageResponse } from "next/og";
import { seo } from "@/config/seo";

export const alt = seo.siteName;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(145deg, #f5f5f5 0%, #ffffff 42%, #eef1f5 100%)",
          color: "#3E3934",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            fontWeight: 800,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
          }}
        >
          Atara
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 900 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            Premium Research Peptides
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.45,
              color: "rgba(62, 57, 52, 0.72)",
              maxWidth: 820,
            }}
          >
            {seo.tagline}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(62, 57, 52, 0.55)",
          }}
        >
          {new URL(seo.url).hostname}
        </div>
      </div>
    ),
    { ...size },
  );
}
