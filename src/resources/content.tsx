import React from "react";
import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Janani",
  lastName: "V",
  name: `Janani V`,
  avatar: "/images/avatar.jpg",
  email: "jananiviswa05@gmail.com",
  location: "Asia/Kolkata",
  languages: ["English", "Tamil"],
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>Updates on AI, LLMs, and software engineering.</>,
};

const social: Social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/Janviswa",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/jananiv05/",
    essential: true,
  },
  {
    name: "LeetCode",
    icon: "code",
    link: "https://leetcode.com/u/Janani_viswa/",
    essential: true,
  },
  {
    name: "Hugging Face",
    icon: "huggingface",
    link: "https://huggingface.co/Janani-V",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:jananiviswa05@gmail.com`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name} – Portfolio`,
  description:
    "Portfolio showcasing projects in LLMs, Generative AI, NLP, RAG systems, and AI-powered applications.",
  headline: (
    <>
      Engineering Ideas
      <br />
      Into Intelligence
    </>
  ),
  featured: {
    display: true,
    title: (
      <Row gap="8" vertical="center">
        <Text onBackground="neutral-strong" style={{ fontWeight: 700 }}>
          AI Engineer
        </Text>
        <Text onBackground="neutral-weak">|</Text>
        <Text onBackground="brand-medium" style={{ fontWeight: 600 }}>
          LLMs & GenAI
        </Text>
      </Row>
    ),
    href: "/work",
  },
  subline: (
    <>
      Hi, I'm Janani, exploring the <strong>future of AI</strong> through LLMs and Machine Learning.
      <br />
      Building intelligent solutions with real-world impact.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, an AI engineer working with LLMs, RAG and agents, based in Chennai, India`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        <p className="about-intro">
          I build intelligent AI systems that turn complex ideas into
          practical solutions. From LLMs and RAG pipelines to AI agents,
          machine learning models, and backend systems, I enjoy
          engineering applications that solve real-world problems.
        </p>
        <div
          className="about-intro"
          style={{
            display: "grid",
            gridTemplateColumns: "max-content 1fr",
            columnGap: "16px",
            rowGap: "6px",
            fontSize: "0.95em",
          }}
        >
          {[
            ["focus", "LLMs · NLP · Generative AI · RAG · AI agents"],
            [
              "highlight",
              "Agentic incident remediation · Permission-aware RAG · LoRA fine-tuned DeBERTa-v3 for injection detection",
            ],
            ["status", "curious, building, always learning"],
          ].map(([key, value]) => (
            <React.Fragment key={key}>
              <span
                style={{
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                  color: "var(--brand-on-background-medium)",
                }}
              >
                {key} →
              </span>
              <span>{value}</span>
            </React.Fragment>
          ))}
        </div>
      </>
    ),
      },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Transvaal Global Tech Pvt Ltd",
        timeframe: "January 2026 – April 2026",
        role: "AI Backend Engineer Intern · Chennai",
        achievements: [
          <>
          Architected an <strong>AI-powered IT ticket management platform</strong> using{" "}
          <strong>FastAPI, Llama 4 Scout, and ChromaDB</strong> with{" "}
          <strong>RAG-based support assistance</strong> and <strong>36+ REST APIs</strong>.
        </>,
        <>
          Achieved <strong>76% routing accuracy</strong> across 100 test tickets by automating{" "}
          <strong>triage, sentiment analysis, and department routing</strong> using{" "}
          <strong>DistilBERT and Llama 4 Scout</strong>.
        </>,
        ],
        projectLink: "/work/ticketflow",
        projectLabel: "View Project – Ticketflow",
        images: [
          {
            src: "/images/projects/TicketFlow/cover-01.jpg",
            alt: "Ticketflow project preview",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "Edunet Foundation / AICTE",
        timeframe: "December 2024 – January 2025",
        role: "AI & Data Analytics Intern · Remote",
        achievements: [
          <>
          Built a <strong>multilingual (English & Tamil) disease prediction system</strong> for{" "}
          <strong>Heart Disease, Diabetes, and Parkinson's</strong> using{" "}
          <strong>Random Forest and SVM</strong>, achieving <strong>89%+ accuracy</strong>.
        </>,
        <>
          Automated <strong>multilingual PDF report generation</strong> across{" "}
          <strong>50+ patient scenarios</strong>, eliminating manual{" "}
          <strong>translation and formatting steps</strong>.
        </>,

        ],
        projectLink: "/work/checkup-buddy",
        projectLabel: "View Project – Checkup Buddy",
        images: [
          {
            src: "/images/projects/checkup-buddy/cover-01.jpg",
            alt: "Checkup Buddy project preview",
            width: 16,
            height: 9,
          },
        ],
      },
      {
        company: "AICTE – Edunet Foundation (IBM SkillsBuild)",
        timeframe: "December 2024 – January 2025",
        role: "Artificial Intelligence Intern · Remote",
        achievements: [
          <>
          Built a <strong>movie review sentiment analysis system</strong> using{" "}
          <strong>Python, Random Forest, and TF-IDF vectorization</strong> on the{" "}
          <strong>IMDB Top 1000 dataset</strong> to classify movie overviews as{" "}
          <strong>positive or negative</strong> based on IMDB ratings.
        </>,
        <>
          Applied <strong>text preprocessing, TF-IDF feature extraction</strong> (5,000 features),{" "}
          and <strong>SMOTE</strong> for class imbalance handling, achieving{" "}
          <strong>87% accuracy</strong> on the test set.
        </>,
        ],
        images: [],
      },
      {
        company: "Trios Technologies Pvt Ltd",
        timeframe: "August 2024",
        role: "Python with Data Science Intern · Chennai",
        achievements: [
          <>
          Analyzed a <strong>9,500-record restaurant dataset</strong> to uncover{" "}
          <strong>cuisine trends</strong> and <strong>delivery impact on ratings</strong>{" "}
          using <strong>EDA and feature analysis</strong>.
        </>,
        <>
          Built and tuned a <strong>Random Forest model</strong> through{" "}
          <strong>feature engineering and hyperparameter optimization</strong>,{" "}
          achieving <strong>~75% validation accuracy</strong>.
        </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Studies",
    institutions: [
      {
        name: "Karpaga Vinayaga College of Engineering and Technology",
        description: (
          <>
            <Text onBackground="brand-medium" style={{ fontWeight: 600 }}>
              Bachelor of Technology – Artificial Intelligence and Data Science
            </Text>
            <br />
            <strong>CGPA: 8.2 / 10</strong> &nbsp;·&nbsp; November 2022 – May 2026
            <br />
            <br />
            <Text onBackground="neutral-weak" variant="body-default-s">
              Relevant Coursework: <strong>Artificial Intelligence</strong>,{" "}
              <strong>Machine Learning</strong>, <strong>Deep Learning</strong>,{" "}
              <strong>Natural Language Processing</strong>,{" "}
              <strong>Computer Vision</strong>, <strong>Data Structures & Algorithms</strong>,{" "}
              <strong>Database Management Systems</strong>
            </Text>
          </>
        ),
      },
    ],
  },
  technical: {
  display: true,
  title: "Interests",
  skills: [
    {
      title: "Professional Interests",
      description: (
        <div>
          {[
            { icon: "ti-robot", text: "Generative AI & LLMs" },
            { icon: "ti-database", text: "RAG & Knowledge Systems" },
            { icon: "ti-brain", text: "Machine Learning & MLOps" },
            { icon: "ti-bulb", text: "Agentic AI & Automation" },
            { icon: "ti-puzzle", text: "Problem Solving & Critical Thinking" },
          ].map((item, i) => (
            <div
              key={item.text}
              className="interest-row animate-fade-in-up"
              style={{ opacity: 0, animationDelay: `${i * 80}ms`, animationFillMode: "forwards" }}
            >
              <i className={`ti ${item.icon}`} style={{ color: "#3b82f6" }} aria-hidden="true" />
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      ),
      tags: [],
      images: [],
    },
    {
      title: "Personal Interests",
      description: (
        <div>
          {[
            { icon: "ti-news", text: "Exploring Emerging Technology" },
            { icon: "ti-chart-line", text: "Personal Finance & Investing" },
            { icon: "ti-bike", text: "Cycling & Outdoor Activities" },
          ].map((item, i) => (
            <div
              key={item.text}
              className="interest-row animate-fade-in-up"
              style={{ opacity: 0, animationDelay: `${i * 80}ms`, animationFillMode: "forwards" }}
            >
              <i className={`ti ${item.icon}`} style={{ color: "#3b82f6" }} aria-hidden="true" />
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      ),
      tags: [],
      images: [],
    },
  ],
},
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about AI and tech...",
  description: `Read what ${person.name} has been up to recently`,
};

const work: Work = {
  path: "/work",
  label: "Works",
  title: `Projects – ${person.name}`,
  description: `AI and ML projects by ${person.name}`,
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Gallery – ${person.name}`,
  description: `A collection by ${person.name}`,
  images: [],
};

export { person, social, newsletter, home, about, blog, work, gallery };