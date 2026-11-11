import { RECRUITMENT_YEAR } from "./recruitmentEvents";

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

/**
 * Parses a timeline date like "Sep 9" into local midnight of that day, or null.
 * Parsed by hand: `new Date("Sep 9 2026")` is non-standard (browsers may disagree) and
 * `new Date("TBD 2026")` silently returns January 1.
 */
export function parseEventDate(dateStr, year = RECRUITMENT_YEAR) {
  const match = /^([a-z]{3})[a-z]*\.? (\d{1,2})$/i.exec(dateStr.trim());
  if (!match) return null;
  const month = MONTHS.indexOf(match[1].toLowerCase());
  const day = Number(match[2]);
  if (month === -1) return null;
  const date = new Date(year, month, day);
  // Reject overflow such as "Feb 31", which Date would roll into March.
  return date.getMonth() === month ? date : null;
}

/** Index of the first event happening today or later, or -1 when the season is over. */
export function getNextUpcomingEventIndex(events, year = RECRUITMENT_YEAR, now = new Date()) {
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  return events.findIndex((event) => {
    const date = parseEventDate(event.date, year);
    return date !== null && date >= today;
  });
}

export function isVirtualEvent(event) {
  const haystack = `${event.title} ${event.meta || ""}`.toLowerCase();
  return haystack.includes("zoom") || haystack.includes("virtual");
}
