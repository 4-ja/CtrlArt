// File: src/components/home.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import "../styles/index.css";
import { assets } from "../assets/assetMap";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Us" },
  { id: "community", label: "Community" },
  { id: "pricing", label: "Pricing" },
  { id: "testimonials", label: "Reviews" },
  { id: "artists", label: "Top Artists" },
];

export default function Home() {
  const [active, setActive] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const headerRef = useRef(null);
  const refs = useMemo(() => Object.fromEntries(sections.map(s => [s.id, React.createRef()])), []);

  const handleNavClick = (id) => (e) => {
    e.preventDefault();
    const el = refs[id]?.current;
    if (!el) return;
    const headerH = headerRef.current?.offsetHeight || 96;
    const y = el.getBoundingClientRect().top + window.pageYOffset - (headerH + 8);
    window.scrollTo({ top: y, behavior: "smooth" });
    setMobileMenuOpen(false); // Close mobile menu after navigation
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    
    setIsSubmitting(true);
    setNewsletterMessage("");
    
    try {
      // EmailJS Implementation (Active)
      const emailjs = await import('@emailjs/browser');
      await emailjs.send(
        'service_ju560mr', // Your EmailJS service ID
        'template_o3dzzql', // Your EmailJS template ID
        {
          email: newsletterEmail, // This sends to the subscriber's email
          name: 'Newsletter Subscriber', // Subscriber's name
          to_email: newsletterEmail, // Also send to subscriber
          subscriber_email: newsletterEmail, // Subscriber's email
          subscriber_name: 'Newsletter Subscriber' // Subscriber's name
        },
        'UqWY6__clUvmiibUH' // Your EmailJS public key
      );
      
      setNewsletterSuccess(true);
      setNewsletterMessage("Thanks for subscribing! Check your email for confirmation.");
      setNewsletterEmail("");
      
      /* 
      // Option 2: Netlify Forms (Commented out)
      // The form will work automatically if you deploy to Netlify
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'newsletter',
          email: newsletterEmail
        })
      });
      */
      
      /*
      // Option 3: Formspree (Commented out)
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: newsletterEmail,
          _subject: 'New Newsletter Subscription',
          _replyto: newsletterEmail
        })
      });
      */
      
    } catch (error) {
      setNewsletterSuccess(false);
      setNewsletterMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
          
          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span className={`hamburger-line ${mobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
            <span className={`hamburger-line ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`hamburger-line ${mobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
          </button>

          {/* Desktop Navigation */}
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
          
          {/* Desktop CTA */}
          <div className="nav-cta">
            <button className="btn-ghost">Sign In</button>
            <button className="btn-primary">Get Started</button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}>
          <nav className="mobile-nav-links">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={handleNavClick(s.id)}
                className={`mobile-nav-link ${active === s.id ? "active-link" : ""}`}
              >
                {s.label}
              </a>
            ))}
          </nav>
          <div className="mobile-nav-cta">
            <button className="btn-ghost w-full">Sign In</button>
            <button className="btn-primary w-full">Get Started</button>
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
          
          {/* Side Navigation */}
          <div className="hero-side-nav">
            <button className="side-nav-btn" title="Shopping Cart">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
            </button>
            <button className="side-nav-btn" title="Gallery">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
            <button className="side-nav-btn" title="Chat">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
          </div>
          
          <div className="hero-content">
            <div className="hero-text-container">
              <div className="hero-eyebrow">
                <span className="badge">NEW</span>
                <span className="eyebrow-copy">Animated wallpapers · Premium posters</span>
              </div>
              <h1 className="hero-title">
                The <span className="grad">Future</span> of Physical & Digital Art
              </h1>
              <p className="hero-sub">Control the Art. Alt Your Space. Delete the Boring.</p>
              <div className="hero-actions">
                <button className="btn-primary">Get Started</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== About Us ===== */}
      <section id="about" ref={refs.about} className="section">
        <div className="container">
          {/* What We Do Section */}
          <div className="mb-16">
            <h3 className="section-label text-center">WHAT WE DO</h3>
            <p className="about-description text-center mx-auto max-w-3xl">We specialize in exclusive, high‑resolution gaming, anime, and pop‑culture art — from animated wallpapers for your screens to premium posters for your walls.</p>

            <div className="image-gallery mt-8">
              <div className="gallery-container">
                {assets.miniThumbs.map((src, i) => (
                  <img key={i} src={src} alt="featured work" className="gallery-image" />
                ))}
              </div>
            </div>
          </div>

          {/* Professional Design Section */}
          <div className="mb-16">
            <h3 className="section-label text-center">HUGE COLLECTION</h3>
            <h2 className="professional-title text-center">Professional Design</h2>
            
            <div className="professional-cards">
              <div className="professional-card">
                <div className="card-icon">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="card-title">Community Designs</h3>
                <p className="card-description">Open catalog of original designs by community members</p>
                <div className="card-arrow">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              <div className="professional-card">
                <div className="card-icon">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <h3 className="card-title">Pop Media</h3>
                <p className="card-description">Adipiscing elit, sed do eiusmod labore dolore magna aliqua.</p>
                <div className="card-arrow">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              <div className="professional-card">
                <div className="card-icon">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a1 1 0 01-1-1V9a1 1 0 011-1h1a2 2 0 100-4H4a1 1 0 01-1-1V4a1 1 0 011-1h3a1 1 0 011 1v1z" />
                  </svg>
                </div>
                <h3 className="card-title">Create!</h3>
                <p className="card-description">Showcase your creativity! Create your own designs!</p>
                <div className="card-arrow">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* About Us Content */}
          <div className="about-us-grid">
            <div className="about-us-image">
              <img src={assets.aboutUsImage} alt="About Us" className="about-us-img" />
            </div>
            <div className="about-us-content">
              <h3 className="about-us-label">ABOUT US</h3>
              <h2 className="about-us-title">A Complete Screen + Wall transformation</h2>
              <p className="about-us-description">Exclusive High-Quality gaming themed art in both digital and physical formats. Enjoy high quality wall decor and stunning digital wallpapers in one marketplace combined</p>
              <button className="about-us-btn">About us</button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Community Design ===== */}
      <section id="community" ref={refs.community} className="section">
        <div className="container">
          <h3 className="section-label text-center">HUGE GALLARY</h3>
          <h2 className="community-title text-center">Community Design</h2>
          <div className="community-layout">
            <div className="community-left">
              {assets.community.slice(0, 4).map((src, i) => (
                <img key={i} src={src} alt="community art" className="community-image" />
              ))}
            </div>
            <div className="community-center">
              <img src={assets.community[4]} alt="featured community art" className="community-portrait" />
            </div>
            <div className="community-right">
              {assets.community.slice(5, 9).map((src, i) => (
                <img key={i} src={src} alt="community art" className="community-image" />
              ))}
            </div>
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

      {/* ===== Pricing/Review Separator ===== */}
      <section className="separator-section">
        <img src={assets.pricingReviewSeparator} alt="pricing review separator" className="separator-image" />
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
      <section id="artists" ref={refs.artists} className="section relative">
        <div className="artists-bg">
          <img src={assets.banner} alt="artists background" className="artists-bg-img" />
        </div>
        <div className="container relative z-10">
          <h3 className="artists-label text-center">LATEST DESIGNS FROM</h3>
          <h2 className="artists-title text-center">Top Artists</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Void Re-Era", category: "Got the staff... now I'm homeless", title: "June 25, 2023", cover: assets.artistsCovers[0] },
              { name: "LilyPichuu", category: "Miyabi my GOAT", title: "June 20, 2023", cover: assets.artistsCovers[1] },
              { name: "Caroline Forsey", category: "Furina my love <3 <3 <3", title: "June 25, 2023", cover: assets.artistsCovers[2] },
            ].map((a, i) => (
              <article key={i} className="artist">
                <img src={a.cover} alt={a.name} className="cover" />
                <div className="body">
                  <div className="artist-name">{a.name}</div>
                  <div className="artist-description">{a.category}</div>
                  <div className="artist-meta">
                    <span className="date">{a.title}</span>
                    <span className="comments">0 Comments</span>
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
            <form 
              className="mt-2 flex gap-2" 
              onSubmit={handleNewsletterSubmit}
            >
              <input 
                type="email" 
                name="email"
                placeholder="Email address" 
                className="input" 
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn-primary" disabled={isSubmitting}>
                {isSubmitting ? '...' : 'Join'}
              </button>
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

