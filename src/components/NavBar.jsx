import React, { useState } from "react";

const navLinks = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Work", id: "work" },
  { label: "Leadership", id: "leadership" },
  { label: "Media", id: "media" },
  { label: "Publications", id: "publications" },
  { label: "Awards", id: "awards" },
  { label: "Contact", id: "contact" },
];

function NavBar({ sections }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (id) => {
    setMenuOpen(false);
    sections[id].current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="navbar" aria-label="Main navigation">
      <div className="navbar__container">
        <div className="navbar__logo" tabIndex={0}>Musa A. Soko</div>
        <nav className={`navbar__links ${menuOpen ? "open" : ""}`} aria-label="Section navigation">
          {navLinks.map((link) => (
            <button
              key={link.id}
              className="navbar__link"
              onClick={() => handleNav(link.id)}
              tabIndex={0}
            >
              {link.label}
            </button>
          ))}
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
