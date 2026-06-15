"use client";

import { useRef, useState } from "react";

export function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setOffset({ x: x * 0.25, y: y * 0.25 });
  };

  const handleMouseLeave = () => setOffset({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        display: "inline-block",
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: "transform 0.2s ease-out",
      }}
    >
      {children}
    </div>
  );
}