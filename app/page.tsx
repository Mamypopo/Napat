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
import { getSiteSettings, getProjects } from "./lib/sanity";
import { projects as staticProjects } from "./lib/projects";

export default async function Home() {
  const [settings, sanityProjects] = await Promise.all([
    getSiteSettings(),
    getProjects(),
  ]);
  const projects = sanityProjects.length > 0 ? sanityProjects : staticProjects;

  return (
    <>
      <ScrollProgress />
      <BackToTop />
      <ScrollRestore />
      <Navbar />
      <Hero settings={settings} />
      <MarqueeStrip />
      <FadeIn><TechStack /></FadeIn>
      <FadeIn><FeatureShowcase /></FadeIn>
      <FadeIn><BentoProjects projects={projects} /></FadeIn>
      <FadeIn><ProjectDemo /></FadeIn>
      <FadeIn><PinnedScroll /></FadeIn>
      <FadeIn><CaseStudySlider /></FadeIn>
      <FadeIn><AboutSection settings={settings} /></FadeIn>
      <FadeIn><ContactCTA settings={settings} /></FadeIn>
      <Footer settings={settings} />
    </>
  );
}
