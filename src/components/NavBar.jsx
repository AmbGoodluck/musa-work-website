import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home", id: "home", to: "/" },
  { label: "About", id: "about", to: "/about" },
  { label: "Work & Impact", id: "work", to: "/work-and-impact" },
  { label: "Leadership", id: "leadership", to: "/leadership" },
  { label: "Media", id: "media", to: "/media" },
  { label: "Awards", id: "awards" },
  { label: "Contact", id: "contact" },
];


function NavBar({ sections }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const handleNav = (id, to) => {
    setMenuOpen(false);
    if (to) return; // Let Link handle navigation
    if (sections[id]) {
      sections[id].current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="navbar" aria-label="Main navigation">
      <div className="navbar__container">
        <div className="navbar__logo" tabIndex={0}>Musa A. Soko</div>
        <nav className={`navbar__links ${menuOpen ? "open" : ""}`} aria-label="Section navigation">
          {navLinks.map((link) =>
            link.to ? (
              <Link
                key={link.id}
                to={link.to}
                className="navbar__link"
                tabIndex={0}
                onClick={() => handleNav(link.id, link.to)}
                aria-current={location.pathname === link.to ? "page" : undefined}
              >
                {link.label}
              </Link>
            ) : (
              <button
                key={link.id}
                className="navbar__link"
                onClick={() => handleNav(link.id)}
                tabIndex={0}
              >
                {link.label}
              </button>
            )
          )}
        </nav>
        <button
          className="navbar__hamburger"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="navbar__hamburger-bar"></span>
          <span className="navbar__hamburger-bar"></span>
          <span className="navbar__hamburger-bar"></span>
        </button>
      </div>
    </header>
  );
}

export default NavBar;
