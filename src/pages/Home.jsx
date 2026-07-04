import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-container">
      {/* ================= HERO SECTION ================= */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="badge">✨ Next-Generation Learning</span>
          <h1>
            Master the tech skills that <span className="text-gradient">shape the future</span>
          </h1>
          <p>
            Access premium courses in React, JavaScript, and modern design principles. Built for developers who want to skip the fluff and build real software.
          </p>
          <div className="hero-actions">
            <Link to="/login" className="btn btn-primary">
              Explore Courses
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </Link>
            <Link to="/login" className="btn btn-secondary">
              Student Portal
            </Link>
          </div>
        </div>
        
        {/* Abstract Visual Dashboard Preview */}
        <div className="hero-visual">
          <div className="visual-card main-card">
            <div className="card-header-dots">
              <span className="dot red"></span><span className="dot yellow"></span><span className="dot green"></span>
            </div>
            <div className="skeleton-line title"></div>
            <div className="skeleton-line body long"></div>
            <div className="skeleton-line body short"></div>
            <div className="progress-track">
              <div className="progress-bar-fill"></div>
            </div>
          </div>
          <div className="visual-card badge-card">
            <div className="icon-wrapper purple">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            <div>
              <h4>Quiz Engine</h4>
              <p>Multi-question builder live</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS RIBBON ================= */}
      <section className="stats-ribbon">
        <div className="stat-item">
          <h3>12K+</h3>
          <p>Active Learners</p>
        </div>
        <div className="stat-item border-x">
          <h3>85+</h3>
          <p>Expert-led Tracks</p>
        </div>
        <div className="stat-item">
          <h3>94%</h3>
          <p>Completion Rate</p>
        </div>
      </section>

      {/* ================= FEATURED TRACKS ================= */}
      <section className="tracks-section">
        <div className="section-header">
          <h2>What will you build today?</h2>
          <p>Explore specialized paths engineered to take you from core logic to full-stack deployment.</p>
        </div>

        <div className="tracks-grid">
          {/* Track 1 */}
          <div className="track-card">
            <div className="track-icon blue">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2px"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
            </div>
            <h3>Advanced React Architectures</h3>
            <p>Dive deep into structural hooks, state machinery, and server component optimizations.</p>
            <span className="track-tag">12 Lessons</span>
          </div>

          {/* Track 2 */}
          <div className="track-card">
            <div className="track-icon indigo">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg>
            </div>
            <h3>Modern Core JavaScript</h3>
            <p>Master execution contexts, event loops, closures, and asynchronous pattern pipelines.</p>
            <span className="track-tag">8 Lessons</span>
          </div>

          {/* Track 3 */}
          <div className="track-card">
            <div className="track-icon emerald">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg>
            </div>
            <h3>Premium UI/UX Engineering</h3>
            <p>Implement flawless responsive layouts, CSS layouts, fluid keyframe animations, and design tokens.</p>
            <span className="track-tag">15 Lessons</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;