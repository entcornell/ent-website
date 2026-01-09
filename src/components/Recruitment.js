import React, { useState, useEffect } from "react";
import "./Recruitment.css";

/*
  Event data for the recruitment timeline
*/
const events = [
  {
    date: "Jan 20",
    title: "Coffee Chats",
    meta: "End 02/01",
    tag: "Pairing Form",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSf-EoEUt3dYzgIAwHIrbdUCrytN7kEYjrvIrOwETft5kgB07g/viewform",
    body: "Get paired with a member to learn more about ENT and ask questions."
  },
  {
    date: "Jan 24",
    title: "Freshman Only Info Session",
    meta: "1:00 PM – 2:00 PM | Location TBD"
  },
  {
    date: "Jan 25",
    title: "Club Fest",
    meta: "12:00 PM – 4:30 PM | Barton Hall"
  },
  {
    date: "Jan 26",
    title: "In-Person Info Session",
    meta: "7:00 PM – 8:00 PM | Location TBD"
  },
  {
    date: "Jan 28",
    title: "Speed Round Coffee Chats",
    meta: "End of Day | Location TBD"
  },
  {
    date: "Jan 28",
    title: "Professional Fraternity Council Club Fair",
    meta: "11:30 AM – 2:00 PM | Willard Straight Hall"
  },
  {
    date: "Jan 29",
    title: "Virtual Info Session",
    meta: "5:00 PM – 6:00 PM",
    /*tag: "Link",
    url: "https://zoom.us/YOUR_MEETING_LINK"*/
  },
  {
    date: "Jan 30",
    title: "ENT Trivia Night",
    meta: "7:00 PM – 9:00 PM | Location TBD"
  },
  {
    date: "Jan 31",
    title: "ENT Professional Headshots",
    meta: "Time TBD | Location TBD"
  }
];

export default function Recruitment() {
  // Tracks which dropdown is currently open
  const [openIndex, setOpenIndex] = useState(null);

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="recruitment-page">

      {/* ===== HERO HEADER ===== */}
      <section className="recruitment-hero">
        <img src="/images/recruitmentheader.png" alt="Recruitment Header" />
        <h1>SPRING 2026 RECRUITMENT</h1>
      </section>

      {/* ===== EVENTS TIMELINE ===== */}
      <section className="recruitment-events">
        {events.map((e, i) => (
          <div className="event-card" key={i}>

            {/* Date block */}
            <div className="event-date">
              <span className="event-date-month">{e.date.split(" ")[0]}</span>
              <span className="event-date-day">{e.date.split(" ")[1]}</span>
            </div>

            {/* Event content */}
            <div className="event-content">

              {/* Header toggles dropdown */}
              <button
                className="event-header"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="event-title">{e.title}</span>
                <span className={`dropdown ${openIndex === i ? "open" : ""}`}>
                  ▸
                </span>
              </button>

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
            <span className="round-date-month">Jan 23</span>
            <span className="round-date-day">- Feb 1</span>
          </div>

          <div className="round-content">
            <div className="event-header">
              <span className="round-title">Round One</span>
            </div>

            <div className="event-meta-row">
              <p className="round-meta">Google Form | Due 11:59 PM</p>
              {/* <a
                href="https://forms.gle/YOUR_FORM_LINK"
                target="_blank"
                rel="noopener noreferrer"
                className="event-tag"
              >
                Apply
              </a>*/}
            </div>
          </div>
        </div>

        {/* Round Two */}
        <div className="round">
          <div className="round-date">
            <span className="round-date-month">Feb</span>
            <span className="round-date-day">4</span>
          </div>

          <div className="round-content">
            <div className="event-header">
              <span className="round-title">Round Two</span>
            </div>

            <div className="event-meta-row">
              <p className="round-meta">Invite Only | In-Person</p>
            </div>
          </div>
        </div>

        {/* Round Three */}
        <div className="round">
          <div className="round-date">
            <span className="round-date-month">Feb</span>
            <span className="round-date-day">5</span>
          </div>

          <div className="round-content">
            <div className="event-header">
              <span className="round-title">Round Three</span>
            </div>

            <div className="event-meta-row">
              <p className="round-meta">Invite Only | In-Person</p>
            </div>
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
            We recommend attending at least one event to get to know the fraternity.
          </div>
        </div>

        <div className="faq-item">
          <div className="faq-question">How do I apply?</div>
          <div className="faq-answer">
            Fill out the online application when it opens.
          </div>
        </div>

        <div className="faq-item">
          <div className="faq-question">What is pledging / NME?</div>
          <div className="faq-answer">
            A semester-long new member education focused on bonding and entrepreneurship.
          </div>
        </div>
      </section>
    </div>
  );
}
