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
          background: "linear-gradient(115deg, #E31E24 0%, #C8102E 38%, #8B0A14 100%)",
          color: "#FFFFFF",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 6, textTransform: "uppercase", opacity: 0.9 }}>
          {event.eyebrow}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 800, lineHeight: 1.04, letterSpacing: -3 }}>{event.title}</div>
          <div style={{ fontSize: 92, fontWeight: 800, lineHeight: 1.04, letterSpacing: -3 }}>{event.subtitle}</div>
          <div style={{ display: "flex", marginTop: 24, fontSize: 30, opacity: 0.9 }}>
            {event.organizer} · {event.location}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 28 }}>
          <div style={{ display: "flex", fontWeight: 800, letterSpacing: -1, fontSize: 40 }}>{event.client}</div>
          <div style={{ display: "flex", fontWeight: 700 }}>{event.hashtag}</div>
        </div>
      </div>
    ),
    size,
  );
}
