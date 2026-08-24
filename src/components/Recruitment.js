import React, { useState, useEffect } from "react";
import "./Recruitment.css";

/*
  Event data for the recruitment timeline
*/
const events = [
  {
    date: "Aug 24",
    title: "Coffee Chat Open",
    meta: "End 09/14",
    tag: "Pairing Form",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSfpjfJE1VQcAKhAnwLkVOdjtbmhtKjpIYnySE4VRuC5Neqt7g/viewform",
    body: "Coffee chats are a great way to get to know the amazing current members of ENT. Feel free to ask about the organization, entrepreneurship, Cornell, or anything on your mind. These informal conversations can be scheduled using the pairing form link. Note that you can also email ENT members directly for coffee chats from the Members Page."
  },
  {
    date: "Aug 28",
    title: "Future Founders Barbecue",
    meta: "5:00 PM – 7:00 PM | Location TBD",
    body: "Enjoy some food, play some outdoor sports, and chat with our current ENT members."
  },
  {
    date: "Aug 31",
    title: "Freshman Info Session",
    meta: "6:00 PM – 7:00 PM | Location TBD",
    body: "ENT information sessions are a great way to learn about the organization. You will hear about the New Member Education process, some fun brotherhood events, current projects, and club culture. Additionally, you will have the opportunity to network to current members at the conclusion of the session. This event is for freshmen only!"
  },
  {
    date: "Sep 3",
    title: "Eship Kickoff",
    meta: "7:00 PM – 8:00 PM | Location: eHub Collegetown",
    body: "Get an overview of the vast entrepreneurship opportunities available at Cornell, watch eLab pitches, and meet people passionate about entrepreneurship."
  },
  {
    date: "Sep 5",
    title: "Clubfest",
    meta: "11:45 AM - 1:30 PM | Location: Arts Quad",
    body: "Find the ENT booth at Club Fest and speak to our current members to learn more about what makes the organization special!"
  },
  {
    date: "Sep 8",
    title: "Cornell Creators’ Market",
    meta: "12:00 PM – 4:00 PM | Location TBD",
    body: "Visit student vendors from Cornell University selling their handmade goods and services! This is a great way to meet people in the entrepreneurial ecosystem and who knows, perhaps you’ll find a new trinket to take home."
  },
  {
    date: "Sep 9",
    title: "Info Session #1",
    meta: "6:00 PM – 7:00 PM | Location TBD",
    body: "ENT information sessions are a great way to learn about the organization. You will hear about the New Member Education process, some fun brotherhood events, current projects, and club culture. Additionally, you will have the opportunity to network to current members at the conclusion of the session. This event is open to anyone!"
  },
  {
    date: "Sep 10",
    title: "Pitch Workshop + Speed Mentoring & Coffee Chats",
    meta: "6:00 PM – 8:00 PM | Location TBD",
    body: "Work on your pitching skills and talk to our members one-on-one to receive advice on your entrepreneurial endeavors and learn more about ENT! No entrepreneurship experience is necessary."
  },
  {
    date: "Sep 11",
    title: "Pickleball Tournament",
    meta: "4:00 PM - 6:00 PM | Location TBD",
    body: "Play a friendly game of Pickleball to bond with the current members of ENT. You’ll get to have fun while getting to talk to more of our members."
  },
  {
    date: "Sep 13",
    title: "Virtual Info Session",
    meta: "5:00 PM - 6:00 PM | Location TBD",
    body: "ENT information sessions are a great way to learn about the organization. You will hear about the New Member Education process, some fun brotherhood events, current projects, and club culture. Additionally, you will have the opportunity to network to current members at the conclusion of the session. This event is open to anyone!"
  }
];

export default function Recruitment() {
  // Tracks which dropdown is currently open
  const [openIndex, setOpenIndex] = useState(null);
  const [openRoundIndex, setOpenRoundIndex] = useState(null);

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="recruitment-page">

      {/* ===== HERO HEADER ===== */}
      <section className="recruitment-hero">
        <img src="/images/recruitmentheader.png" alt="Recruitment Header" />
        <h1>SPRING 2026</h1>
        <h2>RECRUITMENT</h2>
        <h3>Spring 2026 recruitment has ended, check back for Fall 2027 recruitment!</h3>
      </section>

      {/* ===== EVENTS TIMELINE ===== */}
      <section className="recruitment-events">
        <h2 className="timeline-title">Recruitment Timeline</h2>
        {events.map((e, i) => (
          <div className="event-card" key={i}>

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
            <span className="round-date-month">Coming</span>
            <span className="round-date-day">Soon</span>
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
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="event-tag"
              >
                Application Coming Soon!
              </a>
            </div>

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
