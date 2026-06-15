"use client";

import { useState, useRef } from "react";
import { Icon } from "@once-ui-system/core";

interface Technology {
  name: string;
  icon: string;
}

interface Certification {
  name: string;
  link: string;
}

interface SkillGroup {
  title: string;
  icon: string;
  description: string;
  technologies: Technology[];
  projects: string[];
  certifications?: Certification[];
}

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <span
    style={{
      fontSize: "10px",
      fontWeight: 600,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: "var(--neutral-on-background-weak)",
    }}
  >
    {children}
  </span>
);

const TagRow = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>{children}</div>
);

export function SkillCard({ group }: { group: SkillGroup }) {
  const [open, setOpen] = useState(false);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, visible: false });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setSpotlight({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      visible: true,
    });
  };

  const handleMouseLeave = () => setSpotlight((s) => ({ ...s, visible: false }));

  const techTag = (delay: number, key: string, icon: string, label: string) => (
    <span
      key={key}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        fontSize: "12px",
        fontWeight: 500,
        padding: "4px 11px",
        borderRadius: "20px",
        // Works in both modes via CSS vars
        background: "var(--brand-alpha-weak)",
        border: "1px solid var(--brand-alpha-medium)",
        color: "var(--brand-on-background-strong)",
        opacity: open ? 1 : 0,
        transform: open ? "translateY(0)" : "translateY(4px)",
        transition: `opacity 0.25s ease ${delay}s, transform 0.25s ease ${delay}s`,
      }}
    >
      <Icon name={icon as any} size="xs" onBackground="brand-medium" />
      {label}
    </span>
  );

  const projTag = (delay: number, key: string, label: string) => (
    <span
      key={key}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        fontSize: "12px",
        fontWeight: 500,
        padding: "4px 11px",
        borderRadius: "20px",
        background: "var(--neutral-alpha-weak)",
        border: "1px solid var(--neutral-alpha-medium)",
        color: "var(--neutral-on-background-strong)",
        opacity: open ? 1 : 0,
        transform: open ? "translateY(0)" : "translateY(4px)",
        transition: `opacity 0.25s ease ${delay}s, transform 0.25s ease ${delay}s`,
      }}
    >
      <Icon name="folder" size="xs" onBackground="neutral-medium" />
      {label}
    </span>
  );

  const certTag = (delay: number, key: string, label: string, href: string) => (
    <a
      key={key}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        fontSize: "12px",
        fontWeight: 500,
        padding: "4px 11px",
        borderRadius: "20px",
        background: "var(--info-alpha-weak)",
        border: "1px solid var(--info-alpha-medium)",
        color: "var(--info-on-background-strong)",
        textDecoration: "none",
        opacity: open ? 1 : 0,
        transform: open ? "translateY(0)" : "translateY(4px)",
        transition: `opacity 0.25s ease ${delay}s, transform 0.25s ease ${delay}s`,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
    >
      <Icon name="trophy" size="xs" onBackground="info-medium" />
      {label}
    </a>
  );

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        border: "0.5px solid var(--neutral-alpha-weak)",
        borderLeft: `3px solid ${open ? "var(--brand-solid-strong)" : "var(--brand-solid-medium)"}`,
        borderRadius: "12px",
        overflow: "hidden",
        background: "var(--neutral-background-weak)",
        transition: "box-shadow 0.25s ease, border-color 0.25s ease",
        boxShadow: open ? "0 6px 24px -6px rgba(0,0,0,0.15)" : "none",
      }}
    >
      {/* Blue spotlight */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          borderRadius: "12px",
          background: `radial-gradient(350px circle at ${spotlight.x}% ${spotlight.y}%, rgba(55,138,221,0.12), transparent 70%)`,
          opacity: spotlight.visible ? 1 : 0,
          transition: "opacity 0.3s ease",
          zIndex: 0,
        }}
      />

      {/* Header */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "14px 16px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          borderBottom: open
            ? "0.5px solid var(--neutral-alpha-weak)"
            : "0.5px solid transparent",
          transition: "border-color 0.25s ease",
        }}
      >
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            background: open
              ? "var(--brand-background-medium)"
              : "var(--brand-background-weak)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "background 0.25s ease, transform 0.25s ease",
            transform: open ? "rotate(-8deg) scale(1.08)" : "rotate(0deg) scale(1)",
          }}
        >
          <Icon name={group.icon as any} size="s" onBackground="brand-medium" />
        </div>

        <span
          style={{
            flex: 1,
            fontSize: "15px",
            fontWeight: 600,
            color: "var(--neutral-on-background-strong)",
          }}
        >
          {group.title}
        </span>

        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          style={{
            flexShrink: 0,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            color: "var(--neutral-on-background-weak)",
          }}
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Body */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <div
            style={{
              padding: "18px 18px 18px 60px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(-6px)",
              transition: "opacity 0.3s ease 0.05s, transform 0.3s ease 0.05s",
            }}
          >
            <p
              style={{
                fontSize: "13px",
                color: "var(--neutral-on-background-weak)",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {group.description}
            </p>

            {/* Technologies */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <SectionLabel>Technologies</SectionLabel>
              <TagRow>
                {group.technologies.map((tech, i) =>
                  techTag(0.1 + i * 0.04, tech.name, tech.icon, tech.name)
                )}
              </TagRow>
            </div>

            {/* Projects */}
            {group.projects.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <SectionLabel>Related projects</SectionLabel>
                <TagRow>
                  {group.projects.map((proj, i) =>
                    projTag(0.18 + i * 0.04, proj, proj)
                  )}
                </TagRow>
              </div>
            )}

            {/* Certifications */}
            {group.certifications && group.certifications.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <SectionLabel>Certifications</SectionLabel>
                <TagRow>
                  {group.certifications.map((cert, i) =>
                    certTag(0.24 + i * 0.04, cert.name, cert.name, cert.link)
                  )}
                </TagRow>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}