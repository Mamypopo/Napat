import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ScrollRestore from "./components/ScrollRestore";
import MarqueeStrip from "./components/MarqueeStrip";
import FeatureShowcase from "./components/FeatureShowcase";
import PinnedScroll from "./components/PinnedScroll";
import ProjectDemo from "./components/ProjectDemo";
import BentoProjects from "./components/BentoProjects";
import TechStack from "./components/TechStack";
import CaseStudySlider from "./components/CaseStudySlider";
import AboutSection from "./components/AboutSection";
import ContactCTA from "./components/ContactCTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <ScrollRestore />
      <Navbar />
      <Hero />
      <MarqueeStrip />
      <TechStack />
      <FeatureShowcase />
      <BentoProjects />
      <ProjectDemo />
      <PinnedScroll />
      <CaseStudySlider />
      <AboutSection />
      <ContactCTA />

      {/* <LivePreview /> */}

      <Footer />
    </>
  );
}
