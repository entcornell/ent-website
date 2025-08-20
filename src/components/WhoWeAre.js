import React, { useEffect, useState } from "react";
import "./WhoWeAre.css";
import DiagonalWedge from "./DiagonalWedge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUsers, faBolt } from '@fortawesome/free-solid-svg-icons';
import EndeavorsPopup from "./EndeavorsPopup";
import { endeavors } from "./EndeavorsData";
import { studentventures } from "./StudentVenturesData";
//import { useLocation } from "react-router-dom";
//import { Helmet } from "react-helmet-async";

import {
  faLightbulb,
  faClipboardCheck,
  faRocket,
  faPeopleGroup,
  faGem,
  faFire,
  faUserGraduate,
  faFileAlt,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";

export default function WhoWeAre() {
  //const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const [popupData, setPopupData] = useState(null);
    
  return (
    <div className="who-page">

      {/*<Helmet key={pathname}>
        <title>Who We Are — ENT</title>
        <meta
          name="description"
          content="Discover the story of Epsilon Nu Tau at Cornell. We unite aspiring entrepreneurs with the mentorship, resources, and community to turn ideas into impact."
        />
      </Helmet>*/}

      {/* ===== HERO (same shape as others) ===== */}
      <section className="wwa-hero">
        <div className="wwa-hero-clip">
          <img src="images/IMG_3070.jpg" alt="Who we are" className="wwa-hero-img" />
          <div className="wwa-hero-content">
            <h1>Who We Are</h1>
            <p>And what we have to offer!</p>
          </div>
          <svg className="wwa-hero-outline" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polyline
              points="-1,85 50,100 101,85"
              fill="none"
              stroke="#d62828"
              strokeWidth="35"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      </section>

      <main className="wwa-container">
        {/* Our Story */}
            <section className="our-story">
            <div className="our-story-container">
                <div className="our-story-text">
                <h2>Our Story</h2>
                <p>
                    We were founded as a co-ed, professional organization to help students launch and maintain sustainable businesses. Through our new member education, peer mentorship and training, curated resources, and vibrant brotherhood, we strive to create a connected entrepreneurial community at Cornell University.
                </p>
                <div className="stats-grid">
                    <div className="stat">
                    <FontAwesomeIcon icon={faUserGraduate} className="stat-icon" />
                    <div><strong>70+</strong><br />Alumni & Members</div>
                    </div>
                     <div className="stat-divider"></div>
                    <div className="stat">
                    <FontAwesomeIcon icon={faFileAlt} className="stat-icon" />
                    <div><strong>15+</strong><br />Student Startups</div>
                    </div>
                     <div className="stat-divider"></div>
                    <div className="stat">
                    <FontAwesomeIcon icon={faDollarSign} className="stat-icon" />
                    <div><strong>$200K+</strong><br />Aggregate Funding</div>
                    </div>
                </div>
                </div>
        
                <div className="our-story-image">
                <img src="images/IMG_4512- Enhanced.jpg" alt="Our Story" />
                </div>
            </div>
        </section>

        <div className="section-divider" />

        {/* ===== Overview on Entrepreneurship (exact) ===== */}
        <section className="wwa-overview">
        <div className="wwa-diag-layer">
            <DiagonalWedge
            topSrc="images/IMG_2143.JPG"
            bottomSrc="images/IMG_4556.JPG"
            stroke="#b92d2d"
            />
        </div>

         <div className="wwa-content">

        <h2 className="wwa-ov-title">Overview on Entrepreneurship</h2>

        <figure className="wwa-quote-wrap">
            <blockquote className="wwa-quote-text">"Anyone can be an entrepreneur”</blockquote>
            <figcaption className="wwa-quote-src">- A quote</figcaption>
        </figure>

        <p className="wwa-ov-lede">
            Entrepreneurship isn't just about pitching to VCs or launching the next million dollar business, it's about looking at problems differently and not being afraid to try. 
        </p>
        <div className="wwa-ov-redrule" />

        <div className="wwa-info-rows">

        {/* Journey row */}
        <div className="wwa-journey-row">
            <figure className="wwa-journey-photo card-shadow">
            <img src="images/IMG_8859.JPG" alt="Entrepreneurship Journey" />
            </figure>

            <div className="wwa-journey-copy">
            <h3 className="wwa-journey-title">The Journey</h3>
            <p className="wwa-journey-blurb">
                Every founder's story looks different, but each path usually consists of finding a spark, testing it out in the real world, and iterating until it grows. We help prepare and guide you through that process.
            </p>

            <ul className="wwa-steps">
                <li>
                <span className="mini-hex">
                    <FontAwesomeIcon icon={faLightbulb} />
                </span>
                Ideation
                </li>
                <li>
                <span className="mini-hex">
                    <FontAwesomeIcon icon={faClipboardCheck} />
                </span>
                Validation
                </li>
                <li>
                <span className="mini-hex">
                    <FontAwesomeIcon icon={faRocket} />
                </span>
                Execution
                </li>
            </ul>
            </div>
        </div>

        {/* Commitment row */}
        <div className="wwa-commit-row">
            <div className="wwa-commit-copy">
            <h3 className="wwa-commit-title">At ENT, We’re Committed</h3>
            <p>
                We make sure that each one of our members receives the mentorship, network, and
                resources to navigate each step of the entrepreneurship journey. Because at ENT, we believe that your first idea, your fifth, or even your wild side project could be the one that sparks real change.
            </p>
            </div>
            <figure className="wwa-commit-photo card-shadow">
            <img src="images/IMG_0162.JPG" alt="Members" />
            </figure>
        </div>

        {/* Bottom right CTA */}
        <div className="wwa-cta">
            <p>Ready to take your first step?</p>
            <a className="commit-btn wwa-cta-btn" href="/recruitment">Join ENT</a>
        </div>
        </div>
        </div>
        </section>

        <div className="section-divider" />

        {/* ===== Our Values ===== */}
        <section className="wwa-section values-section">
            <div className="values-layout">
                {/* Left image (will move to top on mobile) */}
                <div className="values-image">
                <img src="images/IMG_6517.JPG" alt="ENT group" />
                </div>

                {/* Right content */}
                <div className="values-content">
                <h2 className="wwa-title">Our Values</h2>
                <div className="wwa-values">
                    <div className="value">
                    <span className="value-bubble"><FontAwesomeIcon icon={faPeopleGroup} /></span>
                    <p>Brotherhood</p>
                    </div>
                    <div className="value">
                    <span className="value-bubble"><FontAwesomeIcon icon={faGem} /></span>
                    <p>Authenticity</p>
                    </div>
                    <div className="value">
                    <span className="value-bubble"><FontAwesomeIcon icon={faFire} /></span>
                    <p>Passion</p>
                    </div>
                    <div className="value">
                    <span className="value-bubble"><FontAwesomeIcon icon={faRocket} /></span>
                    <p>Impact</p>
                    </div>
                </div>
                </div>
            </div>
            </section>




        <div className="section-divider" />

        {/* ===== Our Endeavors (reuse your existing block) ===== */}
        {/* Our Endeavors */}
      <section className="our-endeavors">
        <h2>Our Endeavors</h2>
        <div className="endeavors-grid">
          {endeavors.map((e, i) => (
            <article className="endeavor-card" key={i}>
              <div className="endeavor-media">
                <img src={e.img} alt={e.title} />
              </div>
              <div className="endeavor-content">
                <h3>{e.title}</h3>
                <p>{e.desc}</p>
                <button
                  className="btn-see-more"
                  onClick={() => setPopupData(e)}
                >
                  See More
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

        <div className="section-divider" />

        {/* ===== Ventures grid at bottom ===== */}
        <section className="wwa-section ventures-section">
            <h2 className="ventures-title">
                <span className="ventures-eyebrow">Our Members</span><br />
                Started These Ventures
            </h2>

            <div className="wwa-ventures">
            {studentventures.map((venture, i) => (
                <article className="venture-card" key={i}>
                <div className="venture-media">
                    <div className="venture-media-inner">
                    <img src={venture.img} alt={venture.title} loading="lazy" />
                    </div>
                </div>

                <div className="venture-body">
                    <h3>{venture.title}</h3>
                    <p>{venture.desc}</p>
                    <a href={venture.link} target="_blank" rel="noopener noreferrer" className="venture-btn">
                    Check it out
                    </a>
                </div>
                </article>
            ))}
            </div>

        </section>

      </main>

      {/* Popup */}
      <EndeavorsPopup
        isOpen={!!popupData}
        onClose={() => setPopupData(null)}
        data={popupData}
      />
    </div>
  );
}
