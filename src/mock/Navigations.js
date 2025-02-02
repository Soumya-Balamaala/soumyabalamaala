"use client";

import ReactImage from "@/assets/Logos/React.png";
import Javascript from "@/assets/Logos/javascript.png";
import MaterialUI from "@/assets/Logos/materialui.png"; // Corrected spelling
import Nextjs from "@/assets/Logos/nextjs.png";
import Typescript from "@/assets/Logos/typescript.png";
import Nodejs from "@/assets/Logos/nodejs.png";
import Figma from "@/assets/Logos/figma.png";
// import ReactImage from "@/assets/Logos/React.png";

export const NavData = [
  {
    id: 1,
    title: "Home",
    path: "/",
    aid: "home",
  },
  {
    id: 2,
    title: "About",
    path: "/about",
    aid: "about",
  },
  {
    id: 3,
    title: "Skills",
    path: "/skills",
    aid: "expedu",
  },
  {
    id: 4,
    title: "Experience & Education",
    path: "/experience-education",
    aid: "expedu",
  },

  {
    id: 5,
    title: "Services",
    path: "/services",
    aid: "services",
  },
  {
    id: 6,
    title: "Contact ",
    path: "/contact-me",
    aid: "contact",
  },
];

export const programmingLanguages = [
  {
    id: 1,
    icon: ReactImage,
    title:"React"
  },
  {
    id: 2,
    icon: Javascript,
    title:"JavaScript"
  },
  {
    id: 3,
    icon: MaterialUI,
    title:"Material UI"
  },
  {
    id: 4,
    icon: Nextjs,
    title:"Next js"
  },
  {
    id: 5,
    icon: Typescript,
    title:"TypeScript"
  },
  {
    id: 6,
    icon: Nodejs,
    title:"Nodejs"
  },
  {
    id: 7,
    icon: Figma,
    title:"Figma"
  },
];
