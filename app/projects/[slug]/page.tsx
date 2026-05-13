import { notFound } from "next/navigation";
import { getProjects, getProjectBySlug } from "../../lib/sanity";
import { projects as staticProjects } from "../../lib/projects";
import BackButton from "./BackButton";
import ProjectPageClient from "./ProjectPageClient";

export async function generateStaticParams() {
  const sanityProjects = await getProjects();
  const source = sanityProjects.length > 0 ? sanityProjects : staticProjects;
  return source
    .filter((p) => p.type === "case-study")
    .map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const sanityProjects = await getProjects();
  const source = sanityProjects.length > 0 ? sanityProjects : staticProjects;
  const caseStudies = source.filter((p) => p.type === "case-study");

  let project = await getProjectBySlug(slug);
  if (!project) {
    project = caseStudies.find((p) => p.slug === slug) ?? null;
  }
  if (!project) notFound();

  const idx = caseStudies.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? caseStudies[idx - 1] : null;
  const next = idx < caseStudies.length - 1 ? caseStudies[idx + 1] : null;

  return (
    <main style={{ background: "var(--bg)", minHeight: "100svh" }}>
      <BackButton category={project.category} />
      <ProjectPageClient project={project} prev={prev} next={next} />
    </main>
  );
}
