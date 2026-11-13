import { collageVentures } from "./foundersData";

// The hero's last beat: a wall of every ENT venture's logo (or its name, where there is
// no logo) that rises from below with the scroll until it fills the screen, where the
// hero ends and the page carries it away. `progress` (0 to 1) comes from the scroll.
export default function Collage({ progress }) {
  return (
    <>
      <ul
        className="fh-collage"
        aria-label="Ventures founded by ENT brothers"
        style={{
          "--c": progress.toFixed(4),
          visibility: progress > 0.001 ? "visible" : "hidden",
        }}
      >
        {collageVentures.map((v) => (
          <li
            key={v.name}
            className={[
              "fh-tile",
              v.logo ? "is-logo" : `is-name is-${v.style}`,
              v.dark && "is-dark",
            ]
              .filter(Boolean)
              .join(" ")}
            style={v.dark ? { backgroundColor: v.dark } : undefined}
          >
            {v.logo ? (
              <img src={v.logo} alt={v.name} loading="lazy" style={{ width: `${v.logoWidth}%` }} />
            ) : (
              <span>{v.label}</span>
            )}
          </li>
        ))}
      </ul>
      <div
        className="fh-collage-scrim"
        aria-hidden="true"
        style={{ opacity: Math.min(1, progress * 6).toFixed(4) }}
      />
    </>
  );
}
