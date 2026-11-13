import { Fragment, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Collage from "./Collage";
import { heroSpotlights } from "./foundersData";

// The hero background: a smooth rose gradient with a soft arc of light that breathes
// and ripples gently, under a fine paper grain (the grain is an SVG filter in the JSX).

// Gradient stops from the brightest light to the deepest shade.
// Rose-copper metal: silvery highlights over a deeper, richer rose that still reads as
// metal (not flat red) because its darks lean brown-grey.
const STOPS = ["#FCF4F1", "#EFD7D1", "#DDB5AD", "#C8928A", "#AE736B", "#8C554F"];
// The field is computed on a coarse grid and scaled up with smoothing: it is a
// gradient, so detail would be wasted, and this keeps every frame cheap.
const SCALE = 6;
// A click sends soft rings through the light for this many seconds.
const RIPPLE_LIFE = 4;
// Seconds the light takes to drift from the middle into its free path.
const ARRIVAL_S = 20;
// On load the gradient fades in over this many ms.
const INTRO_MS = 1400;

function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
const RAMP = STOPS.map(hexToRgb);

// Smoothly interpolated color for v in [0, 1] (0 = brightest).
function colorAt(v) {
  const p = Math.max(0, Math.min(1, v)) * (RAMP.length - 1);
  const i = Math.min(RAMP.length - 2, Math.floor(p));
  const f = p - i;
  const a = RAMP[i];
  const b = RAMP[i + 1];
  return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f];
}

// Smooth pseudo-random drift in about [-1, 1], slow enough to feel like a patient swell.
// The frequencies are irrational multiples of each other (golden ratio, √2…), so the sum
// never repeats exactly: motion that feels random but has no jumps. `seed` gives each
// value its own path.
function wander(t, seed) {
  return (
    (Math.sin(t * 0.045 + seed) +
      0.7 * Math.sin(t * 0.045 * 1.618 + seed * 2.3) +
      0.5 * Math.sin(t * 0.045 * 2.414 + seed * 0.7)) /
    2.2
  );
}

// Where the band of light starts on load: across the middle, tilted ~35° from
// vertical, gently bent.
const START_BAND = { x: 0.5, y: 0.48, angle: 0.6, bend: 0.25 };

// The band of light for this moment: position (fraction of the screen), tilt (radians
// from vertical, up to about ±60°, so it passes through 45° diagonals) and bend.
// Each follows its own wander() path; for the first ARRIVAL_S seconds it eases out of
// START_BAND so the page always opens with light across the headline.
function bandAt(t, w, h) {
  const free = {
    x: 0.5 + 0.38 * wander(t, 1),
    y: 0.5 + 0.32 * wander(t, 4),
    angle: 1.05 * wander(t, 7),
    bend: 0.6 * wander(t, 9),
  };
  const s = Math.min(1, t / ARRIVAL_S);
  const ease = s * s * (3 - 2 * s);
  const mix = (k) => START_BAND[k] + (free[k] - START_BAND[k]) * ease;
  const angle = mix("angle");
  return {
    px: mix("x") * w,
    py: mix("y") * h,
    cos: Math.cos(angle),
    sin: Math.sin(angle),
    // Curvature in 1/px: the band bows by bend × a few hundred px across the screen.
    curve: (mix("bend") * 1.6) / w,
    width: w * 0.13,
  };
}

// Darkness at a point: a base gradient that deepens toward the right, plus the band of
// light (a soft glow, a thin specular line inside it, a deeper shade behind it).
function lightValue(x, y, w, h, t, band, ripples) {
  const nx = x / w;
  const ny = y / h;
  let v = 0.52 + 0.3 * nx + 0.06 * ny;
  const rx = x - band.px;
  const ry = y - band.py;
  const along = -rx * band.sin + ry * band.cos;
  // Distance across the band, bent into a gentle curve, with a slow ripple on its edge.
  const across =
    rx * band.cos +
    ry * band.sin +
    band.curve * along * along +
    18 * Math.sin(along / 95 + t * 0.25);
  const off = across / band.width;
  v -= 0.3 * Math.exp(-off * off);
  // A thin, sharper specular line inside the glow: what makes it read as metal.
  v -= 0.08 * Math.exp(-((off + 0.35) ** 2) / 0.06);
  // One side of the band drops into a deeper shade.
  v += 0.07 * Math.exp(-((off - 1.8) ** 2) / 1.4);
  for (const r of ripples) {
    const d = Math.hypot(x - r.x, y - r.y);
    const fade = 1 - r.age / RIPPLE_LIFE;
    v -= 0.12 * fade * Math.exp(-((d - r.age * 240) ** 2) / 4000);
  }
  return v;
}

function useLight(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return undefined;

    const ripples = [];
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const buffer = document.createElement("canvas");
    const bctx = buffer.getContext("2d");
    let image = null;
    let frame = 0;
    let start = 0;

    const resize = () => {
      // A hidden or collapsing canvas reports 0 × 0; there is nothing to size until it
      // has a size again, and createImageData would throw.
      if (!canvas.clientWidth || !canvas.clientHeight) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      buffer.width = Math.ceil(canvas.clientWidth / SCALE);
      buffer.height = Math.ceil(canvas.clientHeight / SCALE);
      image = bctx.createImageData(buffer.width, buffer.height);
    };
    const local = (e) => {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onDown = (e) => {
      if (ripples.length < 4) ripples.push({ ...local(e), born: performance.now(), age: 0 });
    };

    const paintRow = (row, t, intro, w, h, band) => {
      const cols = buffer.width;
      for (let col = 0; col < cols; col++) {
        const v = lightValue(col * SCALE, row * SCALE, w, h, t, band, ripples);
        // Intro: everything starts at the brightest tone and settles into place.
        const c = colorAt(v * intro);
        const i = (row * cols + col) * 4;
        image.data[i] = c[0];
        image.data[i + 1] = c[1];
        image.data[i + 2] = c[2];
        image.data[i + 3] = 255;
      }
    };

    const draw = (time) => {
      if (!start) start = time;
      const t = time / 1000;
      const p = still ? 1 : Math.min(1, (time - start) / INTRO_MS);
      const intro = 1 - (1 - p) ** 3;
      for (let i = ripples.length - 1; i >= 0; i--) {
        ripples[i].age = (time - ripples[i].born) / 1000;
        if (ripples[i].age > RIPPLE_LIFE) ripples.splice(i, 1);
      }
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      // Skip frames while the canvas has no size (its buffer isn't ready either).
      if (!image || !w || !h) {
        if (!still) frame = requestAnimationFrame(draw);
        return;
      }
      // The band is computed once per frame; only the per-pixel math runs in the loop.
      const band = bandAt(t, w, h);
      for (let row = 0; row < buffer.height; row++) paintRow(row, t, intro, w, h, band);
      bctx.putImageData(image, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(buffer, 0, 0, canvas.width, canvas.height);
      if (!still) frame = requestAnimationFrame(draw);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    const host = canvas.parentElement;
    host.addEventListener("pointerdown", onDown);
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      host.removeEventListener("pointerdown", onDown);
    };
  }, [canvasRef]);
}

// How far the visitor has scrolled through the pinned hero, from 0 (top) to 1 (where
// it lets go). Everything in the hero is a function of this number, so the story moves
// with the scroll (not a timer): scroll a little and it moves a little; scroll back and
// it goes back.
function useScrollProgress(sectionRef) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const el = sectionRef.current;
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
  }, [sectionRef]);
  return progress;
}

// Each step of the hero plays over its own slice of the scroll range, eased in and out
// so it starts and settles gently.
const STEPS = {
  turn: [0.03, 0.13], // the quote slides out, "ENT turns Cornell students into founders." in
  next: [0.17, 0.25], // that slides out, "With real companies." in
};
// Then the ventures, one after another: each comes in over its own slice and leaves
// (quickly, upward) just before the next one comes in.
// The spotlight fades in once; after that the frames stay put and only their contents
// cross-fade from one venture to the next, quickly, over these slices.
// The first entry is the fade-in; then each venture takes only SPOTLIGHT_STEP of the scroll,
// so more ventures fit without making the page longer.
const SPOTLIGHT_FIRST = [0.27, 0.35];
const SPOTLIGHT_STEP = 0.075;
const SPOTLIGHT_FADE = 0.026;
// After the last venture the frames fade away and every venture fills the screen.
const SPOTLIGHT_EXIT = [0.61, 0.66];
const COLLAGE = [0.6, 1];
const spotlightSlice = (i) =>
  i === 0
    ? SPOTLIGHT_FIRST
    : [
        SPOTLIGHT_FIRST[1] + i * SPOTLIGHT_STEP - SPOTLIGHT_FADE,
        SPOTLIGHT_FIRST[1] + i * SPOTLIGHT_STEP,
      ];

function stepProgress(progress, [from, to]) {
  const p = Math.max(0, Math.min(1, (progress - from) / (to - from)));
  return p * p * (3 - 2 * p);
}

// One phrase as lines of words; each word knows its place so CSS can stagger it.
function Phrase({ lines, accentFrom, total }) {
  let i = 0;
  return lines.map((line, li) => (
    <span key={li} className="fh-line">
      {line.map((word) => {
        const index = i++;
        // The space sits between the word spans, not inside them, so the heading's
        // accessible name keeps its spaces ("Live in the future", not "Liveinthefuture").
        return (
          <Fragment key={word}>
            <span
              className={`fh-wordx ${index >= accentFrom ? "fh-metal-text fh-accent-word" : ""}`}
              style={{ "--i": index, "--n": total }}
            >
              {word}
            </span>{" "}
          </Fragment>
        );
      })}
    </span>
  ));
}

const SIDES = ["left", "right"];

// Photos cross-fade, but text would overlap mid-change ("Stride" over "BUZZ"); it fades
// out over the first half of the change and in over the second, never both at once.
function textOpacity(vis) {
  return Math.max(0, vis * 2 - 1).toFixed(4);
}

// The ventures, kept clean: two staggered frames and a name between them. The frames fade
// in once (`enter`) and then stay still; each venture's photos, captions and name are
// stacked inside them and cross-fade by `vis` (0 to 1, from the scroll), so the content
// changes without anything moving.
function Spotlight({ spots, enter, exit }) {
  return (
    <div
      className="fh-spot"
      style={{
        "--s": enter.toFixed(4),
        "--x": exit.toFixed(4),
        visibility: enter > 0.01 && exit < 0.99 ? "visible" : "hidden",
      }}
    >
      {SIDES.map((side, s) => (
        <figure key={side} className={`fh-spot-figure fh-spot-${side}`}>
          <div className="fh-spot-frame">
            {spots.map(({ venture, vis }) => {
              const photo = venture.photos[s];
              return (
                <img
                  key={photo.src}
                  className={photo.logoOn ? "fh-spot-photo fh-spot-logo" : "fh-spot-photo"}
                  src={photo.src}
                  alt={photo.alt}
                  aria-hidden={vis < 0.5}
                  width={photo.width}
                  height={photo.height}
                  style={{
                    opacity: vis.toFixed(4),
                    ...(photo.logoOn
                      ? { backgroundColor: photo.logoOn }
                      : { objectPosition: photo.focus }),
                  }}
                />
              );
            })}
          </div>
          <figcaption className="fh-mono fh-spot-caption">
            {spots.map(({ venture, vis }) => (
              <span
                key={venture.name}
                aria-hidden={vis < 0.5}
                style={{ opacity: textOpacity(vis) }}
              >
                <span>{venture.photos[s].caption[0]}</span>
                <span>{venture.photos[s].caption[1]}</span>
              </span>
            ))}
          </figcaption>
        </figure>
      ))}
      <p className="fh-serif fh-spot-name">
        {spots.map(({ venture, vis }) => {
          const style = { opacity: textOpacity(vis) };
          // A venture without a site yet shows its name without a link.
          if (!venture.site)
            return (
              <span key={venture.name} aria-hidden={vis < 0.5} style={style}>
                {venture.name}
              </span>
            );
          return (
            <a
              key={venture.name}
              className={venture.name.length > 10 ? "is-long" : undefined}
              href={venture.site}
              target="_blank"
              rel="noopener noreferrer"
              aria-hidden={vis < 0.5}
              tabIndex={vis < 0.5 ? -1 : undefined}
              style={{ ...style, pointerEvents: vis > 0.5 ? "auto" : "none" }}
            >
              {venture.name}
            </a>
          );
        })}
      </p>
    </div>
  );
}

const QUOTE = [
  ["Live", "in", "the", "future,"],
  ["then", "build", "what’s", "missing."],
];
const FOUNDERS = [
  ["ENT", "turns", "Cornell", "students"],
  ["into", "founders."],
];
const COMPANIES = [["With", "real", "companies."]];

export default function MosaicHero() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  useLight(canvasRef);
  const progress = useScrollProgress(sectionRef);
  const turn = stepProgress(progress, STEPS.turn);
  const next = stepProgress(progress, STEPS.next);
  const shown = heroSpotlights.map((_, i) => stepProgress(progress, spotlightSlice(i)));
  // How visible each venture is: in when its slice comes, out when the next one's does.
  const spots = heroSpotlights.map((venture, i) => ({
    venture,
    vis: shown[i] * (1 - (shown[i + 1] ?? 0)),
  }));
  const spot = shown[0] ?? 0;
  const exit = stepProgress(progress, SPOTLIGHT_EXIT);
  const collage = stepProgress(progress, COLLAGE);

  return (
    // The section is taller than the screen; the stage inside stays pinned while the
    // extra height scrolls by, and that scroll drives the change of phrase.
    <section ref={sectionRef} className="fh-hero" aria-labelledby="fh-hero-title">
      <div className="fh-hero-stage">
        <canvas ref={canvasRef} className="fh-hero-canvas" aria-hidden="true" />
        <svg className="fh-grain" aria-hidden="true">
          <filter id="fh-grain-filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.85"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#fh-grain-filter)" />
        </svg>
        <div className="fh-hero-halo" aria-hidden="true" />

        <div className="fh-hero-content">
          <div
            className="fh-phrases"
            style={{ "--p": turn.toFixed(4), "--q": next.toFixed(4), "--s": spot.toFixed(4) }}
          >
            <div className="fh-phrase fh-phrase-a" aria-hidden={turn > 0.5}>
              <h1 id="fh-hero-title" className="fh-serif fh-hero-title fh-in">
                <Phrase lines={QUOTE} accentFrom={7} total={8} />
              </h1>
              <p className="fh-mono fh-attribution">— Paul Graham, Cornell ’86</p>
            </div>
            <div className="fh-phrase fh-phrase-b" aria-hidden={turn <= 0.5 || next > 0.5}>
              <p className="fh-serif fh-hero-title">
                <Phrase lines={FOUNDERS} accentFrom={5} total={6} />
              </p>
              <p className="fh-mono fh-attribution">Epsilon Nu Tau · Tau Chapter</p>
            </div>
            <div className="fh-phrase fh-phrase-c" aria-hidden={next <= 0.5 || spot > 0.5}>
              <p className="fh-serif fh-hero-title">
                <Phrase lines={COMPANIES} accentFrom={2} total={3} />
              </p>
              <p className="fh-mono fh-attribution">Founded by ENT brothers</p>
            </div>
          </div>
        </div>

        <Spotlight spots={spots} enter={spot} exit={exit} />
        <Collage progress={collage} />

        {/* Poster-style corners: where we are, and the one thing to do next. They step
            aside when the wall of ventures rises under them. The fade sits on a wrapper:
            the corners' entrance animation would override an opacity set on them. */}
        <div
          style={{
            opacity: Math.max(0, 1 - collage * 4).toFixed(4),
            visibility: collage < 0.25 ? "visible" : "hidden",
          }}
        >
          <div className="fh-mono fh-hero-corners fh-in fh-d2">
            <p>
              Cornell University
              <br />
              Ithaca, NY
            </p>
            <Link to="/recruitment">Fall 2026 recruitment →</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
