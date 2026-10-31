"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./about.module.scss";

type Geometry = {
  d: string;
  head: string;
  labelX: number;
  labelY: number;
};

/** Finds the profile photo (marked with data-about-avatar) and returns an arrow path from the card to it. */
function computeGeometry(wrap: HTMLElement): Geometry | null {
  const avatar = document.querySelector<HTMLElement>("[data-about-avatar]");
  if (!avatar) return null;

  const w = wrap.getBoundingClientRect();
  const a = avatar.getBoundingClientRect();

  // photo centre + radius
  const cx = a.left + a.width / 2;
  const cy = a.top + a.height / 2;
  const r = a.width / 2;

  // arrow starts just outside the card's top-left corner
  const sx = w.left - 14;
  const sy = w.top + 14;

  // unit vector from the photo centre toward the start point
  let ux = sx - cx;
  let uy = sy - cy;
  const dist = Math.hypot(ux, uy);
  if (dist < r + 40 || dist > 900) return null; // photo too close, or too far away
  ux /= dist;
  uy /= dist;

  // arrow tip: a small gap outside the photo's edge, on the line toward the card
  const gap = 14;
  const tx = cx + ux * (r + gap);
  const ty = cy + uy * (r + gap);

  // curve: rises straight up from the card, then bends left in a smooth arc and arrives
  // pointing (slightly upward) at the photo
  const dx = Math.max(sx - tx, 40);
  const dy = Math.max(sy - ty, 40);
  const arrive = Math.hypot(1, 0.3);
  const backX = 1 / arrive; // direction pointing back along the arrow, away from the tip
  const backY = 0.3 / arrive;
  const c1x = sx;
  const c1y = sy - dy * 0.55;
  const c2x = tx + backX * dx * 0.55;
  const c2y = ty + backY * dx * 0.55;
  const d = `M${sx} ${sy} C${c1x} ${c1y} ${c2x} ${c2y} ${tx} ${ty}`;

  // arrow head: two short lines swept back from the tip (±28°)
  const L = 14;
  const rot = (deg: number) => {
    const rad = (deg * Math.PI) / 180;
    return [backX * Math.cos(rad) - backY * Math.sin(rad), backX * Math.sin(rad) + backY * Math.cos(rad)];
  };
  const [ax, ay] = rot(28);
  const [bx, by] = rot(-28);
  const head = `M${tx + ax * L} ${ty + ay * L} L${tx} ${ty} L${tx + bx * L} ${ty + by * L}`;

  return { d, head, labelX: tx + 12, labelY: ty - 42 };
}

/**
 * Wraps the About Me terminal.
 * - Desktop: hovering near the card draws an arrow from the card to the profile photo.
 *   The arrow is measured from the real positions on screen, so it always points at the photo.
 * - Touch / small screens: no hover, so the wrapper is flagged "seen" while on screen and the
 *   CSS plays the badge animation instead.
 */
export default function TerminalWrap({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  const [hover, setHover] = useState(false);
  const [geom, setGeom] = useState<Geometry | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // touch / small screens: replay when the card scrolls into view
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setSeen(entry.isIntersecting), {
      threshold: 0.6,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const update = useCallback(() => {
    if (ref.current) setGeom(computeGeometry(ref.current));
  }, []);

  // keep the arrow aimed correctly while hovering (page scroll / resize)
  useEffect(() => {
    if (!hover) return;
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [hover, update]);

  const handleEnter = () => {
    update();
    setHover(true);
  };

  return (
    <div
      ref={ref}
      className={styles.terminalWrap}
      data-seen={seen ? "true" : "false"}
      onMouseEnter={handleEnter}
      onMouseLeave={() => setHover(false)}
    >
      {children}

      {/* Rendered in <body> so page transforms can't offset the fixed overlay */}
      {mounted &&
        createPortal(
          <div className={styles.arrowLayer} data-on={hover && geom ? "true" : "false"} aria-hidden>
            <svg className={styles.arrowSvg} width="100%" height="100%">
              <path className={styles.arrowPath} d={geom?.d ?? "M0 0"} pathLength={1} />
              <path className={styles.arrowHead} d={geom?.head ?? "M0 0"} />
            </svg>
            <span
              className={styles.arrowLabel}
              style={{ left: geom?.labelX ?? 0, top: geom?.labelY ?? 0 }}
            >
              that&apos;s me!
            </span>
          </div>,
          document.body
        )}
    </div>
  );
}