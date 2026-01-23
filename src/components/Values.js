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
          src="images/valuesBackground.JPG"
          alt="Values"
          className="values-hero-img"
        />
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
            <img src="images/b1.png" alt="Brotherhood 1" />
            <img src="images/b2.png" alt="Brotherhood 2" />
            <img src="images/b3.png" alt="Brotherhood 3" />
            <img src="images/b4.png" alt="Brotherhood 4" />
            <img src="images/b5.png" alt="Brotherhood 5" />
            <img src="images/b6.png" alt="Brotherhood 6" />
            <img src="images/b7.png" alt="Brotherhood 7" />
            <img src="images/b8.png" alt="Brotherhood 8" />
            <img src="images/b9.png" alt="Brotherhood 9" />
            <img src="images/b10.png" alt="Brotherhood 10" />
            <img src="images/b11.png" alt="Brotherhood 11" />
            <img src="images/b12.png" alt="Brotherhood 12" />
            <img src="images/b13.png" alt="Brotherhood 13" />
            <img src="images/b14.png" alt="Brotherhood 14" />
            <img src="images/b15.png" alt="Brotherhood 15" />
            <img src="images/b16.png" alt="Brotherhood 16" />
            <img src="images/b17.jpeg" alt="Brotherhood 17" />
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
            <img src="images/a1.png" alt="Authenticity 1" />
            <img src="images/a2.png" alt="Authenticity 2" />
            <img src="images/a3.png" alt="Authenticity 3" />
            <img src="images/a4.png" alt="Authenticity 4" />
            <img src="images/a5.png" alt="Authenticity 5" />
            <img src="images/a6.png" alt="Authenticity 6" />
            <img src="images/a7.png" alt="Authenticity 7" />
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
            <img src="images/p1.png" alt="Passion 1" />
            <img src="images/p2.png" alt="Passion 2" />
            <img src="images/p3.jpeg" alt="Passion 3" />
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
            <img src="images/m1.png" alt="Mentoring 1" />
            <img src="images/m2.png" alt="Mentoring 2" />
            <img src="images/m3.png" alt="Mentoring 3" />
            <img src="images/m4.png" alt="Mentoring 4" />
          </div>
        </section>

      </main>
    </div>
  );
}
