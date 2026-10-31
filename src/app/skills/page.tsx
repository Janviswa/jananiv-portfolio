import {
  Column,
  Heading,
  Text,
  Meta,
} from "@once-ui-system/core";
import { baseURL, person } from "@/resources";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SkillCard } from "@/components/skills/SkillCard";

export async function generateMetadata() {
  return Meta.generate({
    title: `Skills – ${person.name}`,
    description: `Technical skills of ${person.name}, AI Engineer specialising in LLMs, ML, and NLP.`,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(`Skills – ${person.name}`)}`,
    path: "/skills",
  });
}

const skillGroups = [
  {
    title: "Generative AI, LLMs & Agentic Systems",
    icon: "brain",
    description:
      "Building LLM-powered applications, retrieval pipelines, and agentic workflows for real-world problems.",
    technologies: [
      { name: "RAG", icon: "rocket" },
      { name: "LangChain", icon: "langchain" },
      { name: "LangGraph", icon: "code" },
      { name: "LangSmith", icon: "code" },
      { name: "Claude API", icon: "anthropic" },
      { name: "Ollama", icon: "cpu" },
      { name: "MCP", icon: "code" },
      { name: "Hugging Face", icon: "huggingface" },
    ],
    projects: ["Kybernaut", "RAGVault", "TicketFlow", "LegalEase"],
    certifications: [
      {
        name: "Building with Claude API",
        link: "https://verify.skilljar.com/c/ot9edhr9tqup",
      },
      {
        name: "Claude 101",
        link: "https://verify.skilljar.com/c/9ifid4g2yrdw",
      },
      {
        name: "AI Capabilities and Limitations",
        link: "https://verify.skilljar.com/c/6pikycgykkdj",
      },
    ],
  },
  {
    title: "Machine Learning & Data Science",
    icon: "rocket",
    description:
      "Developing predictive models, analyzing datasets, and building computer vision solutions.",
    technologies: [
      { name: "Scikit-learn", icon: "scikitlearn" },
      { name: "TensorFlow", icon: "tensorflow" },
      { name: "PyTorch", icon: "pytorch" },
      { name: "OpenCV", icon: "opencv" },
      { name: "YOLO", icon: "cpu" },
      { name: "Pandas", icon: "pandas" },
      { name: "NumPy", icon: "numpy" },
      { name: "Matplotlib", icon: "python" },
      { name: "Jupyter Notebook", icon: "code" },
    ],
    projects: [
      "Kybernaut",
      "BloodPrint ID",
      "Disease Prediction Website",
      "Movie Recommendation System",
    ],
    certifications: [
      {
        name: "Machine Learning Specialization",
        link: "https://coursera.org/share/f50e5c9782d803c4a48b56c8ca66dc3f",
      },
      {
        name: "Artificial Intelligence Fundamentals",
        link: "https://www.credly.com/badges/dc9d0e55-f23e-4054-9c8c-1da4f73da541/public_url",
      },
      {
        name: "AI for Everyone",
        link: "https://coursera.org/share/c30eebd79cca8dc628a7fbe9f66c2f2e",
      },
    ],
  },
  {
    title: "Programming Languages & Backend Development",
    icon: "code",
    description:
      "Developing backend services, REST APIs, and scalable application logic.",
    technologies: [
      { name: "Python", icon: "python" },
      { name: "SQL", icon: "code" },
      { name: "FastAPI", icon: "fastapi" },
      { name: "Flask", icon: "flask" },
      { name: "REST APIs", icon: "globe" },
    ],
    projects: [
      "Kybernaut",
      "RAGVault",
      "TicketFlow",
      "LegalEase",
      "Stockd",
      "BloodPrint ID",
    ],
    certifications: [
      {
        name: "Programming for Everybody",
        link: "https://coursera.org/share/073a9fe7e960279fe27fabad8010776a",
      },
      {
        name: "Introduction to Python",
        link: "https://www.sololearn.com/certificates/CC-4MRSDNLY",
      },
      {
        name: "Python Intermediate",
        link: "https://www.sololearn.com/certificates/CC-DZQCLALK",
      },
      {
        name: "Python Developer",
        link: "https://www.sololearn.com/certificates/CC-ULR0I85O",
      },
    ],
  },
  {
    title: "Databases & Data Management",
    icon: "book",
    description:
      "Managing relational and document databases for data-driven and AI-powered applications.",
    technologies: [
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "MySQL", icon: "mysql" },
      { name: "MongoDB", icon: "mongodb" },
    ],
    projects: ["Kybernaut", "RAGVault", "TicketFlow", "LegalEase"],
    certifications: [],
  },
  {
    title: "Developer Tools, Cloud & DevOps",
    icon: "star",
    description:
      "Building, testing, containerizing, and deploying applications with modern development tools.",
    technologies: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "Docker", icon: "docker" },
      { name: "Kubernetes", icon: "cpu" },
      { name: "Prometheus", icon: "globe" },
      { name: "Postman", icon: "postman" },
    ],
    projects: ["Kybernaut", "RAGVault"],
    certifications: [],
  },
];

export default function Skills() {
  return (
    <Column maxWidth="s" paddingTop="24" gap="xl">
      <ScrollReveal translateY={16} duration={500}>
        <Column gap="s" align="center" horizontal="center">
          <Heading variant="display-strong-l" align="center">
            Skills
          </Heading>
          <Text onBackground="neutral-weak" variant="body-default-l" align="center">
            A breakdown of my technical capabilities across AI, ML, and software engineering.
          </Text>
        </Column>
      </ScrollReveal>

      <Column gap="8" fillWidth>
        {skillGroups.map((group, i) => (
          <ScrollReveal
            key={group.title}
            translateY={16}
            delay={i * 60}
            threshold={0.05}
          >
            <SkillCard group={group} />
          </ScrollReveal>
        ))}
      </Column>
    </Column>
  );
}