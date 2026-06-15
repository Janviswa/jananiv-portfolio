"use client";

import React, { useEffect, useState } from "react";
import { Column, Flex, Text } from "@once-ui-system/core";
import styles from "./about.module.scss";

interface TableOfContentsProps {
  structure: {
    title: string;
    display: boolean;
    items: string[];
  }[];
  about: {
    tableOfContent: {
      display: boolean;
      subItems: boolean;
    };
  };
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ structure, about }) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const scrollTo = (id: string, offset: number) => {
    // Set active immediately on click — don't wait for scroll event
    setActiveId(id);

    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const ids = structure
      .filter((section) => section.display)
      .flatMap((section) => [section.title, ...section.items]);

    const updateActive = () => {
      const referenceLine = window.innerHeight * 0.3;
      let currentId: string | null = null;
      let currentTop = -Infinity;

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= referenceLine && top > currentTop) {
          currentTop = top;
          currentId = id;
        }
      }

      // Fallback: if nothing has passed the reference line yet, use the first id
      if (!currentId && ids.length > 0) {
        currentId = ids[0];
      }

      setActiveId(currentId);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);

    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [structure]);

  if (!about.tableOfContent.display) return null;

  return (
    <Column
      left="0"
      style={{
        top: "50%",
        transform: "translateY(-50%)",
        whiteSpace: "nowrap",
      }}
      position="fixed"
      paddingLeft="24"
      gap="32"
      m={{ hide: true }}
    >
      {structure
        .filter((section) => section.display)
        .map((section, sectionIndex) => {
          const isActive = activeId === section.title;
          return (
            <Column key={sectionIndex} gap="12">
              <Flex
                cursor="interactive"
                className={styles.hover}
                gap="8"
                vertical="center"
                onClick={() => scrollTo(section.title, 80)}
              >
                <Flex
                  height="1"
                  minWidth="16"
                  background={isActive ? "brand-medium" : "neutral-strong"}
                  style={{ transition: "background 0.3s ease" }}
                ></Flex>
                <Text
                  onBackground={isActive ? "brand-medium" : undefined}
                  style={{ transition: "color 0.3s ease" }}
                >
                  {section.title}
                </Text>
              </Flex>
              {about.tableOfContent.subItems && (
                <>
                  {section.items.map((item, itemIndex) => {
                    const isItemActive = activeId === item;
                    return (
                      <Flex
                        l={{ hide: true }}
                        key={itemIndex}
                        style={{ cursor: "pointer" }}
                        className={styles.hover}
                        gap="12"
                        paddingLeft="24"
                        vertical="center"
                        onClick={() => scrollTo(item, 80)}
                      >
                        <Flex
                          height="1"
                          minWidth="8"
                          background={isItemActive ? "brand-medium" : "neutral-strong"}
                          style={{ transition: "background 0.3s ease" }}
                        ></Flex>
                        <Text
                          onBackground={isItemActive ? "brand-medium" : undefined}
                          style={{ transition: "color 0.3s ease" }}
                        >
                          {item}
                        </Text>
                      </Flex>
                    );
                  })}
                </>
              )}
            </Column>
          );
        })}
    </Column>
  );
};

export default TableOfContents;