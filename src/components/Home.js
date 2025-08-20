import React, { useEffect, useState } from "react";
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faRocket, faUsers, faUserGraduate, faFileAlt, faDollarSign} from '@fortawesome/free-solid-svg-icons';
import EndeavorsPopup from "./EndeavorsPopup";
import { endeavors } from "./EndeavorsData";
import { Link } from "react-router-dom";

const Home = () => {

    const [popupData, setPopupData] = useState(null);


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="home-container">


    {/* Hero Section */}
    <section className="hero">
        <div className="hero-clip">
            <img
            src="images/IMG_3070.jpg"
            alt="Hero"
            className="hero-img"
            />
            <div className="hero-content">
            <h1>Epsilon Nu Tau</h1>
            <p>The Nation's First Entrepreneurship Fraternity!</p>
            <Link to="/recruitment" className="apply-btn">
              Apply Now!
            </Link>
            </div>

            {/* Red Chevron Outline */}
            <svg className="hero-outline" viewBox="0 0 100 100" preserveAspectRatio="none">
                <polyline
                    points="-1,85 50,100 101,85"
                    fill="none"
                    stroke="#d62828"
                    strokeWidth="35"
                    vectorEffect="non-scaling-stroke"
                />
            </svg>


        </div>
    </section>

      {/* What We Do */}
      <section className="what-we-do">
        <div className="what-we-do-container">
          <div className="what-we-do-image">
            <img
              src="images/IMG_4535- Enhanced.jpg"
              alt="Fraternity"
            />
          </div>
          <div className="what-we-do-text">
            <h2>What We Do</h2>
            <div className="service-item">
              <div className="icon-hex">
                <FontAwesomeIcon icon={faLightbulb} />
            </div>
              <div>
                <h3>Inspire next generation</h3>
                <p>Epowering bold ideas to take off!</p>
              </div>
            </div>
            <div className="service-item">
              <div className="icon-hex">
                <FontAwesomeIcon icon={faRocket} />
            </div>
              <div>
                <h3>Help grow your startup</h3>
                <p>We provide mentorship and resources!</p>
              </div>
            </div>
            <div className="service-item">
              <div className="icon-hex">
                <FontAwesomeIcon icon={faUsers} />
            </div>
              <div>
                <h3>Build a community</h3>
                <p>Meet others who are passionate about entrepreneurship!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

    {/* Our Story */}
    <section className="our-story">
    <div className="our-story-container">
        <div className="our-story-text">
        <h2>Our Story</h2>
        <p>
            We were founded as a co-ed, professional organization to help students launch and maintain sustainable businesses. Through our new member education, peer mentorship and training, curated resources, and vibrant brotherhood, we strive to create a connected entrepreneurial community at Cornell University.
        </p>
        <div className="stats-grid">
            <div className="stat">
            <FontAwesomeIcon icon={faUserGraduate} className="stat-icon" />
            <div><strong>70+</strong><br />Alumni & Members</div>
            </div>
             <div className="stat-divider"></div>
            <div className="stat">
            <FontAwesomeIcon icon={faFileAlt} className="stat-icon" />
            <div><strong>15+</strong><br />Student Startups</div>
            </div>
             <div className="stat-divider"></div>
            <div className="stat">
            <FontAwesomeIcon icon={faDollarSign} className="stat-icon" />
            <div><strong>$200K+</strong><br />Aggregate Funding</div>
            </div>
        </div>
        </div>

        <div className="our-story-image">
        <img src="images/IMG_4512- Enhanced.jpg" alt="Our Story" />
        </div>
    </div>
    </section>

    <div className="section-divider"></div>
    
    {/* Our Members */}
    <section className="our-members">
    <h2>Our Members</h2>

    <div className="members-wrapper">
        <button
        className="scroll-arrow left"
        onClick={() =>
            document.querySelector(".members-scroll").scrollBy({ left: -250, behavior: "smooth" })
        }
        >
        &#8249;
        </button>

        <div className="members-scroll">
        {[
            { role: "President", name: "Matt Kahn", img: "headshots/MattKahn-Headshot.jpg" },
            { role: "VP Recruitment", name: "Dillon Gordon", img: "headshots/DillonGordon-Headshot.JPEG" },
            { role: "VP NME", name: "Brij Garg", img: "headshots/BrijGarg-Headshot.PNG" },
            { role: "VP Prof. Events", name: "Sadie Schnierow", img: "headshots/SadieSchnierow-Headshot.jpeg" },
            { role: "VP Finance", name: "Noel Blackwell", img: "headshots/NoelBlackwell-Headshot.JPEG" },
            { role: "VP Marketing", name: "Samantha Vaca", img: "headshots/SamanthaVaca-Headshot.jpeg" },
            { role: "VP SBC", name: "Mihir Kulshreshtha", img: "headshots/MihirKulshreshtha-Headshot.JPEG" },
                        { role: "VP Brotherhood", name: "Finn Clancy", img: "headshots/default-icon.jpg" },
            { role: "VP Prof. Connects", name: "Hongjin Fang", img: "headshots/HongjinFang-Headshot.jpg" },
            { role: "VP Philanthropy", name: "Shannon Lin", img: "headshots/ShannonLin-Headshot.JPG" },
            // Add more here...
        ].map((member, index) => (
            <div className="member-card" key={index}>
            <img src={member.img} alt={member.role} />
            <h3>{member.role}</h3>
            <p className="member-name">{member.name}</p>
            {/*<p className="member-desc">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            </p>*/}
            </div>
        ))}
        </div>

        <button
        className="scroll-arrow right"
        onClick={() =>
            document.querySelector(".members-scroll").scrollBy({ left: 250, behavior: "smooth" })
        }
        >
        &#8250;
        </button>
    </div>
    </section>

    <div className="section-divider"></div>

    {/* Our Endeavors */}
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
                <button
                  className="btn-see-more"
                  onClick={() => setPopupData(e)}
                >
                  See More
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

    {/* ===== Final Image Mosaic ===== */}
    <section className="photo-mosaic">
        <div className="mosaic-bar" />
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
