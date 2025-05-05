"use client";

import { Article, Code, CreditCard, FigmaLogo, InstagramLogo, MagnifyingGlass, MetaLogo } from "@phosphor-icons/react";
import {
  GoPencil,
  GoCodeSquare,
  GoDatabase,
  GoDesktopDownload,
} from "react-icons/go";

export const servicesdata = [
  {
    id: 1,
    title: "UI Development",
    icon: <GoCodeSquare />,
    text: "Creating responsive, visually appealing UIs with React.js & MUI for a seamless experience.",
    eid: "UI Development",
  },
  {
    id: 2,
    title: "UI & UX Designing",
    icon: <GoPencil />,
    text: "Crafting user-friendly, accessible designs with smooth navigation for better engagement.",
    eid: "UI & UX Designing",
  },
  {
    id: 3,
    title: "Full Stack Development",
    icon: <GoDatabase />,
    text: "Building scalable apps with frontend, backend, APIs & databases for robust solutions.",
    eid: "Full Stack Development",
  },
  {
    id: 4,
    title: "Backend Development",
    icon: <GoDesktopDownload />,
    text: "Building secure, scalable solutions with Node.js, Express & databases for seamless app performance.",
    eid: "Backend Development",
  },
];

export const NewServices = [
  {
    id: 1,
    title: "Web and Mobile Development",
    icon: <Code size={42} />,
    description: "Responsive web and mobile apps tailored to meet your business goals and user needs."
  },
  {
    id: 2,
    title: "Branding and Designing",
    icon: <FigmaLogo size={42} />,
    description: "Creative branding and design solutions to elevate your business identity and appeal."
  },
  {
    id: 3,
    title: "Content Writing",
    icon: <Article size={42} />,
    description: "SEO-friendly content that engages users and strengthens your online presence effectively."
  },
  {
    id: 4,
    title: "Social Media Marketing",
    icon: <InstagramLogo size={42} />,
    description: "Grow your brand on social media with targeted content and audience engagement strategies."
  },
  {
    id: 5,
    title: "Paid Campaigns (PPC & Ads)",
    icon: <MetaLogo size={42} />,
    description: "Data-driven paid ad campaigns designed to maximize reach, conversions, and ROI."
  },
  {
    id: 6,
    title: "Backend Development",
    icon: <MetaLogo size={42} />,
    description: "Secure and scalable backend solutions to power your apps and manage core functionality."
  },
  {
    id: 7,
    title: "SEO (Search Engine Optimization)",
    icon: <MagnifyingGlass size={42} />,
    description: "Improve your search visibility and drive traffic with expert SEO techniques and tools."
  },
  {
    id: 8,
    title: "End-to-End Accounting & Tax Solutions",
    icon: <CreditCard size={42} />,
    description: "Complete accounting and tax services for compliance, clarity, and financial efficiency."
  }
];


