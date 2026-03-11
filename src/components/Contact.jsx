import { useState } from "react";
import { Link } from "react-router-dom";

const subjects = [
  "Speaking Engagement",
  "Partnership",
  "Media Inquiry",
  "Mentorship",
  "Other",
];

function Contact() {
  const [subject, setSubject] = useState("");

  return (
    <div className="contact">
      <h2>Get in Touch</h2>
      <div className="contact__quick">
        <p>
          Interested in a speaking engagement, partnership, or media inquiry?
          Select a topic and reach out directly.
        </p>

        <div className="contact__dropdown-row">
          <select
            className="contact__subject-select"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            aria-label="Select inquiry type"
          >
            <option value="">What is this about?</option>
            {subjects.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <a
            className="btn btn--primary"
            href={`mailto:musa.soko@yahoo.com${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`}
          >
            Send Email
          </a>
        </div>

        <div className="contact__direct">
          <span className="contact__direct-label">Direct email:</span>
          <a href="mailto:musa.soko@yahoo.com" className="contact__email-link">
            musa.soko@yahoo.com
          </a>
        </div>

        <div className="contact__full-link">
          <Link to="/contact" className="btn btn--ghost">
            Open full contact form →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Contact;
