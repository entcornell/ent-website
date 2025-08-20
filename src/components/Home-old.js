import React, { useState } from "react";
import "./Home.css";

const MEMBERS = [
  {
    role: "President",
    name: "First Last",
    img: "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=400&auto=format&fit=crop",
    blurb: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.",
  },
  {
    role: "Marketing",
    name: "First Last",
    img: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=400&auto=format&fit=crop",
    blurb: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.",
  },
  {
    role: "SBC Lead",
    name: "First Last",
    img: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=400&auto=format&fit=crop",
    blurb: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.",
  },
  {
    role: "NME Lead",
    name: "First Last",
    img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=400&auto=format&fit=crop",
    blurb: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.",
  },
];

const ENDEAVORS = [
  {
    title: "Weekly Newsletter",
    copy: "Curated founder stories, campus events, and resources.",
    img: "https://images.unsplash.com/photo-1583336663277-620dc1996580?q=80&w=900&auto=format&fit=crop",
  },
  {
    title: "Small Business Collective",
    copy: "Hands-on support for student-led ventures.",
    img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=900&auto=format&fit=crop",
  },
  {
    title: "Podcast Series",
    copy: "Conversations with founders and operators.",
    img: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=900&auto=format&fit=crop",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close navigation when clicking a link (mobile)
  const handleNavClick = (e) => {
    if (e.target.classList.contains("nav-link")) setMenuOpen(false);
  };

  return (
    <div className="page" onClick={handleNavClick}>
      {/* ===== HEADER ===== */}
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#home">
            <img
              src="https://via.placeholder.com/36x36"
              alt="ENT Crest"
              className="brand-mark"
            />
            <span className="brand-text">ENT</span>
          </a>

          <button
            className="nav-toggle"
            aria-expanded={menuOpen}
            aria-controls="site-nav"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="nav-toggle-bar" />
            <span className="sr-only">Toggle navigation</span>
          </button>

          <nav id="site-nav" className={`site-nav ${menuOpen ? "open" : ""}`}>
            <a href="#home" className="nav-link">
              Home
            </a>
            <a href="#recruitment" className="nav-link">
              Recruitment
            </a>
            <a href="#members" className="nav-link">
              Members
            </a>
            <a href="#who-we-are" className="nav-link">
              Who We Are
            </a>
            <a href="#newsletters" className="nav-link">
              Newsletters
            </a>
          </nav>
        </div>
      </header>

      <main id="home">
        {/* ===== HERO ===== */}
        <section className="hero" aria-label="Hero">
          <img
            className="hero-bg"
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1800&auto=format&fit=crop"
            alt=""
          />
          <div className="hero-overlay" />
          <div className="hero-ribbon" />
          <div className="container hero-content">
            <h1 className="display">Epsilon Nu Tau</h1>
            <p className="tagline">The Nation’s First Entrepreneurship Fraternity</p>
            <a className="btn btn-primary" href="#recruitment">
              Apply Now!
            </a>
          </div>
        </section>

        {/* ===== WHAT WE DO ===== */}
        <section className="section" id="who-we-are" aria-labelledby="whatwedo">
          <div className="container split">
            <figure className="media-box">
              <img
                src="https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?q=80&w=1200&auto=format&fit=crop"
                alt="Members networking"
              />
            </figure>

            <div className="content-box">
              <h2 id="whatwedo">What We Do</h2>
              <ul className="icon-list">
                {[
                  ["Inspire next generation", "The Nation’s First Entrepreneurship Fraternity!"],
                  ["Grow your startup", "The Nation’s First Entrepreneurship Fraternity!"],
                  ["Build a community", "The Nation’s First Entrepreneurship Fraternity!"],
                ].map(([h, p]) => (
                  <li key={h}>
                    <span className="hex" aria-hidden="true">
                      ◆
                    </span>
                    <div>
                      <h3>{h}</h3>
                      <p>{p}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ===== OUR STORY ===== */}
        <section className="section alt" aria-labelledby="ourstory">
          <div className="container split split-reverse">
            <div className="content-box">
              <h2 id="ourstory">Our Story</h2>
              <p>
                Founded in 2018 with a mission to inspire Cornell students. Lorem ipsum
                dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </p>

              <div className="stats" role="list">
                {[
                  ["👥", "200+", "Alumni"],
                  ["🚀", "15+", "Startups"],
                  ["💰", "$200k+", "Raised"],
                ].map(([icon, val, label]) => (
                  <div className="stat" role="listitem" key={label}>
                    <div className="stat-icon" aria-hidden="true">
                      {icon}
                    </div>
                    <div className="stat-meta">
                      <div className="stat-value">{val}</div>
                      <div className="stat-label">{label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <figure className="media-box">
              <img
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop"
                alt="Member presentation"
              />
            </figure>
          </div>
        </section>

        {/* ===== MEMBERS ===== */}
        <section className="section" id="members" aria-labelledby="ourmembers">
          <div className="container">
            <h2 className="section-title centered" id="ourmembers">
              Our Members
            </h2>

            <div className="card-grid grid-4">
              {MEMBERS.map((m) => (
                <article className="person-card" key={m.role}>
                  <img src={m.img} alt={`${m.role} headshot`} loading="lazy" />
                  <h3>{m.role}</h3>
                  <p className="person-name">{m.name}</p>
                  <p className="muted">{m.blurb}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===== ENDEAVORS ===== */}
        <section className="section alt" id="newsletters" aria-labelledby="ourendeavors">
          <div className="container">
            <h2 className="section-title centered" id="ourendeavors">
              Our Endeavors
            </h2>

            <div className="card-grid grid-3">
              {ENDEAVORS.map((card) => (
                <article className="endeavor-card" key={card.title}>
                  <img src={card.img} alt={card.title} loading="lazy" />
                  <div className="card-body">
                    <h3>{card.title}</h3>
                    <p className="muted">{card.copy}</p>
                    <a className="btn btn-secondary" href="#">
                      See More
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===== GALLERY ===== */}
        <section className="section" aria-label="Gallery">
          <div className="container">
            <div className="gallery">
              {[
                "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1515165562835-c3b8c499b6a3?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1557800636-894a64c1696f?q=80&w=800&auto=format&fit=crop",
              ].map((src, i) => (
                <img key={src} src={src} alt={`Event ${i + 1}`} loading="lazy" />
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="section cta" id="recruitment" aria-labelledby="cta-title">
          <div className="container centered">
            <h2 id="cta-title">Ready to build something?</h2>
            <p className="muted">
              Join a community of builders, operators, and creators.
            </p>
            <a className="btn btn-primary" href="#">
              Apply Today
            </a>
          </div>
        </section>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="site-footer">
        <div className="container footer-inner">
          <p>
            © <span id="year">{new Date().getFullYear()}</span> Epsilon Nu Tau ·
            Cornell Chapter
          </p>
          <div className="footer-links">
            <a href="#" aria-label="Instagram">Instagram</a>
            <a href="#" aria-label="LinkedIn">LinkedIn</a>
            <a href="mailto:hello@example.com" aria-label="Email">Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
