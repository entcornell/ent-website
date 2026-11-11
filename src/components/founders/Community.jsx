import { Link } from "react-router-dom";
import { communityPhotos } from "./foundersData";

// The people: rows of real chapter photos drifting slowly in opposite directions.
// Each row is rendered twice so the loop has no seam; the copy is hidden from screen
// readers. Motion stops for visitors who prefer reduced motion (see the CSS).
function Row({ photos, reverse }) {
  return (
    <div className={`fh-reel${reverse ? " is-reverse" : ""}`}>
      {[0, 1].map((copy) => (
        <ul key={copy} className="fh-reel-track" aria-hidden={copy === 1 || undefined}>
          {photos.map((p) => (
            <li key={p.src}>
              <img src={p.src} alt={copy === 0 ? p.alt : ""} loading="lazy" />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

// Four rows, alternating direction.
const ROWS = 4;

export default function Community() {
  const perRow = Math.ceil(communityPhotos.length / ROWS);
  const rows = Array.from({ length: ROWS }, (_, r) =>
    communityPhotos.slice(r * perRow, (r + 1) * perRow),
  );
  return (
    <section className="fh-community" aria-labelledby="fh-community-title">
      <header className="fh-section-head">
        <p className="fh-mono fh-eyebrow">The chapter</p>
        <h2 id="fh-community-title" className="fh-section-title">
          Builders, and friends.
        </h2>
        <Link className="fh-mono fh-text-link" to="/brothers">
          Meet the brothers →
        </Link>
      </header>
      {rows.map((photos, r) => (
        <Row key={r} photos={photos} reverse={r % 2 === 1} />
      ))}
    </section>
  );
}
