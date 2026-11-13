import { useEffect, useRef, useState } from "react";
import { yearMoments } from "./foundersData";

// "A year at ENT": the section pins and, as the visitor scrolls down, a film strip of the
// chapter's year slides past sideways, fall to spring. A rule at the top fills with the
// year. `progress` is 0 when the section reaches the top of the screen, 1 when it leaves.
function usePinnedProgress(ref) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const range = r.height - window.innerHeight;
      setProgress(range > 0 ? Math.max(0, Math.min(1, -r.top / range)) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [ref]);
  return progress;
}

export default function Year() {
  const ref = useRef(null);
  const progress = usePinnedProgress(ref);
  const firstSpring = yearMoments.findIndex((m) => m.season === "Spring");
  return (
    <section
      ref={ref}
      id="about"
      className="fh-year"
      aria-labelledby="fh-year-title"
      style={{ "--y": progress.toFixed(4), "--count": yearMoments.length }}
    >
      <div className="fh-year-stage">
        <header className="fh-year-head">
          <h2 id="fh-year-title" className="fh-section-title">
            A year at ENT
          </h2>
          {/* The year as a rule that fills with the scroll, fall on the left, spring on the right. */}
          <div className="fh-mono fh-year-rule" aria-hidden="true">
            <span>Fall</span>
            <span style={{ left: `${(firstSpring / yearMoments.length) * 100}%` }}>Spring</span>
            <i />
          </div>
        </header>
        <ol className="fh-year-track">
          {yearMoments.map((m, i) => (
            <li key={m.title} className="fh-year-moment">
              <figure>
                <figcaption className="fh-mono fh-year-cap">
                  <span>
                    {String(i + 1).padStart(2, "0")} · {m.season}
                  </span>
                  <span>{m.place}</span>
                </figcaption>
                <img src={m.image} alt={m.alt} loading="lazy" width="1800" height="1200" />
              </figure>
              <h3>{m.title}</h3>
              <p>{m.line}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
