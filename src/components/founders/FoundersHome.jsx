import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { APPLICATION_FORM_URL } from "../applicationConfig";
import MosaicHero from "./MosaicHero";
import Community from "./Community";
import Footer from "./Footer";
import Recruitment from "./Recruitment";
import Year from "./Year";
import "./FoundersHome.css";

// Transparent while the pinned hero is on screen; solid once the content scrolls under
// the nav. The hero is the first section, so its bottom edge tells us when that is.
function usePastHero() {
  const [past, setPast] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector(".fh-hero");
      setPast(hero ? hero.getBoundingClientRect().bottom < 80 : window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return past;
}

function Nav() {
  const scrolled = usePastHero();
  return (
    <header className={`fh-nav ${scrolled ? "is-scrolled" : ""}`}>
      <nav aria-label="Main" className="fh-nav-inner">
        <Link to="/" aria-label="ENT home" className="fh-nav-logo">
          <img className="fh-logo" src="/images/ENTLogo-trim.png" alt="ENT at Cornell" />
          <span className="fh-mono fh-nav-label fh-hide-sm">
            Epsilon Nu Tau
            <br />
            Tau Chapter
          </span>
        </Link>
        <div className="fh-mono fh-nav-links">
          <a className="fh-hide-sm" href="#about">
            About
          </a>
          <Link className="fh-hide-xs" to="/studentVentures">
            Ventures
          </Link>
          <Link className="fh-hide-xs" to="/brothers">
            Brothers
          </Link>
          <Link className="fh-hide-sm" to="/recruitment">
            Recruitment
          </Link>
          <a
            className="fh-nav-apply"
            href={APPLICATION_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Apply →
          </a>
        </div>
      </nav>
    </header>
  );
}

export default function FoundersHome() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="fh-root">
      <Nav />
      <main>
        <MosaicHero />
        <Year />
        <Community />
        <Recruitment />
      </main>
      <Footer />
    </div>
  );
}
