import React from "react";

function Footer({ sections }) {
  const year = new Date().getFullYear();
  const links = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Work", id: "work" },
    { label: "Leadership", id: "leadership" },
    { label: "Media", id: "media" },
    { label: "Publications", id: "publications" },
    { label: "Awards", id: "awards" },
    { label: "Contact", id: "contact" },
  ];
  return (
    <footer className="footer">
      <div className="footer__container">
        <div>
          © {year} Musa Ansumana Soko. All rights reserved.
        </div>
        <nav className="footer__nav" aria-label="Footer navigation">
          {links.map((link) => (
            <button
              key={link.id}
              className="footer__link"
              onClick={() => sections[link.id].current.scrollIntoView({ behavior: "smooth" })}
            >
              {link.label}
            </button>
          ))}
        </nav>
        <div className="footer__credit">
          Site by Amadu Studios U.S.A
        </div>
      </div>
    </footer>
  );
}

export default Footer;
