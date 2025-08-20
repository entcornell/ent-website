import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  // Close the mobile menu whenever we cross back to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768 && open) setOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [open]);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <img
          src={`${process.env.PUBLIC_URL}/images/ENTTransparentLogo.png`}
          alt="ENT Logo"
          className="logo-img"
        />
      </div>

      <button
        className={`hamburger ${open ? 'is-open' : ''}`}
        aria-label="Toggle menu"
        aria-expanded={open}
        aria-controls="primary-nav"
        onClick={() => setOpen(o => !o)}
      >
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </button>

      <ul id="primary-nav" className={`nav-links ${open ? 'open' : ''}`}>
        <li><NavLink to="/" end onClick={closeMenu}>Home</NavLink></li>
        <li><NavLink to="/recruitment" onClick={closeMenu}>Recruitment</NavLink></li>
        <li><NavLink to="/members" onClick={closeMenu}>Members</NavLink></li>
        <li><NavLink to="/who-we-are" onClick={closeMenu}>Who We Are</NavLink></li>
        <li><NavLink to="/newsletter" onClick={closeMenu}>Newsletter</NavLink></li>
      </ul>
    </nav>
  );
}
