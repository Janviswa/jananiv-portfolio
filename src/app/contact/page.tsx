import {
  Column,
  Heading,
  Text,
  Row,
  Button,
  Meta,
  Grid,
  RevealFx,
} from "@once-ui-system/core";
import { baseURL, person } from "@/resources";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ContactCard } from "@/components/contact/ContactCard";
import { EmailHero } from "@/components/contact/EmailHero";
import { MagneticButton } from "@/components/contact/MagneticButton";

export async function generateMetadata() {
  return Meta.generate({
    title: `Contact – ${person.name}`,
    description: `Get in touch with ${person.name}, AI Engineer.`,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(`Contact – ${person.name}`)}`,
    path: "/contact",
  });
}

// TODO: replace with your actual resume link (e.g. Google Drive "Anyone with the link can view" share URL)
const RESUME_URL = "https://drive.google.com/file/d/1kHgA5u-wjxrutWBGi6nTndCgLj4FMhP5/view?usp=drive_link";

const contactDetails = [
  {
    label: "Location",
    value: "Kanchipuram, India",
    icon: "globe",
    href: null,
  },
  {
    label: "GitHub",
    value: "github.com/Janviswa",
    icon: "github",
    href: "https://github.com/Janviswa",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/jananiv05",
    icon: "linkedin",
    href: "https://www.linkedin.com/in/jananiv05/",
  },
  {
    label: "LeetCode",
    value: "Janani_viswa",
    icon: "code",
    href: "https://leetcode.com/u/Janani_viswa/",
  },
  {
    label: "Hugging Face",
    value: "huggingface.co/Janani-V",
    icon: "huggingface",
    href: "https://huggingface.co/Janani-V",
  },
];

export default function Contact() {
  return (
    <Column
      maxWidth="m"
      paddingTop="24"
      gap="xl"
      horizontal="center"
      style={{ position: "relative", overflow: "hidden", isolation: "isolate" }}
    >
      {/* Ambient gradient mesh backdrop */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "-160px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: "900px",
          height: "440px",
          background:
            "radial-gradient(ellipse 50% 50% at 30% 30%, var(--brand-background-medium) 0%, transparent 60%), radial-gradient(ellipse 40% 50% at 75% 60%, var(--brand-background-strong) 0%, transparent 65%)",
          opacity: 0.45,
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
          animation: "floatY 7s ease-in-out infinite",
        }}
      />

      {/* Header */}
      {/* Header */}
<Column
  gap="m"
  horizontal="center"
  fillWidth
  style={{
    position: "relative",
    zIndex: 1,
    textAlign: "center",
    alignItems: "center",
  }}
>
  <RevealFx translateY="4">
    <Heading
      variant="display-strong-l"
      align="center"
      style={{
        width: "100%",
        textAlign: "center",
      }}
    >
      Let's Connect
    </Heading>
  </RevealFx>

  <RevealFx translateY="8" delay={0.1}>
    <Text
      onBackground="neutral-weak"
      variant="body-default-l"
      align="center"
      style={{
        maxWidth: "700px",
        margin: "0 auto",
      }}
    >
      Interested in AI, software engineering, collaborations, or opportunities?
      Feel free to reach out.
    </Text>
  </RevealFx>
</Column>

      {/* CTA Buttons */}
      <RevealFx
        translateY="8"
        delay={0.2}
        horizontal="center"
        style={{ position: "relative", zIndex: 1 }}
      >
        <Row gap="16" wrap horizontal="center">
          <MagneticButton>
            <Button
              href="mailto:jananiviswa05@gmail.com"
              variant="primary"
              prefixIcon="email"
              size="m"
            >
              Email Me
            </Button>
          </MagneticButton>
          <MagneticButton>
            <Button
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              prefixIcon="download"
              size="m"
              arrowIcon
            >
              Resume
            </Button>
          </MagneticButton>
        </Row>
      </RevealFx>

      {/* Contact Details Grid */}
      <Grid
        columns="3"
        s={{ columns: "2" }}
        xs={{ columns: "1" }}
        gap="12"
        fillWidth
        style={{ alignItems: "stretch", position: "relative", zIndex: 1 }}
      >
        <ScrollReveal
          translateY={24}
          delay={0}
          threshold={0.1}
          style={{ width: "100%", height: "100%", display: "flex" }}
        >
          <EmailHero />
        </ScrollReveal>

        {contactDetails.map((detail, i) => (
          <ScrollReveal
            key={detail.label}
            translateY={24}
            delay={((i + 1) % 3) * 80}
            threshold={0.1}
            style={{ width: "100%", height: "100%", display: "flex" }}
          >
            <ContactCard detail={detail} />
          </ScrollReveal>
        ))}
      </Grid>
    </Column>
  );
}