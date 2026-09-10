import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { recruitmentEvents, RECRUITMENT_YEAR } from "./recruitmentEvents";
import "./EventPopUp.css";

const SESSION_KEY = "ent-event-popup-shown";
const SCROLL_TRIGGER = 0.35; // 35% of page
const IDLE_MS = 10000; // 10 seconds

function parseEventDate(dateStr, year = RECRUITMENT_YEAR) {
  const parsed = new Date(`${dateStr} ${year}`);
  if (Number.isNaN(parsed.getTime())) return null;
  parsed.setHours(0, 0, 0, 0);
  return parsed;
}

function getNextUpcomingEventIndex(events, year = RECRUITMENT_YEAR) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < events.length; i++) {
    const date = parseEventDate(events[i].date, year);
    if (date && date >= today) return i;
  }
  return -1;
}

function isVirtualEvent(event) {
  const haystack = `${event.title} ${event.meta || ""}`.toLowerCase();
  return haystack.includes("zoom") || haystack.includes("virtual");
}

/**
 * Soft, once-per-session nudge for the next recruitment event.
 * Shows site-wide after ~35% scroll OR 10s — whichever comes first.
 */
export default function EventPopUp() {
  const [visible, setVisible] = useState(false);
  const shownRef = useRef(false);
  const navigate = useNavigate();
  const nextIndex = getNextUpcomingEventIndex(recruitmentEvents);
  const nextEvent = nextIndex >= 0 ? recruitmentEvents[nextIndex] : null;

  useEffect(() => {
    if (!nextEvent) return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const show = () => {
      if (shownRef.current) return;
      if (sessionStorage.getItem(SESSION_KEY)) return;
      shownRef.current = true;
      sessionStorage.setItem(SESSION_KEY, "1");
      setVisible(true);
    };

    const onScroll = () => {
      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      const progress = window.scrollY / maxScroll;
      if (progress >= SCROLL_TRIGGER) show();
    };

    const idleTimer = window.setTimeout(show, IDLE_MS);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.clearTimeout(idleTimer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [nextEvent]);

  const dismiss = () => setVisible(false);

  const goToTimeline = () => {
    dismiss();
    navigate("/recruitment", {
      state: { focusEventIndex: nextIndex },
    });
  };

  if (!visible || !nextEvent || nextIndex < 0) return null;

  const virtual = isVirtualEvent(nextEvent);

  return (
    <aside
      className="event-popup"
      role="dialog"
      aria-label="Upcoming recruitment event"
      aria-live="polite"
    >
      <button
        type="button"
        className="event-popup-close"
        onClick={dismiss}
        aria-label="Dismiss"
      >
        ✕
      </button>

      <div className="event-popup-inner">
        <div className="event-popup-icon" aria-hidden="true">
          <FontAwesomeIcon icon={faCalendarDays} />
        </div>

        <div className="event-popup-body">
          <p className="event-popup-eyebrow">Mark Your Calendar!</p>
          <h3 className="event-popup-title">{nextEvent.title}</h3>
          <p className="event-popup-format">
            {virtual ? "Virtual event" : "In-person event"}
          </p>
          <p className="event-popup-date">{nextEvent.date}</p>
          {nextEvent.meta && (
            <p className="event-popup-meta">{nextEvent.meta}</p>
          )}

          <div className="event-popup-actions">
            <button
              type="button"
              className="event-popup-cta"
              onClick={goToTimeline}
            >
              View timeline
            </button>
            <button
              type="button"
              className="event-popup-dismiss"
              onClick={dismiss}
            >
              Not now
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
