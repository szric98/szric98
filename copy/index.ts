export const HERO_SECTION = {
  name: "Richard Szabo",
  role: "Full Stack Engineer",
  kicker: "engineer",
  mark: "szabo · earth",
  earthCaption: "night side · live",
  description:
    "Full Stack Engineer with 5 years of experience building web applications and GraphQL APIs using modern AI tools.",
} as const;

export const NAV_LINKS = [
  { label: "home", hash: "home" },
  { label: "about", hash: "about" },
  { label: "skills", hash: "skills" },
  { label: "experience", hash: "experience" },
  { label: "projects", hash: "projects" },
  { label: "blog", href: "/blog" },
] as const;

export const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/szric98",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/szric98",
    icon: "linkedin",
  },
  {
    label: "Email",
    href: "mailto:sz.richard98@gmail.com",
    icon: "email",
  },
] as const;

export const ABOUT_SECTION = {
  title: "About",
  paragraphs: [
    "Hey, I'm Richard, a full-stack engineer from Budapest, Hungary. I'm passionate about building web applications with user-friendly interfaces, and high-performance APIs. I love coming up with simple, elegant, and efficient solutions to complex problems.",
    "Lately, I've been especially interested in finding the middle ground between human and AI work; utilizing AI tools to enhance my workflow without displacing the critical thinking, and creativity that makes engineering so rewarding.",
  ],
} as const;

export const SKILLS_SECTION = {
  title: "Skills",
  groups: [
    {
      title: "Frontend",
      items: [
        "JavaScript",
        "TypeScript",
        "HTML",
        "CSS",
        "Tailwind",
        "React",
        "Next.js",
        "Figma",
      ],
    },
    {
      title: "Backend",
      items: ["TypeScript", "Python", "Node", "Express", "GraphQL"],
    },
    {
      title: "Mobile",
      items: ["Flutter"],
    },
    {
      title: "AI tools",
      items: ["Claude", "Cursor", "Gemini"],
    },
    {
      title: "Testing",
      items: ["Jest", "Vitest", "Playwright", "Bruno"],
    },
    {
      title: "Database",
      items: ["MongoDB", "PostgreSQL", "Elasticsearch"],
    },
  ],
} as const;

export const EXPERIENCE_SECTION = {
  title: "Experience",
  timelineStart: "Present",
  timelineEnd: "2021",
  items: [
    {
      title: "Full-stack Software Engineer",
      company: "Plandek Ltd",
      startDate: "Apr 2024",
      endDate: "present",
      location: "London, United Kingdom (remote)",
      highlights: [
        "Contributed to a software intelligence platform handling large volumes of customer data across multiple engineering teams",
        "Helped rewrite and modernize the UI, which was very well received by clients",
        "Led the technical implementation of Heap Analytics, providing valuable insights into product usage and user behavior",
        "Developed multiple full-stack features involving large-scale customer data and complex data processing",
        "Developed data visualizations using amCharts 5 to present complex datasets clearly",
        "Supported the onboarding and mentoring of junior software engineers",
        "Helped migrate metrics to a dedicated API, decoupling the metrics infrastructure and enabling independent client access.",
        "Designed and implemented new metrics based on product and client requirements, expanding the platform's analytics capabilities.",
      ],
    },
    {
      title: "Frontend Developer",
      company: "jobrecord.hu",
      startDate: "Apr 2023",
      endDate: "Apr 2024",
      location: "Budapest, Hungary (remote)",
      stack: "React, TypeScript, Next.js, Vercel, Capacitor, Axios, Formik",
      highlights: [
        "Was entrusted with taking over and fixing the codebase of a job-search website",
        "In the first three weeks, fixed over 100 bugs and stabilized the website so the client could present it at an important event",
        "Introduced the client to KANBAN, created ticket templates, set up automatic deployments and error checks",
        "Fixed over 500 TypeScript errors, extracted repeating patterns and improved code consistency",
        "Worked on Search Engine Optimization (SEO): improved page structure, added meta tags, worked with Meta Pixel",
        "Incrementally rewrote most of the website according to new requirements",
      ],
    },
    {
      title: "Full-stack Software Engineer",
      company: "BindrUK",
      startDate: "Nov 2021",
      endDate: "Mar 2023",
      location: "London, United Kingdom (remote)",
      stack:
        "React, Typescript, Jest, Node, Apollo GraphQL, Material UI, Express, MongoDB, Flutter",
      highlights: [
        "Worked at a fast-paced startup in an international SCRUM team",
        "Developed 30+ full-stack features with React and Node",
        "Coordinated with developers across several time zones to develop an app-wide chat system by integrating Stream Chat",
        "Took part in setting up and building a mobile app similar to BeReal from scratch",
        "Developed 20+ full-stack features for mobile with Flutter and Node",
        "Introduced an efficient state management library into the mobile app to improve performance",
      ],
    },
  ],
} as const;

export const PROJECTS_SECTION = {
  title: "Projects",
  items: [
    {
      title: "Mindfully",
      description:
        "A Chrome extension that helps you pause before visiting distracting websites. All data stays in your browser.",
      stack: "Chrome Extension",
    },
  ],
} as const;

export const BLOG_SECTION = {
  title: "Blog",
  description: "Writing and notes.",
  empty: "Posts coming soon.",
} as const;

export const CONTACT_SECTION = {
  title: "Contact",
  description: "Send a message and I'll get back to you.",
  button: "let's talk",
  projectsButton: "projects",
  success: "Thanks for contacting me. I usually reply within 24h",
  fields: {
    firstName: "First name",
    lastName: "Last name",
    email: "Email",
    message: "Message",
    submit: "Submit",
  },
} as const;
