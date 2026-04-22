import Link from "next/link";
import { getAllContent, BlogFrontmatter } from "@/lib/content";

export default function BlogPage() {
  const posts = getAllContent<BlogFrontmatter>("blog");

  return (
    <main className="page">
      <div className="page-header">
        <h1>Writing</h1>
        <p>Thoughts on software, process, and things I've learned.</p>
      </div>

      <div className="blog-list">
        {posts.map(({ slug, frontmatter: p }) => (
          <Link key={slug} href={`/blog/${slug}`} className="blog-item">
            <h2>{p.title}</h2>
            <time>{new Date(p.date).toLocaleDateString("zh-TW")}</time>
          </Link>
        ))}
      </div>
    </main>
  );
}
