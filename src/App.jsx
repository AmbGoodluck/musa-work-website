import React, { useRef } from "react";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import About from "./components/About";
import WorkImpact from "./components/WorkImpact";
import LeadershipRoles from "./components/LeadershipRoles";
import MediaSpeaking from "./components/MediaSpeaking";
import Publications from "./components/Publications";
import Awards from "./components/Awards";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";

function App() {
  // Section refs for smooth scrolling
  const sections = {
    home: useRef(null),
    about: useRef(null),
    work: useRef(null),
    leadership: useRef(null),
    media: useRef(null),
    publications: useRef(null),
    awards: useRef(null),
    contact: useRef(null),
  };

  return (
    <>
      <NavBar sections={sections} />
      <main>
        <section ref={sections.home} id="home">
          <Hero scrollToContact={() => sections.contact.current.scrollIntoView({ behavior: "smooth" })} scrollToWork={() => sections.work.current.scrollIntoView({ behavior: "smooth" })} />
        </section>
        <section ref={sections.about} id="about">
          <About />
        </section>
        <section ref={sections.work} id="work">
          <WorkImpact />
        </section>
        <section ref={sections.leadership} id="leadership">
          <LeadershipRoles />
        </section>
        <section ref={sections.media} id="media">
          <MediaSpeaking />
        </section>
        <section ref={sections.publications} id="publications">
          <Publications />
        </section>
        <section ref={sections.awards} id="awards">
          <Awards />
        </section>
        <section ref={sections.contact} id="contact">
          <Contact />
        </section>
      </main>
      <Footer sections={sections} />
      <BackToTop />
    </>
  );
}

export default App;
