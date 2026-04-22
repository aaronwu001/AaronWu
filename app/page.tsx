"use client";
import Link from "next/link";

export default function Home() {
  return (
    <main className="home">
      <section className="hero">
        <div className="hero-inner">
          <span className="badge">Available for work</span>
          <h1>
            Hi, I'm <em>Your Name</em>
          </h1>
          <p className="tagline">
            Software engineer who builds things worth explaining.
          </p>
          <div className="hero-links">
            <Link href="/projects" className="btn-primary">
              View Projects
            </Link>
            <Link href="/blog" className="btn-secondary">
              Read Blog
            </Link>
          </div>
        </div>
        <div className="hero-orb" aria-hidden />
      </section>
    </main>
  );
}
