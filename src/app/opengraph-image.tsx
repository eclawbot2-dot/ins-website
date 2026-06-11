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
          backgroundImage: "linear-gradient(135deg, #0b1830 0%, #1b2f49 55%, #1c4345 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "76px",
              height: "76px",
              borderRadius: "20px",
              backgroundImage: "linear-gradient(135deg, #243f60, #1e6365)",
              fontSize: "44px",
            }}
          >
            ⚓
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: "40px", fontWeight: 700 }}>{BRAND.shortName}</div>
            <div style={{ fontSize: "20px", letterSpacing: "6px", color: "#80d1cf" }}>
              INSURANCE GROUP
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: "56px",
            fontSize: "64px",
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: "950px",
          }}
        >
          The right coverage. The right price. Every renewal.
        </div>
        <div style={{ display: "flex", marginTop: "32px", fontSize: "28px", color: "#bdd3e8" }}>
          {`Independent agency · ${BRAND.carriers.length}+ top-rated carriers compared`}
        </div>
      </div>
    ),
    size
  );
}
