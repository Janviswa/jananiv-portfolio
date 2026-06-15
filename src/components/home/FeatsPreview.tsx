"use client";

import { Column, Row, Heading, Text, Icon } from "@once-ui-system/core";
import { useState } from "react";

const feats = [
  {
    label: "Certifications",
    icon: "trophy",
    count: "9+",
    detail: "Anthropic, IBM, Coursera, Credly & Skilljar",
    visual: (
      /* Real certificate image preview — matches actual Claude 101 cert */
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "90px",
          marginBottom: "4px",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        {/* Beige cert background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, #efe8d9 0%, #e9e2d3 60%, #e3dac8 100%)",
            borderRadius: "8px",
          }}
        />
        {/* Corner brackets */}
        {[
          { top: 6, left: 6, borderRight: "none", borderBottom: "none" },
          { bottom: 6, right: 6, borderLeft: "none", borderTop: "none" },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: "12px",
              height: "12px",
              border: "1.5px solid rgba(42,42,42,0.3)",
              ...s,
            }}
          />
        ))}
        {/* Cert content */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
          }}
        >
          {/* Pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              border: "1px solid #2a2a2a",
              borderRadius: "999px",
              padding: "2px 8px",
            }}
          >
            <span style={{ fontSize: "8px", color: "#2a2a2a" }}>✓</span>
            <span style={{ fontSize: "7px", fontWeight: 700, color: "#2a2a2a", letterSpacing: "0.1em" }}>
              CERTIFICATE OF COMPLETION
            </span>
          </div>
          <div style={{ fontSize: "13px", fontFamily: "Georgia, serif", color: "#1a1a1a", fontWeight: 700 }}>
            Janani V
          </div>
          <div style={{ fontSize: "8px", color: "#5a5a52", fontFamily: "Georgia, serif" }}>has completed</div>
          <div style={{ fontSize: "11px", fontWeight: 700, color: "#1a1a1a", fontFamily: "Georgia, serif" }}>
            Claude 101
          </div>
          <div style={{ fontSize: "7px", fontWeight: 700, color: "#2a2a2a", letterSpacing: "0.08em" }}>
            ANTHROPIC EDUCATION
          </div>
        </div>
        {/* Verified ribbon */}
        <div
          style={{
            position: "absolute",
            top: "8px",
            right: "-22px",
            transform: "rotate(40deg)",
            background: "linear-gradient(90deg, #06b6d4, #3b82f6)",
            color: "#fff",
            fontSize: "6px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            padding: "2px 28px",
          }}
        >
          VERIFIED
        </div>
      </div>
    ),
  },
  {
    label: "Patents",
    icon: "rocket",
    count: "2",
    detail: "AI smart devices for infant care & rider safety",
    visual: (
      /* Terminal / patent-ID style visual */
      <div
        style={{
          background: "#0d1117",
          borderRadius: "8px",
          padding: "10px 12px",
          marginBottom: "4px",
          fontFamily: "monospace",
          border: "1px solid rgba(56,189,248,0.15)",
        }}
      >
        {/* Terminal bar */}
        <div style={{ display: "flex", gap: "4px", marginBottom: "8px" }}>
          {["#ef4444","#f59e0b","#22c55e"].map((c) => (
            <div key={c} style={{ width: "7px", height: "7px", borderRadius: "50%", background: c }} />
          ))}
          <span style={{ fontSize: "8px", color: "rgba(255,255,255,0.3)", marginLeft: "4px" }}>
            patent_registry.sh
          </span>
        </div>
        {[
          { id: "202641048866", name: "SmartDiaperPod.AI", status: "GRANTED" },
          { id: "202541087414", name: "SmartHelmet.AI", status: "GRANTED" },
        ].map((p) => (
          <div key={p.id} style={{ marginBottom: "4px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ color: "#38bdf8", fontSize: "9px" }}>$</span>
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "9px" }}>patent --id</span>
              <span style={{ color: "#a78bfa", fontSize: "9px" }}>{p.id}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", paddingLeft: "12px" }}>
              <span style={{ color: "#4ade80", fontSize: "9px" }}>✓</span>
              <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "9px" }}>{p.name}</span>
              <span
                style={{
                  fontSize: "7px",
                  fontWeight: 700,
                  padding: "1px 5px",
                  borderRadius: "3px",
                  background: "rgba(74,222,128,0.15)",
                  color: "#4ade80",
                  border: "1px solid rgba(74,222,128,0.3)",
                }}
              >
                {p.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    label: "Publications",
    icon: "document",
    count: "1",
    detail: "Research paper published in JCCS journal",
    visual: (
      /* Journal spine + metadata card */
      <div
        style={{
          display: "flex",
          borderRadius: "8px",
          overflow: "hidden",
          border: "1px solid var(--neutral-border-weak)",
          marginBottom: "4px",
          height: "90px",
        }}
      >
        {/* Spine */}
        <div
          style={{
            width: "22px",
            flexShrink: 0,
            background: "linear-gradient(180deg, #06b6d4 0%, #3b82f6 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            writingMode: "vertical-rl",
          }}
        >
          <span
            style={{
              fontSize: "6px",
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "0.12em",
              transform: "rotate(180deg)",
            }}
          >
            PUBLISHED
          </span>
        </div>
        {/* Content */}
        <div
          style={{
            flex: 1,
            background: "var(--neutral-background-medium)",
            padding: "8px 10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "7px",
                fontWeight: 700,
                color: "var(--brand-on-background-strong)",
                letterSpacing: "0.06em",
                marginBottom: "3px",
              }}
            >
              JCCS · VOL 3 · ISSUE 3 · MAY 2026
            </div>
            <div
              style={{
                fontSize: "9px",
                fontWeight: 600,
                color: "var(--neutral-on-background-strong)",
                lineHeight: 1.3,
              }}
            >
              AI-Based Smart Diaper Pod for Real-Time Infant Care
            </div>
          </div>
          <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
            {["AI", "IoT", "ML"].map((t) => (
              <span
                key={t}
                style={{
                  fontSize: "7px",
                  fontWeight: 600,
                  padding: "1px 5px",
                  borderRadius: "999px",
                  background: "var(--brand-background-weak)",
                  color: "var(--brand-on-background-strong)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

function FeatCard({ feat }: { feat: (typeof feats)[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="/feats"
      style={{ textDecoration: "none" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Column
        fillWidth
        gap="s"
        padding="l"
        radius="l"
        style={{
          background: hovered
            ? "var(--neutral-background-medium)"
            : "var(--neutral-background-weak)",
          border: hovered
            ? "1px solid var(--brand-border-medium)"
            : "1px solid var(--neutral-border-weak)",
          boxShadow: hovered ? `0 0 28px var(--brand-background-medium)` : "none",
          transition: "all 0.3s ease",
          transform: hovered ? "translateY(-3px)" : "none",
          cursor: "pointer",
          height: "100%",
        }}
      >
        {feat.visual}

        <Row horizontal="between" vertical="center" fillWidth>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: hovered
                ? "var(--brand-background-medium)"
                : "var(--brand-background-weak)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease",
              flexShrink: 0,
            }}
          >
            <Icon name={feat.icon as any} onBackground="brand-medium" size="m" />
          </div>
          <Text
            variant="label-default-xs"
            onBackground="brand-medium"
            style={{
              background: "var(--brand-background-weak)",
              padding: "3px 10px",
              borderRadius: "999px",
              border: "1px solid var(--brand-border-weak)",
              fontSize: "11px",
            }}
          >
            {feat.count}
          </Text>
        </Row>

        <Column gap="2">
          <Text variant="heading-strong-m">{feat.label}</Text>
          <Text variant="body-default-s" onBackground="neutral-weak">
            {feat.detail}
          </Text>
        </Column>
      </Column>
    </a>
  );
}

export function FeatsPreview() {
  return (
    <Column fillWidth gap="l">
      <Row fillWidth horizontal="between" vertical="end" paddingX="4" wrap gap="12">
        <Column gap="4">
          <Text variant="label-default-s" onBackground="brand-medium">
            ACHIEVEMENTS
          </Text>
          <Heading as="h2" variant="display-strong-xs">
            Feats
          </Heading>
        </Column>
        <a
          href="/feats"
          style={{
            fontSize: "var(--font-size-body-s)",
            color: "var(--brand-on-background-medium)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          View all →
        </a>
      </Row>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          width: "100%",
        }}
        className="feats-grid"
      >
        {feats.map((feat) => (
          <FeatCard key={feat.label} feat={feat} />
        ))}
      </div>
    </Column>
  );
}