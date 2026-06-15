"use client";

import { Column, Row, Heading, Text, Icon } from "@once-ui-system/core";
import { useState } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";

const skills = [
  {
    label: "AI & Machine Learning",
    icon: "brain",
    detail: "Supervised, unsupervised & deep learning",
    color: "var(--brand-background-strong)",
  },
  {
    label: "LLMs & GenAI",
    icon: "rocket",
    detail: "LangChain, RAG pipelines, prompt engineering",
    color: "var(--brand-background-strong)",
  },
  {
    label: "Natural Language Processing",
    icon: "chat",
    detail: "NLTK, Transformers, text classification",
    color: "var(--brand-background-strong)",
  },
  {
    label: "Computer Vision",
    icon: "eye",
    detail: "TensorFlow, image classification, detection",
    color: "var(--brand-background-strong)",
  },
  {
    label: "Web Development",
    icon: "code",
    detail: "React, Next.js, FastAPI, Streamlit",
    color: "var(--brand-background-strong)",
  },
  {
    label: "Developer Tools",
    icon: "cpu",
    detail: "Git, Docker, PostgreSQL",
    color: "var(--brand-background-strong)",
  },
];

function SkillCard({ skill }: { skill: (typeof skills)[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="/skills"
      style={{ textDecoration: "none" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Column
        gap="s"
        padding="m"
        radius="m"
        style={{
          background: hovered
            ? "var(--neutral-background-medium)"
            : "var(--neutral-background-weak)",
          border: hovered
            ? "1px solid var(--brand-border-medium)"
            : "1px solid var(--neutral-border-weak)",
          boxShadow: hovered
            ? `0 0 20px var(--brand-background-medium)`
            : "none",
          transition: "all 0.3s ease",
          transform: hovered ? "translateY(-2px)" : "none",
          cursor: "pointer",
          height: "100%",
        }}
      >
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "8px",
            background: hovered
              ? "var(--brand-background-medium)"
              : "var(--brand-background-weak)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease",
          }}
        >
          <Icon name={skill.icon as any} onBackground="brand-medium" size="m" />
        </div>
        <Text variant="label-default-m" onBackground="neutral-strong">
          {skill.label}
        </Text>
        <Text variant="body-default-xs" onBackground="neutral-weak">
          {skill.detail}
        </Text>
      </Column>
    </a>
  );
}

export function SkillsSnapshot() {
  return (
    <Column fillWidth gap="l">
      <Row fillWidth horizontal="between" vertical="end" paddingX="4" wrap gap="12">
        <Column gap="4">
          <Text variant="label-default-s" onBackground="brand-medium">
            EXPERTISE
          </Text>
          <Heading as="h2" variant="display-strong-xs">
            Skills Snapshot
          </Heading>
        </Column>
        <a
          href="/skills"
          style={{
            fontSize: "var(--font-size-body-s)",
            color: "var(--brand-on-background-medium)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          View all skills →
        </a>
      </Row>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
          width: "100%",
        }}
        className="skills-grid"
      >
        {skills.map((skill, i) => (
          <ScrollReveal
            key={skill.label}
            translateY={20}
            delay={i * 80}
            threshold={0.2}
            style={{ height: "100%" }}
          >
            <SkillCard skill={skill} />
          </ScrollReveal>
        ))}
      </div>
    </Column>
  );
}