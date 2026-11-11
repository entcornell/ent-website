import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Recruitment.css";
import ApplyNowButton from "./ApplyNowButton";
import { recruitmentEvents as events, applicationRounds } from "./recruitmentEvents";

/*
  Event data lives in recruitmentEvents.js (shared with EventPopUp)
*/
/*
  One dated row of the timeline or the rounds list. The title is a real button,
  so the details open with a click, Enter or Space and screen readers announce it.
*/
function TimelineItem({ id, variant, month, day, item, open, onToggle }) {
  const bodyId = `${id ?? item.title.replace(/\W+/g, "-")}-details`;
  return (
    <div className={variant === "event" ? "event-card" : "round"} id={id}>
      <div className={`${variant}-date`}>
        <span className={`${variant}-date-month`}>{month}</span>
        <span className={`${variant}-date-day`}>{day}</span>
      </div>

      <div className={`${variant}-content`}>
        <button
          type="button"
          className="event-header"
          aria-expanded={open}
          aria-controls={bodyId}
          onClick={onToggle}
        >
          <span className={`${variant}-title`}>{item.title}</span>
          <span className={`dropdown ${open ? "open" : ""}`} aria-hidden="true">
            ▸
          </span>
        </button>

        <div className="event-meta-row">
          <p className={`${variant}-meta`}>{item.meta}</p>
          {item.tag && item.url && (
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="event-tag">
              {item.tag}
            </a>
          )}
        </div>

        {open && item.body && (
          <div className="event-body" id={bodyId}>
            {item.body}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Recruitment() {
  // Tracks which dropdown is currently open
  const [openIndex, setOpenIndex] = useState(null);
  const [openRoundIndex, setOpenRoundIndex] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Normal visits start at the top (skip if arriving from the event popup)
  useEffect(() => {
    if (typeof location.state?.focusEventIndex === "number") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Mount only: re-running when location.state is cleared would scroll away from the event.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // From EventPopUp "View timeline": open that event and scroll to it
  useEffect(() => {
    const focusIndex = location.state?.focusEventIndex;
    if (typeof focusIndex !== "number" || focusIndex < 0 || focusIndex >= events.length) {
      return;
    }

    setOpenIndex(focusIndex);

    const timer = window.setTimeout(() => {
      const el = document.getElementById(`recruitment-event-${focusIndex}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      // Clear state so refresh/back doesn't re-trigger
      navigate(".", { replace: true, state: {} });
    }, 150);

    return () => window.clearTimeout(timer);
  }, [location.state, navigate]);

  return (
    <div className="recruitment-page">
      {/* ===== HERO HEADER ===== */}
      <section className="recruitment-hero">
        <img src="/images/recruitmentheader.webp" alt="Recruitment Header" />
        <div className="recruitment-hero-content">
          <h1>FALL 2026</h1>
          <h2>RECRUITMENT</h2>
          <ApplyNowButton />
        </div>
      </section>

      {/* ===== EVENTS TIMELINE ===== */}
      <section className="recruitment-events">
        <h2 className="timeline-title">Recruitment Timeline</h2>
        {events.map((e, i) => {
          const [month, day] = e.date.split(" ");
          return (
            <TimelineItem
              key={e.title}
              id={`recruitment-event-${i}`}
              variant="event"
              month={month}
              day={day}
              item={e}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          );
        })}
      </section>

      {/* ===== APPLICATION ROUNDS ===== */}
      <section className="recruitment-rounds">
        <h2>Application Rounds</h2>
        {applicationRounds.map((r, i) => (
          <TimelineItem
            key={r.title}
            variant="round"
            month={r.month}
            day={r.day}
            item={r}
            open={openRoundIndex === i}
            onToggle={() => setOpenRoundIndex(openRoundIndex === i ? null : i)}
          />
        ))}
      </section>

      {/* ===== FAQ ===== */}
      <section
        className="recruitment-faq"
        style={{ backgroundImage: "url(/images/RecruitmentFAQ.webp)" }}
      >
        <h2>FAQ</h2>

        <div className="faq-item">
          <div className="faq-question">Who can apply?</div>
          <div className="faq-answer">
            Undergraduates of all years (Class of 2026–2029) and exchange students.
          </div>
        </div>

        <div className="faq-item">
          <div className="faq-question">How many events should I attend?</div>
          <div className="faq-answer">
            We recommend attending at least one event to get to know the brothers and learn more
            about us.
          </div>
        </div>

        <div className="faq-item">
          <div className="faq-question">How do I apply?</div>
          <div className="faq-answer">Fill out the online application when it opens.</div>
        </div>

        <div className="faq-item">
          <div className="faq-question">What is NME?</div>
          <div className="faq-answer">
            A semester-long new member education focused on bonding and entrepreneurship education.
          </div>
        </div>
      </section>
    </div>
  );
}
