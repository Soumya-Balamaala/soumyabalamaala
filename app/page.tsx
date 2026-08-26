import { Navbar } from '@/components/portfolio/Navbar';
import { VisitorTracker } from '@/components/portfolio/VisitorTracker';
import { HashScrollHandler } from '@/components/portfolio/HashScrollHandler';
import { Hero } from '@/components/portfolio/Hero';
import { About } from '@/components/portfolio/About';
import { Skills } from '@/components/portfolio/Skills';
import { Experience } from '@/components/portfolio/Experience';
import { Projects } from '@/components/portfolio/Projects';
import { Recommendations } from '@/components/portfolio/Recommendations';
import { Contact } from '@/components/portfolio/Contact';
import { Footer } from '@/components/portfolio/Footer';

export default function Home() {

  return (
    <main className="min-h-screen bg-white">
      <VisitorTracker page="home" />
      <HashScrollHandler />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Recommendations />
      <Contact />
      <Footer />
    </main>
  );
}
