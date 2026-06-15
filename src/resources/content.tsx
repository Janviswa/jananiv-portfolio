import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Janani",
  lastName: "V",
  name: `Janani V`,
  role: "AI Engineer",
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
  title: `${person.name} – AI Engineer Portfolio`,
  description:
    "Portfolio of Janani V, AI Engineer specializing in LLMs, Machine Learning, and Generative AI.",
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
  description: `Meet ${person.name}, ${person.role} from Kanchipuram, India`,
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
        I'm Janani, an AI builder who enjoys turning ideas into intelligent products. I work with LLMs, NLP, Generative AI, and RAG systems, constantly exploring how AI can solve real-world problems. When I'm not experimenting with new models, I'm building solutions that bridge the gap between cutting-edge research and practical applications.
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
            Built an <strong>AI-powered Ticket Management System</strong>, reducing{" "}
            <strong>manual support effort</strong> by ~40% through{" "}
            <strong>workflow automation</strong> and{" "}
            <strong>intelligent ticket prioritization</strong>.
          </>,
          <>
            Integrated <strong>LLM-based automation</strong> for{" "}
            <strong>response drafting</strong> and <strong>ticket routing</strong>, improving{" "}
            <strong>resolution efficiency</strong> and{" "}
            <strong>streamlining backend operations</strong>.
          </>,
        ],
        projectLink: "/work/ticketflow",
        projectLabel: "View Project – Ticketflow",
        images: [
          {
            src: "/images/projects/assistly/cover-01.jpg",
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
            Developed a <strong>multilingual disease prediction system</strong> for Heart Disease,
            Diabetes, and Parkinson's Disease using <strong>Random Forest</strong> and{" "}
            <strong>SVM</strong> models, achieving <strong>90%+ prediction accuracy</strong>.
          </>,
          <>
            Implemented English and Tamil language support with automated report generation,
            delivering a <strong>production-ready</strong> healthcare analytics solution.
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
            Built a <strong>sentiment analysis system</strong> using <strong>Python</strong>,{" "}
            <strong>NLTK</strong>, and <strong>supervised machine learning</strong> to classify{" "}
            <strong>customer reviews</strong> and <strong>textual feedback</strong>.
          </>,
          <>
            Improved <strong>prediction performance</strong> through{" "}
            <strong>preprocessing</strong>, <strong>feature extraction</strong>, and{" "}
            <strong>model tuning</strong>, achieving an <strong>87% F1-score</strong>.
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
            Performed <strong>data preprocessing</strong>, <strong>EDA</strong>, and feature
            analysis to extract meaningful insights from datasets.
          </>,
          <>
            Built and evaluated <strong>Random Forest</strong> models for prediction tasks,
            achieving ~72% accuracy on the validation set through feature engineering and parameter
            tuning.
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
            <strong>CGPA: 8.07 / 10.0</strong> &nbsp;·&nbsp; November 2022 – May 2026
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
            { icon: "ti-message-circle", text: "Natural language processing" },
            { icon: "ti-chart-line", text: "Personal finance & investing" },
            { icon: "ti-palette", text: "UI/UX design" },
            { icon: "ti-bulb", text: "Problem solving" },
            { icon: "ti-books", text: "Continuous learning" },
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
            { icon: "ti-news", text: "Reading about emerging technologies" },
            { icon: "ti-chart-line", text: "Personal finance & investing" },
            { icon: "ti-bike", text: "Cycling and outdoor activities" },
            { icon: "ti-rocket", text: "Following startup and technology trends" },
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
  label: "Work",
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