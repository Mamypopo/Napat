import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MarqueeStrip from "./components/MarqueeStrip";
import SectionDivider from "./components/SectionDivider";
import FeatureShowcase from "./components/FeatureShowcase";
import PinnedScroll from "./components/PinnedScroll";
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

      <SectionDivider
        index="01" label="Tech Stack" sub="Tools & Process"
        headline={"เครื่องมือที่ใช้จริง\nในทุกโปรเจกต์"}
      />
      <FeatureShowcase />

      <SectionDivider
        index="02" label="How I Work" sub="Scroll to explore"
        headline={"วิธีที่ผมทำงาน\nตั้งแต่ต้นจนจบ"}
      />
      <PinnedScroll />

      <SectionDivider
        index="03" label="Project Demos" sub="Click to interact"
        headline={"เลือก project\nแล้วลองสัมผัสเลย"}
      />
      <ProjectDemo />

      <SectionDivider
        index="04" label="Selected Work" sub="2023 – 2026"
        headline={"ผลงานที่ภูมิใจ\nส่งมอบแล้วจริง"}
      />
      <BentoProjects />

      <SectionDivider
        index="05" label="About" sub="Background & Skills"
        headline={"ใครคือคนที่อยู่\nเบื้องหลังงานนี้"}
      />
      <AboutSection />

      <Footer />
    </>
  );
}
