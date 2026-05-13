import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;
import type { Project } from "./projects";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder(client);
export const urlFor = (source: SanityImageSource) => builder.image(source);

// ── Types ────────────────────────────────────────────────────────────────────

export type SiteSettings = {
  name: string;
  jobTitle: string;
  location: string;
  bio: string;
  bio2?: string;
  available: boolean;
  avatar?: SanityImageSource;
  resumeUrl?: string;
  email?: string;
  github?: string;
  linkedin?: string;
  line?: string;
  instagram?: string;
  discord?: string;
  facebook?: string;
  stats?: { value: string; label: string }[];
};

// ── Queries ──────────────────────────────────────────────────────────────────

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch(
    `*[_type == "siteSettings"][0]`,
    {},
    { next: { revalidate: 60 } }
  );
}

export async function getProjects(): Promise<Project[]> {
  const raw = await client.fetch(
    `*[_type == "project"] | order(order asc) {
      "id": slug.current,
      "slug": slug.current,
      name,
      type,
      category,
      year,
      span,
      tags,
      desc,
      "img": img.asset->url,
      url,
      role,
      modules,
      problem,
      solution
    }`,
    {},
    { next: { revalidate: 60 } }
  );
  return raw ?? [];
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const raw = await client.fetch(
    `*[_type == "project" && slug.current == $slug][0] {
      "id": slug.current,
      "slug": slug.current,
      name,
      type,
      category,
      year,
      span,
      tags,
      desc,
      "img": img.asset->url,
      url,
      role,
      modules,
      problem,
      solution
    }`,
    { slug },
    { next: { revalidate: 60 } }
  );
  return raw ?? null;
}
