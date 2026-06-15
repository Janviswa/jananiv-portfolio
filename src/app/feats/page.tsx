import {
  Column,
  Heading,
  Text,
  Row,
  Tag,
  Grid,
  Meta,
  Card,
  Icon,
  Line,
} from "@once-ui-system/core";
import { baseURL, person } from "@/resources";
import { ScrollReveal } from "@/components/ScrollReveal";
import { PublicationCard } from "@/components/feats/PublicationCard";

export async function generateMetadata() {
  return Meta.generate({
    title: `Feats – ${person.name}`,
    description: `Certifications, patents, and publications by ${person.name}.`,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(`Feats – ${person.name}`)}`,
    path: "/feats",
  });
}

const certifications = [
  {
    name: "Claude 101",
    issuer: "Anthropic Education",
    year: "May 2026",
    link: "https://verify.skilljar.com/c/9ifid4g2yrdw",
    brand: "anthropic",
    image: "/images/certs/claude 101.jpg",
  },
  {
    name: "AI Capabilities and Limitations",
    issuer: "Anthropic Education",
    year: "May 2026",
    link: "https://verify.skilljar.com/c/6pikycgykkdj",
    brand: "anthropic",
    image: "/images/certs/ai capabilities and limitations.jpg",
  },
  {
    name: "Artificial Intelligence Fundamentals",
    issuer: "IBM SkillsBuild",
    year: "Feb 2025",
    link: "https://www.credly.com/badges/dc9d0e55-f23e-4054-9c8c-1da4f73da541/public_url",
    brand: "ibm",
    image: "/images/certs/ai fundamentals.jpg",
  },
  {
    name: "AI for Everyone",
    issuer: "Coursera",
    year: "Aug 2025",
    link: "https://coursera.org/share/c30eebd79cca8dc628a7fbe9f66c2f2e",
    brand: "coursera",
    image: "/images/certs/AI for everyone.jpg",
  },
  {
    name: "Machine Learning Specialization",
    issuer: "Coursera / DeepLearning.AI",
    year: "Feb 2026",
    link: "https://coursera.org/share/f50e5c9782d803c4a48b56c8ca66dc3f",
    brand: "coursera",
    image: "/images/certs/Machine Learning.jpg",
  },
  {
    name: "Programming for Everybody",
    issuer: "Coursera",
    year: "Aug 2025",
    link: "https://coursera.org/share/073a9fe7e960279fe27fabad8010776a",
    brand: "coursera",
    image: "/images/certs/Programming for Everybody.jpg",
  },
  {
    name: "Introduction to Python",
    issuer: "SoloLearn",
    year: "Oct 2026",
    link: "https://www.sololearn.com/certificates/CC-4MRSDNLY",
    brand: "sololearn",
    image: "/images/certs/Introduction to Python.jpg",
  },
  {
    name: "Python Intermediate",
    issuer: "SoloLearn",
    year: "Oct 2026",
    link: "https://www.sololearn.com/certificates/CC-DZQCLALK",
    brand: "sololearn",
    image: "/images/certs/python intermediate.jpg",
  },
  {
    name: "Python Developer",
    issuer: "SoloLearn",
    year: "Nov 2025",
    link: "https://www.sololearn.com/certificates/CC-ULR0I85O",
    brand: "sololearn",
    image: "/images/certs/python developer.jpg",
  },
];

const patents = [
  {
    title: "AI-Based Smart Diaper Pod for Real-Time Infant Care",
    id: "202641048866",
    issued: "May 1, 2026",
    description:
      "Granted a patent for an AI-powered infant monitoring device integrating AI, IoT, and smart sensing technologies.",
  },
  {
    title: "AI-Based Smart Helmet with Recommendations",
    id: "202541087414",
    issued: "Oct 17, 2025",
    description:
      "Patent granted for an AI-based smart helmet system designed to improve rider safety through real-time intelligence.",
  },
];

const publications = [
  {
    title: "AI-Based Smart Diaper Pod for Real-Time Infant Care",
    journal: "Journal of Computer and Communication Systems (JCCS)",
    publisher: "Bee Bot Publisher",
    issn: "3048-619X",
    volume: "3",
    issue: "3",
    date: "20 May 2026",
    description:
      "Authored and published a research paper on an AI-based Smart Diaper Pod, integrating AI, IoT, and Machine Learning to enable real-time infant monitoring and intelligent caregiver alerts.",
    tags: ["AI", "IoT", "Machine Learning", "InnovationInHealthcare"],
  },
];

const brandStyles: Record<string, { label: string }> = {
  anthropic: { label: "Anthropic Education" },
  sololearn: { label: "SoloLearn" },
  credly: { label: "IBM SkillsBuild" },
  ibm: { label: "IBM SkillsBuild" },
  coursera: { label: "Coursera" },
};

export default function Feats() {
  return (
    <Column maxWidth="m" paddingTop="24" gap="xl">
      <ScrollReveal>
        <Column gap="s" align="center" horizontal="center">
          <Heading variant="display-strong-l" align="center">
            Feats
          </Heading>
          <Text onBackground="neutral-weak" variant="body-default-l" align="center">
            Certifications, patents, and research publications.
          </Text>
        </Column>
      </ScrollReveal>

      {/* ── Certifications ── */}
      <Column gap="m" fillWidth>
        <ScrollReveal>
          <Row gap="12" vertical="center" paddingLeft="4" fillWidth horizontal="between">
            <Row gap="12" vertical="center">
              <span className="feat-icon-float">
                <Icon name="trophy" size="l" onBackground="brand-weak" />
              </span>
              <Heading as="h2" variant="display-strong-xs">
                Certifications
              </Heading>
            </Row>
            <Tag size="m" prefixIcon="check">
              {certifications.length} earned
            </Tag>
          </Row>
        </ScrollReveal>

        <Grid columns="2" s={{ columns: "1" }} gap="16" fillWidth style={{ alignItems: "stretch" }}>
          {certifications.map((cert, index) => {
            const brand = brandStyles[cert.brand] ?? brandStyles.coursera;
            return (
              <ScrollReveal
                key={cert.name}
                delay={index * 60}
                translateY={28}
                style={{ height: "100%", display: "flex" }}
              >
                <Card
                  href={cert.link}
                  border="neutral-alpha-weak"
                  background="neutral-alpha-weak"
                  radius="m"
                  overflow="hidden"
                  fillWidth
                  className="cert-card"
                  style={{ height: "100%", display: "flex", flexDirection: "column" }}
                >
                  <Column fillWidth style={{ height: "100%" }}>
                    {cert.image ? (
                      <div
                        style={{
                          position: "relative",
                          width: "100%",
                          aspectRatio: "4 / 2.9",
                          overflow: "hidden",
                          background: "#1a1a1a",
                        }}
                      >
                        <div className="cert-shine" aria-hidden />
                        <div className="cert-ribbon">Verified</div>
                        <img
                          src={cert.image}
                          alt={`${cert.name} certificate`}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                      </div>
                    ) : (
                      <div
                        style={{
                          background:
                            "linear-gradient(135deg, #efe8d9 0%, #e9e2d3 50%, #e3dac8 100%)",
                          padding: "16px 14px",
                          position: "relative",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "8px",
                          width: "100%",
                          aspectRatio: "16 / 9",
                          justifyContent: "center",
                          overflow: "hidden",
                          border: "1px solid #d8cdb6",
                        }}
                      >
                        <div className="cert-shine" aria-hidden />
                        <div className="cert-ribbon">Verified</div>
                        <div className="cert-corner cert-corner-tl" aria-hidden />
                        <div className="cert-corner cert-corner-br" aria-hidden />
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            border: "1.5px solid #2a2a2a",
                            borderRadius: "999px",
                            padding: "4px 12px",
                          }}
                        >
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "14px",
                              height: "14px",
                              borderRadius: "50%",
                              border: "1.5px solid #2a2a2a",
                              fontSize: "9px",
                              color: "#2a2a2a",
                            }}
                          >
                            ✓
                          </span>
                          <Text
                            variant="label-default-xs"
                            style={{
                              color: "#2a2a2a",
                              fontWeight: 700,
                              letterSpacing: "0.12em",
                              textTransform: "uppercase",
                              fontSize: "9px",
                            }}
                          >
                            Certificate of Completion
                          </Text>
                        </div>
                        <Text
                          variant="heading-strong-m"
                          style={{ color: "#1a1a1a", fontFamily: "Georgia, serif", textAlign: "center" }}
                        >
                          Janani V
                        </Text>
                        <Text
                          variant="body-default-xs"
                          style={{ color: "#5a5a52", fontFamily: "Georgia, serif" }}
                        >
                          has completed
                        </Text>
                        <Text
                          variant="heading-strong-s"
                          style={{ color: "#1a1a1a", fontFamily: "Georgia, serif", textAlign: "center" }}
                        >
                          {cert.name}
                        </Text>
                        <div className="cert-divider" aria-hidden />
                        <Text
                          variant="label-default-xs"
                          style={{
                            color: "#2a2a2a",
                            fontWeight: 700,
                            letterSpacing: "0.1em",
                            fontSize: "9px",
                          }}
                        >
                          {brand.label.toUpperCase()} · {cert.year}
                        </Text>
                      </div>
                    )}

                    {/* ── Meta footer: name left, issuer · year right ── */}
                    <Row
                      fillWidth
                      horizontal="between"
                      vertical="center"
                      padding="s"
                      gap="8"
                      style={{ flexWrap: "wrap" }}
                    >
                      <Text variant="body-default-s" onBackground="neutral-strong">
                        {cert.name}
                      </Text>
                      <Text
                        variant="body-default-xs"
                        onBackground="neutral-weak"
                        style={{ whiteSpace: "nowrap", flexShrink: 0 }}
                      >
                        {brand.label} · {cert.year}
                      </Text>
                    </Row>
                  </Column>
                </Card>
              </ScrollReveal>
            );
          })}
        </Grid>
      </Column>

      <Line />

      {/* ── Patents ── */}
      <Column gap="m" fillWidth>
        <ScrollReveal>
          <Row gap="12" vertical="center" paddingLeft="4" fillWidth horizontal="between">
            <Row gap="12" vertical="center">
              <span className="feat-icon-float">
                <Icon name="rocket" size="l" onBackground="brand-weak" />
              </span>
              <Heading as="h2" variant="display-strong-xs">
                Patents
              </Heading>
            </Row>
            <Tag size="m" prefixIcon="rocket">
              {patents.length} filed
            </Tag>
          </Row>
        </ScrollReveal>

        <Grid columns="2" s={{ columns: "1" }} gap="16" fillWidth style={{ alignItems: "stretch" }}>
          {patents.map((patent, index) => (
            <ScrollReveal
              key={patent.id}
              delay={index * 100}
              translateY={28}
              style={{ height: "100%", display: "flex" }}
            >
              <Column
                fillWidth
                gap="m"
                padding="l"
                radius="m"
                border="neutral-alpha-weak"
                background="neutral-alpha-weak"
                className="patent-card"
                style={{ height: "100%", position: "relative", overflow: "hidden" }}
              >
                <div className="cert-shine" aria-hidden />
                <Row horizontal="between" vertical="start" gap="12">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "44px",
                      height: "44px",
                      borderRadius: "10px",
                      background: "var(--brand-background-weak)",
                      flexShrink: 0,
                    }}
                  >
                    <Icon name="rocket" size="l" onBackground="brand-medium" />
                  </div>
                  <Tag size="s" prefixIcon="rocket">Patent Filed</Tag>
                </Row>
                <Text variant="heading-strong-m" style={{ position: "relative", zIndex: 1 }}>
                  {patent.title}
                </Text>
                <Row gap="8" vertical="center" wrap style={{ position: "relative", zIndex: 1 }}>
                  <Tag size="s">App. No. {patent.id}</Tag>
                  <Tag size="s">{patent.issued}</Tag>
                </Row>
                <Text
                  variant="body-default-s"
                  onBackground="neutral-weak"
                  style={{ position: "relative", zIndex: 1, marginTop: "auto" }}
                >
                  {patent.description}
                </Text>
              </Column>
            </ScrollReveal>
          ))}
        </Grid>
      </Column>

      <Line />

      {/* ── Publications ── */}
      <Column gap="m" fillWidth>
        <ScrollReveal>
          <Row gap="12" vertical="center" paddingLeft="4" fillWidth horizontal="between">
            <Row gap="12" vertical="center">
              <span className="feat-icon-float">
                <Icon name="document" size="l" onBackground="brand-weak" />
              </span>
              <Heading as="h2" variant="display-strong-xs">
                Publications
              </Heading>
            </Row>
            <Tag size="m" prefixIcon="document">
              {publications.length} published
            </Tag>
          </Row>
        </ScrollReveal>

        <Column gap="20" fillWidth>
          {publications.map((pub, index) => (
            <ScrollReveal key={pub.title} delay={index * 100} translateY={32}>
              <PublicationCard pub={pub} />
            </ScrollReveal>
          ))}
        </Column>
      </Column>

      <style>{`
        /* ── Cert card ── */
        .cert-card {
          position: relative;
          transition: transform 0.4s cubic-bezier(.22,1,.36,1), box-shadow 0.4s ease, border-color 0.4s ease;
          transform: perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0);
          will-change: transform;
        }
        .cert-card:hover {
          transform: perspective(800px) rotateX(2deg) rotateY(-2deg) translateY(-6px) scale(1.01);
          box-shadow: 0 20px 48px -12px var(--brand-background-strong);
          border-color: var(--brand-border-medium);
        }

        /* ── Shine overlay ── */
        .cert-shine {
          position: absolute;
          inset: 0;
          background: linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.35) 50%, transparent 65%);
          background-size: 250% 250%;
          background-position: 120% 120%;
          opacity: 0;
          transition: opacity 0.4s ease, background-position 1.1s ease;
          pointer-events: none;
          z-index: 1;
          mix-blend-mode: overlay;
        }
        .cert-card:hover .cert-shine,
        .patent-card:hover .cert-shine {
          opacity: 1;
          background-position: -20% -20%;
        }

        /* ── Verified ribbon — adapts to light/dark ── */
        .cert-ribbon {
          position: absolute;
          top: 10px;
          right: -30px;
          transform: rotate(40deg);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.12em;
          padding: 3px 36px;
          z-index: 2;
          box-shadow: 0 4px 12px rgba(0,0,0,0.25);
          text-transform: uppercase;
          pointer-events: none;
          /* light mode: black ribbon */
          background: #1a1a1a;
          color: #ffffff;
        }
        /* dark mode: brand ribbon */
        @media (prefers-color-scheme: dark) {
          .cert-ribbon {
            background: var(--brand-background-strong);
            color: #fff;
          }
        }
        /* Once UI dark class override */
        [data-theme="dark"] .cert-ribbon {
          background: var(--brand-background-strong);
          color: #fff;
        }

        /* ── Cert corners ── */
        .cert-corner {
          position: absolute;
          width: 20px;
          height: 20px;
          border: 2px solid rgba(42,42,42,0.25);
          pointer-events: none;
          transition: border-color 0.4s ease, transform 0.4s ease;
        }
        .cert-corner-tl { top: 8px; left: 8px; border-right: none; border-bottom: none; }
        .cert-corner-br { bottom: 8px; right: 8px; border-left: none; border-top: none; }
        .cert-card:hover .cert-corner-tl { transform: translate(-3px,-3px); border-color: var(--brand-background-strong); }
        .cert-card:hover .cert-corner-br { transform: translate(3px,3px); border-color: var(--brand-background-strong); }
        .cert-divider { width: 48px; height: 1px; background: rgba(42,42,42,0.25); margin: 2px 0; }

        /* ── Patent card ── */
        .patent-card {
          transition: transform 0.35s cubic-bezier(.22,1,.36,1), box-shadow 0.35s ease, border-color 0.35s ease;
        }
        .patent-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px -10px var(--brand-background-strong);
          border-color: var(--brand-border-medium);
        }

        /* ── Floating section icon ── */
        .feat-icon-float {
          display: inline-flex;
          animation: featIconFloat 3.5s ease-in-out infinite;
        }
        @keyframes featIconFloat {
          0%,100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-4px) rotate(-4deg); }
        }

        /* ── Publication card animation ── */
        .pub-card-wrap {
          transition: transform 0.35s cubic-bezier(.22,1,.36,1), box-shadow 0.35s ease;
          border-radius: 12px;
        }
        .pub-card-wrap:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px -10px var(--brand-background-strong);
        }

        /* Published sidebar label — adapts to light/dark */
        .pub-status-bar {
          background: #1a1a1a;
          color: #ffffff;
        }
        @media (prefers-color-scheme: dark) {
          .pub-status-bar {
            background: var(--brand-background-strong);
            color: #fff;
          }
        }
        [data-theme="dark"] .pub-status-bar {
          background: var(--brand-background-strong);
          color: #fff;
        }

        /* ── Pub card slide-in on scroll ── */
        @keyframes pubSlideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .pub-card-wrap {
          animation: pubSlideIn 0.5s cubic-bezier(.22,1,.36,1) both;
        }

        @media (max-width: 600px) {
          .pub-card { flex-direction: column; }
          .pub-card > div:first-child {
            width: 100% !important;
            height: 32px !important;
            writing-mode: horizontal-tb !important;
          }
          .pub-card > div:first-child span {
            transform: none !important;
          }
        }
      `}</style>
    </Column>
  );
}