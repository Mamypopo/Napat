import type { Metadata } from "next";
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
import { getSiteSettings, getProjects, getFeaturedProjects, getBackground } from "./lib/sanity";
import { projects as staticProjects } from "./lib/projects";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  if (!settings) return {};
  const title = `${settings.name} — ${settings.jobTitle}`;
  const description = settings.bio;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      ...(settings.avatar ? { images: [{ url: settings.avatar, width: 1200, height: 630 }] } : {}),
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function Home() {
  const [settings, sanityProjects, featuredProjects, background] = await Promise.all([
    getSiteSettings(),
    getProjects(),
    getFeaturedProjects(),
    getBackground(),
  ]);
  const projects = sanityProjects.length > 0 ? sanityProjects : staticProjects;

  return (
    <>
      <ScrollProgress />
      <BackToTop />
      <ScrollRestore />
      <Navbar settings={settings} />
      <Hero settings={settings} />
      <MarqueeStrip />
      <FadeIn><TechStack /></FadeIn>
      <FadeIn><FeatureShowcase background={background} /></FadeIn>
      <FadeIn><BentoProjects projects={projects} /></FadeIn>
      <FadeIn><ProjectDemo /></FadeIn>
      <FadeIn><PinnedScroll /></FadeIn>
      <FadeIn><CaseStudySlider featuredProjects={featuredProjects} /></FadeIn>
      <FadeIn><AboutSection settings={settings} /></FadeIn>
      <FadeIn><ContactCTA settings={settings} /></FadeIn>
      <Footer settings={settings} />
    </>
  );
}
