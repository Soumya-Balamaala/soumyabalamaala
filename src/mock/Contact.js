"use client";

import {
  FiAtSign,
  FiInstagram,
  FiLinkedin,
  FiPhoneIncoming,
  FiMail,
} from "react-icons/fi";

export const ContactData = [
  {
    id: 1,
    title: "Write to Me !",
    path: "mailto:soumyabalamaala@gmail.com",
    text: "soumyabalamaala@gmail.com",
    icon: <FiMail />,
  },
  {
    id: 2,
    title: "Ring me Up",
    path: "tel:+91-9959925779",
    text: "+91 9959925779",
    icon: <FiPhoneIncoming />,
  },
];

export const SocialMedia = [
  {
    id: 1,
    title: "Follow My Updates",
    icon: <FiAtSign />,
    sm: [
      {
        id: 1,
        title: "LinkedIn",
        path: "https://www.linkedin.com/in/soumyabalamaala/",
        icon: <FiLinkedin />,
      },
      {
        id: 2,
        title: "Instagram",
        path: "https://www.instagram.com/soumyabalamaala/",
        icon: <FiInstagram />,
      },
    ],
  },
];

export const FormInputData = [
  {
    id: 1,
    label: "Full Name",
    name: "fullname",
    icon: "",
    type: "text",
    xswidth: 12,
    mdwidth: 5.5,
  },
  {
    id: 2,
    label: "Company",
    name: "cname",
    icon: "",
    type: "text",
    xswidth: 12,
    mdwidth: 5.5,
  },
  {
    id: 3,
    label: "Email",
    name: "email",
    icon: "",
    type: "text",
    xswidth: 12,
    mdwidth: 5.5,
  },
  {
    id: 4,
    label: "Mobile",
    name: "phone",
    icon: "",
    type: "text",
    xswidth: 12,
    mdwidth: 5.5,
  },
  {
    id: 5,
    label: "Services your looking for ?",
    name: "services",
    icon: "",
    type: "list",
    serviceslist: [
      {
        id: 1,
        label: "UI Development",
        value: "UI Development",
      },
      {
        id: 2,
        label: "UX/UI Designing",
        value: "UX/UI Designing",
      },
      {
        id: 3,
        label: "Full Stack Application",
        value: "Full Stack Application",
      },
      {
        id: 4,
        label: "Backend Development",
        value: "Backend Development",
      },
    ],
    xswidth: 12,
    mdwidth: 11.2,
  },
  {
    id: 6,
    label: "Explain your project In detailed !",
    name: "details",
    icon: "",
    type: "multiline",
    xswidth: 12,
    mdwidth: 11.2,
  },
  // {
  //     id: 6,
  //     label: "Do you already have designs ?",
  //     name: "designs",
  //     icon: "",
  //     type: "text",
  //     xswidth: 12,
  //     mdwidth: 5.5,
  // },
  // {
  //     id: 7,
  //     label: "Current Platform",
  //     name: "platform",
  //     icon: "",
  //     type: "text",
  //     xswidth: 12,
  //     mdwidth: 5.5,
  // },
  // {
  //     id: 8,
  //     label: "Scope of the Project",
  //     name: "scope",
  //     icon: "",
  //     type: "text",
  //     xswidth: 12,
  //     mdwidth: 5.5,
  // },
  // {
  //     id: 9,
  //     label: "Project completed by ?",
  //     name: "timeline",
  //     icon: "",
  //     type: "text",
  //     xswidth: 12,
  //     mdwidth: 5.5,
  // },
  // {
  //     id: 10,
  //     label: "Do you need Hosting Services ?",
  //     name: "details",
  //     icon: "",
  //     type: "text",
  //     xswidth: 12,
  //     mdwidth: 5.5,
  // },
  // {
  //     id: 11,
  //     label: "Provide the Details of the Project",
  //     name: "details",
  //     icon: "",
  //     type: "text",
  //     xswidth: 12,
  //     mdwidth: 11,
  //   },
];
