import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Newsletter.css";
import { issues } from "./NewsletterData";

export default function Newsletter() {
  const latest = issues[0];
  const rest = issues.slice(1);

      useEffect(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
      }, []);

  return (
    <div className="nl-page">

      {/* HERO */}
      <section className="nl-hero">
        <div className="nl-hero-clip">
          <img src="images/IMG_3070.jpg" alt="ENT Newsletter" className="nl-hero-img" />
          <div className="nl-hero-content">
            <h1>Weekly Newsletter</h1>
            <p>Stay up to date with the latest entrepreneurship news!</p>
          </div>
          <svg className="nl-hero-outline" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polyline points="-1,85 50,100 101,85" fill="none" stroke="#d62828" strokeWidth="35" vectorEffect="non-scaling-stroke"/>
          </svg>
        </div>
      </section>

      <main className="nl-container">

        {/* FEATURED */}
        <section className="nl-featured">
          <Link to={`/newsletter/${latest.id}`} className="nl-featured-media">
            <img src={latest.image} alt={latest.title} />
          </Link>

          <div className="nl-featured-content">
            <span className="nl-kicker">LATEST</span>
            <h2 className="nl-featured-title">{latest.title}</h2>
            <p className="nl-featured-excerpt">{latest.excerpt}</p>
            <Link className="nl-btn" to={`/newsletter/${latest.id}`}>Read Issue</Link>
          </div>
        </section>

        <hr className="nl-divider" />

        {/* GRID */}
        <section className="nl-grid">
          {rest.map((issue) => (
            <article className="nl-card" key={issue.id}>
              <Link to={`/newsletter/${issue.id}`} className="nl-card-media">
                <img src={issue.image} alt={issue.title} loading="lazy" />
              </Link>
              <div className="nl-card-body">
                <span className="nl-date">{issue.date}</span>
                <h3 className="nl-card-title">{issue.title}</h3>
                <p className="nl-card-excerpt">{issue.excerpt}</p>
                <Link className="nl-btn nl-btn--small" to={`/newsletter/${issue.id}`}>Read Issue</Link>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
