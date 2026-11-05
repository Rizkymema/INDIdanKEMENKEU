"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Jeda animasi (detik). */
  delay?: number;
  /** Jarak geser awal dari bawah (px). */
  y?: number;
  as?: "div" | "li" | "header";
};

/**
 * Animasi fade-in + slide-up halus saat elemen masuk layar.
 * Gerakan geser otomatis dimatikan bila pengguna memilih "kurangi gerakan"
 * (diatur oleh <MotionProvider /> di app/layout.tsx).
 */
export default function Reveal({ children, className, delay = 0, y = 24, as = "div" }: Props) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
