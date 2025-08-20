import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <div className="home-container">

    {/* ===== Footer ===== */}
    <footer className="site-footer">

    <div className="footer-inner">
        {/* Brand */}
        <div className="footer-brand">
        <img
            src="images/ENTTransparentLogo.png"
            alt="ENT Logo"
            className="footer-logo"
        />
        <p className="club-regristration">
            This organization is a registered student organization of Cornell University.
        </p>
        <p className="equal-education">
            <a 
                href="https://hr.cornell.edu/about/workplace-rights/equal-education-and-employment" 
                target="_blank" 
                rel="noopener noreferrer"
            >
                Equal Education and Employment
            </a>
        </p>

        </div>

        {/* Quick Links */}
        <nav className="footer-col">
        <h4>Explore</h4>
        <ul className="footer-col-links">
            <li><a href="/">Home</a></li>
            <li><a href="/recruitment">Recruitment</a></li>
            <li><a href="/members">Members</a></li>
            <li><a href="/who-we-are">Who We Are</a></li>
            <li><a href="/newsletter">Newsletters</a></li>
        </ul>
        </nav>

        {/* Contact */}
        <div className="footer-col">
        <h4>Contact</h4>
        <ul className="footer-contact">
            <li><span>ent.cornell@gmail.com</span></li>
            <li><span>Ithaca, NY</span></li>
        </ul>

        <div className="footer-socials">
            <a aria-label="Instagram" href="https://www.instagram.com/entcornell" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a aria-label="LinkedIn" href="https://www.linkedin.com/company/epsilon-nu-tau" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
            <a aria-label="Email" href="mailto:ent.cornell@gmail.com">
                <FontAwesomeIcon icon={faEnvelope} />
            </a>
        </div>
        </div>
    </div>

    <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Epsilon Nu Tau · All rights reserved.</p>
    </div>
    </footer>



    </div>
  );
};

export default Footer;
