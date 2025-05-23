// "use client";

import "../styles/global.css";

export const metadata = {
  title: {
    default: "Soumya Balamaala",
    template: "%s | Soumya Balamaala",
  },
  viewport: "width=device-width, initial-scale=1",
   description:
    "I am Soumya, a React.js Developer with 3.5 years of experience in React.js, Material UI, and Next.js. I’m a beginner in Node.js, TypeScript, and React Native.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
       
      </head>
      <body>{children}</body>
    </html>
  );
}
