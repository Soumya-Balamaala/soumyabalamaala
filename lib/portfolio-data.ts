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

export interface Service {
  title: string;
  description: string;
  iconName: string;
}

export const servicesData: Service[] = [
  { title: 'Web and Mobile Development', description: 'Responsive web and mobile apps tailored to meet your business goals and user needs.', iconName: 'Code' },
  { title: 'Branding and Designing', description: 'Creative branding and design solutions to elevate your business identity and appeal.', iconName: 'Palette' },
  { title: 'Content Writing', description: 'SEO-friendly content that engages users and strengthens your online presence effectively.', iconName: 'PenLine' },
  { title: 'Social Media Marketing', description: 'Grow your brand on social media with targeted content and audience engagement strategies.', iconName: 'Share2' },
  { title: 'Paid Campaigns (PPC & Ads)', description: 'Data-driven paid ad campaigns designed to maximize reach, conversions, and ROI.', iconName: 'Megaphone' },
  { title: 'Backend Development', description: 'Secure and scalable backend solutions to power your apps and manage core functionality.', iconName: 'Server' },
  { title: 'SEO (Search Engine Optimization)', description: 'Improve your search visibility and drive traffic with expert SEO techniques and tools.', iconName: 'Search' },
  { title: 'End-to-End Accounting & Tax Solutions', description: 'Complete accounting and tax services for compliance, clarity, and financial efficiency.', iconName: 'Calculator' },
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
