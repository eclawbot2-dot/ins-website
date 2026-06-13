import { ImageResponse } from "next/og";
import { BRAND } from "@/lib/brand";

export const alt = `${BRAND.name} — Independent Insurance Agency`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundImage: "linear-gradient(135deg, #101d33 0%, #243044 60%, #351e0e 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        {/* Tabor Agency wordmark */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: "56px", fontWeight: 800, letterSpacing: "4px" }}>TABOR</div>
          <div
            style={{
              marginTop: "10px",
              width: "44px",
              height: "5px",
              borderRadius: "3px",
              backgroundColor: "#d0a448",
            }}
          />
          <div
            style={{
              marginTop: "10px",
              fontSize: "24px",
              fontWeight: 600,
              letterSpacing: "14px",
              color: "#d0a448",
            }}
          >
            AGENCY
          </div>
        </div>
        <div
          style={{
            marginTop: "52px",
            fontSize: "62px",
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: "950px",
          }}
        >
          Protect what you&apos;ve built — for the right price.
        </div>
        <div style={{ display: "flex", marginTop: "32px", fontSize: "28px", color: "#cfd9e6" }}>
          {`Independent agency · ${BRAND.carriers.length}+ top-rated carriers compared`}
        </div>
      </div>
    ),
    size
  );
}
