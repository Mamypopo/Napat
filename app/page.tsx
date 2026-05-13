import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import BackToTop from "./components/BackToTop";
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
import FadeIn from "./components/FadeIn";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <BackToTop />
      <ScrollRestore />
      <Navbar />
      <Hero />
      <MarqueeStrip />
      <FadeIn><TechStack /></FadeIn>
      <FadeIn><FeatureShowcase /></FadeIn>
      <FadeIn><BentoProjects /></FadeIn>
      <FadeIn><ProjectDemo /></FadeIn>
      <FadeIn><PinnedScroll /></FadeIn>
      <FadeIn><CaseStudySlider /></FadeIn>
      <FadeIn><AboutSection /></FadeIn>
      <FadeIn><ContactCTA /></FadeIn>

      {/* <LivePreview /> */}

      <Footer />
    </>
  );
}
