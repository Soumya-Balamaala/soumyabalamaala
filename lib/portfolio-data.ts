export interface SkillCategory {
  category: string;
  skills: string[];
}

export const skillsData: SkillCategory[] = [
  { category: 'Frontend Technologies', skills: ['React.js', 'Next.js', 'JavaScript', 'TypeScript'] },
  { category: 'Backend Technologies', skills: ['Node.js', 'Express.js'] },
  { category: 'Mobile Development', skills: ['React Native (CLI & Expo)'] },
  { category: 'State Management', skills: ['Redux', 'Redux Toolkit', 'Redux Saga', 'Zustand', 'TanStack Query'] },
  { category: 'UI Frameworks', skills: ['Material UI', 'Tailwind CSS', 'Styled Components'] },
  { category: 'API Integrations', skills: ['REST API'] },
  { category: 'Hosting & Deployment', skills: ['Firebase', 'Vercel', 'Google Cloud Platform (GCP)'] },
  { category: 'Version Control', skills: ['Git', 'GitHub'] },
  { category: 'Databases & ORMs', skills: ['PostgreSQL', 'MongoDB', 'Sequelize', 'Prisma'] },
];

export type TimelineType = 'work' | 'education';

export interface TimelineEntry {
  type: TimelineType;
  title: string;
  organization: string;
  location?: string;
  duration: string;
  bullets: string[];
}

export const timelineData: TimelineEntry[] = [
  {
    type: 'work',
    title: 'Solution Engineer (Full Time)',
    organization: 'M2P Fintech',
    location: 'Hyderabad, India',
    duration: 'Jun 2025 – Present',
    bullets: [
      'Spearheaded development and delivery of new features for VKYC and OCAC projects, resolving 100+ critical production incidents while maintaining 100% uptime and zero unplanned downtime',
      'Delivered 20+ change requests across VKYC and OCAC modules with consistently on-time turnaround',
      'Led troubleshooting and performance optimization initiatives that sustained 100% system uptime',
      'Earned consistent stakeholder satisfaction ratings through proactive incident resolution and clear communication during critical production issues',
    ],
  },
  {
    type: 'work',
    title: 'React Developer (Consultant)',
    organization: 'Solaiera.ai',
    location: 'Hyderabad, India',
    duration: 'Mar 2025 – May 2025',
    bullets: [
      'Translated wireframes into reusable, scalable React JS components for Dost AI, a product designed to enhance daily routines for children with autism',
      'Led design-to-code implementation, ensuring a seamless user experience and efficient front-end architecture',
      'Deployed applications on Google Cloud Platform (GCP), optimizing performance and scalability',
      'Developed and integrated APIs using GCP services to enable robust backend connectivity and data flow',
      'Orchestrated seamless deployment pipelines for Dost AI, enhancing long-term scalability and maintainability',
    ],
  },
  {
    type: 'work',
    title: 'Associate Consultant (React JS)',
    organization: 'Kapil Technologies Pvt Ltd',
    location: 'Hyderabad, India',
    duration: 'May 2023 – Aug 2024',
    bullets: [
      "Spearheaded the transformation of the company's static website into an interactive platform, enabling file uploads via the admin portal and real-time application status tracking",
      'Developed a robust admin panel to manage media files, update career portal data, and monitor website traffic through custom API integrations',
      'Converted the static website into a dynamic single-page application (SPA) with an integrated admin panel',
    ],
  },
  {
    type: 'work',
    title: 'Frontend Developer',
    organization: 'VMax e-Solution Pvt Ltd',
    location: 'Hyderabad, India',
    duration: 'Jan 2023 – Mar 2023',
    bullets: [
      'Transformed UI wireframes into scalable, reusable React components, enhancing development efficiency and code maintainability',
      'Led API integration for the ProhealthI Admin Panel project, ensuring seamless functionality and on-time deployment',
      'Participated in client requirement meetings to align project scope, achieving 100% on-time delivery',
    ],
  },
  {
    type: 'work',
    title: 'Jr. Frontend Developer',
    organization: 'Talentkind Solutions LLP',
    location: 'Hyderabad, India',
    duration: 'Jan 2021 – Sep 2022',
    bullets: [
      "Transformed UI wireframes into scalable, reusable React components, enhancing development efficiency and code maintainability",
      "Led API integration across Talentkind's Admin, Talent, Trainer, and Employer modules, ensuring smooth functionality and on-time end-of-day deployment",
      'Delivered the Trainer, Talent, and Employer modules by converting UI wireframes into reusable React code and integrating APIs',
      'Participated in client requirement meetings to align project scope, achieving 100% on-time delivery',
    ],
  },
  {
    type: 'education',
    title: 'B.Tech, Electronics & Communication Engineering',
    organization: 'Lakireddy Balireddy College of Engineering, JNTUK',
    duration: '2016 – 2019',
    bullets: ['CGPA: 6.71'],
  },
  {
    type: 'education',
    title: 'Diploma, Electronics & Communication Engineering',
    organization: 'KES Polytechnic College for Women, AP-SBTET',
    duration: '2013 – 2016',
    bullets: ['Percentage: 74.99%'],
  },
  {
    type: 'education',
    title: 'Class X',
    organization: "St. Anne's High School, Guntupalli, AP-BSE",
    duration: '2012 – 2013',
    bullets: ['CGPA: 7.8'],
  },
];

export interface Project {
  name: string;
  company: string;
  description: string;
  skills: string[];
  link?: string;
}

export const projectsData: Project[] = [
  {
    name: 'My Portfolio',
    company: 'Personal Project',
    description: 'Personal portfolio showcasing frontend and full-stack projects (soumyabalamaala.vercel.app)',
    skills: ['Next.js', 'React.js',"Typescript", 'Tailwind CSS', 'Framer Motion'],
    link: 'https://soumyabalamaala.vercel.app',
  },
  {
    name: 'VKYC & OCAC Modules',
    company: 'M2P Fintech',
    description: 'Production fintech features delivered with 100% uptime and zero unplanned downtime',
    skills: ['React.js', 'Node.js', 'REST API', 'GCP'],
  },
  {
    name: 'Dost AI',
    company: 'Solaiera.ai',
    description: 'React-based product supporting daily routines for children with autism, deployed on GCP',
    skills: ['React.js', 'GCP', 'REST API', 'Material UI'],
  },
  {
    name: 'Static-to-SPA Transformation',
    company: 'Kapil Technologies Pvt Ltd',
    description: 'Converted static company site into an SPA with an integrated admin panel and custom API integrations',
    skills: ['React.js', 'REST API', 'Node.js'],
  },
  {
    name: 'ProhealthI Admin Panel',
    company: 'VMax e-Solution Pvt Ltd',
    description: 'React-based admin panel with full API integration',
    skills: ['React.js', 'REST API', 'Material UI'],
  },
  {
    name: 'Talentkind.com',
    company: 'Talentkind Solutions LLP',
    description: 'Admin, Talent, Trainer, and Employer modules built in React with integrated APIs',
    skills: ['React.js', 'REST API', 'Redux'],
  },
];

export const contactInfo = {
  email: 'soumyabalamaala@gmail.com',
  phone: '+91 8639695779',
  location: 'Hyderabad, India',
  linkedin: 'https://linkedin.com/in/soumyabalamaala',
  github: 'https://github.com/Soumya-Balamaala',
  portfolio: 'https://soumyabalamaala.vercel.app',
};

export const aboutInfo = [
  { label: 'Nationality', value: 'Indian' },
  { label: 'Relocation', value: 'Open to UAE' },
  { label: 'Visa Status', value: 'Sponsorship required' },
  { label: 'Notice Period', value: 'Immediate joiner' },
];

export interface Recommendation {
  name: string;
  role: string;
  company: string;
  initials: string;
  text: string;
}

// Placeholder testimonials — replace with real recommendations.
export const recommendationsData: Recommendation[] = [
  {
    name: 'Rahul Sharma',
    role: 'Engineering Manager',
    company: 'M2P Fintech',
    initials: 'RS',
    text: 'Soumya consistently delivered critical VKYC and OCAC features under tight timelines while keeping production stable. Her ownership during incident resolution stood out to the whole team.',
  },
  {
    name: 'Ananya Rao',
    role: 'Product Lead',
    company: 'Solaiera.ai',
    initials: 'AR',
    text: 'She translated complex wireframes into clean, reusable React components for Dost AI and never lost sight of the end user. A dependable frontend engineer to work with.',
  },
  {
    name: 'Vikram Reddy',
    role: 'Engineering Head',
    company: 'Kapil Technologies',
    initials: 'VR',
    text: 'Soumya led the transformation of our static site into a fully dynamic SPA with an admin panel. She scoped, built, and shipped it with minimal supervision.',
  },
  {
    name: 'Priya Menon',
    role: 'Project Manager',
    company: 'VMax e-Solution',
    initials: 'PM',
    text: "Clear communicator and fast learner. Soumya's API integration work on the ProhealthI Admin Panel was delivered on time and with very few revisions needed.",
  },
  {
    name: 'Karthik Iyer',
    role: 'Senior Developer',
    company: 'Talentkind Solutions',
    initials: 'KI',
    text: 'Working alongside Soumya on the Talentkind modules, I could always count on her to deliver well-structured, maintainable React code across multiple modules at once.',
  },
];

export interface ReferralJob {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

// Placeholder openings — replace with real referral roles you're tracking.
export const referralJobsData: ReferralJob[] = [
  {
    id: 'frontend-developer-m2p-fintech',
    title: 'Frontend Developer (React.js)',
    company: 'M2P Fintech',
    location: 'Hyderabad, India',
    type: 'Full-time',
    description:
      'Build and maintain customer-facing fintech features using React.js, working closely with backend and product teams to ship reliable, high-uptime experiences.',
    responsibilities: [
      'Develop and maintain React.js components for core fintech modules',
      'Collaborate with backend engineers on REST API integration',
      'Troubleshoot and resolve production issues with a focus on uptime',
      'Participate in code reviews and contribute to frontend best practices',
    ],
    requirements: [
      '2+ years of experience with React.js',
      'Familiarity with REST APIs and state management (Redux/Zustand/TanStack Query)',
      'Experience with Material UI or a similar component library',
      'Comfortable working in a fast-paced, production-critical environment',
    ],
  },
  {
    id: 'react-native-developer-partner-network',
    title: 'React Native Developer',
    company: 'Partner Network',
    location: 'Remote',
    type: 'Contract',
    description:
      'Contribute to a cross-platform mobile app built with React Native, working with a distributed team on new features and performance improvements.',
    responsibilities: [
      'Build and ship features for iOS and Android using React Native',
      'Optimize app performance and address platform-specific issues',
      'Work with designers to implement pixel-accurate UI',
      'Write clean, reusable, well-tested components',
    ],
    requirements: [
      'Experience shipping apps with React Native (CLI or Expo)',
      'Understanding of native module integration basics',
      'Comfortable working async in a remote, distributed team',
    ],
  },
  {
    id: 'fullstack-developer-partner-network',
    title: 'Full Stack Developer (MERN)',
    company: 'Partner Network',
    location: 'Hyderabad, India',
    type: 'Full-time',
    description:
      'Own features end-to-end across a MongoDB, Express.js, React.js, and Node.js stack, from API design to polished frontend delivery.',
    responsibilities: [
      'Design and build REST APIs with Node.js and Express.js',
      'Build responsive frontend features with React.js',
      'Design MongoDB schemas and write efficient queries',
      'Collaborate with product on scoping and delivery timelines',
    ],
    requirements: [
      'Solid experience across the MERN stack',
      'Comfortable owning a feature from database to UI',
      'Good communication skills for client/stakeholder discussions',
    ],
  },
];
