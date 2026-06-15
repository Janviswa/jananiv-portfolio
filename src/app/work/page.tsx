import { Column, Heading, Text, Meta, Schema } from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import { Projects } from "@/components/work/Projects";

export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
    path: work.path,
  });
}

export default function Work() {
  return (
    <Column maxWidth="m" paddingTop="24" gap="l">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column gap="s" align="center" horizontal="center">
        <Heading marginBottom="4" variant="display-strong-l" align="center">
          Projects
        </Heading>
        <Text onBackground="neutral-weak" variant="body-default-l" align="center">
          AI, ML, and software engineering projects built with real-world impact in mind.
        </Text>
      </Column>
      <Projects showFilter />
    </Column>
  );
}