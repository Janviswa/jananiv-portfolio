"use client";

import { Column, Row, Heading, Text, Button, Tag } from "@once-ui-system/core";
import Image from "next/image";
import { useRef, useState } from "react";

const featured = [
  {
    slug: "checkup-buddy",
    title: "Checkup Buddy",
    description: "Multilingual disease prediction platform powered by machine learning.",
    tags: ["Machine Learning", "NLP", "Python"],
    image: "/images/projects/checkup-buddy/cover-01.jpg",
    github: "https://github.com/Janviswa",
  },
  {
    slug: "assistly",
    title: "Assistly",
    description: "AI-powered ticket routing and support assistant using LLMs and RAG.",
    tags: ["LLM", "RAG", "FastAPI"],
    image: "/images/projects/assistly/cover-01.jpg",
    github: "https://github.com/Janviswa",
  },
  {
    slug: "resolveiq",
    title: "ResolveIQ",
    description: "Intelligent support automation platform with LLM orchestration.",
    tags: ["GenAI", "LangChain", "Claude"],
    image: "/images/projects/resolveiq/cover-01.jpg",
    github: "https://github.com/Janviswa",
  },
];

function ProjectCard({ project }: { project: (typeof featured)[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Column
      fillWidth
      radius="l"
      border="neutral-alpha-weak"
      overflow="hidden"
      style={{
        background: "var(--neutral-background-weak)",
        transition: "box-shadow 0.35s ease, transform 0.35s ease",
        boxShadow: hovered
          ? "0 0 0 1px var(--brand-border-medium), 0 8px 40px var(--brand-background-medium)"
          : "0 0 0 1px var(--neutral-border-weak)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        cursor: "pointer",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image/GIF area */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16/9",
          overflow: "hidden",
          background: "var(--neutral-background-medium)",
        }}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 960px) 100vw, 640px"
          style={{
            objectFit: "cover",
            transition: "transform 0.4s ease",
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}
        />
        {/* Cyan overlay on hover */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "var(--brand-background-strong)",
            opacity: hovered ? 0.08 : 0,
            transition: "opacity 0.35s ease",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Card body */}
      <Column gap="m" padding="l">
        <Heading as="h3" variant="heading-strong-l">
          {project.title}
        </Heading>
        <Text variant="body-default-s" onBackground="neutral-weak">
          {project.description}
        </Text>
        <Row gap="8" wrap>
          {project.tags.map((t) => (
            <Tag key={t} size="s">
              {t}
            </Tag>
          ))}
        </Row>
        <Row gap="12" paddingTop="4">
          <Button
            href={`/work/${project.slug}`}
            variant="secondary"
            size="s"
            arrowIcon
          >
            Case Study
          </Button>
          <Button
            href={project.github}
            variant="tertiary"
            size="s"
            prefixIcon="github"
          >
            GitHub
          </Button>
        </Row>
      </Column>
    </Column>
  );
}

export function FeaturedProjects() {
  return (
    <Column fillWidth gap="l">
      <Row fillWidth horizontal="between" vertical="end" paddingX="4" wrap gap="12">
        <Column gap="4">
          <Text variant="label-default-s" onBackground="brand-medium">
            SELECTED WORK
          </Text>
          <Heading as="h2" variant="display-strong-xs">
            Featured Projects
          </Heading>
        </Column>
        <Button href="/work" variant="tertiary" size="s" arrowIcon>
          More projects
        </Button>
      </Row>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
          width: "100%",
        }}
      >
        {featured.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </Column>
  );
}