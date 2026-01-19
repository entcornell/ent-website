// Values.jsx
import React, { useEffect } from "react";
import "./Values.css";

export default function Values() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="values-page">
      {/* ===== HERO ===== */}
      <section className="values-hero">
        <img
          src="images/IMG_3070.jpg"
          alt="Values"
          className="values-hero-img"
        />
        <div className="values-hero-overlay">
          <h1>VALUES</h1>
        </div>
      </section>

      {/* ===== CONTENT ===== */}
      <main className="values-main">
        <div className="values-grid">
          <div className="value-item">Brotherhood</div>
          <div className="value-item">Innovation</div>
          <div className="value-item">Creativity</div>
          <div className="value-item">Mentoring</div>
        </div>
      </main>
    </div>
  );
}
