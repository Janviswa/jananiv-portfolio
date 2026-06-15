"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  /** Pixels to translate from on enter */
  translateY?: number;
  /** Animation duration in ms */
  duration?: number;
  /** Delay before animating, in ms */
  delay?: number;
  /** Fraction of element visible before triggering (0–1) */
  threshold?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function ScrollReveal({
  children,
  translateY = 24,
  duration = 600,
  delay = 0,
  threshold = 0.15,
  className,
  style,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : `translateY(${translateY}px)`,
        transition: `opacity ${duration}ms ease, transform ${duration}ms ease`,
        transitionDelay: `${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}