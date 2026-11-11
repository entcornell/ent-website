import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
});

// jsdom has no layout engine: pages call these on mount and when a dialog opens.
window.scrollTo = () => {};
Element.prototype.scrollIntoView = () => {};
HTMLDialogElement.prototype.showModal ??= function showModal() {
  this.open = true;
};
