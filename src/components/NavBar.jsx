import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home",         to: "/" },
  { label: "About",        to: "/about" },
  { label: "Work & Impact",to: "/work-and-impact" },
  { label: "Leadership",   to: "/leadership" },
  { label: "Media",        to: "/media" },
  { label: "Awards",       to: "/awards-and-recognitions" },
];

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Add shadow when user scrolls past hero
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const isActive = (to) => {
    if (to === "/") return location.pathname === "/";
    return location.pathname.startsWith(to);
  };

  return (
    <header className={`navbar${scrolled ? " scrolled" : ""}`} aria-label="Main navigation">
      <div className="navbar__container">
        {/* Logo */}
        <Link to="/" className="navbar__logo" aria-label="Musa A. Soko – Home">
          Musa A. Soko
          <span className="navbar__logo-dot" aria-hidden="true" />
        </Link>

        {/* Desktop nav links */}
        <nav className={`navbar__links${menuOpen ? " open" : ""}`} aria-label="Primary navigation">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="navbar__link"
              aria-current={isActive(link.to) ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="navbar__link navbar__link--cta"
            aria-current={isActive("/contact") ? "page" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>
        </nav>

        {/* Hamburger */}
        <button
          className="navbar__hamburger"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="navbar__hamburger-bar" />
          <span className="navbar__hamburger-bar" />
          <span className="navbar__hamburger-bar" />
        </button>
      </div>
    </header>
  );
}

export default NavBar;
