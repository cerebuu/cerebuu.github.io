/**
 * content.js
 * Single source of truth for all portfolio content.
 * Both Resume Mode and (eventually) the 3D world's Section
 * files should read from here instead of hardcoding text —
 * update your info once, it reflects everywhere.
 */
import activities from "./activities/index.js";
import aiEssentialsPreview from "./images/certifications/ai-essentials-v2.jpg";
import generativeAiPreview from "./images/certifications/generative-ai-for-everyone.jpg";
import introGenAiPreview from "./images/certifications/introduction-to-generative-ai.jpg";
import emergingTechPreview from "./images/certifications/explore-emerging-tech.png";
import firesideChatPreview from "./images/certifications/fireside-chat-panelist.jpg";
import eventHostPreview from "./images/certifications/event-host-working-committee.jpg";
import quantumCtfPreview from "./images/certifications/quantum-computing-ctf-hackathon.jpg";

export default {
  name: "Caleb Adriel M. Tingson",
  title: "Software Developer · Computer Science Student · GDG on Campus Lead",
  bio: "Computer Science student at the University of the Immaculate Conception (UIC) with a passion for software development, web technologies, artificial intelligence, and emerging technologies. I enjoy building clean, user-focused applications, solving real-world problems, and contributing to the tech community through leadership, hackathons, and events. I'm continuously learning and expanding my skills to become a full-stack software developer.",

  // Short version used in the 30-second summary card — 2 lines max
  bioShort:
    "CS student building clean, user-focused apps. Currently exploring full-stack development, AI, and interactive web experiences.",

  // The 3 skills to highlight in the summary card (pulled to the front,
  // rest of your skills still live in full detail in the skills[] list below)
  featuredSkills: ["JavaScript", "Three.js", "UI/UX Design"],

  // ResumeMode.js reads name/title/bio from here (nested), while
  // SummaryCard.js reads the top-level fields above. Both point to
  // the same values so there's still just one place to edit.
  about: {
    name: "Caleb Adriel M. Tingson",
    title: "Software Developer · Computer Science Student · GDG on Campus Lead",
    bio: "Computer Science student at the University of the Immaculate Conception (UIC) with a passion for software development, web technologies, artificial intelligence, and emerging technologies. I enjoy building clean, user-focused applications, solving real-world problems, and contributing to the tech community through leadership, hackathons, and events. I'm continuously learning and expanding my skills to become a full-stack software developer.",
  },

  skills: [
    {
      group: "Programming Languages",
      tags: [
        { name: "Java" },
        { name: "JavaScript" },
        { name: "HTML5" },
        { name: "CSS3" },
        { name: "SQL (Basic)" },
      ],
    },
    {
      group: "Frameworks & Libraries",
      tags: [
        { name: "React", learning: true },
        { name: "Three.js", learning: true },
        { name: "Tailwind CSS" },
        { name: "Bootstrap" },
      ],
    },
    {
      group: "Tools & Platforms",
      tags: [
        { name: "Git" },
        { name: "GitHub" },
        { name: "VS Code" },
        { name: "Figma" },
        { name: "Canva" },
        { name: "Microsoft Office" },
      ],
    },
    {
      group: "Networking & IT",
      tags: [
        { name: "Computer Hardware Servicing" },
        { name: "LAN/WAN Configuration" },
        { name: "Network Troubleshooting" },
        { name: "Software Installation" },
        { name: "System Maintenance" },
        { name: "Technical Support" },
      ],
    },
    {
      group: "Professional Skills",
      tags: [
        { name: "UI/UX Design" },
        { name: "Responsive Web Design" },
        { name: "Problem Solving" },
        { name: "Team Collaboration" },
        { name: "Leadership" },
        { name: "Research" },
        { name: "Technical Documentation" },
        { name: "Public Speaking" },
      ],
    },
  ],

  projects: [
    {
      title: "Interactive Game Portfolio",
      status: "In Progress",
      thumbnail: { label: "3D PORTFOLIO", type: "portfolio" },
      description:
        "An exploratory, game-inspired personal portfolio that turns a traditional resume into an interactive 3D experience. Visitors can navigate a minimalist monochrome world to discover my work, skills, and activities.",
      role: "Designer & Frontend Developer",
      technologies: ["HTML", "CSS", "JavaScript", "Three.js", "Vite"],
      features: [
        "Interactive Three.js world with physics-based exploration",
        "Resume Mode for a fast, accessible reading experience",
        "Responsive navigation and motion-aware interactions",
      ],
      links: {
        demo: {
          text: "Live demo",
          href: "https://cerebuu.github.io/",
        },
        repository: {
          text: "GitHub repository",
          href: "https://github.com/cerebuu/cerebuu.github.io",
        },
      },
    },
    {
      title: "GDG on Campus Website QA",
      status: "Private",
      thumbnail: { label: "QA REVIEW", type: "quality" },
      description:
        "Quality-assurance work for a private GDG on Campus website prior to launch, focused on finding user-interface inconsistencies, usability issues, and functional bugs.",
      role: "QA Tester",
      technologies: ["QA Testing", "UI/UX Review", "Documentation"],
      features: [
        "UI consistency and responsive-layout checks",
        "Usability review across key visitor flows",
        "Clear issue documentation for the development team",
      ],
      links: {
        demo: {
          text: "Private demo",
          href: "https://drive.google.com/file/d/1IJwK2b3F7fa_t-pa3dXy5Vg4v5oxXhb1/view?usp=sharing",
        },
        file: {
          text: "View File",
          href: "/documents/quality-assurance.pdf",
        },
      },
    },
    {
      title: "Student Organization System",
      status: "Completed",
      thumbnail: { label: "JAVA LAB", type: "terminal" },
      description:
        "A collection of practical Java console exercises built to strengthen core programming logic through authentication flows, data handling, reusable methods, and object-oriented programming.",
      role: "Java Developer",
      technologies: ["Java", "OOP", "Console I/O"],
      features: [
        "Authentication-oriented console workflows",
        "Arrays, loops, methods, and conditional logic",
        "Object-oriented programming practice",
      ],
      links: {
        demo: {
          text: "Live Demo",
          href: "https://www.linkedin.com/posts/calebtingson_excited-to-share-our-project-we-developed-ugcPost-7446183944657666048-QhvP/",
        },
        repository: {
          text: "Repository",
          href: "https://github.com/cerebuu/student-org-system",
        },
      },
    },
  ],

  experience: [
    {
      role: "Campus Lead",
      org: "Google Developer Groups on Campus (GDG on Campus) — University of the Immaculate Conception",
      dates: "2026 — Present",
      bullets: [
        "Lead the campus developer community by organizing technical events, workshops, and collaborative activities.",
        "Promote technology learning, innovation, and community engagement among students.",
      ],
    },
    {
      role: "Freelance Encoder",
      org: "Lebosada Dental Care",
      dates: "2024 — Present",
      process:
        "Encoded and organized patient and clinic-related information, then reviewed records for accuracy.",
      benefits:
        "Improved record organization, reduced staff workload, and made information easier to manage and retrieve.",
    },
    {
      role: "Freelance Encoder",
      org: "Double A Rooftech Marketing",
      dates: "2024 — Present",
      process:
        "Encoded and organized business-related data, checked information for errors, and maintained accurate digital records.",
      benefits:
        "Saved time, reduced manual workload, improved data accuracy, and supported efficient business operations.",
    },
  ],

  certifications: [
    {
      year: "2026",
      items: [
        {
          title: "Artificial Intelligence Essentials V2",
          issuer: "Coursera",
          issueDate: "2026",
          previewImage: aiEssentialsPreview,
          credentialId: "8d8cf770-6007-4086-85d4-fde25a3c5bef",
          description:
            "Foundational credential covering artificial intelligence concepts and their real-world applications.",
          credentialUrl:
            "https://www.credly.com/badges/8d8cf770-6007-4086-85d4-fde25a3c5bef/linked_in_profile",
          verificationLabel: "Verify on Credly",
        },
        {
          title: "Introduction to Generative AI",
          issuer: "Google Cloud",
          issueDate: "2026",
          previewImage: introGenAiPreview,
          credentialId: "FCPAOYMEHDT6",
          description:
            "An introductory Google Cloud course exploring generative AI concepts, use cases, and responsible adoption.",
          credentialUrl:
            "https://www.coursera.org/account/accomplishments/verify/FCPAOYMEHDT6",
          verificationLabel: "Verify on Coursera",
        },
        {
          title: "Generative AI for Everyone",
          issuer: "DeepLearning.AI",
          issueDate: "2026",
          previewImage: generativeAiPreview,
          credentialId: "E7R0SM002TG8",
          description:
            "An introductory credential on generative AI, its capabilities, and practical ways to apply it across work and technology.",
          credentialUrl:
            "https://www.coursera.org/account/accomplishments/verify/E7R0SM002TG8",
          verificationLabel: "Verify on Coursera",
        },
        {
          title: "Explore Emerging Tech",
          issuer: "IBM",
          issueDate: "2026",
          previewImage: emergingTechPreview,
          credentialId: "5788c4c5-a9d3-4b6e-862e-970273be5f28",
          description:
            "IBM credential recognizing exploration of emerging technologies and their potential impact.",
          credentialUrl:
            "https://www.credly.com/badges/5788c4c5-a9d3-4b6e-862e-970273be5f28/linked_in_profile",
          verificationLabel: "Verify on Credly",
        },
        {
          title: "Quantum Computing and Cybersecurity CTF Hackathon",
          issuer: "Quantum Computing Society of the Philippines (QCSP)",
          issueDate: "2026",
          previewImage: quantumCtfPreview,
          description:
            "Recognition for participating in a quantum computing and cybersecurity capture-the-flag hackathon.",
          credentialUrl: null,
        },
        {
          title: "Fireside Chat Panelist",
          issuer: "GDG Davao",
          issueDate: "2026",
          previewImage: firesideChatPreview,
          details: [
            {
              label: "What I Did",
              text: "Shared my experiences and insights as a student in technology, AI, and learning. Participated in an open discussion and exchanged ideas with fellow students and attendees.",
            },
            {
              label: "Contribution",
              text: "Helped encourage students to explore technology, AI, and opportunities for personal and academic growth.",
            },
          ],
          credentialUrl: null,
        },
        {
          title: "Event Host (Working Committee)",
          issuer: "University of the Immaculate Conception (UIC)",
          issueDate: "2026",
          previewImage: eventHostPreview,
          details: [
            {
              label: "Context",
              text: "An educational initiative focused on introducing students to AI through interactive and engaging learning activities.",
            },
            {
              label: "What I Did",
              text: "Assisted in presenting and explaining basic AI concepts to students using simple, interactive, and student-friendly approaches.",
            },
            {
              label: "Impact",
              text: "Helped students understand the basic uses of AI and encouraged them to explore technology as a learning tool.",
            },
          ],
          credentialUrl: null,
        },
      ],
    },
  ],

  activities,

  contact: [
    {
      label: "Email",
      value: "zaikurei112@gmail.com",
      href: "mailto:zaikurei112@gmail.com",
    },
    {
      label: "GitHub",
      value: "github.com/cerebuu",
      href: "https://github.com/cerebuu",
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/calebtingson",
      href: "https://www.linkedin.com/in/calebtingson/",
    },
    {
      label: "Facebook",
      value: "facebook.com/caleb.adriel.tingson",
      href: "https://www.facebook.com/caleb.adriel.tingson",
    },
  ],
};
