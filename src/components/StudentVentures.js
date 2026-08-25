import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import "./StudentVentures.css";
import { studentventures } from "./StudentVenturesData";
 
/* ============================================================= */
/* EXPANDED VENTURE MODAL                                        */
/* Pops out from the exact spot the card was clicked, grows to   */
/* the center of the screen (FLIP-style transform animation),    */
/* and shrinks back to that same spot when closed.                */
/* ============================================================= */
 
function VentureModal({ venture, originRect, onClose }) {
  const modalRef = useRef(null);
  const [phase, setPhase] = useState("opening"); // "opening" -> "open" -> "closing"
  const closingRef = useRef(false);
 
  // Lock page scroll while the modal is open
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);
 
  // FLIP animation: start the modal exactly over the clicked card,
  // then let it grow/move into its centered position.
  useLayoutEffect(() => {
    const el = modalRef.current;
    if (!el || !originRect) return;
 
    const finalRect = el.getBoundingClientRect();
 
    // Guard against a 0x0 measurement (e.g. modal not laid out yet) -
    // dividing by zero would produce NaN/Infinity transforms and the
    // animation would silently fail to appear.
    if (
      finalRect.width === 0 ||
      finalRect.height === 0 ||
      originRect.width === 0 ||
      originRect.height === 0
    ) {
      setPhase("open");
      return;
    }
 
    const deltaX =
      originRect.left + originRect.width / 2 - (finalRect.left + finalRect.width / 2);
    const deltaY =
      originRect.top + originRect.height / 2 - (finalRect.top + finalRect.height / 2);
    const scaleX = originRect.width / finalRect.width;
    const scaleY = originRect.height / finalRect.height;
 
    el.style.transition = "none";
    el.style.transform = `translate(-50%, -50%) translate(${deltaX}px, ${deltaY}px) scale(${scaleX}, ${scaleY})`;
 
    // Force a reflow so the browser registers the starting position
    // before we animate away from it.
    // eslint-disable-next-line no-unused-expressions
    el.offsetHeight;
 
    requestAnimationFrame(() => {
      el.style.transition = "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)";
      el.style.transform = "translate(-50%, -50%)";
    });
 
    const t = setTimeout(() => setPhase("open"), 460);
    return () => clearTimeout(t);
  }, [originRect]);
 
  const handleClose = () => {
    if (closingRef.current) return;
    closingRef.current = true;
    setPhase("closing");
 
    const el = modalRef.current;
    if (el && originRect && originRect.width > 0 && originRect.height > 0) {
      const finalRect = el.getBoundingClientRect();
      const deltaX =
        originRect.left + originRect.width / 2 - (finalRect.left + finalRect.width / 2);
      const deltaY =
        originRect.top + originRect.height / 2 - (finalRect.top + finalRect.height / 2);
      const scaleX = originRect.width / finalRect.width;
      const scaleY = originRect.height / finalRect.height;
 
      el.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
      el.style.transform = `translate(-50%, -50%) translate(${deltaX}px, ${deltaY}px) scale(${scaleX}, ${scaleY})`;
    }
 
    setTimeout(onClose, 400);
  };
 
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 
  const modalMarkup = (
    <div
      className={"venture-modal-backdrop" + (phase === "closing" ? " closing" : "")}
      onClick={handleClose}
    >
      <div
        className="venture-modal"
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label={venture.title}
        onClick={(e) => e.stopPropagation()}
      >
        <img src={venture.img} alt={venture.title} className="venture-modal-img" />
 
        <div className={"venture-modal-content" + (phase === "open" ? " visible" : "")}>
          <h2 className="venture-modal-title">{venture.title}</h2>
          <p className="venture-modal-desc">{venture.desc}</p>
 
          {venture.founder && (
            <p className="venture-modal-founder">
              Founder: <span>{venture.founder}</span>
            </p>
          )}
 
          {venture.link && (
            <a
              href={venture.link.startsWith("http") ? venture.link : `https://${venture.link}`}
              className="venture-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn More
            </a>
          )}
 
          <button type="button" className="venture-modal-back" onClick={handleClose}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
 
  // Render into document.body via a portal so a transformed / overflow-hidden
  // ancestor elsewhere on the page can never clip or mis-position the modal.
  return ReactDOM.createPortal(modalMarkup, document.body);
}
 
/* ============================================================= */
/* PAGE                                                           */
/* ============================================================= */
 
export default function StudentVentures() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [expanded, setExpanded] = useState(null); // { venture, originRect }
  const cardRefs = useRef({});
 
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
 
  const categories = [
    "All",
    ...Array.from(new Set(studentventures.map((v) => v.category))),
  ];
 
  const filtered =
    activeCategory === "All"
      ? studentventures
      : studentventures.filter((v) => v.category === activeCategory);
 
  const openVenture = (venture) => {
    const el = cardRefs.current[venture.title];
    if (!el) return;
    setExpanded({ venture, originRect: el.getBoundingClientRect() });
  };
 
  const closeVenture = () => setExpanded(null);
 
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
        {/* ===== FILTER BAR ===== */}
        <div className="ventures-filter-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={"ventures-filter-btn" + (activeCategory === cat ? " active" : "")}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
 
        {/* ===== CARD GRID ===== */}
        <div className="student-ventures-grid">
          {filtered.map((v) => (
            <article
              className="venture-card"
              key={v.title}
              ref={(el) => (cardRefs.current[v.title] = el)}
              onClick={() => openVenture(v)}
            >
              <div className="venture-img-wrap">
                <img src={v.img} alt={v.title} className="venture-img" loading="lazy" />
                <div className="venture-tint" />
              </div>
 
              <div className="venture-caption">
                <span className="venture-caption-title">{v.title}</span>
              </div>
            </article>
          ))}
        </div>
 
        {filtered.length === 0 && (
          <p className="ventures-empty">No ventures in this category yet.</p>
        )}
      </main>
 
      {expanded && (
        <VentureModal
          venture={expanded.venture}
          originRect={expanded.originRect}
          onClose={closeVenture}
        />
      )}
    </div>
  );
}