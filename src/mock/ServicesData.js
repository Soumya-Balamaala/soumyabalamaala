"use client";

import { GoPencil , GoCodeSquare,GoDatabase,GoDesktopDownload} from "react-icons/go";

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
