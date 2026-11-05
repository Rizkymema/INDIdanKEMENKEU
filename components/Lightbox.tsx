"use client";

import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import type { Photo } from "@/data/training";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "./Icons";
import { PhotoPlaceholder } from "./PhotoCard";

type Props = {
  photos: Photo[];
  /** Index foto yang dibuka; `null` = lightbox tertutup. */
  index: number | null;
  /** Arah perpindahan terakhir (1 = berikutnya, -1 = sebelumnya) untuk animasi geser. */
  direction: number;
  title?: string;
  onClose: () => void;
  onNavigate: (step: 1 | -1) => void;
};

const SWIPE_DISTANCE = 70;
const SWIPE_VELOCITY = 400;

const subscribeNoop = () => () => {};

/** true hanya di browser — aman untuk createPortal tanpa hydration mismatch. */
function useIsClient() {
  return useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );
}

export default function Lightbox({ photos, index, direction, title, onClose, onNavigate }: Props) {
  const isClient = useIsClient();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const draggedRef = useRef(false);
  const [ratios, setRatios] = useState<Record<string, number>>({});
  const open = index !== null && index >= 0 && index < photos.length;
  const total = photos.length;
  const photo = open ? photos[index] : null;
  const ratio = (photo?.src && ratios[photo.src]) || 4 / 3;

  const next = useCallback(() => onNavigate(1), [onNavigate]);
  const prev = useCallback(() => onNavigate(-1), [onNavigate]);

  // Keyboard: ESC tutup, panah kiri/kanan navigasi, Tab tetap di dalam dialog.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "Tab" && dialogRef.current) {
        // Hanya elemen yang benar-benar tampil (tombol mobile/desktop bisa tersembunyi).
        const focusables = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
          ),
        ).filter((el) => el.getClientRects().length > 0);
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const inside = dialogRef.current.contains(document.activeElement);
        if (e.shiftKey && (document.activeElement === first || !inside)) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && (document.activeElement === last || !inside)) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose, next, prev]);

  // Kunci scroll halaman & kelola fokus saat dibuka/ditutup.
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow, paddingRight } = document.body.style;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, [open]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    window.setTimeout(() => {
      draggedRef.current = false;
    }, 80);
    if (total < 2) return;
    if (info.offset.x < -SWIPE_DISTANCE || info.velocity.x < -SWIPE_VELOCITY) next();
    else if (info.offset.x > SWIPE_DISTANCE || info.velocity.x > SWIPE_VELOCITY) prev();
  };

  if (!isClient) return null;

  return createPortal(
    <AnimatePresence>
      {open && photo ? (
        <motion.div
          key="lightbox"
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Galeri foto${title ? ` ${title}` : ""}`}
          className="fixed inset-0 z-[100] flex flex-col bg-black/90 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => {
            // Abaikan "klik" yang sebenarnya akhir dari gerakan swipe/drag.
            if (draggedRef.current) return;
            onClose();
          }}
        >
          {/* Bar atas: judul, penghitung, tombol tutup */}
          <div
            className="relative z-10 flex items-center justify-between gap-4 px-4 py-3 text-white sm:px-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex min-w-0 items-center gap-3">
              <span className="h-5 w-1 shrink-0 rounded-full bg-brand-gold" aria-hidden="true" />
              {title ? (
                <p className="truncate font-heading text-sm font-extrabold uppercase tracking-wider">{title}</p>
              ) : null}
              <p className="shrink-0 text-sm text-white/70" aria-live="polite">
                {index + 1} / {total}
              </p>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Tutup galeri (Esc)"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand-red"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Area foto */}
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-16">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.figure
                key={index}
                custom={direction}
                className="relative flex h-full w-full max-w-6xl touch-pan-y flex-col items-center justify-center"
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -60 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                drag={total > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragStart={() => {
                  draggedRef.current = true;
                }}
                onDragEnd={onDragEnd}
              >
                {/* Kotak foto mengikuti rasio asli foto agar klik di luar foto menutup lightbox */}
                <div className="flex min-h-0 w-full flex-1 items-center justify-center [container-type:size]">
                  <div
                    className="relative select-none overflow-hidden rounded-lg"
                    style={{ width: `min(100cqw, calc(100cqh * ${ratio}))`, aspectRatio: ratio }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {photo.src ? (
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="100vw"
                        className="pointer-events-none object-contain"
                        draggable={false}
                        onLoad={(e) => {
                          const img = e.currentTarget;
                          if (img.naturalWidth && img.naturalHeight) {
                            const value = img.naturalWidth / img.naturalHeight;
                            setRatios((prev) => (prev[photo.src] === value ? prev : { ...prev, [photo.src]: value }));
                          }
                        }}
                      />
                    ) : (
                      <PhotoPlaceholder large />
                    )}
                  </div>
                </div>
                <figcaption
                  className="mx-auto mt-4 max-w-3xl px-4 pb-2 text-center text-sm leading-relaxed text-white/90 sm:text-base"
                  onClick={(e) => e.stopPropagation()}
                >
                  {photo.caption || photo.alt}
                </figcaption>
              </motion.figure>
            </AnimatePresence>

            {total > 1 ? (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  aria-label="Foto sebelumnya"
                  className="absolute left-2 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand-red sm:flex"
                >
                  <ChevronLeftIcon className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  aria-label="Foto berikutnya"
                  className="absolute right-2 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand-red sm:flex"
                >
                  <ChevronRightIcon className="h-6 w-6" />
                </button>
              </>
            ) : null}
          </div>

          {/* Navigasi bawah (mobile) */}
          {total > 1 ? (
            <div
              className="flex items-center justify-center gap-6 px-4 pb-5 pt-2 sm:hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={prev}
                aria-label="Foto sebelumnya"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white active:bg-brand-red"
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </button>
              <p className="text-xs uppercase tracking-widest text-white/60">Geser untuk pindah</p>
              <button
                type="button"
                onClick={next}
                aria-label="Foto berikutnya"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white active:bg-brand-red"
              >
                <ChevronRightIcon className="h-6 w-6" />
              </button>
            </div>
          ) : null}
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
