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
};

/**
 * Navbar sticky: transparan di atas hero merah, putih bersih saat discroll.
 * Link aktif mengikuti section yang sedang dilihat (scroll-spy).
 */
export default function Navbar({ links, logo }: Props) {
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
      data-surface={solid ? undefined : "dark"}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ${
        solid
          ? "border-b border-zinc-200 bg-white/95 shadow-sm shadow-black/[0.03] backdrop-blur"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav aria-label="Navigasi utama" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 xl:px-15">
        <a href="#beranda" className="flex min-w-0 items-center rounded" onClick={() => setOpen(false)}>
          <LogoSlot logo={logo} variant="wordmark" tone={solid ? "dark" : "light"} className="h-9 w-28" />
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
                  className={`relative block rounded-md px-3 py-2 text-[0.8125rem] font-semibold transition-colors ${
                    solid
                      ? active
                        ? "text-brand-red"
                        : "text-zinc-600 hover:text-brand-charcoal"
                      : active
                        ? "text-white"
                        : "text-white/75 hover:text-white"
                  }`}
                >
                  {link.label}
                  {active ? (
                    <motion.span
                      layoutId="nav-active"
                      aria-hidden="true"
                      className={`absolute inset-x-3 -bottom-px h-0.5 rounded-full ${solid ? "bg-brand-red" : "bg-white"}`}
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
          className={`flex h-11 w-11 items-center justify-center rounded-md transition-colors md:hidden ${
            solid ? "text-brand-charcoal hover:bg-zinc-100" : "text-white hover:bg-white/10"
          }`}
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </nav>

      {/* Menu mobile */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="menu-mobile"
            key="menu-mobile"
            className="border-t border-zinc-200 bg-white shadow-lg md:hidden"
            // Catatan: jangan animasikan `height: "auto"` di sini — Framer Motion akan
            // mengembalikan posisi scroll saat mengukur, sehingga lompatan anchor batal.
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <ul className="px-4 py-3">
              {links.map((link) => {
                const active = link.id === activeId;
                return (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      aria-current={active ? "true" : undefined}
                      onClick={() => setOpen(false)}
                      className={`flex items-center justify-between rounded-md px-3 py-3 text-[0.9375rem] font-semibold transition-colors ${
                        active ? "bg-red-50 text-brand-red" : "text-brand-charcoal hover:bg-zinc-50"
                      }`}
                    >
                      {link.label}
                      {active ? <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand-red" /> : null}
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
