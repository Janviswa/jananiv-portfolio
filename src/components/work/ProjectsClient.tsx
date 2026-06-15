"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Column, Heading, Row, Text } from "@once-ui-system/core";
import { ProjectCard } from "@/components";

type ProjectItem = {
  slug: string;
  images: string[];
  title: string;
  summary: string;
  content: string;
  avatars: { src: string }[];
  link: string;
  tags: string[];
};

interface ProjectsClientProps {
  projects: ProjectItem[];
  showFilter?: boolean;
}

const FILTERS = [
  "All",
  "LLM & RAG",
  "Machine Learning",
  "Computer Vision",
  "Web Applications",
  "IoT",
];

function projectMatchesFilter(tags: string[] | undefined, filter: string) {
  if (filter === "All") return true;
  if (!tags || tags.length === 0) return false;

  const normalizedFilter = filter.toLowerCase();

  return tags.some((tag) => {
    const t = tag.toLowerCase();
    if (normalizedFilter === "web apps") return t.includes("web");
    return t.includes(normalizedFilter) || normalizedFilter.includes(t);
  });
}

/** A single project card that fades + slides in when scrolled into view */
function RevealCard({
  post,
  index,
  priority,
  revealKey,
}: {
  post: ProjectItem;
  index: number;
  priority: boolean;
  revealKey: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Reset on every filter change so cards re-animate in
    setVisible(false);

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revealKey]);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(48px) scale(0.98)",
        transition: `opacity 0.6s cubic-bezier(.22,1,.36,1) ${index * 0.07}s, transform 0.6s cubic-bezier(.22,1,.36,1) ${index * 0.07}s`,
      }}
    >
      <ProjectCard
        priority={priority}
        href={`/work/${post.slug}`}
        images={post.images}
        title={post.title}
        description={post.summary}
        content={post.content}
        avatars={post.avatars}
        link={post.link}
      />
    </div>
  );
}

export function ProjectsClient({ projects, showFilter = false }: ProjectsClientProps) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    for (const filter of FILTERS) {
      map[filter] = projects.filter((post) => projectMatchesFilter(post.tags, filter)).length;
    }
    return map;
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (!showFilter) return projects;
    return projects.filter((post) => projectMatchesFilter(post.tags, activeFilter));
  }, [projects, activeFilter, showFilter]);

  // Close dropdown on outside click / Escape
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <Column fillWidth gap="l" marginBottom="40">
      {showFilter && (
        <Column fillWidth align="center" horizontal="center" gap="m">
          {/* Command-palette style filter trigger */}
          <div className="cmdf-wrapper" ref={wrapperRef}>
            <button
              className={`cmdf-trigger ${open ? "open" : ""}`}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="cmdf-glow" aria-hidden />
              <span className="cmdf-prompt">{">"}</span>
              <span className="cmdf-label">
                filter<span className="cmdf-colon">:</span>
                <span className="cmdf-value"> {activeFilter}</span>
              </span>
              <span key={activeFilter} className="cmdf-count cmdf-count-pop">
                {filteredProjects.length}
              </span>
              <span className={`cmdf-chevron ${open ? "open" : ""}`}>⌄</span>
            </button>

            {/* Dropdown */}
            <div className={`cmdf-dropdown ${open ? "open" : ""}`}>
              {FILTERS.map((filter, i) => {
                const active = activeFilter === filter;
                const count = counts[filter] ?? 0;
                const disabled = count === 0 && filter !== "All";
                return (
                  <button
                    key={filter}
                    className={`cmdf-item ${active ? "active" : ""}`}
                    disabled={disabled}
                    style={{ transitionDelay: open ? `${i * 0.035}s` : "0s" }}
                    onClick={() => {
                      setActiveFilter(filter);
                      setOpen(false);
                    }}
                  >
                    <span className="cmdf-item-marker">{active ? "›" : " "}</span>
                    <span className="cmdf-item-label">{filter}</span>
                    <span className={`cmdf-item-count ${active ? "active" : ""}`}>{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Live result heading */}
          <Row
            horizontal="center"
            gap="8"
            vertical="center"
            key={activeFilter}
            style={{ animation: "filterHeadingFade 0.4s cubic-bezier(.22,1,.36,1)" }}
          >
            <Heading as="h2" variant="display-strong-xs" align="center">
              {activeFilter === "All" ? "All Projects" : activeFilter}
            </Heading>
            <span className="cmdf-result-count">{filteredProjects.length}</span>
          </Row>
        </Column>
      )}

      <Column fillWidth gap="xl" paddingX="l">
        {filteredProjects.length === 0 ? (
          <Text
            key={activeFilter}
            align="center"
            variant="body-default-m"
            onBackground="neutral-weak"
            paddingY="40"
            style={{ animation: "filterHeadingFade 0.4s ease" }}
          >
            No projects found for "{activeFilter}".
          </Text>
        ) : (
          filteredProjects.map((post, index) => (
            <RevealCard
              key={`${activeFilter}-${post.slug}`}
              post={post}
              index={index}
              priority={index < 2}
              revealKey={activeFilter}
            />
          ))
        )}
      </Column>

      <style>{`
        @keyframes filterHeadingFade {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes cmdf-blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        @keyframes cmdf-glow-pulse {
          0%, 100% { opacity: 0.35; }
          50%      { opacity: 0.7; }
        }

        @keyframes cmdf-count-pop {
          0%   { transform: scale(0.5); opacity: 0; }
          60%  { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }

        .cmdf-wrapper {
          position: relative;
          width: 100%;
          max-width: 440px;
        }

        .cmdf-trigger {
          position: relative;
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 18px;
          border-radius: 14px;
          border: 1px solid var(--neutral-border-weak);
          background: var(--neutral-background-weak);
          backdrop-filter: blur(14px);
          font-family: var(--font-mono, monospace);
          font-size: 14px;
          color: var(--neutral-on-background-strong);
          cursor: pointer;
          overflow: hidden;
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease;
        }

        .cmdf-trigger:hover {
          border-color: var(--brand-border-medium);
          transform: translateY(-1px);
        }

        .cmdf-trigger.open {
          border-color: var(--brand-border-strong);
          box-shadow: 0 0 0 1px var(--brand-border-medium), 0 12px 40px var(--brand-background-medium);
        }

        /* Soft animated glow sweeping behind the trigger */
        .cmdf-glow {
          position: absolute;
          inset: -40%;
          background: radial-gradient(circle at 30% 50%, var(--brand-background-strong), transparent 60%);
          opacity: 0.35;
          animation: cmdf-glow-pulse 4s ease-in-out infinite;
          pointer-events: none;
          z-index: 0;
        }

        .cmdf-prompt {
          position: relative;
          z-index: 1;
          color: var(--brand-on-background-strong);
          font-weight: 700;
        }

        .cmdf-label {
          position: relative;
          z-index: 1;
          flex: 1;
          text-align: left;
          color: var(--neutral-on-background-weak);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .cmdf-colon {
          color: var(--neutral-on-background-weak);
        }

        .cmdf-value {
          color: var(--brand-on-background-strong);
          font-weight: 600;
        }

        .cmdf-value::after {
          content: "";
          display: inline-block;
          width: 7px;
          height: 15px;
          margin-left: 5px;
          vertical-align: -2px;
          background: var(--brand-on-background-strong);
          animation: cmdf-blink 1s step-end infinite;
        }

        .cmdf-count {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 24px;
          height: 24px;
          padding: 0 7px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 700;
          background: var(--brand-background-medium);
          color: var(--brand-on-background-strong);
          border: 1px solid var(--brand-border-weak);
        }

        .cmdf-count-pop {
          animation: cmdf-count-pop 0.4s cubic-bezier(.22,1,.36,1);
        }

        .cmdf-chevron {
          position: relative;
          z-index: 1;
          font-family: sans-serif;
          color: var(--neutral-on-background-weak);
          transition: transform 0.35s cubic-bezier(.22,1,.36,1), color 0.3s ease;
        }

        .cmdf-chevron.open {
          transform: rotate(180deg);
          color: var(--brand-on-background-strong);
        }

        /* Dropdown */
        .cmdf-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          left: 0;
          right: 0;
          z-index: 20;
          display: flex;
          flex-direction: column;
          padding: 8px;
          border-radius: 14px;
          border: 1px solid var(--neutral-border-weak);
          background: var(--neutral-background-strong);
          backdrop-filter: blur(20px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px var(--brand-alpha-weak);
          opacity: 0;
          transform: translateY(-10px) scale(0.97);
          pointer-events: none;
          transform-origin: top center;
          transition: opacity 0.25s ease, transform 0.3s cubic-bezier(.22,1,.36,1);
        }

        .cmdf-dropdown.open {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }

        .cmdf-item {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 11px 12px;
          border-radius: 9px;
          border: none;
          background: transparent;
          color: var(--neutral-on-background-weak);
          font-family: var(--font-mono, monospace);
          font-size: 13px;
          text-align: left;
          cursor: pointer;
          opacity: 0;
          transform: translateY(-6px);
          transition: background 0.2s ease, color 0.2s ease, opacity 0.3s ease, transform 0.3s ease, padding-left 0.2s ease;
        }

        .cmdf-dropdown.open .cmdf-item {
          opacity: 1;
          transform: translateY(0);
        }

        .cmdf-item:hover:not(:disabled) {
          background: var(--neutral-background-medium);
          color: var(--neutral-on-background-strong);
          padding-left: 16px;
          box-shadow: inset 0 0 0 1px var(--brand-alpha-weak);
        }

        .cmdf-item.active {
          color: var(--brand-on-background-strong);
          background: var(--brand-alpha-weak);
          font-weight: 600;
        }

        .cmdf-item:disabled {
          opacity: 0.3 !important;
          cursor: not-allowed;
        }

        .cmdf-item-marker {
          width: 12px;
          color: var(--brand-on-background-strong);
          font-weight: 700;
          transition: transform 0.2s ease;
        }

        .cmdf-item-label {
          flex: 1;
        }

        .cmdf-item-count {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 20px;
          height: 20px;
          padding: 0 6px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 700;
          background: var(--neutral-background-medium);
          color: var(--neutral-on-background-weak);
          transition: background 0.25s ease, color 0.25s ease;
        }

        .cmdf-item-count.active {
          background: var(--brand-background-strong);
          color: var(--brand-on-background-strong);
        }

        .cmdf-result-count {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 28px;
          height: 28px;
          padding: 0 8px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 600;
          background: var(--brand-background-medium);
          color: var(--brand-on-background-strong);
          border: 1px solid var(--brand-border-medium);
          animation: cmdf-count-pop 0.4s cubic-bezier(.22,1,.36,1);
        }
      `}</style>
    </Column>
  );
}