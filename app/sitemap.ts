import type { MetadataRoute } from "next";
import { getProjects } from "./lib/sanity";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://napat.dev";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();

  const projectUrls: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${BASE_URL}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    ...projectUrls,
  ];
}
