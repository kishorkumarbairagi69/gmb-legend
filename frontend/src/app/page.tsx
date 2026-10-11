
const features = [
  {
    number: "01",
    title: "Listing management",
    description:
      "Organize business profiles, track listing details, and keep location information consistent.",
    icon: "◎",
  },
  {
    number: "02",
    title: "Keyword intelligence",
    description:
      "Build keyword lists, organize search terms, and prepare position-tracking workflows.",
    icon: "⌕",
  },
  {
    number: "03",
    title: "Local rank tracking",
    description:
      "Bring location-aware ranking checks and geographic visibility into one workflow.",
    icon: "↗",
  },
  {
    number: "04",
    title: "Competitor research",
    description:
      "Compare local competitors, review visibility patterns, and identify opportunities.",
    icon: "◫",
  },
  {
    number: "05",
    title: "Geo-grid insights",
    description:
      "Explore how local search visibility can vary across geographic areas.",
    icon: "▦",
  },
  {
    number: "06",
    title: "Reports and alerts",
    description:
      "Prepare structured reports, review activity, and configure useful notifications.",
    icon: "↳",
  },
];

const workflow = [
  {
    step: "01",
    title: "Connect your workspace",
    description:
      "Organize your business locations and the teams that work on them.",
  },
  {
    step: "02",
    title: "Choose what to measure",
    description:
      "Set up keywords, competitors, and the local visibility workflows you need.",
  },
  {
    step: "03",
    title: "Turn insights into action",
    description:
      "Review results, prioritize work, and build reports around available data.",
  },
];

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </span>
  );
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M5 12h14m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <header className="site-header">
        <div className="container nav-wrap">
          <a className="brand" href="#home" aria-label="GMB Legend home">
            <BrandMark />
            <span>
              GMB <strong>LEGEND</strong>
            </span>
          </a>

          <nav className="main-nav" aria-label="Main navigation">
            <a href="#platform">Platform</a>
            <a href="#workflow">How it works</a>
            <a href="#features">Features</a>
          </nav>

          <a className="button button-small button-dark" href="#platform">
            Explore platform <ArrowIcon />
          </a>
        </div>
      </header>

      <main id="home">
        <section className="hero section">
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                LOCAL SEO WORKSPACE
              </div>

              <h1>
                Local visibility,
                <br />
                <span>without the guesswork.</span>
              </h1>

              <p className="hero-description">
                Bring listings, local rankings, keyword research, geo-grid
                insights, and competitor intelligence into one organized
                workspace.
              </p>

              <div className="hero-actions">
                <a className="button button-primary" href="#platform">
                  Explore the platform <ArrowIcon />
                </a>
                <a className="text-link" href="#features">
                  Discover capabilities <span aria-hidden="true">↓</span>
                </a>
              </div>

              <div className="hero-note">
                <span className="note-check" aria-hidden="true">
                  ✓
                </span>
                Designed for local businesses and multi-location teams
              </div>
            </div>

            <div
              className="product-visual"
              id="platform"
              aria-label="Illustrative preview of the GMB Legend local SEO dashboard"
            >
              <div className="visual-orbit orbit-one" />
              <div className="visual-orbit orbit-two" />

              <div className="dashboard-window">
                <div className="window-topbar">
                  <div className="window-brand">
                    <BrandMark />
                    <span>Workspace</span>
                  </div>
                  <span className="preview-label">PRODUCT PREVIEW</span>
                </div>

                <div className="dashboard-body">
                  <aside className="dashboard-sidebar">
                    <span className="sidebar-caption">WORKSPACE</span>
                    <span className="sidebar-item active">
                      <span>▦</span> Overview
                    </span>
                    <span className="sidebar-item">
                      <span>◎</span> Listings
                    </span>
                    <span className="sidebar-item">
                      <span>⌕</span> Keywords
                    </span>
                    <span className="sidebar-item">
                      <span>↗</span> Rankings
                    </span>
                    <span className="sidebar-item">
                      <span>◫</span> Competitors
                    </span>
                    <span className="sidebar-item">
                      <span>▤</span> Reports
                    </span>
                  </aside>

                  <div className="dashboard-content">
                    <div className="dashboard-heading">
                      <div>
                        <span className="dashboard-kicker">
                          YOUR LOCAL SEO
                        </span>
                        <h2>Overview</h2>
                      </div>
                      <span className="avatar">GL</span>
                    </div>

                    <div className="preview-banner">
                      <div>
                        <span className="banner-label">
                          VISIBILITY WORKSPACE
                        </span>
                        <h3>Your next opportunity starts here.</h3>
                        <p>
                          Keep local SEO activity in one place.
                        </p>
                      </div>
                      <div className="banner-symbol" aria-hidden="true">
                        <BrandMark />
                      </div>
                    </div>

                    <div className="preview-grid">
                      <div className="preview-card">
                        <span>Business listings</span>
                        <strong className="metric-placeholder">—</strong>
                        <small>Connect your locations</small>
                      </div>
                      <div className="preview-card">
                        <span>Tracked keywords</span>
                        <strong className="metric-placeholder">—</strong>
                        <small>Configure tracking</small>
                      </div>
                      <div className="preview-card preview-wide">
                        <div className="card-title-row">
                          <span>Local visibility</span>
                          <span className="chart-legend">
                            <i /> Tracking overview
                          </span>
                        </div>
                        <div className="chart-placeholder">
                          <div className="chart-y-axis">
                            <span>High</span>
                            <span>Medium</span>
                            <span>Low</span>
                          </div>
                          <svg
                            viewBox="0 0 320 94"
                            role="img"
                            aria-label="Illustrative chart layout with no live data"
                            preserveAspectRatio="none"
                          >
                            <path
                              d="M0 15H320 M0 47H320 M0 79H320"
                              stroke="#e8edf5"
                              strokeDasharray="4 5"
                              fill="none"
                            />
                            <path
                              d="M0 72 C28 67 39 38 66 49 S104 72 131 43 S174 31 198 46 S245 18 267 34 S299 28 320 12"
                              stroke="#b8c3d8"
                              strokeWidth="2.5"
                              strokeDasharray="5 5"
                              strokeLinecap="round"
                              fill="none"
                            />
                          </svg>
                        </div>
                        <small className="chart-note">
                          Illustrative layout · No live metrics
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="floating-note">
                <span className="floating-icon">✳</span>
                <div>
                  <strong>One connected workspace</strong>
                  <span>Built around your local SEO workflow</span>
                </div>
              </div>
            </div>
          </div>

          <div className="container capability-strip">
            <span>BUILT AROUND YOUR WORKFLOW</span>
            <div>Listings</div>
            <i />
            <div>Keywords</div>
            <i />
            <div>Rank tracking</div>
            <i />
            <div>Competitors</div>
            <i />
            <div>Reporting</div>
          </div>
        </section>

        <section className="section features-section" id="features">
          <div className="container">
            <div className="section-heading">
              <div>
                <div className="eyebrow">
                  <span className="eyebrow-dot" />
                  THE PLATFORM
                </div>
                <h2>
                  Everything local SEO.
                  <br />
                  <span>One clearer picture.</span>
                </h2>
              </div>
              <p>
                A connected set of workflows for managing local presence,
                understanding search visibility, and organizing what to do
                next.
              </p>
            </div>

            <div className="feature-grid">
              {features.map((feature) => (
                <article className="feature-card" key={feature.number}>
                  <div className="feature-card-top">
                    <span className="feature-icon" aria-hidden="true">
                      {feature.icon}
                    </span>
                    <span className="feature-number">{feature.number}</span>
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                  <a
                    className="feature-link"
                    href="#workflow"
                    aria-label={`Learn how ${feature.title.toLowerCase()} fits the workflow`}
                  >
                    Explore workflow <ArrowIcon />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section workflow-section" id="workflow">
          <div className="container workflow-layout">
            <div className="workflow-intro">
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                A CLEARER WORKFLOW
              </div>
              <h2>
                From scattered tasks
                <br />
                to <span>structured action.</span>
              </h2>
              <p>
                Organize the inputs, choose your priorities, and keep your
                local search work connected from one step to the next.
              </p>
              <a className="button button-dark" href="#features">
                Explore capabilities <ArrowIcon />
              </a>
            </div>

            <div className="workflow-steps">
              {workflow.map((item) => (
                <article className="workflow-step" key={item.step}>
                  <div className="step-number">{item.step}</div>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <span className="step-arrow" aria-hidden="true">
                    ↗
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="closing-section">
          <div className="container closing-inner">
            <div>
              <div className="eyebrow eyebrow-light">
                <span className="eyebrow-dot" />
                GMB LEGEND
              </div>
              <h2>
                Make local SEO
                <br />
                easier to navigate.
              </h2>
              <p>
                A focused workspace for the work behind local search
                visibility.
              </p>
            </div>
            <a className="button button-white" href="#home">
              Back to top <ArrowIcon />
            </a>
            <div className="closing-decoration" aria-hidden="true">
              <BrandMark />
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <a className="brand footer-brand" href="#home">
            <BrandMark />
            <span>
              GMB <strong>LEGEND</strong>
            </span>
          </a>
          <p>Local SEO, organized.</p>
<span>© 2026 GMB LEGEND</span>        </div>
      </footer>
    </>
  );
}
