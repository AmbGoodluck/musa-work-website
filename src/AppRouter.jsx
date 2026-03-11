import { useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import NavBar       from "./components/NavBar";
import Hero         from "./components/Hero";
import About        from "./components/About";
import WorkImpact   from "./components/WorkImpact";
import LeadershipRoles from "./components/LeadershipRoles";
import MediaSpeaking from "./components/MediaSpeaking";
import Awards       from "./components/Awards";
import Gallery      from "./components/Gallery";
import Contact      from "./components/Contact";
import Footer       from "./components/Footer";
import BackToTop    from "./components/BackToTop";

// Sub-pages
import AboutPage         from "./components/AboutPage";
import WorkPage          from "./components/WorkPage";
import LeadershipPage    from "./components/LeadershipPage";
import MediaPage         from "./pages/MediaPage";
import AwardsPage        from "./components/AwardsPage";
import ContactPage       from "./components/ContactPage";
import WashBlogPage      from "./pages/WashBlogPage";
import ActivitiesList    from "./components/activities/ActivitiesList";

// Admin
import LoginPage           from "./pages/Admin/LoginPage";
import DashboardPage       from "./pages/Admin/DashboardPage";
import ActivitiesAdmin     from "./pages/Admin/ActivitiesAdmin";
import WashBlogAdmin       from "./pages/Admin/WashBlogAdmin";
import MediaSpeakingAdmin  from "./pages/Admin/MediaSpeakingAdmin";
import AwardsAdmin         from "./pages/Admin/AwardsAdmin";
import RequireAuth         from "./pages/Admin/RequireAuth";

/* ── Home page: all sections stacked ─────────────────────────── */
function MainSections({ sections }) {
  return (
    <main>
      <section ref={sections.home} id="home">
        <Hero
          scrollToContact={() => sections.contact.current?.scrollIntoView({ behavior: "smooth" })}
          scrollToWork={()    => sections.work.current?.scrollIntoView({ behavior: "smooth" })}
        />
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
      <section ref={sections.awards} id="awards">
        <Awards />
      </section>
      <section ref={sections.activities} id="activities">
        <div className="activities-section">
          <h2>Activities</h2>
          <ActivitiesList />
        </div>
      </section>
      <section ref={sections.gallery} id="gallery">
        <Gallery />
      </section>
      <section ref={sections.contact} id="contact">
        <Contact />
      </section>
    </main>
  );
}

/* ── Public layout: NavBar + page content + Footer ────────────── */
function PublicLayout({ sections }) {
  return (
    <>
      <NavBar />
      <Outlet context={{ sections }} />
      <Footer />
      <BackToTop />
    </>
  );
}

export default function AppRouter() {
  const sections = {
    home:       useRef(null),
    about:      useRef(null),
    work:       useRef(null),
    leadership: useRef(null),
    media:      useRef(null),
    awards:     useRef(null),
    activities: useRef(null),
    gallery:    useRef(null),
    contact:    useRef(null),
  };

  return (
    <Router>
      <Routes>
        {/* ── Public routes (with NavBar / Footer) ────────────── */}
        <Route element={<PublicLayout sections={sections} />}>
          <Route path="/"                           element={<MainSections sections={sections} />} />
          <Route path="/about"                      element={<AboutPage />} />
          <Route path="/work-and-impact"            element={<WorkPage />} />
          <Route path="/leadership"                 element={<LeadershipPage />} />
          <Route path="/media"                      element={<MediaPage />} />
          <Route path="/awards-and-recognitions"    element={<AwardsPage />} />
          <Route path="/contact"                    element={<ContactPage />} />
          <Route path="/wash-blog"                  element={<WashBlogPage />} />
        </Route>

        {/* ── Admin routes (no NavBar / Footer) ───────────────── */}
        <Route path="/admin"                        element={<LoginPage />} />
        <Route
          path="/admin/dashboard"
          element={<RequireAuth><DashboardPage /></RequireAuth>}
        />
        <Route path="/admin/activities"     element={<RequireAuth><DashboardPage /></RequireAuth>} />
        <Route path="/admin/wash-blog"      element={<RequireAuth><DashboardPage /></RequireAuth>} />
        <Route path="/admin/media-speaking" element={<RequireAuth><DashboardPage /></RequireAuth>} />
        <Route path="/admin/awards"         element={<RequireAuth><DashboardPage /></RequireAuth>} />
      </Routes>
    </Router>
  );
}
