import { getPosts } from "@/utils/utils";
import { ProjectsClient } from "@/components/work/ProjectsClient";

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
  showFilter?: boolean;
  /** If set, only show projects sharing at least one tag with these tags */
  relatedTags?: string[];
}

// Explicit display order — edit this list to reorder projects on the work page
const PROJECT_ORDER = [
  "bloodprint-id",
  "legalease",
  "stockd",
  "disease-prediction-website",
  "movie-recommendation-system",
  "hand-gesture-game",
  "squid-game-red-light",
  "smart-diaper-pod",
  "smart-riding-helmet",
  "ticketflow",
];

export function Projects({ range, exclude, showFilter = false, relatedTags }: ProjectsProps) {
  let allProjects = getPosts(["src", "app", "work", "projects"]);

  // Exclude by slug
  if (exclude && exclude.length > 0) {
    allProjects = allProjects.filter((post) => !exclude.includes(post.slug));
  }

  // Filter to same-category projects when relatedTags is provided
  if (relatedTags && relatedTags.length > 0) {
    allProjects = allProjects.filter((post) => {
      const postTags: string[] = post.metadata.tags || [];
      return postTags.some((tag) => relatedTags.includes(tag));
    });
  }

  // Sort by explicit order; unknown slugs go to the end
  const sortedProjects = allProjects.sort((a, b) => {
    const ai = PROJECT_ORDER.indexOf(a.slug);
    const bi = PROJECT_ORDER.indexOf(b.slug);
    const aIdx = ai === -1 ? 999 : ai;
    const bIdx = bi === -1 ? 999 : bi;
    return aIdx - bIdx;
  });

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  const projects = displayedProjects.map((post) => ({
    slug: post.slug,
    images: post.metadata.images,
    title: post.metadata.title,
    summary: post.metadata.summary,
    content: post.content,
    avatars: post.metadata.team?.map((member) => ({ src: member.avatar })) || [],
    link: post.metadata.link || "",
    tags: post.metadata.tags || [],
  }));

  return <ProjectsClient projects={projects} showFilter={showFilter} />;
}
