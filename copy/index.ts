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
    "I'm a full-stack engineer with 5 years of experience building web applications and GraphQL APIs.",
    "I focus on product features, performance, and keeping the stack maintainable — and I use modern AI tools as part of that workflow.",
  ],
} as const;

export const SKILLS_SECTION = {
  title: "Skills",
  groups: [
    {
      title: "Frontend",
      items: ["React", "TypeScript", "Next.js", "Material UI"],
    },
    {
      title: "Backend",
      items: ["Node", "Express", "GraphQL", "Apollo"],
    },
    {
      title: "Mobile",
      items: ["Flutter"],
    },
    {
      title: "Data & testing",
      items: ["MongoDB", "Jest"],
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
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
      ],
    },
    {
      title: "Frontend Developer",
      company: "jobrecord.hu",
      startDate: "Apr 2023",
      endDate: "Apr 2024",
      location: "Budapest, Hungary (remote)",
      highlights: [
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.",
        "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
        "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti.",
        "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates.",
        "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur.",
      ],
    },
    {
      title: "Full-stack Software Engineer",
      company: "BindrUK",
      startDate: "Nov 2021",
      endDate: "Mar 2023",
      location: "London, United Kingdom (remote)",
      stack:
        "React, Typescript, Jest, Node, Apollo, GraphQL, Material UI, Express, MongoDB, Flutter",
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
    {
      title: "Lorem Project",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      stack: "React, TypeScript, Node",
    },
    {
      title: "Ipsum App",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      stack: "Flutter, GraphQL",
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
