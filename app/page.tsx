import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MarqueeStrip from "./components/MarqueeStrip";
import FeatureShowcase from "./components/FeatureShowcase";
import ProjectDemo from "./components/ProjectDemo";
import BentoProjects from "./components/BentoProjects";
import AboutSection from "./components/AboutSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <MarqueeStrip />
      <FeatureShowcase />
      <ProjectDemo />
      <BentoProjects />
      <AboutSection />
      <Footer />
    </>
  );
}
