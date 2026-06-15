"use client";

import { useState, useRef } from "react";
import {
  Column,
  Row,
  Heading,
  Text,
  Button,
  RevealFx,
} from "@once-ui-system/core";

export function ContactCTA() {
  const cardRef = useRef<HTMLDivElement>(null);

  const [glow, setGlow] = useState({
    x: 50,
    y: 50,
  });

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    const x =
      ((e.clientX - rect.left) / rect.width) * 100;

    const y =
      ((e.clientY - rect.top) / rect.height) * 100;

    requestAnimationFrame(() => {
      setGlow({ x, y });
    });
  };

  return (
    <Column fillWidth paddingY="2" paddingX="l">
      <Column
        ref={cardRef}
        fillWidth
        radius="xl"
        overflow="hidden"
        align="center"
        horizontal="center"
        paddingTop="80"
        paddingBottom="80"
        paddingX="l"
        gap="l"
        onMouseMove={handleMouseMove}
        style={{
          position: "relative",
          cursor: "default",

          

          background:
            "var(--page-background)",

          transition:
            "transform 0.35s cubic-bezier(.22,1,.36,1), box-shadow 0.35s ease",

          
        }}
      >
        {/* Cursor Spotlight */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            width: 550,
            height: 550,
            borderRadius: "50%",

            left: `calc(${glow.x}% - 275px)`,
            top: `calc(${glow.y}% - 275px)`,

            background:
              "radial-gradient(circle, rgba(59,130,246,0.22) 0%, rgba(59,130,246,0.12) 40%, transparent 75%)",

            filter: "blur(90px)",

            pointerEvents: "none",

            transition:
              "left 0.15s ease-out, top 0.15s ease-out",

            zIndex: 0,
          }}
        />

        {/* Dot Pattern */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,

            backgroundImage:
              "radial-gradient(var(--neutral-alpha-medium) 1px, transparent 1px)",

            backgroundSize: "22px 22px",

            opacity: 0.05,

            pointerEvents: "none",

            zIndex: 0,
          }}
        />

        {/* Content */}
        <Column
          fillWidth
          align="center"
          horizontal="center"
          gap="24"
          style={{
            position: "relative",
            zIndex: 2,
          }}
        >
          <RevealFx translateY="8" delay={0.05}>
            <Column
              gap="12"
              align="center"
              horizontal="center"
              maxWidth="m"
            >
              <Heading
                variant="display-strong-m"
                align="center"
              >
                Let's Connect
              </Heading>

              <Text
                variant="body-default-l"
                onBackground="neutral-weak"
                align="center"
              >
                Open to internships, collaborations,
                and opportunities in AI and software
                engineering. Feel free to reach out.
              </Text>
            </Column>
          </RevealFx>

          <RevealFx translateY="8" delay={0.15}>
            <Row
              gap="16"
              horizontal="center"
              vertical="center"
              style={{
                width: "100%",
                justifyContent: "center",
              }}
            >
              <Button
                href="mailto:jananiviswa05@gmail.com"
                variant="primary"
                size="m"
                prefixIcon="email"
              >
                Email Me
              </Button>

              <Button
                href="/contact"
                variant="secondary"
                size="m"
                arrowIcon
              >
                Contact
              </Button>
            </Row>
          </RevealFx>
        </Column>
      </Column>
    </Column>
  );
}