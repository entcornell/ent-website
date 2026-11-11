import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { APPLICATION_FORM_URL } from "../applicationConfig";
import { RECRUITMENT_YEAR } from "../recruitmentEvents";

// The 3D rocket (three.js) is a separate chunk, fetched only once this section is near.
const RocketScene = lazy(() => import("./rocket/RocketScene"));

// True once the element comes within a screen of the viewport, so heavy content can start
// loading just before it is seen.
function useNearScreen(ref) {
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    // Without IntersectionObserver (old browsers, tests) the rocket simply isn't loaded.
    if (!el || near || typeof IntersectionObserver === "undefined") return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNear(true);
      },
      { rootMargin: "100% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, near]);
  return near;
}

// Phones don't get the rocket: it crowds the section and the 3D scene is a heavy download.
const ROCKET_QUERY = "(min-width: 901px)";

function useWideScreen() {
  const [wide] = useState(
    () => typeof window !== "undefined" && window.matchMedia?.(ROCKET_QUERY).matches,
  );
  return wide;
}

// Recruitment, minimal: one line and the way in on the left, ENT's rocket on the right
// (wide screens only).
export default function Recruitment() {
  const launchRef = useRef(null);
  const near = useNearScreen(launchRef);
  const wide = useWideScreen();
  return (
    <section id="recruitment" className="fh-recruit" aria-labelledby="fh-recruit-title">
      <div className="fh-recruit-copy">
        <p className="fh-mono fh-eyebrow">Fall {RECRUITMENT_YEAR} recruitment</p>
        <h2 id="fh-recruit-title" className="fh-section-title">
          Your company starts here.
        </h2>
        <div className="fh-recruit-actions">
          <a
            className="fh-button"
            href={APPLICATION_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Apply to ENT →
          </a>
          <Link className="fh-mono fh-text-link" to="/recruitment">
            Recruitment schedule →
          </Link>
        </div>
      </div>
      <div ref={launchRef} className="fh-recruit-rocket" aria-hidden="true">
        {near && wide && (
          <Suspense fallback={null}>
            <RocketScene />
          </Suspense>
        )}
      </div>
    </section>
  );
}
