import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MarqueeStrip from "./components/MarqueeStrip";
import LivePreview from "./components/LivePreview";
import FeatureShowcase from "./components/FeatureShowcase";
import PinnedScroll from "./components/PinnedScroll";
import ProjectDemo from "./components/ProjectDemo";
import BentoProjects from "./components/BentoProjects";
import CaseStudySlider from "./components/CaseStudySlider";
import AboutSection from "./components/AboutSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <MarqueeStrip />
      <LivePreview />

      <FeatureShowcase />
      <PinnedScroll />
      <BentoProjects />
      <ProjectDemo />
      <CaseStudySlider />
      <AboutSection />

      <Footer />
    </>
  );
}
