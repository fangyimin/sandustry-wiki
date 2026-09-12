import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Sandustry Wiki — Guide, Automation & Demo";
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
          justifyContent: "center",
          padding: 72,
          background: "linear-gradient(135deg, #0b0f12 0%, #1a1208 55%, #2a1a0a 100%)",
          color: "#f3efe6",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 6, textTransform: "uppercase", color: "#d4a24c" }}>
          Fan-Made Community Wiki
        </div>
        <div style={{ marginTop: 24, fontSize: 72, fontWeight: 700, lineHeight: 1.05 }}>Sandustry Wiki</div>
        <div style={{ marginTop: 20, fontSize: 34, lineHeight: 1.35, maxWidth: 900, color: "#c9c2b8" }}>
          Beginner guide, automation tips, demo checklist &amp; EA notes
        </div>
        <div style={{ marginTop: 48, fontSize: 24, color: "#8a8178" }}>playsandustry.online</div>
      </div>
    ),
    { ...size },
  );
}
