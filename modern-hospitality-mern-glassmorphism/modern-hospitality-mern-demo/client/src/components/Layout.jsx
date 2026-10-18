import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { ArrowUpRight, Menu, X, MoonStar } from "lucide-react";

export function Header() {
  const [open, setOpen] = useState(false);
  const nav = [
    ["Stays", "/properties"],
    ["Destinations", "/destinations"],
    ["Our story", "/about"]
  ];
  return (
    <header className="site-header">
      <div className="nav-shell">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark"><MoonStar size={18} strokeWidth={1.7} /></span>
          <span>modern<span className="brand-light">hospitality</span><small>STAYS, THOUGHTFULLY CURATED</small></span>
        </Link>
        <nav className={`desktop-nav ${open ? "nav-open" : ""}`}>
          {nav.map(([label, to]) => <NavLink key={to} to={to} onClick={() => setOpen(false)}>{label}</NavLink>)}
          <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
          <Link to="/list-your-property" className="host-link" onClick={() => setOpen(false)}>List your property <ArrowUpRight size={15} /></Link>
        </nav>
        <div className="nav-actions">
          <Link className="nav-cta" to="/contact">Plan your stay <ArrowUpRight size={15} /></Link>
          <button className="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link to="/" className="brand brand-footer"><span className="brand-mark"><MoonStar size={18} /></span><span>modern<span className="brand-light">hospitality</span></span></Link>
          <p>Considered stays for the places you want to remember.</p>
        </div>
        <div><span className="footer-label">EXPLORE</span><Link to="/properties">All stays</Link><Link to="/destinations">Destinations</Link><Link to="/about">Our story</Link></div>
        <div><span className="footer-label">CONNECT</span><Link to="/contact">Contact our team</Link><Link to="/booking-inquiry">Booking inquiry</Link><Link to="/list-your-property">List your property</Link></div>
        <div className="footer-note"><span className="footer-label">A MORE PERSONAL WAY TO TRAVEL</span><p>Have a question or a place to share? We'd love to hear from you.</p><Link className="footer-arrow" to="/contact">Start a conversation <ArrowUpRight size={16}/></Link></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Modern Hospitality</span><span>Demo experience · Illustrative listings</span><Link to="/admin">Admin demo ↗</Link></div>
    </footer>
  );
}

export function PageIntro({ eyebrow, title, text, dark = false }) {
  return <div className={`page-intro ${dark ? "page-intro-dark" : ""}`}><span className="eyebrow">{eyebrow}</span><h1>{title}</h1>{text && <p>{text}</p>}</div>;
}
