import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./NewsletterPage.css";
import { issues } from "./NewsletterData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand } from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

export default function NewsletterPage() {
  const { pathname } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const idx = issues.findIndex((i) => String(i.id) === String(id));
  const issue = issues[idx];
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // ESC closes fullscreen
  useEffect(() => {
    if (!fullscreen) return;
    const onKey = (e) => e.key === "Escape" && setFullscreen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [fullscreen]);

  if (!issue) {
    return (
      <div className="nl-page">
        <main className="nl-container">
          <p>Issue not found.</p>
          <Link to="/newsletter" className="nl-btn nl-btn--small">Back to list</Link>
        </main>
      </div>
    );
  }

  const prev = issues[idx + 1];
  const next = issues[idx - 1];

  const bannerSrc = issue.banner || issue.image; // fallback to thumbnail if no banner

  return (
    <div className="nl-page">

      <Helmet key={pathname}>
            <title>Weekly Newsletter Issue — ENT</title>
            <meta
              name="description"
              content="Stay up to date with ENT’s weekly newsletter, featuring entrepreneurship news, member highlights, and upcoming events."
            />
      </Helmet>

      {/* ===== Banner with overlay back button ===== */}
      <section className="nl-banner">
        <img src={bannerSrc} alt={`${issue.title} banner`} />
        <button
          className="nl-backbtn nl-backbtn--over"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
      </section>

      {/* ===== Header (meta + nav) ===== */}
      <header className="nl-issue-hero">
        <div className="nl-issue-meta">
          <span className="nl-issue-date">{issue.date}</span>
          <h1 className="nl-issue-title">{issue.title}</h1>
          <p className="nl-issue-author">By: {issue.author || "ENT Team"}</p>
        </div>

        <div className="nl-issue-nav">
          <button
            className="nl-navbtn nl-navbtn--red"
            disabled={!prev}
            onClick={() => navigate(`/newsletter/${prev?.id}`)}
          >
            ← Prev
          </button>
          <Link className="nl-navbtn nl-navbtn--middle" to="/newsletter">
            All Issues
          </Link>
          <button
            className="nl-navbtn nl-navbtn--red"
            disabled={!next}
            onClick={() => navigate(`/newsletter/${next?.id}`)}
          >
            Next →
          </button>
        </div>
      </header>

      {/* ===== Main layout: preview (scrollable) + sources ===== */}
      <main className="nl-container nl-issue-layout">
        <section className="nl-issue-preview">
          <figure className="nl-preview-frame">
            <button
              className="nl-fsbtn"
              onClick={() => setFullscreen(true)}
              aria-label="View full screen"
              title="View full screen"
            >
              <FontAwesomeIcon icon={faExpand} />
            </button>

            <div className="nl-preview-scroll">
              {issue.pages.map((src, i) => (
                <img
                  className="nl-preview-img"
                  key={i}
                  src={src}
                  alt={`${issue.title} page ${i + 1}`}
                />
              ))}
            </div>
          </figure>
        </section>

        <aside className="nl-issue-sources">
          <h2>Sources & Links</h2>
          {issue.sources?.length ? (
            <table className="nl-table">
              <thead>
                <tr><th>#</th><th>Title</th><th>Link</th></tr>
              </thead>
              <tbody>
                {issue.sources.map((s, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{s.label}</td>
                    <td><a href={s.url} target="_blank" rel="noreferrer">Open</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="nl-muted">No external sources listed for this issue.</p>
          )}
        </aside>
      </main>

      {/* ===== Fullscreen modal ===== */}
      {fullscreen && (
        <div className="nl-fullscreen" role="dialog" aria-modal="true">
          <button
            className="nl-closebtn"
            onClick={() => setFullscreen(false)}
            aria-label="Close full screen"
            title="Close"
          >
            ×
          </button>
          <div className="nl-fullscroll">
            {issue.pages.map((src, i) => (
              <img key={i} src={src} alt={`${issue.title} page ${i + 1}`} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
