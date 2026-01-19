// SBC.jsx
import React, { useEffect } from "react";
import "./SBC.css";

export default function SBC() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="sbc-page">
      {/* ===== HERO ===== */}
      <section className="sbc-hero">
        <img
          src="images/IMG_3070.jpg"
          alt="SBC"
          className="sbc-hero-img"
        />
        <div className="sbc-hero-overlay">
          <h1>SMALL BUSINESS COLLECTIVE</h1>
        </div>
      </section>

      {/* ===== CONTENT ===== */}
      <main className="sbc-main">
        <p className="sbc-desc">
          ENT’s Small Business Collective (SBC) is a student run program
          that gives members hands-on experience in starting and growing
          businesses, bridging the gap between entrepreneurial interest and
          launching a full scale venture. SBC showcases student run businesses
          that make a visible impact on campus and in the community. Explore our
          business units below to see our latest products and services, or
          contact us through the business pages.
        </p>

        <a
          className="sbc-website-btn"
          href="https://sbc.entcornell.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          SBC Website
        </a>
      </main>
    </div>
  );
}
