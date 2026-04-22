import Link from "next/link";
import { getAllContent, ProjectFrontmatter } from "@/lib/content";

export default function ProjectsPage() {
  const projects = getAllContent<ProjectFrontmatter>("projects");

  return (
    <main className="page">
      <div className="page-header">
        <h1>Projects</h1>
        <p>Things I've built — with video walkthroughs, write-ups, or live demos.</p>
      </div>

      <div className="project-grid">
        {projects.map(({ slug, frontmatter: p }) => (
          <Link key={slug} href={`/projects/${slug}`} className="project-card">
            <span className={`project-type-badge type-${p.type}`}>{p.type}</span>
            <h2>{p.title}</h2>
            <p>{p.description}</p>
            {p.tags && (
              <div className="project-tags">
                {p.tags.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>
    </main>
  );
}
