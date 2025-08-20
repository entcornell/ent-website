import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Recruitment.css";

const tips_images = [
    "/images/IMG_3070.jpg",
    "/images/IMG_0052.jpg",
    "/images/Fall+2021+Headshot+Picture.jpg",
    "/images/IMG_4516 5.JPG"
  ];

  const loopedImages = [...tips_images, ...tips_images, ...tips_images];

/*const tips = [
  'Be yourself!',
  'Don’t be afraid!',
  'Show your passion!',
];*/

const eventsData = [
  { when: "Open Now!", title: "Coffee Chats", blurb: "Get to know our wonderful members by requesting a coffee chat! They'll tell you more about the club and what you can expect.", cta: "Coffee Chat a Member", to: "/members" },
  { when: "08/27/25", title: "Freshman Only Info Session", blurb: "If you're a freshman, you can learn more about our organization by attending this event.", cta: "See Details"},
  { when: "September", title: "PFC Fair", blurb: "You can find us tabling at this event. Drop by to learn more about ENT. Stay tuned to find out what day it will be taking place.", cta: "See Details" },
  { when: "09/04/25", title: "E-Ship Kickoff", blurb: "Stop by the entrepreneurship building and meet the community! You can also come chat to our fellow members to learn more about ENT.", cta: "See Details" },
  { when: "09/10/25", title: "Info Session #1", blurb: "Come to this information ENT event to learn more about what we have to offer!", cta: "See Details" },
  { when: "09/13/25", title: "Club Fest", blurb: "Stop by our table at Club Fest to meet more of our current members. They can give you insight about the club!", cta: "See Details" },
  { when: "09/17/25", title: "Info Session #2", blurb: "Come to this information ENT event to learn more about what we have to offer!", cta: "See Details" },
  { when: "09/21/25", title: "Applications Due", blurb: "Save this date to your calendar! If you're even thinking about applying, just try it out! You never know what might happen!", cta: "Submit Application!" },
];

const roundsData = [
  {
    date: "Due: 09/21/25",
    title: "Round One",
    tag: "Google Form",
    desc: "Round one of recruitment is an online application consisting only of a headshot and a 60-second video submission. We just want to know who you are!",
    button: { label: "Google Form", href: "#" },
  },
  {
    date: "Date TBD",
    title: "Round Two",
    tag: "Invite Only",
    desc: "Show your creativity, passion, and professionalism in a round-robin style interview.",
    button: { label: "Invite Only", href: "#" },
  },
  {
    date: "Date TBD",
    title: "Round Three",
    tag: "Invite Only",
    desc: "Get to know our chapter and showcase your strengths as you participate in an activity-based round.",
    button: { label: "Invite Only", href: "#" },
  },
];

export default function Recruitment() {

        useEffect(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, []);

    const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    let scrollAmount = 0;
    let scrollStep = 1; // speed (px per frame)
    let animationFrame;

    const autoScroll = () => {
      if (container) {
        scrollAmount += scrollStep;
        container.scrollLeft = scrollAmount;

        // reset when reaching end
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
          scrollAmount = 0;
        }
      }
      animationFrame = requestAnimationFrame(autoScroll);
    };

    animationFrame = requestAnimationFrame(autoScroll);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const [roundIndex, setRoundIndex] = useState(0);
  const viewportRef = useRef(null);
  const stageRef = useRef(null);

  // timeline refs
  const tlContainerRef = useRef(null);
  const nodeRefs = useRef([]);
  const [visibleCount, setVisibleCount] = useState(0);

  // basic carousel logic
  //const clamp = (n) => Math.min(Math.max(n, 0), roundsData.length - 1);
  const go = (dir) => {
  setRoundIndex((i) => {
    const next = i + dir;
    if (next < 0) return roundsData.length - 1;
    if (next >= roundsData.length) return 0;
    return next;
  });
};

const [sidePadding, setSidePadding] = useState(0);

useEffect(() => {
  const viewport = viewportRef.current;
  if (!viewport) return;

  const cardWidth = 340; // match CSS
  const gap = 22;
  const totalCardWidth = cardWidth + gap;

  const scrollX = roundIndex * totalCardWidth
    - (viewport.offsetWidth / 2) + (cardWidth / 2);

  // Wait for layout to settle before scrolling
  requestAnimationFrame(() => {
    viewport.scrollTo({
      left: Math.max(0, scrollX),
      behavior: 'smooth',
    });
  });
}, [roundIndex]);


useEffect(() => {
  const handleResize = () => {
    if (viewportRef.current) {
      const viewportWidth = viewportRef.current.offsetWidth;
      const cardWidth = 340; // same as .round-card flex-basis
      const padding = Math.max((viewportWidth - cardWidth) / 2, 0);
      setSidePadding(padding);
    }
  };

  handleResize();
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);




  // swipe for carousel
  useEffect(() => {
  const el = stageRef.current;
  if (!el) return;

  let startX = 0;
  let lastX = 0;
  let dx = 0;
  let startT = 0;
  let dragging = false;
  let pointerId = null;

  const THRESHOLD = 60;       // px movement to count as a swipe
  const FLICK_VEL = 0.5;      // px/ms ~ quick flick shortcut

  const onDown = (e) => {
    // support mouse/touch/pen via Pointer Events
    pointerId = e.pointerId;
    startX = lastX = e.clientX;
    startT = performance.now();
    dx = 0;
    dragging = true;
    el.classList.add("is-dragging");
    try { el.setPointerCapture(pointerId); } catch {}
  };

  const onMove = (e) => {
    if (!dragging) return;
    dx = e.clientX - startX;
    lastX = e.clientX;
  };

  const onUp = (e) => {
    if (!dragging) return;
    const dt = Math.max(1, performance.now() - startT);
    const vel = Math.abs(dx) / dt;

    // decide direction
    if (Math.abs(dx) > THRESHOLD || vel > FLICK_VEL) {
      if (dx > 0) {
        go(-1); // swipe right -> go to previous
      } else {
        go(1);  // swipe left  -> go to next
      }
    }

    dragging = false;
    dx = 0;
    el.classList.remove("is-dragging");
    try { el.releasePointerCapture(pointerId); } catch {}
    pointerId = null;
  };

  el.addEventListener("pointerdown", onDown);
  el.addEventListener("pointermove", onMove);
  el.addEventListener("pointerup", onUp);
  el.addEventListener("pointercancel", onUp);
  el.addEventListener("pointerleave", onUp);

  return () => {
    el.removeEventListener("pointerdown", onDown);
    el.removeEventListener("pointermove", onMove);
    el.removeEventListener("pointerup", onUp);
    el.removeEventListener("pointercancel", onUp);
    el.removeEventListener("pointerleave", onUp);
  };
}, [go]);


  // intersection reveal + progress fill
  useEffect(() => {
    const nodes = nodeRefs.current.filter(Boolean);
    if (!nodes.length) return;

    const io = new IntersectionObserver(
      (ents) => {
        let changed = false;
        ents.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            changed = true;
          }
        });
        if (changed) {
          const newlyVisible = nodes.filter((n) => n.classList.contains("is-visible")).length;
          setVisibleCount(newlyVisible);
        }
      },
      { root: null, threshold: 0.3 }
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  // update CSS progress custom prop on container
  useEffect(() => {
    const total = eventsData.length;
    const ratio = total <= 1 ? 1 : (visibleCount - 1) / (total - 1);
    if (tlContainerRef.current) {
      tlContainerRef.current.style.setProperty("--progress", Math.max(0, Math.min(1, ratio)));
    }
  }, [visibleCount]);

  // store refs for timeline items
  const setNodeRef = (el, i) => {
    nodeRefs.current[i] = el;
  };

  return (
    <div className="recruitment-page">

      {/* HERO */}
      <section className="r-hero">
        <div className="r-hero-clip">
          <img src="images/IMG_3070.jpg" alt="Recruitment hero" className="r-hero-img" />
          <div className="r-hero-content">
            <h1>Recruitment</h1>
            <a 
            href="https://forms.gle/d1VfHTNDmnChkXRd7" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="r-apply-btn"
            >
            Interest Form
            </a>
          </div>
          <svg className="r-hero-outline" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polyline points="-1,85 50,100 101,85" fill="none" stroke="#d62828" strokeWidth="35" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
      </section>

      <main className="r-container">
        {/* REQUIREMENTS */}
        <section className="r-req">
        <div className="r-req-left">
            <p className="r-pretitle">Application</p>
            <h2 className="r-title r-title--xl">Requirements</h2>

            <ul className="r-bullets r-bullets--big">
            <li>
                <div className="r-bullet-dot" aria-hidden />
                <div>
                <p className="r-bullet-head">Undergraduate student</p>
                <p className="r-bullet-sub">
                    Any age or year!{" "}
                    <a className="r-link-underline" href="#">
                    First–semester freshmen allowed
                    </a>
                </p>
                </div>
            </li>

            <li>
                <div className="r-bullet-dot" aria-hidden />
                <div>
                <p className="r-bullet-head">Passion for entrepreneurship</p>
                <p className="r-bullet-sub">
                    Just be yourself! You <em>don’t</em> have to be
                    actively running or working on a venture!
                </p>
                </div>
            </li>
            </ul>
        </div>

        <div className="r-req-right">
            <img
            src="images/Fall+2021+Headshot+Picture.jpg"
            alt="Recruitment group"
            />
        </div>
        </section>


        <hr className="r-thin-divider" />

        {/* EVENTS TIMELINE */}
        <section className="r-events">
          <h2 className="r-title center">Events Timeline</h2>

          <div className="r-timeline" ref={tlContainerRef}>
            <div className="tl-line" />
            <div className="tl-progress" />

            {eventsData.map((e, i) => {
              const side = i % 2 === 0 ? "left" : "right";
              return (
                <article
                  key={i}
                  className={`tl-item ${side} reveal`}
                  ref={(el) => setNodeRef(el, i)}
                >
                  <div className="tl-dot" aria-hidden />
                  <div className="tl-card">
                    <p className={`tl-when ${i === 0 ? "accent" : ""}`}>{e.when}</p>
                    <h3 className="tl-title">{e.title}</h3>
                    <p className="tl-blurb">{e.blurb}</p>
                    {e.href ? (
  <a 
    className="tl-btn" 
    href={e.href} 
    target="_blank" 
    rel="noopener noreferrer"
  >
    {e.cta}
  </a>
) : e.to ? (
  <Link className="tl-btn" to={e.to}>
    {e.cta}
  </Link>
) : (
  <span className="tl-btn">More info coming soon!</span>
)}


                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <hr className="r-thin-divider" />

        {/* RECRUITMENT ROUNDS (CAROUSEL) */}
        <section className="r-rounds">
        <h2 className="r-title">Recruitment Rounds</h2>

        <div className="r-rounds-edge">
        <div className="r-rounds-wrap">
            <button className="r-arrow left" onClick={() => go(-1)}>
            &#8249;
            </button>

            <div className="r-rounds-viewport">   {/* provides perspective */}
            <div className="r-rounds-stage" ref={stageRef}>     {/* the 3D stage */}
                {roundsData.map((r, i) => {
                const total = roundsData.length;
                // shortest circular distance from active
                let delta = i - roundIndex;
                if (delta > total / 2) delta -= total;
                if (delta < -total / 2) delta += total;

                const ad = Math.abs(delta);
                const x = delta * 220;              // horizontal spacing
                const ry = delta * -15;             // Y rotation per step
                const z = 160 - ad * 120;           // bring center forward
                const s = 1 - Math.min(ad * 0.12, .36);
                const op = 1 - Math.min(ad * 0.25, .55);
                const zi = 100 - ad * 10;

                return (
                    <article
                    key={i}
                    className={`round-card ${delta === 0 ? "is-active" : ""}`}
                    style={{
                        transform: `translateX(${x}px) translateZ(${z}px) rotateY(${ry}deg) scale(${s})`,
                        opacity: op,
                        zIndex: zi
                    }}
                    >
                    <p className="round-date">{r.date}</p>
                    <h3 className="round-title">{r.title}</h3>
                    <p className="round-desc">{r.desc}</p>

                    {r.button?.label ? (
                        <a className="round-btn" href={r.button.href}>{r.button.label}</a>
                    ) : (
                        r.tag && <span className="round-chip">{r.tag}</span>
                    )}
                    </article>
                );
                })}
            </div>
            </div>

            <button className="r-arrow right" onClick={() => go(1)}>
            &#8250;
            </button>
        </div>

        <div className="r-dots">
            {roundsData.map((_, i) => (
            <button
                key={i}
                className={`r-dot ${i === roundIndex ? "is-active" : ""}`}
                onClick={() => setRoundIndex(i)}
            />
            ))}
        </div>
        </div>
        
        </section>

         <hr className="r-thin-divider" />

        {/* APPLICATION TIPS */}
        {/*<section className="app-container">
             <div className="app-container-diag-layer">
                <DiagonalWedge
                topSrc="/images/IMG_3070.jpg"
                bottomSrc="/images/IMG_0052.jpg"
                stroke="#b92d2d"
                />
            </div>
        <div className="right-section">
            <h1 className="heading">App...</h1>
            <ul className="bullet-list">
            <li><span className="hex-icon"></span> Better
             communication</li>
            <li><span className="hex-icon"></span> Document flow</li>
            <li><span className="hex-icon"></span> Shared access</li>
            </ul>
        </div>
    </section>*/}

    <section className="appTips">
      {/* Left auto-scrolling carousel */}
      <div className="appTips-leftScroll">
        <div className="scroll-track">
          {loopedImages.map((src, i) => (
            <div className="img-wrapper" key={i}>
              <img src={src} alt={`App Tip ${i}`} className="appTips-img" />
            </div>
          ))}
        </div>
      </div>

      {/* Right tips */}
      {/* Right tips */}
<div className="appTips-right">
  <h2 className="appTips-title">Apply Today!</h2>

  <p className="appTips-blurb">
    We’re looking for passionate, creative, and driven students 
    who want to grow together. Show us what makes you unique and 
    take the next step with us!
  </p>
  <div className="appTips-cta">
                <a 
            href="https://forms.gle/d1VfHTNDmnChkXRd7" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="appTips-btn"
            >
            Interest Form
            </a>
    <p className="appTips-follow">
      Follow us on <a href="https://www.instagram.com/entcornell" target="_blank" rel="noopener noreferrer">Instagram</a> for updates!
    </p>
  </div>
</div>

    </section>












      </main>

    </div>
  );
}
