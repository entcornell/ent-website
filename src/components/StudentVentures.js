import React, { useEffect } from "react";
import "./StudentVentures.css";
import { studentventures } from "./StudentVenturesData";

export default function StudentVentures() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="ventures-page">
      {/* ===== HERO ===== */}
      <section className="ventures-hero">
        <img
          src="images/AboutBackground.jpg"
          alt="Student Ventures"
          className="ventures-hero-img"
        />
        <div className="ventures-hero-overlay">
          <h1>STUDENT VENTURES</h1>
        </div>
      </section>

      {/* ===== CONTENT ===== */}
      <main className="student-ventures">
        <div className="student-ventures-grid">
          {studentventures.map((v, i) => (
            <article className="venture-card" key={i}>
              {/* Title */}
              <h2 className="venture-title">{v.title}</h2>

              {/* Left image + right content */}
              <div className="venture-row">
                <div className="venture-left">
                  <img
                    src={v.img}
                    alt={v.title}
                    className="venture-img"
                    loading="lazy"
                  />
                </div>

                <div className="venture-right">
                  <p className="venture-desc">{v.desc}</p>

                  <a
                    href={v.link}
                    className="venture-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn More
                  </a>

                  {/* Optional: show founder if it exists in data */}
                  {v.founder && (
                    <p className="venture-founder">
                      Founder: <span>{v.founder}</span>
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
