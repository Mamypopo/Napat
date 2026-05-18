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

export function imgWithFallback(src: string | null | undefined, name = "Project"): string {
  if (src) return src;
  const label = encodeURIComponent(name.slice(0, 20));
  return `https://placehold.co/900x600/111111/553F83?text=${label}`;
}

// ── Types ────────────────────────────────────────────────────────────────────

export type SiteSettingsSkill = { name: string; level: string };
export type SiteSettingsLanguage = { lang: string; level: string };

export type BackgroundTab = {
  period?: string;
  role?: string;
  org?: string;
  location?: string;
  description?: string;
  highlights?: string[];
  badge?: string;
  badgeAccent?: boolean;
  metrics?: { value: string; label: string; accent?: boolean }[];
};

export type BackgroundData = {
  education?: BackgroundTab;
  experience?: BackgroundTab;
  freelance?: BackgroundTab;
};

export type SiteSettings = {
  name: string;
  nickname?: string;
  jobTitle: string;
  location: string;
  heroTagline?: string;
  bio: string;
  bio2?: string;
  available: boolean;
  availabilityText?: string;
  avatar?: string;
  heroImage?: string;
  resumeUrl?: string;
  resumeFile?: string;
  phone?: string;
  workMode?: string;
  languages?: SiteSettingsLanguage[];
  email?: string;
  github?: string;
  linkedin?: string;
  line?: string;
  instagram?: string;
  discord?: string;
  facebook?: string;
  skills?: SiteSettingsSkill[];
  stats?: { value: string; label: string }[];
};

// ── Queries ──────────────────────────────────────────────────────────────────

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch(
    `*[_type == "siteSettings"][0] {
      ...,
      "avatar": avatar.asset->url,
      "heroImage": heroImage.asset->url,
      "resumeFile": resumeFile.asset->url,
      "skills": skills[]{ name, level },
      heroTagline
    }`,
    {},
    { next: { revalidate: 60 } }
  );
}

export async function getBackground(): Promise<BackgroundData | null> {
  return client.fetch(
    `*[_type == "background"][0] {
      education { period, role, org, location, description, highlights, badge, badgeAccent, metrics },
      experience { period, role, org, location, description, highlights, badge, badgeAccent, metrics },
      freelance  { period, role, org, location, description, highlights, badge, badgeAccent, metrics }
    }`,
    {},
    { next: { revalidate: 60 } }
  );
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const raw = await client.fetch(
    `*[_type == "project" && featured == true] | order(order asc) {
      "id": slug.current,
      "slug": slug.current,
      name, type, category, year, span, tags, desc,
      "img": coalesce(img.asset->url, ""),
      url, featured, sliderQuote, accentColor,
      "sliderStats": sliderStats[]{ value, label }
    }`,
    {},
    { next: { revalidate: 60 } }
  );
  return raw ?? [];
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
      "img": coalesce(img.asset->url, ""),
      "images": images[].asset->url,
      url,
      role,
      "modules": modules[]{ name, desc },
      problem,
      solution,
      outcome,
      duration,
      scale,
      teamSize
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
      "img": coalesce(img.asset->url, ""),
      "images": images[].asset->url,
      url,
      role,
      "modules": modules[]{ name, desc },
      problem,
      solution,
      outcome,
      duration,
      scale,
      teamSize
    }`,
    { slug },
    { next: { revalidate: 60 } }
  );
  return raw ?? null;
}
