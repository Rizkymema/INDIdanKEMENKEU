import { ImageResponse } from "next/og";
import { event } from "@/data/training";

/**
 * Gambar Open Graph (preview saat link dibagikan ke WhatsApp, Facebook, dll).
 * Dibuat otomatis dari data. Ingin pakai gambar sendiri? Hapus file ini lalu
 * simpan gambar 1200×630 sebagai `app/opengraph-image.jpg`.
 */
export const alt = `${event.title} – ${event.subtitle}`;
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
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #111418 0%, #2a0a0e 55%, #8B0A14 100%)",
          color: "#FFFFFF",
          padding: "64px 72px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 56, height: 6, background: "#FFC20E" }} />
          <div style={{ fontSize: 26, letterSpacing: 4, textTransform: "uppercase", color: "#FFC20E" }}>
            {event.organizer}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 104, fontWeight: 900, lineHeight: 1, textTransform: "uppercase", letterSpacing: -2 }}>
            {event.title}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              alignSelf: "flex-start",
              background: "#C8102E",
              padding: "12px 28px",
              fontSize: 48,
              fontWeight: 800,
              textTransform: "uppercase",
            }}
          >
            {event.subtitle}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 30 }}>
          <div style={{ display: "flex", color: "rgba(255,255,255,0.9)" }}>{event.location}</div>
          <div style={{ display: "flex", fontWeight: 900, color: "#FFC20E" }}>{event.hashtag}</div>
        </div>
      </div>
    ),
    size,
  );
}
