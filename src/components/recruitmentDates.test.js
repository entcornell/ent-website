import { describe, expect, it } from "vitest";
import { getNextUpcomingEventIndex, isVirtualEvent, parseEventDate } from "./recruitmentDates";

const events = [
  { date: "Aug 28", title: "Barbecue" },
  { date: "Sep 9", title: "Info Session #1" },
  { date: "Sep 13", title: "Virtual Info Session", meta: "Location: Zoom" },
];

describe("parseEventDate", () => {
  it("parses a timeline date as local midnight of that year", () => {
    const date = parseEventDate("Sep 9", 2026);
    expect(date).toEqual(new Date(2026, 8, 9));
  });

  it("accepts full month names", () => {
    expect(parseEventDate("September 9", 2026)).toEqual(new Date(2026, 8, 9));
  });

  it("returns null for text that is not a date", () => {
    expect(parseEventDate("TBD", 2026)).toBeNull();
    expect(parseEventDate("Feb 31", 2026)).toBeNull();
  });
});

describe("getNextUpcomingEventIndex", () => {
  it("picks the first event that has not happened yet", () => {
    const now = new Date(2026, 8, 1, 15, 0);
    expect(getNextUpcomingEventIndex(events, 2026, now)).toBe(1);
  });

  it("still shows an event on its own day, even late in the evening", () => {
    const now = new Date(2026, 8, 9, 23, 30);
    expect(getNextUpcomingEventIndex(events, 2026, now)).toBe(1);
  });

  it("returns -1 once the season is over, so the popup stays hidden", () => {
    const now = new Date(2026, 9, 1);
    expect(getNextUpcomingEventIndex(events, 2026, now)).toBe(-1);
  });
});

describe("isVirtualEvent", () => {
  it("detects Zoom or virtual events from the title or the details", () => {
    expect(isVirtualEvent(events[2])).toBe(true);
    expect(isVirtualEvent(events[0])).toBe(false);
  });
});

describe("recruitment content", () => {
  it("writes every timeline date in a format the popup can read", async () => {
    const { recruitmentEvents } = await import("./recruitmentEvents");
    const unreadable = recruitmentEvents.filter((e) => parseEventDate(e.date) === null);
    expect(unreadable).toEqual([]);
  });
});
