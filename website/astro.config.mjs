// @ts-check
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://roadmap.swadhin.cv",
  integrations: [
    sitemap({
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date(),
      filter: (page) => !page.includes("/404"),
      customPages: [
        "https://roadmap.swadhin.cv/",
        "https://roadmap.swadhin.cv/docs/start-here/00-README",
        "https://roadmap.swadhin.cv/docs/foundations/01-DSA-and-Coding",
        "https://roadmap.swadhin.cv/docs/system-design/00-System-Design-Template",
        "https://roadmap.swadhin.cv/docs/interviews/06-Behavioral-Interview-Playbook",
      ],
      serialize(item) {
        // Boost priority for key pages
        if (item.url === "https://roadmap.swadhin.cv/") {
          item.priority = 1.0;
          item.changefreq = "daily";
        } else if (
          item.url.includes("/docs/start-here/") ||
          item.url.includes("/docs/foundations/")
        ) {
          item.priority = 0.9;
        } else if (
          item.url.includes("/docs/system-design/") ||
          item.url.includes("/docs/interviews/")
        ) {
          item.priority = 0.85;
        } else if (item.url.includes("/docs/company-notes/")) {
          item.priority = 0.8;
        }
        return item;
      },
    }),
  ],
  vite: {
    build: {
      cssMinify: true,
    },
  },
  compressHTML: true,
  build: {
    inlineStylesheets: "auto",
  },
});
