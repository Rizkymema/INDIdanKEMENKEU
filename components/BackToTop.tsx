"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUpIcon } from "./Icons";

/** Tombol "kembali ke atas" yang muncul setelah halaman discroll. */
export default function BackToTop({ threshold = 640 }: { threshold?: number }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    document.getElementById("beranda")?.focus({ preventScroll: true });
  };

  return (
    <AnimatePresence>
      {show ? (
        <motion.button
          key="back-to-top"
          type="button"
          onClick={toTop}
          aria-label="Kembali ke atas"
          className="fixed right-4 bottom-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-brand-gold text-brand-charcoal shadow-lg shadow-black/30 ring-2 ring-white/70 transition-colors hover:bg-white sm:right-6 sm:bottom-6"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowUpIcon className="h-5 w-5" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
