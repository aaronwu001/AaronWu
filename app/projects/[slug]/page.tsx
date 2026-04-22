import { getContentBySlug, getContentSlugs, ProjectFrontmatter } from "@/lib/content";
import { MDXRemote } from "next-mdx-remote/rsc";
import VideoEmbed from "@/components/VideoEmbed";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return getContentSlugs("projects").map((slug) => ({ slug }));
}

const components = { VideoEmbed };

export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const { frontmatter: p, content } = getContentBySlug<ProjectFrontmatter>(
      "projects",
      params.slug
    );

    return (
      <article className="article">
        <header className="article-header">
          <span className={`project-type-badge type-${p.type}`}>{p.type}</span>
          <h1 style={{ marginTop: "0.75rem" }}>{p.title}</h1>
          <div className="article-meta">
            <time>{new Date(p.date).toLocaleDateString("zh-TW")}</time>
            {p.tags && <span>{p.tags.join(" · ")}</span>}
          </div>

          <div className="article-links">
            {p.githubUrl && (
              <a href={p.githubUrl} target="_blank" rel="noopener" className="article-link">
                ↗ GitHub
              </a>
            )}
            {p.liveUrl && (
              <a href={p.liveUrl} target="_blank" rel="noopener" className="article-link">
                ↗ Live Demo
              </a>
            )}
            {p.docUrl && (
              <a href={p.docUrl} target="_blank" rel="noopener" className="article-link">
                ↗ Document
              </a>
            )}
          </div>
        </header>

        {/* If it's a video type, show the embed at the top */}
        {p.type === "video" && p.videoUrl && (
          <VideoEmbed url={p.videoUrl} title={p.title} />
        )}

        <div className="article-content">
          <MDXRemote source={content} components={components} />
        </div>
      </article>
    );
  } catch {
    notFound();
  }
}
