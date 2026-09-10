import React from "react";
import { APPLICATION_FORM_URL } from "./applicationConfig";
import "./ApplyNowButton.css";

export default function ApplyNowButton({ className = "" }) {
  return (
    <a
      href={APPLICATION_FORM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`apply-now-btn ${className}`.trim()}
    >
      Apply Here
    </a>
  );
}
