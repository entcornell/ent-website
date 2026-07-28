import React, { useEffect, useState } from "react";
import "./Home.css";

import EndeavorsPopup from "./EndeavorsPopup";
import { endeavors } from "./EndeavorsData";

const Home = () => {
  const [popupData, setPopupData] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="home-container">
      {/* HERO (DO NOT CHANGE) */}
      <section className="hero">
        <div className="hero-clip">
          <img src="images/homeBackground.jpg" alt="Hero" className="hero-img" />

          <div className="hero-content">
            <h1>EPSILON NU TAU</h1>
            <p>TAU CHAPTER</p>
            <p>CORNELL UNIVERSITY</p>

            {/*
            <a
              href="https://docs.google.com/forms/d/14UPJM5gJgw-MRswDzIkA-Fvx2ZhP_NSxN0mcyT3Mx80/viewform?edit_requested=true"
              target="_blank"
              rel="noopener noreferrer"
              className="apply-btn"
            >
              Applications are OPEN!
            </a>
            */}
          </div>

          {/* Red Chevron Outline */}
          <svg
            className="hero-outline"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <polyline
              points="-1,80 50,95 101,80"
              fill="none"
              stroke="#6E1010"
              strokeWidth="10"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      </section>

      {/* ============================= */}
      {/* RED BLURB SECTION (NEW)       */}
      {/* ============================= */}
      <section className="home-blurb">
        <div className="home-blurb-inner">
          <p>
            Epsilon Nu Tau is the nation’s first entrepreneurship fraternity,
            built to inspire the next generation of founders and builders. We
            bring together students from <b>all 9 colleges at Cornell</b> to grow
            real startups through mentorship, resources, and a strong community.
            Join us to create impact, form lifelong connections, and bring your
            ideas to life.
          </p>
        </div>
      </section>

      {/* ============================= */}
      {/* 3 IMAGES ROW (NEW)            */}
      {/* ============================= */}
      <section className="home-photo-row">
        <div className="home-photo-grid">
          <div className="home-photo-card">
            <img src="images/home1.jpg" alt="ENT event" />
          </div>

          <div className="home-photo-card">
            <img src="images/home2.jpg" alt="ENT members" />
          </div>

          <div className="home-photo-card">
            <img src="images/home3.png" alt="ENT 5k" />
          </div>
        </div>
      </section>

      {/* ============================= */}
      {/* STATS BAR (NEW)               */}
      {/* ============================= */}
      <section className="home-stats">
        <div className="home-stats-inner">
          <div className="home-stat">
            <div className="home-stat-text">
              <div className="home-stat-num">50+</div>
              <div className="home-stat-label">Active Members</div>
            </div>
          </div>

          <div className="home-stat-divider" />

          <div className="home-stat">
            <div className="home-stat-text">
              <div className="home-stat-num">All 9</div>
              <div className="home-stat-label">Colleges</div>
            </div>
          </div>

          <div className="home-stat-divider" />

          <div className="home-stat">
            <div className="home-stat-text">
              <div className="home-stat-num">30+</div>
              <div className="home-stat-label">Student Ventures</div>
            </div>
          </div>
        </div>
      </section>


      {/* ============================= */}
      {/* OUR MEMBERS (KEEP AS IS)      */}
      {/* ============================= */}
      <section className="our-members">
        <h2>Spring '26 Exec</h2>

        <div className="members-wrapper">
          <button
            className="scroll-arrow left"
            onClick={() =>
              document
                .querySelector(".members-scroll")
                .scrollBy({ left: -250, behavior: "smooth" })
            }
          >
            &#8249;
          </button>

          <div className="members-scroll">
            {[
              {
                role: "President",
                name: "Sadie Schnierow",
                img: "headshots-fall2025/SadieSchnierow-Headshot.jpg",
              },
              {
                role: "VP Recruitment",
                name: "Finn Clancy",
                img: "headshots-fall2025/FinnClancy-Headshot.jpg",
              },
              {
                role: "VP NME",
                name: "Pradhi Pakkeraki",
                img: "headshots-fall2025/PradhiPakkerakari.png",
              },
              {
                role: "VP NME",
                name: "Sebastian Dominguez",
                img: "headshots-fall2025/SebastianDominguez-Headshot.JPG",
              },
              {
                role: "VP Professional Events",
                name: "Alix Martini",
                img: "headshots-fall2025/AlixMartini-Headshot.jpg",
              },
              {
                role: "VP Finance",
                name: "Noel Blackwell",
                img: "headshots-fall2025/NoelBlackwell-Headshot.jpg",
              },
              {
                role: "VP Marketing",
                name: "Samantha Vaca",
                img: "headshots-fall2025/SamanthaVaca-Headshot.jpeg",
              },
              {
                role: "VP SBC",
                name: "Mahin Hardaway",
                img: "headshots-fall2025/MahinHardaway-Headshot.jpg",
              },
              {
                role: "VP Brotherhood",
                name: "Jackson Hutchison",
                img: "headshots/JacksonHutchison-Headshot.jpeg",
              },
              {
                role: "VP Professional Connects",
                name: "Diya Sheth",
                img: "headshots/DiyaSheth-Headshot.png",
              },
              /*{
                role: "VP Philanthropy",
                name: "Mahin Hardaway",
                img: "headshots-fall2025/MahinHardaway-Headshot.jpg",
              },*/
              /*{
                role: "Social Media Chair",
                name: "Brooke Wilcox",
                img: "headshots/BrookeWilcox-Headshot.jpeg",
              },*/
            ].map((member, index) => (
              <div className="member-card" key={index}>
                <img src={member.img} alt={member.role} />
                <h3>{member.role}</h3>
                <p className="member-name">{member.name}</p>
              </div>
            ))}
          </div>

          <button
            className="scroll-arrow right"
            onClick={() =>
              document
                .querySelector(".members-scroll")
                .scrollBy({ left: 250, behavior: "smooth" })
            }
          >
            &#8250;
          </button>
        </div>
      </section>

      {/* ============================= */}
      {/* OUR ENDEAVORS (KEEP AS IS)    */}
      {/* ============================= */}
      <section className="our-endeavors">
        <h2>Our Endeavors</h2>

        <div className="endeavors-grid">
          {endeavors.map((e, i) => (
            <article className="endeavor-card" key={i}>
              <div className="endeavor-media">
                <img src={e.img} alt={e.title} />
              </div>

              <div className="endeavor-content">
                <h3>{e.title}</h3>
                <p>{e.desc}</p>

                <div className="endeavor-buttons">
                  <button
                    type="button"
                    className="endeavor-btn"
                    onClick={() => setPopupData(e)}
                  >
                    See More
                  </button>

                  {e.link && (
                    <a
                      href={e.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="endeavor-btn outlined"
                    >
                      Visit Page
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ============================= */}
      {/* FINAL PHOTO MOSAIC (KEEP)     */}
      {/* ============================= */}
      <section className="photo-mosaic">
        <div className="mosaic-grid">
          <figure className="tile tile--img1">
            <img src="images/IMG_2115.JPG" alt="Event 1" />
          </figure>
          <figure className="tile tile--img2">
            <img src="images/100_0980.JPG" alt="Event 2" />
          </figure>
          <figure className="tile tile--img3">
            <img src="/images/IMG_4945.JPG" alt="Event 3" />
          </figure>
          <figure className="tile tile--img4">
            <img src="images/100_1210.JPG" alt="Event 4" />
          </figure>
          <figure className="tile tile--img5">
            <img src="images/IMG_4540.JPG" alt="Event 5" />
          </figure>
          <figure className="tile tile--img6">
            <img src="images/IMG_0052.JPG" alt="Event 6" />
          </figure>
        </div>
      </section>

      {/* Popup */}
      <EndeavorsPopup
        isOpen={!!popupData}
        onClose={() => setPopupData(null)}
        data={popupData}
      />
    </div>
  );
};

export default Home;
