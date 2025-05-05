"use client";

import ReactImage from "@/assets/Logos/React.png";
import Javascript from "@/assets/Logos/javascript.png";
import MaterialUI from "@/assets/Logos/materialui.png"; // Corrected spelling
import Nextjs from "@/assets/Logos/nextjs.png";
import Typescript from "@/assets/Logos/typeScript.png";
import Nodejs from "@/assets/Logos/nodejs.png";
import Figma from "@/assets/Logos/Figma.png";
// import ReactImage from "@/assets/Logos/React.png";

export const NavData = [
  {
    id: 1,
    title: "Home",
    path: "/",
    aid: "home",
  },
  // {
  //   id: 2,
  //   title: "About Me",
  //   path: "/about",
  //   aid: "about",
  // },
  {
    id: 2,
    title: "Experience",
    path: "/experience",
    aid: "experience",
  },

  {
    id: 3,
    title: " Services",
    path: "/services",
    aid: "services",
  },

  {
    id: 4,
    title: "Contact",
    path: "/contact",
    aid: "contact",
  },
];

export const programmingLanguages = [
  {
    id: 1,
    icon: ReactImage,
    title: "React",
  },
  {
    id: 2,
    icon: Javascript,
    title: "JavaScript",
  },
  {
    id: 3,
    icon: MaterialUI,
    title: "Material UI",
  },
  {
    id: 4,
    icon: Nextjs,
    title: "Next js",
  },
  {
    id: 5,
    icon: Typescript,
    title: "TypeScript",
  },
  {
    id: 6,
    icon: Nodejs,
    title: "Nodejs",
  },
  {
    id: 7,
    icon: Figma,
    title: "Figma",
  },
];
