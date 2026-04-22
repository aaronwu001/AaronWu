"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const path = usePathname();
  const active = (href: string) => path.startsWith(href) ? { color: "var(--text)" } : {};

  return (
    <nav>
      <Link href="/" className="nav-logo">YN.</Link>
      <ul className="nav-links">
        <li><Link href="/projects" style={active("/projects")}>Projects</Link></li>
        <li><Link href="/blog" style={active("/blog")}>Blog</Link></li>
      </ul>
    </nav>
  );
}
