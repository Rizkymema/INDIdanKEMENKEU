import BackToTop from "@/components/BackToTop";
import Closing from "@/components/Closing";
import DaySection from "@/components/DaySection";
import DayTimeline from "@/components/DayTimeline";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar, { type NavLink } from "@/components/Navbar";
import Overview from "@/components/Overview";
import { closing, contact, days, event, footer, logos, overview } from "@/data/training";

export default function Home() {
  // Link navbar dibuat otomatis dari data hari → menambah "day-4" langsung muncul di menu.
  const navLinks: NavLink[] = [
    { id: "beranda", label: "Beranda" },
    // "DAY 1" → "Day 1" agar seragam dengan "Beranda" & "Kontak"
    ...days.map((day) => ({ id: day.id, label: day.label.charAt(0) + day.label.slice(1).toLowerCase() })),
    { id: "kontak", label: "Kontak" },
  ];

  return (
    <>
      <Navbar links={navLinks} logo={logos.organizer} />

      <main id="konten" tabIndex={-1} className="outline-none">
        <Hero
          event={event}
          clientLogo={logos.client}
          partners={logos.partners}
          agenda={days.map((day) => ({
            id: day.id,
            label: day.label,
            title: day.title,
            sessions: day.sessions.map((s) => s.title),
            photos: day.sessions.reduce((sum, s) => sum + s.photos.length, 0),
          }))}
        />

        <Overview
          eyebrow={overview.eyebrow}
          heading={overview.heading}
          paragraphs={overview.paragraphs}
          stats={overview.stats}
        />

        <DayTimeline days={days.map(({ id, label, title }) => ({ id, label, title }))} />

        {days.map((day, i) => (
          <DaySection key={day.id} day={day} index={i} />
        ))}

        <Closing
          eyebrow={closing.eyebrow}
          hashtag={closing.headline || event.hashtag}
          message={closing.message}
        />
      </main>

      <Footer
        logo={logos.organizer}
        organizer={event.organizer}
        about={footer.about}
        hashtag={event.hashtag}
        contact={contact}
        links={navLinks}
        copyrightName={footer.copyrightName}
        copyrightYear={footer.copyrightYear}
      />

      <BackToTop />
    </>
  );
}
