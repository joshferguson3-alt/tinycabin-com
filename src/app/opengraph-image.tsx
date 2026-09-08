import { ImageResponse } from "next/og";

export const alt = "Tiny Cabin — kits and builders";
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
          background: "#14241c",
          color: "#f4efe6",
          padding: "72px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            opacity: 0.7,
          }}
        >
          tinycabin.com
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 72,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: 900,
            }}
          >
            Tiny cabin kits and builders
          </div>
          <div style={{ fontSize: 28, opacity: 0.78, maxWidth: 760 }}>
            Independent matching — not rentals, not gear.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
