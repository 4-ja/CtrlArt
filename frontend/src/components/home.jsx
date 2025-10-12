// File: src/components/home.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import "../styles/index.css";
import { assets } from "../assets/assetMap";

const sections = [
  { id: "home", label: "Home" },
  { id: "features", label: "Features" },
  { id: "about", label: "About" },
  { id: "community", label: "Community" },
  { id: "pricing", label: "Pricing" },
  { id: "testimonials", label: "Reviews" },
  { id: "artists", label: "Top Artists" },
];

export default function Home() {
  const [active, setActive] = useState("home");
  const headerRef = useRef(null);
  const refs = useMemo(() => Object.fromEntries(sections.map(s => [s.id, React.createRef()])), []);

  const handleNavClick = (id) => (e) => {
    e.preventDefault();
    const el = refs[id]?.current;
    if (!el) return;
    const headerH = headerRef.current?.offsetHeight || 96;
    const y = el.getBoundingClientRect().top + window.pageYOffset - (headerH + 8);
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  useEffect(() => {
    const headerH = headerRef.current?.offsetHeight || 96;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: `-${headerH + 10}px 0px -60% 0px`, threshold: 0.25 }
    );

    sections.forEach(({ id }) => {
      const el = refs[id]?.current;
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [refs]);

  return (
    <div className="home-page text-white bg-black min-h-screen selection:bg-indigo-500/20">
      {/* ===== Header ===== */}
      <header ref={headerRef} className="sticky-header">
        <div className="nav-container">
          <div className="flex items-center gap-2">
            <span className="logo-mark">CA</span>
            <div className="logo">CTRL<span className="highlight">ART</span></div>
          </div>
          <nav className="nav-links">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={handleNavClick(s.id)}
                className={`nav-link ${active === s.id ? "active-link" : ""}`}
              >
                {s.label}
              </a>
            ))}
          </nav>
          <div className="nav-cta">
            <button className="btn-ghost hidden sm:inline-flex">Sign In</button>
            <button className="btn-primary">Get Started</button>
          </div>
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section id="home" ref={refs.home} className="section p-0">
        <div className="hero-wrap">
          <img
            className="hero-img"
            src={assets.hero}
            alt="hero"
          />
          <div className="hero-overlay" />
          <div className="hero-content">
            <div className="hero-eyebrow">
              <span className="badge">NEW</span>
              <span className="eyebrow-copy">Animated wallpapers · Premium posters</span>
            </div>
            <h1 className="hero-title">
              The <span className="grad">Future</span>
              <br/> of Physical & Digital Art
            </h1>
            <p className="hero-sub">We specialize in exclusive, high‑resolution gaming, anime, and pop‑culture art — from animated wallpapers for your screens to premium posters for your walls.</p>
            <div className="hero-actions">
              <button className="btn-primary">Explore Works</button>
              <button className="btn-ghost">Request a Design</button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== What we do + mini gallery + feature cards ===== */}
      <section id="features" ref={refs.features} className="section">
        <div className="container">
          <p className="lead text-center mx-auto max-w-3xl">We specialize in exclusive, high‑resolution gaming, anime, and pop‑culture art — from animated wallpapers for your screens to premium posters for your walls.</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mt-8">
            {assets.miniThumbs.map((src, i) => (
              <img key={i} src={src} alt="thumb" className="thumb" />
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
            {[
              { t: "Guaranteed Quality", s: "4K+ assets" },
              { t: "Custom Requests", s: "Tailored to you" },
              { t: "Fast Turnaround", s: "48–72 hours" },
            ].map((f, i) => (
              <div key={i} className="card">
                <div className="card-title">{f.t}</div>
                <div className="card-sub">{f.s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== About / Wide card ===== */}
      <section id="about" ref={refs.about} className="section">
        <div className="container grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5">
            <img src="https://images.unsplash.com/photo-1526312426976-593c2ce5d3c6?q=80&w=1887&auto=format&fit=crop" alt="frame" className="rounded-xl ring-1 ring-white/10 object-cover" />
          </div>
          <div className="lg:col-span-7 space-y-4">
            <h2 className="h2">A Complete Screen + Wall transformation</h2>
            <p className="muted max-w-prose">Commission a matching set — a living animated wallpaper for your devices and a museum‑grade printed poster for your space. Our color science ensures perfect cross‑medium harmony.</p>
            <button className="btn-primary w-max">Get a Quote</button>
          </div>
        </div>
      </section>

      {/* ===== Community grid ===== */}
      <section id="community" ref={refs.community} className="section">
        <div className="container">
          <h3 className="h3 text-center">Community Design</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mt-6">
            {assets.community.map((src, i) => (
              <img key={i} src={src} alt="art" className="thumb" />
            ))}
          </div>
        </div>
      </section>

      {/* ===== Pricing ===== */}
      <section id="pricing" ref={refs.pricing} className="section alt">
        <div className="container">
          <h3 className="h3 text-center">Price Ranges</h3>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {pricing.map((p, i) => (
              <div key={i} className="plan">
                <div className="plan-label">{p.label}</div>
                <div className="plan-price">{p.price}<span className="plan-unit"> / {p.unit}</span></div>
                <ul className="plan-points">
                  {p.points.map((pt, j) => (
                    <li key={j} className="point"><span className="dot" />{pt}</li>
                  ))}
                </ul>
                <button className="btn-primary w-full mt-6">Choose</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Wide banner image ===== */}
      <section className="section pt-0">
        <div className="container">
          <img src={assets.banner} alt="banner" className="rounded-2xl object-cover ring-1 ring-white/10" />
        </div>
      </section>

      {/* ===== Testimonials ===== */}
      <section id="testimonials" ref={refs.testimonials} className="section">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              quote: "The animated wallpaper set makes my setup feel alive. Superb quality!",
              name: "Mika Tan",
              role: "Streamer",
              avatar: assets.avatars[0],
            },
            {
              quote: "Colors matched perfectly between my phone and the poster on my wall.",
              name: "J. Cruz",
              role: "Designer",
              avatar: assets.avatars[1],
            },
          ].map((t, i) => (
            <figure key={i} className="quote">
              <blockquote>“{t.quote}”</blockquote>
              <figcaption className="author">
                <img src={t.avatar} alt="avatar" />
                <div>
                  <div className="name">{t.name}</div>
                  <div className="role">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ===== Top Artists ===== */}
      <section id="artists" ref={refs.artists} className="section alt">
        <div className="container">
          <h3 className="h3 text-center">Top Artists</h3>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Ari K.",   category: "Sci-Fi Illustration", title: "Skyline Rhapsody",   cover: assets.artistsCovers[0] },
              { name: "Noel V.",  category: "Anime Concept",       title: "Garden of Aethers",  cover: assets.artistsCovers[1] },
              { name: "Raine S.", category: "Fantasy Matte-Paint", title: "Ashen Shorelines",   cover: assets.artistsCovers[2] },
            ].map((a, i) => (
              <article key={i} className="artist">
                <img src={a.cover} alt={a.name} className="cover" />
                <div className="body">
                  <div className="kicker">{a.category}</div>
                  <h4 className="title">{a.title}</h4>
                  <div className="meta">
                    <span className="by">by {a.name}</span>
                    <button className="btn-ghost">View</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="footer">
        <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm text-gray-400">
          <div>
            <div className="font-semibold text-white">CTRLART</div>
            <p className="mt-2">Exclusive digital & physical art for your screens and spaces.</p>
          </div>
          <div>
            <div className="text-white font-medium">Explore</div>
            <ul className="mt-2 space-y-2">
              {sections.map(s => (
                <li key={s.id}><a href={`#${s.id}`} onClick={handleNavClick(s.id)} className="hover:text-white">{s.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-white font-medium">Company</div>
            <ul className="mt-2 space-y-2">
              <li>About</li>
              <li>Careers</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <div className="text-white font-medium">Newsletter</div>
            <form className="mt-2 flex gap-2">
              <input type="email" placeholder="Email address" className="input" />
              <button className="btn-primary">Join</button>
            </form>
          </div>
        </div>
        <div className="copy">© {new Date().getFullYear()} CtrlArt. All rights reserved.</div>
      </footer>
    </div>
  );
}

const pricing = [
  {
    label: "Digital Wallpaper",
    price: "$8",
    unit: "design",
    points: ["4K/60fps available", "Mobile & Desktop set", "Color‑matched variants"],
  },
  {
    label: "Physical Poster",
    price: "$19",
    unit: "print",
    points: ["Premium matte", "A2/A3 sizes", "Archival inks"],
  },
];

