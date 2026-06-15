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
    title: "AI & Generative AI",
    icon: "brain",
    description:
      "Building intelligent systems using LLMs, NLP, RAG, and Generative AI technologies.",
    technologies: [
      { name: "LLMs", icon: "brain" },
      { name: "Fine-Tuning", icon: "cpu" },
      { name: "RAG", icon: "rocket" },
      { name: "NLP", icon: "chat" },
      { name: "Transformers", icon: "huggingface" },
      { name: "BERT", icon: "code" },
      { name: "LangChain", icon: "langchain" },
      { name: "Hugging Face", icon: "huggingface" },
      { name: "Claude API", icon: "anthropic" },
    ],
    projects: ["LegalEase", "TicketFlow"],
    certifications: [
      { name: "Claude 101", link: "https://verify.skilljar.com/c/9ifid4g2yrdw" },
      {
        name: "AI Capabilities and Limitations",
        link: "https://verify.skilljar.com/c/6pikycgykkdj",
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
    title: "Machine Learning & Deep Learning",
    icon: "rocket",
    description:
      "Developing predictive models and deep learning solutions for real-world applications.",
    technologies: [
      { name: "Scikit-learn", icon: "scikitlearn" },
      { name: "PyTorch", icon: "pytorch" },
      { name: "TensorFlow", icon: "tensorflow" },
      { name: "Keras", icon: "keras" },
      { name: "XGBoost", icon: "cpu" },
      { name: "OpenCV", icon: "opencv" },
    ],
    projects: [
      "BloodPrint ID",
      "Hand Gesture Controlled Game",
      "Movie Recommendation System",
      "Disease Prediction Website",
      "Smart Diaper Pod",
      "Smart Helmet",
    ],
    certifications: [
      {
        name: "Machine Learning Specialization",
        link: "https://coursera.org/share/f50e5c9782d803c4a48b56c8ca66dc3f",
      },
    ],
  },
  {
    title: "Programming Language",
    icon: "code",
    description:
      "Writing efficient, scalable, and maintainable software solutions.",
    technologies: [{ name: "Python", icon: "python" }],
    projects: [
      "Red Light Green Light",
      "Disease Prediction Website",
      "Movie Recommendation System",
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
    title: "Data Science & Analytics",
    icon: "chat",
    description:
      "Extracting insights from data through analysis, visualization, and statistical techniques.",
    technologies: [
      { name: "Pandas", icon: "pandas" },
      { name: "NumPy", icon: "numpy" },
      { name: "NLTK", icon: "python" },
      { name: "PowerBI", icon: "grid" },
    ],
    projects: ["Movie Recommendation System", "Disease Prediction Website"],
    certifications: [
      {
        name: "Machine Learning Specialization",
        link: "https://coursera.org/share/f50e5c9782d803c4a48b56c8ca66dc3f",
      },
      {
        name: "Python Intermediate",
        link: "https://www.sololearn.com/certificates/CC-DZQCLALK",
      },
    ],
  },
  {
    title: "Backend & AI Applications",
    icon: "cpu",
    description:
      "Building and deploying AI-powered applications, APIs, and interactive solutions.",
    technologies: [
      { name: "FastAPI", icon: "fastapi" },
      { name: "REST APIs", icon: "globe" },
      { name: "Flask", icon: "flask" },
      { name: "Streamlit", icon: "streamlit" },
    ],
    projects: [
      "LegalEase",
      "BloodPrint ID",
      "TicketFlow",
      "Disease Prediction Website",
      "Movie Recommendation System",
      "Stockd",
    ],
    certifications: [
      {
        name: "Python Developer",
        link: "https://www.sololearn.com/certificates/CC-ULR0I85O",
      },
    ],
  },
  {
    title: "Databases",
    icon: "book",
    description:
      "Managing, storing, and retrieving structured and unstructured data efficiently.",
    technologies: [
      { name: "MySQL", icon: "mysql" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "MongoDB", icon: "mongodb" },
    ],
    projects: ["TicketFlow", "BloodPrint ID", "LegalEase", "Stockd"],
    certifications: [],
  },
  {
    title: "Developer Tools",
    icon: "star",
    description:
      "Leveraging modern tools for version control, development, testing, and deployment.",
    technologies: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "Docker", icon: "docker" },
      { name: "VS Code", icon: "code" },
      { name: "Postman", icon: "postman" },
    ],
    projects: [],
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