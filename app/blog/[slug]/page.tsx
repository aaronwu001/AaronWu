import { getContentBySlug, getContentSlugs, BlogFrontmatter } from "@/lib/content";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
  return getContentSlugs("blog").map((slug) => ({ slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const { frontmatter: p, content } = getContentBySlug<BlogFrontmatter>(
      "blog",
      params.slug
    );

    return (
      <article className="article">
        <header className="article-header">
          <div className="article-meta">
            <Link href="/blog" style={{ color: "var(--muted)" }}>← Writing</Link>
            <time>{new Date(p.date).toLocaleDateString("zh-TW")}</time>
          </div>
          <h1 style={{ marginTop: "0.75rem" }}>{p.title}</h1>
          {p.description && (
            <p style={{ color: "var(--muted)", marginTop: "0.5rem" }}>{p.description}</p>
          )}
        </header>
        <div className="article-content">
          <MDXRemote source={content} />
        </div>
      </article>
    );
  } catch {
    notFound();
  }
}
