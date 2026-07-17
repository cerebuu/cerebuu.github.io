/**
 * content.js
 * Single source of truth for all portfolio content.
 * Both Resume Mode and (eventually) the 3D world's Section
 * files should read from here instead of hardcoding text —
 * update your info once, it reflects everywhere.
 */
export default {

    name: 'Caleb Adriel M. Tingson',
    title: 'Software Developer · Computer Science Student · GDG on Campus Lead',
    bio: 'Computer Science student at the University of the Immaculate Conception (UIC) with a passion for software development, web technologies, artificial intelligence, and emerging technologies. I enjoy building clean, user-focused applications, solving real-world problems, and contributing to the tech community through leadership, hackathons, and events. I\'m continuously learning and expanding my skills to become a full-stack software developer.',

    // Short version used in the 30-second summary card — 2 lines max
    bioShort: 'CS student building clean, user-focused apps. Currently exploring full-stack development, AI, and interactive web experiences.',

    // The 3 skills to highlight in the summary card (pulled to the front,
    // rest of your skills still live in full detail in the skills[] list below)
    featuredSkills: ['JavaScript', 'Three.js', 'UI/UX Design'],

    // ResumeMode.js reads name/title/bio from here (nested), while
    // SummaryCard.js reads the top-level fields above. Both point to
    // the same values so there's still just one place to edit.
    about: {
        name: 'Caleb Adriel M. Tingson',
        title: 'Software Developer · Computer Science Student · GDG on Campus Lead',
        bio: 'Computer Science student at the University of the Immaculate Conception (UIC) with a passion for software development, web technologies, artificial intelligence, and emerging technologies. I enjoy building clean, user-focused applications, solving real-world problems, and contributing to the tech community through leadership, hackathons, and events. I\'m continuously learning and expanding my skills to become a full-stack software developer.'
    },

    skills: [
        {
            group: 'Programming Languages',
            tags: [
                { name: 'Java', featured: true },
                { name: 'JavaScript', featured: true },
                { name: 'HTML5' },
                { name: 'CSS3' },
                { name: 'SQL (Basic)' }
            ]
        },
        {
            group: 'Frameworks & Libraries',
            tags: [
                { name: 'React (Learning)' },
                { name: 'Three.js (Learning)', featured: true },
                { name: 'Tailwind CSS' },
                { name: 'Bootstrap' }
            ]
        },
        {
            group: 'Tools & Platforms',
            tags: [
                { name: 'Git', featured: true },
                { name: 'GitHub' },
                { name: 'VS Code' },
                { name: 'Figma' },
                { name: 'Canva' },
                { name: 'Microsoft Office' }
            ]
        },
        {
            group: 'Networking & IT',
            tags: [
                { name: 'Computer Hardware Servicing' },
                { name: 'LAN/WAN Configuration' },
                { name: 'Network Troubleshooting' },
                { name: 'Software Installation' },
                { name: 'System Maintenance' },
                { name: 'Technical Support' }
            ]
        },
        {
            group: 'Professional Skills',
            tags: [
                { name: 'UI/UX Design', featured: true },
                { name: 'Responsive Web Design' },
                { name: 'Problem Solving' },
                { name: 'Team Collaboration' },
                { name: 'Leadership' },
                { name: 'Research' },
                { name: 'Technical Documentation' },
                { name: 'Public Speaking' }
            ]
        }
    ],

    projects: [
        {
            title: 'Interactive Game Portfolio',
            status: 'In Progress',
            problem: 'Traditional portfolios often fail to showcase creativity and technical skills in an engaging way.',
            solution: 'Developing an interactive game-inspired portfolio with a minimalist monochrome design where visitors explore projects through gameplay.',
            impact: 'Demonstrates frontend development, creative design, and interactive user experience while strengthening my personal brand.',
            tags: ['HTML', 'CSS', 'JavaScript', 'Three.js'],
            link: { text: 'Link coming soon', disabled: true }
        },
        {
            title: 'Dental Clinic Information Website',
            status: 'Private',
            problem: 'The clinic needed an online platform where patients could easily access essential information and services.',
            solution: 'Collaborated on developing an informational website featuring clinic services, contact details, and appointment information.',
            impact: 'Improved the clinic\'s online presence and made information more accessible for patients.',
            tags: ['HTML', 'CSS', 'JavaScript'],
        },
        {
            title: 'GDG on Campus Website QA',
            status: 'Private',
            problem: 'The organization required website testing before deployment to ensure quality and usability.',
            solution: 'Conducted QA testing, identifying UI inconsistencies, usability issues, and functional bugs.',
            impact: 'Contributed to a more polished, user-friendly website before launch.',
            tags: ['QA Testing', 'UI/UX', 'Documentation'],
        },
        {
            title: 'Java Console Applications',
            status: 'GitHub Soon',
            problem: 'Strengthen Java programming fundamentals through practical applications.',
            solution: 'Developed multiple Java console programs implementing authentication systems, arrays, loops, methods, and OOP concepts.',
            impact: 'Improved programming logic and software development skills.',
            tags: ['Java', 'OOP'],
        },
        {
            title: 'Computer Networking Projects',
            status: 'Academic',
            problem: 'Build reliable local networks for academic and practical environments.',
            solution: 'Designed, configured, and troubleshot LAN topologies while applying networking concepts and best practices.',
            impact: 'Successfully implemented functional network infrastructures and strengthened networking expertise.',
            tags: ['Networking', 'LAN', 'WAN', 'Cisco Concepts'],
        }
    ],

    experience: [
        {
            role: 'Campus Lead',
            org: 'Google Developer Groups on Campus (GDG on Campus) — University of the Immaculate Conception',
            dates: '2026 — Present',
            bullets: [
                'Lead the campus developer community by organizing technical events, workshops, and collaborative activities.',
                'Promote technology learning, innovation, and community engagement among students.'
            ]
        },
        {
            role: 'Freelance Encoder',
            org: 'Lebosada Dental Care',
            dates: '2024 — Present',
            bullets: [
                'Prepared, organized, and encoded business records while ensuring data accuracy and efficient documentation.'
            ]
        },
        {
            role: 'Freelance Encoder',
            org: 'Double A Rooftech Marketing',
            dates: '2024 — Present',
            bullets: [
                'Managed monthly sales and purchase encoding for BIR reporting while maintaining organized and accurate financial records.'
            ]
        }
    ],

    certifications: [
        {
            group: 'Artificial Intelligence',
            items: [
                'Artificial Intelligence Essentials V2 — Coursera (2026)',
                'Introduction to Generative AI — Google Cloud (2026)',
                'Generative AI for Everyone — DeepLearning.AI (2026)'
            ]
        },
        {
            group: 'Emerging Technologies',
            items: [
                'Explore Emerging Tech — IBM (2026)',
                'Participant, Quantum Computing and Cybersecurity CTF Hackathon 2026 — Quantum Computing Society of the Philippines (QCSP)'
            ]
        },
        {
            group: 'Leadership & Recognition',
            items: [
                'Fireside Chat Panelist — GDG Davao (2026)',
                'Event Host (Working Committee) — University of the Immaculate Conception (UIC) (2026)'
            ]
        }
    ],

    contact: [
        { label: 'Email', value: 'zaikurei112@gmail.com', href: 'mailto:zaikurei112@gmail.com' },
        { label: 'GitHub', value: 'github.com/cerebuu', href: 'https://github.com/cerebuu' },
        { label: 'LinkedIn', value: 'linkedin.com/in/calebtingson', href: 'https://www.linkedin.com/in/calebtingson/' },
        { label: 'Facebook', value: 'facebook.com/caleb.adriel.tingson', href: 'https://www.facebook.com/caleb.adriel.tingson' }
    ]
}
