import {
  Avatar,
  Button,
  Column,
  Heading,
  Icon,
  IconButton,
  Media,
  Tag,
  Text,
  Meta,
  Schema,
  Row,
} from "@once-ui-system/core";
import { baseURL, about, person, social } from "@/resources";
import TableOfContents from "@/components/about/TableOfContents";
import TerminalWrap from "@/components/about/TerminalWrap";
import { ScrollReveal } from "@/components/ScrollReveal";
import styles from "@/components/about/about.module.scss";
import React from "react";

export async function generateMetadata() {
  return Meta.generate({
    title: about.title,
    description: about.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(about.title)}`,
    path: about.path,
  });
}

export default function About() {
  const structure = [
    {
      title: about.intro.title,
      display: about.intro.display,
      items: [],
    },
    {
      title: about.work.title,
      display: about.work.display,
      items: about.work.experiences.map((experience) => experience.company),
    },
    {
      title: about.studies.title,
      display: about.studies.display,
      items: about.studies.institutions.map((institution) => institution.name),
    },
    {
      title: about.technical.title,
      display: about.technical.display,
      items: about.technical.skills.map((skill) => skill.title),
    },
  ];

  return (
    <Column maxWidth="m">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={about.description}
        path={about.path}
        image={`/api/og/generate?title=${encodeURIComponent(about.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      {about.tableOfContent.display && (
        <Column
          left="0"
          style={{ top: "50%", transform: "translateY(-50%)" }}
          position="fixed"
          paddingLeft="24"
          gap="32"
          s={{ hide: true }}
        >
          <TableOfContents structure={structure} about={about} />
        </Column>
      )}

      <Row fillWidth s={{ direction: "column" }} horizontal="center">
        {/* ── SIDEBAR ── */}
        {about.avatar.display && (
          <Column
            className={styles.avatar}
            top="64"
            fitHeight
            position="sticky"
            s={{ position: "relative", style: { top: "auto" } }}
            xs={{ style: { top: "auto" } }}
            minWidth="160"
            paddingX="l"
            paddingBottom="xl"
            gap="m"
            flex={3}
            horizontal="center"
          >
            {/* Avatar with blue glow ring */}
            <div
              data-about-avatar
              style={{
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Glow ring */}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: "-4px",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, #3b82f6 0%, #1d4ed8 40%, transparent 70%)",
                  opacity: 0.55,
                  animation: "glowPulse 3s ease-in-out infinite",
                  zIndex: 0,
                }}
              />
              <div style={{ position: "relative", zIndex: 1 }}>
                <Avatar src={person.avatar} size="xl" />
              </div>
            </div>

            {/* Location: India / Kanchipuram */}
            <Row gap="8" vertical="center">
              <Icon onBackground="accent-weak" name="globe" />
              <Text variant="body-default-s" onBackground="neutral-weak">
                India / Chennai
              </Text>
            </Row>

            {person.languages && person.languages.length > 0 && (
              <Row wrap gap="8">
                {person.languages.map((language, index) => (
                  <Tag key={index} size="l">
                    {language}
                  </Tag>
                ))}
              </Row>
            )}
          </Column>
        )}

        {/* ── MAIN CONTENT ── */}
        <Column className={styles.blockAlign} flex={9} maxWidth={40}>

          {/* Name / Role / Social */}
          <Column
            id={about.intro.title}
            fillWidth
            minHeight="160"
            vertical="center"
            marginBottom="32"
          >
            <Heading className={styles.textAlign} variant="display-strong-xl">
              {person.name}
            </Heading>
            {social.length > 0 && (
              <Row
                className={styles.blockAlign}
                paddingTop="20"
                paddingBottom="8"
                gap="8"
                wrap
                horizontal="center"
                fitWidth
                data-border="rounded"
              >
                {social
                  .filter((item) => item.essential)
                  .map((item) =>
                    item.link ? (
                      <React.Fragment key={item.name}>
                        <Row s={{ hide: true }}>
                          <Button
                            href={item.link}
                            prefixIcon={item.icon}
                            label={item.name}
                            size="s"
                            weight="default"
                            variant="secondary"
                          />
                        </Row>
                        <Row hide s={{ hide: false }}>
                          <IconButton
                            size="l"
                            href={item.link}
                            icon={item.icon}
                            variant="secondary"
                          />
                        </Row>
                      </React.Fragment>
                    ) : null
                  )}
              </Row>
            )}
          </Column>

          {/* Introduction */}
          {about.intro.display && (
            <ScrollReveal translateY={24} style={{ width: "100%" }}>
              <TerminalWrap>
                {/* Touch / small screens: little photo badge with an arrow (plays when scrolled into view) */}
                <div className={styles.mobileTag} aria-hidden>
                  <span className={styles.mobileLabel}>that&apos;s me!</span>
                  <svg className={styles.mobileArrow} viewBox="0 0 48 40" width="48" height="40" fill="none">
                    <path className={styles.mArrowPath} d="M2 10 C16 -2 38 4 42 26" pathLength="1" />
                    <path className={styles.mArrowHead} d="M35 15 L42 27 L48 14" />
                  </svg>
                  <span className={styles.chip}>
                    <Avatar src={person.avatar} size="l" />
                  </span>
                </div>

                <div className={styles.terminal}>
                  {/* Title bar */}
                  <div className={styles.terminalBar}>
                    <span className={styles.dots} aria-hidden>
                      <i style={{ background: "#ff5f56" }} />
                      <i style={{ background: "#ffbd2e" }} />
                      <i style={{ background: "#27c93f" }} />
                    </span>
                    <span className={styles.terminalName}>about_me.py</span>
                    <span className={styles.terminalSpacer} aria-hidden />
                  </div>

                  {/* Body */}
                  <div className={styles.terminalBody}>
                    <div className={styles.prompt}>
                      <span className={styles.promptSign}>$</span> python about_me.py
                    </div>
                    <div className={styles.docstring}>
                      <span className={styles.quote}>"""</span>
                      <Column textVariant="body-default-m" fillWidth gap="m" className={styles.docText}>
                        {about.intro.description}
                      </Column>
                      <span className={styles.quote}>"""</span>
                    </div>
                    <div className={styles.prompt}>
                      <span className={styles.promptSign}>$</span>
                      <span className={styles.cursor} aria-hidden />
                    </div>
                  </div>
                </div>
              </TerminalWrap>
            </ScrollReveal>
          )}

          {/* Work Experience */}
          {about.work.display && (
            <>
              <Heading as="h2" id={about.work.title} variant="display-strong-s" marginBottom="m">
                {about.work.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.work.experiences.map((experience, index) => (
                  <ScrollReveal
                    key={`${experience.company}-${index}`}
                    translateY={24}
                    threshold={0.05}
                    style={{ width: "100%" }}
                  >
                  <Column fillWidth>
                    <Row fillWidth horizontal="between" vertical="end" marginBottom="4">
                      <Text id={experience.company} variant="heading-strong-l">
                        {experience.company}
                      </Text>
                      <Text variant="heading-default-xs" onBackground="neutral-weak">
                        {experience.timeframe}
                      </Text>
                    </Row>
                    <Text
                      variant="body-default-s"
                      onBackground="brand-weak"
                      marginBottom="m"
                    >
                      {experience.role}
                    </Text>
                    <Column as="ul" gap="16">
                      {experience.achievements.map(
                        (achievement: React.ReactNode, i: number) => (
                          <Text
                            as="li"
                            variant="body-default-m"
                            key={`${experience.company}-${i}`}
                          >
                            {achievement}
                          </Text>
                        )
                      )}
                    </Column>

                    {/* Project preview — shown when projectLink is set */}
                    {experience.projectLink && (
                      <Row
                        fillWidth
                        paddingTop="m"
                        paddingLeft="40"
                        s={{ paddingLeft: "0" }}
                      >
                        <a
                          href={experience.projectLink}
                          style={{
                            display: "block",
                            width: "100%",
                            maxWidth: "420px",
                            textDecoration: "none",
                          }}
                        >
                          <Column
                            fillWidth
                            border="neutral-medium"
                            radius="l"
                            background="neutral-alpha-weak"
                            overflow="hidden"
                            position="relative"
                            className={styles.projectPreview}
                          >
                            {experience.images && experience.images.length > 0 && (
                              <Media
                                radius="none"
                                aspectRatio="16 / 9"
                                sizes="420px"
                                alt={experience.images[0].alt}
                                src={experience.images[0].src}
                              />
                            )}
                            <Row
                              fillWidth
                              padding="m"
                              horizontal="between"
                              vertical="center"
                              gap="12"
                              position="absolute"
                              bottom="0"
                              left="0"
                              className={styles.projectOverlay}
                            >
                              <Column gap="2">
                                <Text variant="heading-strong-s" style={{ color: "#ffffff" }}>
                                  {experience.projectLabel ?? "View Project"}
                                </Text>
                                <Text variant="body-default-xs" style={{ color: "rgba(255,255,255,0.75)" }}>
                                  Explore the full case study
                                </Text>
                              </Column>
                              <Icon name="arrowRight" style={{ color: "#ffffff" }} />
                            </Row>
                          </Column>
                        </a>
                      </Row>
                    )}

                    {!experience.projectLink && experience.images && experience.images.length > 0 && (
                      <Row fillWidth paddingTop="m" paddingLeft="40" gap="12" wrap>
                        {experience.images.map((image, i) => (
                          <Row
                            key={i}
                            border="neutral-medium"
                            radius="m"
                            minWidth={image.width}
                            height={image.height}
                          >
                            <Media
                              enlarge
                              radius="m"
                              sizes={image.width.toString()}
                              alt={image.alt}
                              src={image.src}
                            />
                          </Row>
                        ))}
                      </Row>
                    )}
                  </Column>
                  </ScrollReveal>
                ))}
              </Column>
            </>
          )}

          {/* Studies */}
          {about.studies.display && (
            <>
              <Heading
                as="h2"
                id={about.studies.title}
                variant="display-strong-s"
                marginBottom="m"
              >
                {about.studies.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.studies.institutions.map((institution, index) => (
                  <ScrollReveal
                    key={`${institution.name}-${index}`}
                    translateY={24}
                    threshold={0.1}
                    style={{ width: "100%" }}
                  >
                  <Column
                    fillWidth
                    gap="4"
                    padding="l"
                    radius="l"
                    border="neutral-alpha-weak"
                    background="neutral-alpha-weak"
                    className={styles.studyCard}
                  >
                    <Text id={institution.name} variant="heading-strong-l" className={styles.studyName}>
                      {institution.name}
                    </Text>
                    <Text variant="body-default-m" onBackground="neutral-weak">
                      {institution.description}
                    </Text>
                  </Column>
                  </ScrollReveal>
                ))}
              </Column>
            </>
          )}

          {/* Interests */}
          {about.technical.display && (
            <>
              <Heading
                as="h2"
                id={about.technical.title}
                variant="display-strong-s"
                marginBottom="40"
              >
                {about.technical.title}
              </Heading>
              <Column fillWidth gap="40">
                {about.technical.skills.map((skill, index) => (
                  <ScrollReveal
                    key={`${skill.title}-${index}`}
                    translateY={24}
                    threshold={0.1}
                    style={{ width: "100%" }}
                  >
                  <Column fillWidth gap="8">
                    <Heading
                      as="h3"
                      id={skill.title}
                      variant="heading-strong-l"
                      marginBottom="m"
                    >
                      {skill.title}
                    </Heading>
                    <Text variant="body-default-m" onBackground="neutral-weak">
                      {skill.description}
                    </Text>
                    {skill.tags && skill.tags.length > 0 && (
                      <Row wrap gap="8" paddingTop="8">
                        {skill.tags.map((tag, tagIndex) => (
                          <Tag
                            key={`${skill.title}-${tagIndex}`}
                            size="l"
                            prefixIcon={tag.icon}
                          >
                            {tag.name}
                          </Tag>
                        ))}
                      </Row>
                    )}
                  </Column>
                  </ScrollReveal>
                ))}
              </Column>
            </>
          )}
        </Column>
      </Row>
    </Column>
  );
}