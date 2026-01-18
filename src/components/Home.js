import React, { useEffect, useState } from "react";
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faRocket, faUsers, faUserGraduate, faFileAlt, faDollarSign} from '@fortawesome/free-solid-svg-icons';
import EndeavorsPopup from "./EndeavorsPopup";
import { endeavors } from "./EndeavorsData";
//import { Link } from "react-router-dom";
//import { Helmet } from "react-helmet-async";
//import { useLocation } from "react-router-dom";

const Home = () => {

  //const { pathname } = useLocation();

    const [popupData, setPopupData] = useState(null);


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="home-container">

    {/*<Helmet key={pathname}>
      <title>Epsilon Nu Tau — The Nation’s First Entrepreneurship Fraternity</title>
      <meta
        name="description"
        content="Epsilon Nu Tau empowers student entrepreneurs with community, mentorship, and resources to launch ventures and grow as leaders."
      />
    </Helmet>*/}

    {/* Hero Section */}
    <section className="hero">
        <div className="hero-clip">
            <img
            src="images/IMG_3070.jpg"
            alt="Hero"
            className="hero-img"
            />
            <div className="hero-content">
            <h1>EPSILON NU TAU</h1>
            <p>TAU CHAPTER</p>
            <p>CORNELL UNIVERSITY</p> 
            {/*<Link to="/recruitment" className="apply-btn">
              Apply Now!
            </Link>*/}
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLSf-EoEUt3dYzgIAwHIrbdUCrytN7kEYjrvIrOwETft5kgB07g/viewform" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="apply-btn"
              >
              Coffee Chat Form Open
            </a>
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
            { role: "President", name: "Sadie Schnierow", img: "headshots-fall2025/SadieSchnierow-Headshot.jpg" },
            { role: "VP Recruitment", name: "Krish Patel", img: "headshots/KrishPatel-Headshot.png" },
            { role: "VP NME", name: "Pradhi Pakkeraki", img: "headshots-fall2025/PradhiPakkerakari.png" },
            { role: "VP NME", name: "Julius Behner", img: "headshots/JuliusBehner-Headshot.jpg" },
            { role: "VP Professional Events", name: "Alix Martini", img: "headshots/default-icon.jpg" },
            { role: "VP Finance", name: "Noel Blackwell", img: "headshots-fall2025/NoelBlackwell-Headshot.jpg" },
            { role: "VP Marketing", name: "Samantha Vaca", img: "headshots-fall2025/SamanthaVaca-Headshot.jpeg" },
            { role: "VP SBC", name: "Matt Kahn", img: "headshots-fall2025/MatthewKahn-Headshot.jpeg" },
            { role: "VP Brotherhood", name: "Jad Alsouss", img: "headshots/JadAlsouss-Headshot.JPG" },
            { role: "VP Professional Connects", name: "Diya Sheth", img: "headshots/DiyaSheth-Headshot.png" },
            { role: "VP Philanthropy", name: "Mahin Hardaway", img: "headshots-fall2025/MahinHardaway-Headshot.jpg" },
            { role: "Social Media Chair", name: "Brooke Wilcox", img: "headshots/BrookeWilcox-Headshot.jpeg" },
            { role: "Website Coordinator", name: "Neha Patil", img: "headshots-fall2025/NehaPatil-Headshot.png" },
            { role: "Website Coordinator", name: "Shannon Lin", img: "headshots-fall2025/ShannonLin-Headshot.jpeg" },
            { role: "Director of Alumni Relations", name: "Kyan Rosenthal", img: "headshots-fall2025/KyanRosenthal-Headshot.jpg" },
            { role: "Sponsorships Coordinator", name: "Finn Clancy", img: "headshots-fall2025/FinnClancy-Headshot.jpg" },
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
