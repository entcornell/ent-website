import { Link } from "react-router-dom";

// Computed once at load: the site is rebuilt far more often than the year changes.
const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="fh-footer">
      <div className="fh-footer-brand">
        <img className="fh-logo" src="/images/ENTLogo-trim.png" alt="ENT at Cornell" />
        <p className="fh-mono">
          Epsilon Nu Tau
          <br />
          Tau Chapter · Cornell University
        </p>
      </div>
      <nav className="fh-mono fh-footer-links" aria-label="Footer">
        <Link to="/brothers">Brothers</Link>
        <Link to="/recruitment">Recruitment</Link>
        <a href="https://www.instagram.com/entcornell" target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
        <a
          href="https://www.linkedin.com/company/epsilon-nu-tau"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a href="mailto:ent.cornell@gmail.com">ent.cornell@gmail.com</a>
      </nav>
      <p className="fh-mono fh-footer-legal">© {CURRENT_YEAR} Epsilon Nu Tau</p>
    </footer>
  );
}
