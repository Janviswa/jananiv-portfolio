"use client";

import { useEffect, useRef, useState } from "react";
import { Column, Row, Button, Heading, Text } from "@once-ui-system/core";
import { ProjectCard } from "@/components";

type ProjectItem = {
  slug: string;
  images: string[];
  title: string;
  summary: string;
  content: string;
  avatars: { src: string }[];
  link: string;
};

function RevealCard({ project, index }: { project: ProjectItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0) scale(1)"
          : "translateY(52px) scale(0.98)",
        transition: [
          `opacity 0.7s cubic-bezier(.22,1,.36,1) ${index * 120}ms`,
          `transform 0.7s cubic-bezier(.22,1,.36,1) ${index * 120}ms`,
        ].join(", "),
      }}
    >
      <ProjectCard
        priority={index < 2}
        href={`/work/${project.slug}`}
        images={project.images}
        title={project.title}
        description={project.summary}
        content={project.content}
        avatars={project.avatars}
        link={project.link}
      />
    </div>
  );
}

export function HomeProjectsClient({ projects }: { projects: ProjectItem[] }) {
  return (
    <Column fillWidth gap="xl" paddingX="l">
      {/* Section header */}
      <Row fillWidth horizontal="between" vertical="end" paddingBottom="4">
        <Column gap="4">
          <Text variant="label-default-s" onBackground="brand-medium">
            SELECTED WORK
          </Text>
          <Heading as="h2" variant="display-strong-xs">
            Featured Projects
          </Heading>
        </Column>
      </Row>

      {/* Scroll-reveal project cards */}
      {projects.map((project, index) => (
        <RevealCard key={project.slug} project={project} index={index} />
      ))}

      {/* More projects button */}
      <Row horizontal="center" paddingTop="8">
        <Button href="/work" variant="secondary" size="m" arrowIcon>
          More projects
        </Button>
      </Row>
    </Column>
  );
}