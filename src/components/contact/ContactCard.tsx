"use client";

import { useState } from "react";
import { Column, Row, Text, Icon } from "@once-ui-system/core";
import { WorldMapBackground } from "./WorldMapBackground";

interface ContactDetail {
  label: string;
  value: string;
  icon: string;
  href: string | null;
}

export function ContactCard({ detail }: { detail: ContactDetail }) {
  const [hovered, setHovered] = useState(false);

  const isLocation = detail.label === "Location";
  const Wrapper = detail.href ? "a" : "div";
  const wrapperProps = detail.href
    ? { href: detail.href, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper
      {...(wrapperProps as any)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
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
          transform: hovered ? "rotateY(180deg)" : "rotateY(0deg)",
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
  );
}