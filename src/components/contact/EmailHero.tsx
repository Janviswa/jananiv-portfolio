"use client";

import { useState, useRef, useEffect, useId } from "react";
import { Column, Row, Text, Icon } from "@once-ui-system/core";

const EMAIL = "jananiviswa05@gmail.com";
const REVEAL_EVENT = "contact-card-reveal";

export function EmailHero() {
  const cardId = useId();
  const [hovered, setHovered] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [copied, setCopied] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const didSwipe = useRef(false);

  // Mobile (touch, no hover) gets swipe-to-reveal; laptop/desktop keeps the hover flip.
  useEffect(() => {
    const mq = window.matchMedia("(hover: none) and (pointer: coarse)");
    setIsTouchDevice(mq.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsTouchDevice(e.matches);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  // When another contact card is revealed, this one flips back to its normal state.
  useEffect(() => {
    const handleOtherReveal = (e: Event) => {
      const otherId = (e as CustomEvent<{ id: string }>).detail?.id;
      if (otherId !== cardId) setRevealed(false);
    };
    window.addEventListener(REVEAL_EVENT, handleOtherReveal);
    return () => window.removeEventListener(REVEAL_EVENT, handleOtherReveal);
  }, [cardId]);

  const isFlipped = isTouchDevice ? revealed : hovered;

  const handleCopy = () => {
    navigator.clipboard?.writeText(EMAIL).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
    window.location.href = `mailto:${EMAIL}`;
  };

  const reveal = () => {
    setRevealed(true);
    window.dispatchEvent(new CustomEvent(REVEAL_EVENT, { detail: { id: cardId } }));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    setHasInteracted(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const deltaX = e.touches[0].clientX - touchStart.current.x;
    const deltaY = e.touches[0].clientY - touchStart.current.y;
    if (Math.abs(deltaX) > 24 && Math.abs(deltaX) > Math.abs(deltaY)) {
      didSwipe.current = true;
      reveal();
    }
  };

  const handleTouchEnd = () => {
    touchStart.current = null;
    setTimeout(() => { didSwipe.current = false; }, 50);
  };

  const handleClick = () => {
    if (!isTouchDevice) { handleCopy(); return; }
    if (didSwipe.current) return;
    if (!revealed) {
      // Tap flips the card — don't trigger mailto yet.
      reveal();
      return;
    }
    handleCopy();
  };

  const showHint = isTouchDevice && !revealed && !hasInteracted;

  return (
    <div
      onMouseEnter={() => !isTouchDevice && setHovered(true)}
      onMouseLeave={() => !isTouchDevice && setHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        flex: 1,
        cursor: "pointer",
        perspective: "1000px",
        touchAction: "pan-y",
        animation: showHint ? "contactCardPeek 4.4s ease-in-out infinite" : "none",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          minHeight: "160px",
          transformStyle: "preserve-3d",
          transition: "transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1)",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* ── FRONT ── */}
        <Column
          horizontal="center"
          vertical="center"
          gap="12"
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            border: "1px solid var(--neutral-alpha-weak)",
            background: "var(--neutral-alpha-weak)",
            borderRadius: "var(--radius-m)",
          }}
        >
          <div style={{ position: "relative" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "56px",
                height: "56px",
                borderRadius: "14px",
                background: "var(--brand-background-weak)",
              }}
            >
              <Icon name="email" size="l" onBackground="brand-medium" />
            </div>
            <div
              style={{
                position: "absolute",
                top: "-3px",
                right: "-3px",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "var(--success-solid-medium, #3fb950)",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background: "var(--success-solid-medium, #3fb950)",
                  animation: "pingDot 2s ease-out infinite",
                }}
              />
            </div>
          </div>
          <Text variant="label-default-s" onBackground="neutral-medium">
            EMAIL
          </Text>
        </Column>

        {/* ── BACK ── */}
        <Column
          gap="s"
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            border: "1px solid var(--brand-alpha-medium)",
            background: "var(--neutral-alpha-weak)",
            borderRadius: "var(--radius-m)",
            padding: "var(--static-space-16)",
            boxShadow: "0 12px 32px -8px var(--brand-background-strong)",
          }}
        >
          <Row fillWidth horizontal="between" vertical="center">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: "var(--brand-background-medium)",
              }}
            >
              <Icon name="email" size="m" onBackground="brand-medium" />
            </div>
            <Row gap="8" vertical="center">
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "var(--success-solid-medium, #3fb950)",
                }}
              />
              <Text variant="label-default-s" onBackground="neutral-medium">
                Available
              </Text>
            </Row>
          </Row>

          <Column gap="2" style={{ marginTop: "auto" }}>
            <Text variant="label-default-s" onBackground="neutral-medium">
              EMAIL
            </Text>
            <Text variant="body-default-m" onBackground="neutral-strong">
              {copied ? "Copied to clipboard!" : EMAIL}
            </Text>
            <Text variant="body-default-xs" onBackground="neutral-weak">
              Open to AI roles, freelance & collaborations
            </Text>
          </Column>
        </Column>
      </div>

      <style>{`
        @keyframes pingDot {
          0% { transform: scale(1); opacity: 0.7; }
          70% { transform: scale(2.4); opacity: 0; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes contactCardPeek {
          0%   { transform: translateX(0); }
          4%   { transform: translateX(-9px); }
          8%   { transform: translateX(7px); }
          12%  { transform: translateX(-3px); }
          16%  { transform: translateX(0); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}