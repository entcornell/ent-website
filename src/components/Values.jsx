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
        <img src="/images/valuesBackground.webp" alt="Values" className="values-hero-img" />
        <div className="values-hero-overlay">
          <h1>VALUES</h1>
        </div>
      </section>

      {/* ===== CONTENT ===== */}
      <main className="values-main">
        {/* ===================== */}
        {/* BROTHERHOOD */}
        {/* ===================== */}
        <section className="value-section">
          <div className="value-header">
            <h2 className="value-title">BROTHERHOOD</h2>
            <div className="value-tags">
              <span>BIG/LITTLE</span>
              <span>SOCIALS</span>
            </div>
          </div>

          <div className="value-gallery">
            <img src="/images/b1.webp" alt="Brotherhood 1" />
            <img src="/images/b2.webp" alt="Brotherhood 2" />
            <img src="/images/b3.webp" alt="Brotherhood 3" />
            <img src="/images/b4.webp" alt="Brotherhood 4" />
            <img src="/images/b5.webp" alt="Brotherhood 5" />
            <img src="/images/b6.webp" alt="Brotherhood 6" />
            <img src="/images/b7.webp" alt="Brotherhood 7" />
            <img src="/images/b8.webp" alt="Brotherhood 8" />
            <img src="/images/b9.webp" alt="Brotherhood 9" />
            <img src="/images/b10.webp" alt="Brotherhood 10" />
            <img src="/images/b11.webp" alt="Brotherhood 11" />
            <img src="/images/b12.webp" alt="Brotherhood 12" />
            <img src="/images/b13.webp" alt="Brotherhood 13" />
            <img src="/images/b14.webp" alt="Brotherhood 14" />
            <img src="/images/b15.webp" alt="Brotherhood 15" />
            <img src="/images/b16.webp" alt="Brotherhood 16" />
            <img src="/images/b17.webp" alt="Brotherhood 17" />
            <img src="/images/b18.webp" alt="Brotherhood 18" />
            <img src="/images/b19.webp" alt="Brotherhood 19" />
          </div>
        </section>

        {/* ===================== */}
        {/* AUTHENTICITY */}
        {/* ===================== */}
        <section className="value-section">
          <div className="value-header">
            <h2 className="value-title">AUTHENTICITY</h2>
            <div className="value-tags">
              <span>SPEAKER EVENTS</span>
              <span>PROFESSIONALISM</span>
            </div>
          </div>

          <div className="value-gallery">
            <img src="/images/a1.webp" alt="Authenticity 1" />
            <img src="/images/a2.webp" alt="Authenticity 2" />
            <img src="/images/a3.webp" alt="Authenticity 3" />
            <img src="/images/a4.webp" alt="Authenticity 4" />
            <img src="/images/a5.webp" alt="Authenticity 5" />
            <img src="/images/a6.webp" alt="Authenticity 6" />
            <img src="/images/a7.webp" alt="Authenticity 7" />
            <img src="/images/a8.webp" alt="Authenticity 8" />
            <img src="/images/a9.webp" alt="Authenticity 9" />
            <img src="/images/a10.webp" alt="Authenticity 10" />
            <img src="/images/a11.webp" alt="Authenticity 11" />
            <img src="/images/a12.webp" alt="Authenticity 12" />
            <img src="/images/a13.webp" alt="Authenticity 13" />
            <img src="/images/a14.webp" alt="Authenticity 14" />
          </div>
        </section>

        {/* ===================== */}
        {/* PASSION */}
        {/* ===================== */}
        <section className="value-section">
          <div className="value-header">
            <h2 className="value-title">PASSION</h2>
            <div className="value-tags">
              <span>SPEAKER</span>
              <span>HACKATHONS</span>
              <span>NEW MEMBER FUNDRAISER</span>
              <span>INITIATIVE</span>
            </div>
          </div>

          <div className="value-gallery">
            <img src="/images/p1.webp" alt="Passion 1" />
            <img src="/images/p2.webp" alt="Passion 2" />
            <img src="/images/p3.webp" alt="Passion 3" />
          </div>
        </section>

        {/* ===================== */}
        {/* MENTORING */}
        {/* ===================== */}
        <section className="value-section">
          <div className="value-header">
            <h2 className="value-title">MENTORING</h2>
            <div className="value-tags">
              <span>PHILANTHROPY</span>
              <span>CAMPUS CULTURE</span>
            </div>
          </div>

          <div className="value-gallery">
            <img src="/images/m1.webp" alt="Mentoring 1" />
            <img src="/images/m2.webp" alt="Mentoring 2" />
            <img src="/images/m3.webp" alt="Mentoring 3" />
            <img src="/images/m4.webp" alt="Mentoring 4" />
            <img src="/images/m5.webp" alt="Mentoring 5" />
            <img src="/images/m6.webp" alt="Mentoring 6" />
          </div>
        </section>
      </main>
    </div>
  );
}
