import { Navbar } from '@/components/portfolio/Navbar';
import { Hero } from '@/components/portfolio/Hero';
import { About } from '@/components/portfolio/About';
import { Skills } from '@/components/portfolio/Skills';
import { Experience } from '@/components/portfolio/Experience';
import { Projects } from '@/components/portfolio/Projects';
import { Services } from '@/components/portfolio/Services';
import { Contact } from '@/components/portfolio/Contact';
import { Footer } from '@/components/portfolio/Footer';
import { useTrackClientInfo } from '@/hooks/useTrackClientInfo';

export default function Home() {
 
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Services />
      <Contact />
      <Footer />
    </main>
  );
}
