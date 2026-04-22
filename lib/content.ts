import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");

export interface ProjectFrontmatter {
  title: string;
  description: string;
  date: string;
  type: "video" | "article" | "link" | "doc";
  videoUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  docUrl?: string;
  tags?: string[];
}

export interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
}

export function getContentSlugs(folder: string) {
  const dir = path.join(contentDir, folder);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(".mdx", ""));
}

export function getContentBySlug<T>(folder: string, slug: string) {
  const filepath = path.join(contentDir, folder, `${slug}.mdx`);
  const raw = fs.readFileSync(filepath, "utf-8");
  const { data, content } = matter(raw);
  return { frontmatter: data as T, content, slug };
}

export function getAllContent<T>(folder: string) {
  return getContentSlugs(folder)
    .map((slug) => getContentBySlug<T>(folder, slug))
    .sort((a, b) =>
      new Date((b.frontmatter as any).date).getTime() -
      new Date((a.frontmatter as any).date).getTime()
    );
}
