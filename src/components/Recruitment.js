import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Recruitment.css";
import ApplyNowButton from "./ApplyNowButton";
import { recruitmentEvents as events } from "./recruitmentEvents";

/*
  Event data lives in recruitmentEvents.js (shared with EventPopUp)
*/
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
        <img src="/images/recruitmentheader.png" alt="Recruitment Header" />
        <div className="recruitment-hero-content">
          <h1>FALL 2026</h1>
          <h2>RECRUITMENT</h2>
          <ApplyNowButton />
        </div>
      </section>

      {/* ===== EVENTS TIMELINE ===== */}
      <section className="recruitment-events">
        <h2 className="timeline-title">Recruitment Timeline</h2>
        {events.map((e, i) => (
          <div className="event-card" key={i} id={`recruitment-event-${i}`}>

            {/* Date block */}
            <div className="event-date">
              <span className="event-date-month">{e.date.split(" ")[0]}</span>
              <span className="event-date-day">{e.date.split(" ")[1]}</span>
            </div>

            {/* Event content */}
            <div
              className="event-content"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              style={{ cursor: "pointer" }}
            >


              {/* Header toggles dropdown */}
              <div className="event-header">
                <span className="event-title">{e.title}</span>
                <span className={`dropdown ${openIndex === i ? "open" : ""}`}>
                  ▸
                </span>
              </div>


              {/* Location / time */}
              <div className="event-meta-row">
                <p className="event-meta">{e.meta}</p>
                {e.tag && e.url && (
                  <a
                    href={e.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="event-tag"
                  >
                    {e.tag}
                  </a>
                )}
              </div>


              {/* Dropdown body */}
              {openIndex === i && e.body && (
                <div className="event-body">{e.body}</div>
              )}
            </div>
          </div>
        ))}
      </section>


      {/* ===== APPLICATION ROUNDS ===== */}
      <section className="recruitment-rounds">
        <h2>Application Rounds</h2>

        {/* Round One */}
        <div className="round">
          <div className="round-date">
            <span className="round-date-month">Due</span>
            <span className="round-date-day">Sep 14</span>
          </div>

          <div
            className="round-content"
            onClick={() =>
              setOpenRoundIndex(openRoundIndex === 0 ? null : 0)
            }
            style={{ cursor: "pointer" }}
          >
            <div className="event-header">
              <span className="round-title">
                Round One: Application & Video
              </span>
              <span className={`dropdown ${openRoundIndex === 0 ? "open" : ""}`}>
                ▸
              </span>
            </div>

            <div className="event-meta-row">
              <p className="round-meta">Google Form | Due Sep 14 @ 5:00 PM </p>
              
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdtmPyH-etdh51n1hQVqdhZ2_IIGz71PTjLV1zPxGzCKHQKeQ/viewform?usp=header"
                target="_blank"
                rel="noopener noreferrer"
                className="event-tag"
              >
                Apply Here
              </a>
            </div>

            {openRoundIndex === 0 && (
              <div className="event-body">
                Fill out the application consisting of a short video and a written question to be considered for the next round.
              </div>
            )}

          </div>
        </div>

        {/* Round Two */}
        <div className="round">
          <div className="round-date">
            <span className="round-date-month">Sep</span>
            <span className="round-date-day">16</span>
          </div>

          <div
            className="round-content"
            onClick={() =>
              setOpenRoundIndex(openRoundIndex === 1 ? null : 1)
            }
            style={{ cursor: "pointer" }}
          >
            <div className="event-header">
              <span className="round-title">
                Round Two: Pitch & Round Robin
              </span>
              <span className={`dropdown ${openRoundIndex === 1 ? "open" : ""}`}>
                ▸
              </span>
            </div>

            <div className="event-meta-row">
              <p className="round-meta">Invite Only | In-Person</p>
            </div>

            {openRoundIndex === 1 && (
              <div className="event-body">
                Showcase your inner passion for entrepreneurship and creativity through a short pitch and round-robin style questions.
              </div>
            )}
          </div>
        </div>

        {/* Round Three */}
        <div className="round">
          <div className="round-date">
            <span className="round-date-month">Sep</span>
            <span className="round-date-day">17</span>
          </div>

          <div
            className="round-content"
            onClick={() =>
              setOpenRoundIndex(openRoundIndex === 2 ? null : 2)
            }
            style={{ cursor: "pointer" }}
          >
            <div className="event-header">
              <span className="round-title">
                Round Three: Social Round
              </span>
              <span className={`dropdown ${openRoundIndex === 2 ? "open" : ""}`}>
                ▸
              </span>
            </div>

            <div className="event-meta-row">
              <p className="round-meta">Invite Only | In-Person</p>
            </div>

            {openRoundIndex === 2 && (
              <div className="event-body">
                Show us how you get along with members of our organization. Be ready for any game, pitch, or question that comes your way!
              </div>
            )}
          </div>
        </div>
      </section>




      {/* ===== FAQ ===== */}
      <section
        className="recruitment-faq"
        style={{ backgroundImage: "url(/images/RecruitmentFAQ.png)" }}
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
            We recommend attending at least one event to get to know the brothers and learn more about us.
          </div>
        </div>

        <div className="faq-item">
          <div className="faq-question">How do I apply?</div>
          <div className="faq-answer">
            Fill out the online application when it opens.
          </div>
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
