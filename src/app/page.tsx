import {
  Heading,
  Text,
  Button,
  Avatar,
  RevealFx,
  Column,
  Badge,
  Row,
  Schema,
  Meta,
  Line,
} from "@once-ui-system/core";
import { home, about, person, baseURL } from "@/resources";
import { HomeProjects } from "@/components/home/HomeProjects";
import { SkillsSnapshot } from "@/components/home/SkillsSnapshot";
import { FeatsPreview } from "@/components/home/FeatsPreview";
import { ContactCTA } from "@/components/home/ContactCTA";
import { ScrollReveal } from "@/components/ScrollReveal";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`${baseURL}${home.image}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {/* ── HERO — matches original Magic Portfolio centered layout ── */}
      <Column
        fillWidth
        horizontal="center"
        vertical="center"
        gap="m"
        style={{ minHeight: "70vh" }}
      >
        <Column fillWidth horizontal="center" align="center" style={{ maxWidth: "640px", margin: "0 auto" }}>

          {/* Badge pill */}
          {home.featured.display && (
            <RevealFx
              fillWidth
              horizontal="center"
              paddingTop="16"
              paddingBottom="32"
              paddingLeft="12"
            >
              <Badge
                background="brand-alpha-weak"
                paddingX="12"
                paddingY="4"
                onBackground="neutral-strong"
                textVariant="label-default-s"
                arrow={false}
                href={home.featured.href}
              >
                <Row paddingY="2">{home.featured.title}</Row>
              </Badge>
            </RevealFx>
          )}

          {/* Headline — big, centered, 2 lines */}
          <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16">
            <Heading wrap="balance" variant="display-strong-l" align="center">
              {home.headline}
            </Heading>
          </RevealFx>

          {/* Subline — 2 lines max */}
          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="32">
            <Text
              wrap="balance"
              onBackground="neutral-weak"
              variant="body-default-l"
              align="center"
            >
              {home.subline}
            </Text>
          </RevealFx>

          {/* About button with avatar inside — exact original style */}
          <RevealFx paddingTop="12" delay={0.4} horizontal="center" paddingLeft="12">
            <Button
              id="about"
              data-border="rounded"
              href={about.path}
              variant="secondary"
              size="m"
              weight="default"
              arrowIcon
            >
              <Row gap="8" vertical="center" paddingRight="4">
                {about.avatar.display && (
                  <Avatar
                    marginRight="8"
                    style={{ marginLeft: "-0.75rem" }}
                    src={person.avatar}
                    size="m"
                  />
                )}
                About – {person.name}
              </Row>
            </Button>
          </RevealFx>
        </Column>
      </Column>

      {/* ── FEATURED PROJECTS (full-width carousel, 4 projects + More button) ── */}
      <ScrollReveal translateY={32} style={{ width: "100%" }}>
        <HomeProjects />
      </ScrollReveal>

      {/* ── SKILLS SNAPSHOT ── */}
      <ScrollReveal translateY={32} style={{ width: "100%" }}>
        <SkillsSnapshot />
      </ScrollReveal>

      {/* ── FEATS PREVIEW ── */}
      <ScrollReveal translateY={32} style={{ width: "100%" }}>
        <FeatsPreview />
      </ScrollReveal>

      {/* ── CONTACT CTA ── */}
      <ScrollReveal translateY={32} style={{ width: "100%" }}>
        <ContactCTA />
      </ScrollReveal>
    </Column>
  );
}