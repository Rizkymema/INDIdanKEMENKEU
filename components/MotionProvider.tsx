"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/** Menghormati pengaturan "kurangi gerakan" (prefers-reduced-motion) di semua animasi. */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
