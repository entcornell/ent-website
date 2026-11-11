import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Recruitment from "./Recruitment";
import { applicationRounds, recruitmentEvents } from "./recruitmentEvents";

function renderPage() {
  return render(
    <MemoryRouter>
      <Recruitment />
    </MemoryRouter>,
  );
}

describe("Recruitment timeline", () => {
  it("opens an event's details with a click and closes them again", async () => {
    const user = userEvent.setup();
    renderPage();
    const [event] = recruitmentEvents;
    const toggle = screen.getByRole("button", { name: new RegExp(event.title) });

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(event.body)).toBeInTheDocument();

    await user.click(toggle);
    expect(screen.queryByText(event.body)).not.toBeInTheDocument();
  });

  it("opens an application round from the keyboard", async () => {
    const user = userEvent.setup();
    renderPage();
    const round = applicationRounds[1];
    const toggle = screen.getByRole("button", { name: new RegExp(round.title) });

    toggle.focus();
    await user.keyboard("{Enter}");

    expect(screen.getByText(round.body)).toBeInTheDocument();
  });

  it("links every round that has a form to it", () => {
    renderPage();
    for (const round of applicationRounds.filter((r) => r.url)) {
      const links = screen.getAllByRole("link", { name: round.tag });
      expect(links.some((link) => link.getAttribute("href") === round.url)).toBe(true);
    }
  });
});
