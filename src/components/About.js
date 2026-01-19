import React, { useEffect } from "react";
import "./About.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faUserGraduate,
  faFileAlt,
  faDollarSign,
  faLightbulb,
  faClipboardCheck,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";

export default function About() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="about-page">
      {/* ===== HERO ===== */}
      <section className="about-hero">
        <img
          src="images/IMG_3070.jpg"
          alt="About ENT"
          className="about-hero-img"
        />
        <div className="about-hero-overlay">
          <h1>ABOUT US</h1>
        </div>
      </section>

      <main>
        {/* ===== OUR STORY ===== */}
        <div className="about-container">
          <section className="about-story">
            <div className="about-story-grid">
              <div className="about-story-text">
                <h2>Our Story</h2>
                <p>
                  We were founded as a co-ed, professional organization to help
                  students launch and maintain sustainable businesses. Through
                  our new member education, peer mentorship and training,
                  curated resources, and vibrant brotherhood, we strive to
                  create a connected entrepreneurial community at Cornell
                  University.
                </p>
              </div>

              <div className="about-story-image">
                <img
                  src="images/about1.JPG"
                  alt="ENT members"
                  loading="lazy"
                />
              </div>
            </div>
          </section>
        </div>

        {/* ===== FULL WIDTH STATS STRIP ===== */}
        <section className="about-stats">
          <div className="about-stats-inner">
            <div className="about-stats-grid">
              <div className="about-stat">
                <FontAwesomeIcon
                  icon={faUserGraduate}
                  className="about-stat-icon"
                />
                <div className="about-stat-num">200+</div>
                <div className="about-stat-label">Alumni</div>
              </div>

              <div className="about-stat-divider" />

              <div className="about-stat">
                <FontAwesomeIcon icon={faFileAlt} className="about-stat-icon" />
                <div className="about-stat-num">15+</div>
                <div className="about-stat-label">Startups</div>
              </div>

              <div className="about-stat-divider" />

              <div className="about-stat">
                <FontAwesomeIcon
                  icon={faDollarSign}
                  className="about-stat-icon"
                />
                <div className="about-stat-num">$200K+</div>
                <div className="about-stat-label">Raised</div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== QUOTE (CONTAINED) ===== */}
        <div className="about-container">
          <section className="about-quote">
            <h2 className="about-quote-text">“Anyone can be an entrepreneur”</h2>
            <p className="about-quote-src">- A Quote</p>
            <div className="about-redrule" />

            <p className="about-quote-desc">
              Entrepreneurship isn't just about pitching to VCs or launching the
              next million dollar business, it's about looking at problems
              differently and not being afraid to try.
            </p>
          </section>
        </div>

        <section className="about-journey">
          <div className="about-journey-inner">
            <div className="about-journey-grid">
              <div className="about-journey-text">
                <h2>The Journey</h2>
                <p>
                  Every founder's story looks different, but each path usually
                  consists of finding a spark, testing it out in the real world,
                  and iterating until it grows. We help prepare and guide you
                  through that process.
                </p>
              </div>

              <div className="about-journey-steps">
                <div className="about-step">
                  <span className="about-hex">
                    <FontAwesomeIcon icon={faLightbulb} />
                  </span>
                  <span>Ideation</span>
                </div>

                <div className="about-step">
                  <span className="about-hex">
                    <FontAwesomeIcon icon={faClipboardCheck} />
                  </span>
                  <span>Validation</span>
                </div>

                <div className="about-step">
                  <span className="about-hex">
                    <FontAwesomeIcon icon={faRocket} />
                  </span>
                  <span>Execution</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="about-banner">
          <img
            src="images/about2.JPG"
            alt="ENT commitment"
            className="about-banner-img"
            loading="lazy"
          />

          <div className="about-banner-overlay">
            <div className="about-banner-glass">
              <h2>At ENT, We’re Committed</h2>
              <p>
                We make sure that each one of our members receives the
                mentorship, network, and resources to navigate each step of the
                entrepreneurship journey. Because at ENT, we believe that your
                first idea, your fifth, or even your wild side project could be
                the one that sparks real change.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
