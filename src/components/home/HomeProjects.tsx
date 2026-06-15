import { getPosts } from "@/utils/utils";
import { HomeProjectsClient } from "@/components/home/HomeProjectsClient";

// Fixed slugs — always show these 4 regardless of publishedAt date
const FEATURED_SLUGS = [
  "bloodprint-id",
  "legalease",
  "hand-gesture-game",
  "movie-recommendation-system",
];

export function HomeProjects() {
  const allProjects = getPosts(["src", "app", "work", "projects"]);

  // Pick the 4 featured projects in the exact order defined above
  const featured = FEATURED_SLUGS
    .map((slug) => allProjects.find((p) => p.slug === slug))
    .filter(Boolean) as (typeof allProjects)[0][];

  // Serialize to plain objects for the client component
  const projects = featured.map((post) => ({
    slug: post.slug,
    images: post.metadata.images ?? [],
    title: post.metadata.title,
    summary: post.metadata.summary,
    content: post.content,
    avatars: post.metadata.team?.map((m) => ({ src: m.avatar })) ?? [],
    link: post.metadata.link ?? "",
  }));

  return <HomeProjectsClient projects={projects} />;
}