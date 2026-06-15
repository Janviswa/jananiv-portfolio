"use client";
import { Text, Row, Tag } from "@once-ui-system/core";

interface Publication {
  title: string;
  journal: string;
  publisher: string;
  issn: string;
  volume: string;
  issue: string;
  date: string;
  description: string;
  tags: string[];
}

export function PublicationCard({ pub }: { pub: Publication }) {
  return (
    <div className="pub-card-wrap">
      <div
        className="pub-card"
        style={{
          display: "flex",
          borderRadius: "12px",
          overflow: "hidden",
          border: "0.5px solid var(--neutral-alpha-weak)",
          background: "var(--neutral-background-weak)",
        }}
      >
        {/* Left sidebar — "PUBLISHED" vertical label */}
        <div
          className="pub-status-bar"
          style={{
            width: "56px",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            borderRight: "0.5px solid var(--neutral-alpha-weak)",
          }}
        >
          <span
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              color: "var(--neutral-on-background-strong)",
            }}
          >
            Published
          </span>
        </div>

        {/* Right content */}
        <div
          style={{
            flex: 1,
            padding: "28px 28px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          {/* Journal */}
          <span
            style={{
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--brand-on-background-medium)",
            }}
          >
            {pub.journal}
          </span>

          {/* Title */}
          <Text variant="heading-strong-m" onBackground="neutral-strong">
            {pub.title}
          </Text>

          {/* Meta tags */}
          <Row gap="8" wrap vertical="center">
            <Tag size="s">{pub.publisher}</Tag>
            <Tag size="s">ISSN: {pub.issn}</Tag>
            <Tag size="s">Vol. {pub.volume}, Issue {pub.issue}</Tag>
            <Tag size="s">{pub.date}</Tag>
          </Row>


          {/* Description */}
          <Text
            variant="body-default-s"
            onBackground="neutral-weak"
            style={{ lineHeight: 1.7 }}
          >
            {pub.description}
          </Text>

          {/* Tech tags */}
          <Row gap="8" wrap>
            {pub.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  fontSize: "12px",
                  fontWeight: 500,
                  padding: "4px 12px",
                  borderRadius: "20px",
                  background: "var(--neutral-alpha-weak)",
                  border: "0.5px solid var(--neutral-alpha-medium)",
                  color: "var(--neutral-on-background-strong)",
                }}
              >
                {tag}
              </span>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
}