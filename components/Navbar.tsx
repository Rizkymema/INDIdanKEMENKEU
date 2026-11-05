"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Logo } from "@/data/training";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { CloseIcon, MenuIcon } from "./Icons";
import LogoSlot from "./LogoSlot";

export type NavLink = { id: string; label: string };

type Props = {
  links: NavLink[];
  logo: Logo;
  organizer: string;
};

/**
 * Navbar sticky: transparan di atas hero, solid saat halaman discroll.
 * Link aktif mengikuti section yang sedang dilihat (scroll-spy).
 */
export default function Navbar({ links, logo, organizer }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { index } = useScrollSpy(
    links.map((l) => l.id),
    { activateLastAtBottom: true },
  );
  const activeId = links[Math.max(index, 0)]?.id;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Tutup menu mobile dengan ESC atau saat layar melebar ke ukuran desktop.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 768px)");
    const onMq = () => mq.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        solid
          ? "bg-brand-charcoal/95 shadow-lg shadow-black/20 backdrop-blur"
          : "bg-linear-to-b from-black/60 to-transparent"
      }`}
    >
      <nav aria-label="Navigasi utama" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#beranda" className="flex min-w-0 items-center gap-3 rounded" onClick={() => setOpen(false)}>
          <LogoSlot logo={logo} className="h-10 w-16" tone="dark" />
          <span className="hidden min-w-0 flex-col leading-tight sm:flex">
            <span className="font-heading text-sm font-extrabold uppercase tracking-wider text-white">{logo.name}</span>
            <span className="truncate text-[11px] text-white/70">{organizer}</span>
          </span>
        </a>

        {/* Desktop */}
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = link.id === activeId;
            return (
              <li key={link.id} className="relative">
                <a
                  href={`#${link.id}`}
                  aria-current={active ? "true" : undefined}
                  className={`relative block rounded-md px-3 py-2 font-heading text-[13px] font-bold uppercase tracking-wider transition-colors ${
                    active ? "text-brand-gold" : "text-white/85 hover:text-white"
                  }`}
                >
                  {link.label}
                  {active ? (
                    <motion.span
                      layoutId="nav-active"
                      aria-hidden="true"
                      className="absolute inset-x-3 -bottom-0.5 h-[3px] rounded-full bg-brand-gold"
                      transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    />
                  ) : null}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Tombol hamburger (mobile) */}
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-md text-white transition-colors hover:bg-white/10 md:hidden"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </nav>

      {/* Aksen garis merah + emas di bawah navbar saat solid */}
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 bottom-0 flex h-[3px] transition-opacity duration-300 ${solid ? "opacity-100" : "opacity-0"}`}
      >
        <span className="h-full flex-[3] bg-brand-red" />
        <span className="h-full flex-1 bg-brand-gold" />
      </span>

      {/* Menu mobile */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="menu-mobile"
            key="menu-mobile"
            className="border-t border-white/10 bg-brand-charcoal shadow-xl md:hidden"
            // Catatan: jangan animasikan `height: "auto"` di sini — Framer Motion akan
            // mengembalikan posisi scroll saat mengukur, sehingga lompatan anchor batal.
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <ul className="space-y-1 px-4 py-4">
              {links.map((link) => {
                const active = link.id === activeId;
                return (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      aria-current={active ? "true" : undefined}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 rounded-lg px-4 py-3 font-heading text-sm font-bold uppercase tracking-wider transition-colors ${
                        active ? "bg-brand-red text-white" : "text-white/85 hover:bg-white/5"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`h-4 w-1 rounded-full ${active ? "bg-brand-gold" : "bg-white/20"}`}
                      />
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
