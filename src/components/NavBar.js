import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
    setAboutOpen(false);
  };

  // Close menus when resizing back to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
        setAboutOpen(false);
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <nav className="navbar">
      {/* LEFT LOGO */}
      <div className="nav-left">
        <img
          src={`${process.env.PUBLIC_URL}/images/ENTTransparentLogo.png`}
          alt="ENT Logo"
          className="logo-img"
        />
      </div>

      {/* HAMBURGER */}
      <button
        className={`hamburger ${menuOpen ? 'is-open' : ''}`}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(o => !o)}
      >
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </button>

      {/* NAV LINKS */}
      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li>
          <NavLink to="/" end onClick={closeMenu}>
            Home
          </NavLink>
        </li>

        {/* ABOUT DROPDOWN */}
        <li
          className={`nav-dropdown ${aboutOpen ? 'open' : ''}`}
          onMouseEnter={() => window.innerWidth > 768 && setAboutOpen(true)}
          onMouseLeave={() => window.innerWidth > 768 && setAboutOpen(false)}
        >
          <button
            className="nav-link-btn"
            onClick={() => setAboutOpen(o => !o)}
            aria-expanded={aboutOpen}
          >
            About 
          </button>

          <ul className="dropdown-menu">
            <li>
              <NavLink to="/who-we-are" onClick={closeMenu}>
                Who We Are
              </NavLink>
            </li>
            <li>
              <a
                href="https://sbc.entcornell.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
              >
                SBC
              </a>
            </li>
          </ul>
        </li>

        <li>
          <NavLink to="/recruitment" onClick={closeMenu}>
            Recruitment
          </NavLink>
        </li>

        <li>
          <NavLink to="/members" onClick={closeMenu}>
            Brothers
          </NavLink>
        </li>

        <li>
          <NavLink to="/newsletter" onClick={closeMenu}>
            Newsletter
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
