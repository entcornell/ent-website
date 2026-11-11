import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

// Every route and a heading that proves its page rendered, not just the layout.
const ROUTES = [
  ["/", /epsilon nu tau/i],
  ["/about", /about us/i],
  ["/Values", /values/i],
  ["/studentVentures", /student ventures/i],
  ["/SBC", /small business collective/i],
  ["/recruitment", /fall \d{4}/i],
  ["/brothers", /brothers/i],
  ["/newsletter", /newsletter/i],
];

describe("App routes", () => {
  it.each(ROUTES)("renders %s", async (path, heading) => {
    window.history.pushState({}, "", path);
    render(<App />);
    expect((await screen.findAllByRole("heading", { level: 1, name: heading })).length).toBe(1);
  });

  it("redirects /members to /brothers", async () => {
    window.history.pushState({}, "", "/members");
    render(<App />);
    expect(await screen.findByRole("heading", { level: 1, name: /brothers/i })).toBeInTheDocument();
    expect(window.location.pathname).toBe("/brothers");
  });
});
