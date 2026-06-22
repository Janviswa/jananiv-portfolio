"use client";

import { useState, useRef, useEffect, useId } from "react";
import { Column, Row, Text, Icon } from "@once-ui-system/core";
import { WorldMapBackground } from "./WorldMapBackground";

interface ContactDetail {
  label: string;
  value: string;
  icon: string;
  href: string | null;
}

const REVEAL_EVENT = "contact-card-reveal";

export function ContactCard({ detail }: { detail: ContactDetail }) {
  const cardId = useId();
  const [hovered, setHovered] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  // Mobile (touch, no hover) gets swipe-to-reveal; laptop/desktop keeps the hover flip.
  useEffect(() => {
    const mq = window.matchMedia("(hover: none) and (pointer: coarse)");
    setIsTouchDevice(mq.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsTouchDevice(e.matches);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  // When another card is revealed, this one flips back to its normal state.
  useEffect(() => {
    const handleOtherReveal = (e: Event) => {
      const otherId = (e as CustomEvent<{ id: string }>).detail?.id;
      if (otherId !== cardId) setRevealed(false);
    };
    window.addEventListener(REVEAL_EVENT, handleOtherReveal);
    return () => window.removeEventListener(REVEAL_EVENT, handleOtherReveal);
  }, [cardId]);

  const isLocation = detail.label === "Location";
  const Wrapper = detail.href ? "a" : "div";
  const wrapperProps = detail.href
    ? { href: detail.href, target: "_blank", rel: "noopener noreferrer" }
    : {};

  const isFlipped = isTouchDevice ? revealed : hovered;

  const reveal = () => {
    setRevealed(true);
    window.dispatchEvent(new CustomEvent(REVEAL_EVENT, { detail: { id: cardId } }));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    setHasInteracted(true);
  };

  const didSwipe = useRef(false);

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
    // Reset swipe flag after a short delay so the click handler can check it.
    setTimeout(() => { didSwipe.current = false; }, 50);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!isTouchDevice) return;
    // If this click was triggered by the end of a swipe, don't process it.
    if (didSwipe.current) { e.preventDefault(); return; }
    if (!revealed) {
      // Tap flips the card — prevent navigation until it's revealed.
      e.preventDefault();
      reveal();
      return;
    }
    // Card is already revealed — navigate normally (or do nothing if no href).
    if (!detail.href) e.preventDefault();
  };

  // Deterministic per-card stagger so the hint nudges don't all fire in sync.
  const hintDelay = (detail.label.length % 5) * 0.18;
  const showHint = isTouchDevice && !revealed && !hasInteracted;

  return (
    <>
    <Wrapper
      {...(wrapperProps as any)}
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
        textDecoration: "none",
        cursor: detail.href ? "pointer" : "default",
        perspective: "1000px",
        overflow: "hidden",
        borderRadius: "var(--radius-m)",
        isolation: "isolate",
        touchAction: "pan-y",
        animation: showHint ? "contactCardPeek 4.4s ease-in-out infinite" : "none",
        animationDelay: showHint ? `${hintDelay}s` : "0s",
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
            transition: "border-color 0.35s ease",
          }}
        >
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
            <Icon name={detail.icon as any} size="l" onBackground="brand-medium" />
          </div>
          <Text variant="label-default-s" onBackground="neutral-medium">
            {detail.label.toUpperCase()}
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
            overflow: "hidden",
            boxShadow: "0 12px 32px -8px var(--brand-background-strong)",
          }}
        >
          {isLocation && (
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                color: "var(--brand-on-background-medium)",
                opacity: 0.5,
              }}
            >
              <WorldMapBackground />
            </div>
          )}

          <Row fillWidth horizontal="between" vertical="center" style={{ position: "relative", zIndex: 1 }}>
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
              <Icon name={detail.icon as any} size="m" onBackground="brand-medium" />
            </div>

            {detail.href && (
              <Icon name="arrowUpRight" size="s" onBackground="neutral-weak" />
            )}
          </Row>

          <Column gap="2" style={{ marginTop: "auto", position: "relative", zIndex: 1 }}>
            <Text variant="label-default-s" onBackground="neutral-medium">
              {detail.label.toUpperCase()}
            </Text>
            <Text variant="body-default-m" onBackground="neutral-strong">
              {detail.value}
            </Text>
          </Column>
        </Column>
      </div>
    </Wrapper>

    <style>{`
        @keyframes contactCardPeek {
          0%   { transform: translateX(0); }
          4%   { transform: translateX(-9px); }
          8%   { transform: translateX(7px); }
          12%  { transform: translateX(-3px); }
          16%  { transform: translateX(0); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}