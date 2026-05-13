import { notFound } from "next/navigation";
import { projects } from "../../lib/projects";
import BackButton from "./BackButton";
import ProjectPageClient from "./ProjectPageClient";

export function generateStaticParams() {
  return projects
    .filter((p) => p.type === "case-study")
    .map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudies = projects.filter((p) => p.type === "case-study");
  const idx = caseStudies.findIndex((p) => p.slug === slug);
  if (idx === -1) notFound();

  const project = caseStudies[idx];
  const prev = idx > 0 ? caseStudies[idx - 1] : null;
  const next = idx < caseStudies.length - 1 ? caseStudies[idx + 1] : null;

  return (
    <main style={{ background: "var(--bg)", minHeight: "100svh" }}>
      <BackButton category={project.category} />
      <ProjectPageClient project={project} prev={prev} next={next} />
    </main>
  );
}
