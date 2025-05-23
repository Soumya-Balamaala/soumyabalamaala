// "use client";


export const  Metadata = {
  title: {
    default: "Soumya Balamaala",
    template: "%s | Admin | Soumya Balamaala",
  },
  viewport: "width=device-width, initial-scale=1",
   description:
    "I am Soumya, a React.js Developer with 3.5 years of experience in React.js, Material UI, and Next.js. I’m a beginner in Node.js, TypeScript, and React Native.",
};

export default function AdminRootLayout({ children }) {
  return <>{children}</>;
}
