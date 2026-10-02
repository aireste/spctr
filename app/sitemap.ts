import type { MetadataRoute } from "next";

const base = "https://www.spctr.run";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/lead-generation", "/custom-builds", "/privacy"].map((path) => ({
    url: base + path,
    lastModified: new Date(),
  }));
}
