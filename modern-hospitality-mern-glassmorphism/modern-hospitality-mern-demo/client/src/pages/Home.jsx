import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Compass, Leaf, ShieldCheck, Sparkles, MapPin, CalendarDays, Users } from "lucide-react";
import PropertyCard from "../components/PropertyCard";
import { properties } from "../data/properties";

const moods = [
  { title: "Closer to nature", sub: "Cabins, forests & fresh air", image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=900&q=85", to: "/properties?region=Mountains", n: "01" },
  { title: "The coastal pause", sub: "Salt air & slower days", image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=900&q=85", to: "/properties?region=Beach", n: "02" },
  { title: "A little city soul", sub: "Culture, food & discovery", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85", to: "/properties?region=City", n: "03" }
];

export default function Home() {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2 guests");
  const searchStays = (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (destination.trim()) params.set("destination", destination.trim());
    navigate(`/properties${params.toString() ? `?${params.toString()}` : ""}`);
  };
  return <main>
    <section className="hero">
      <div className="hero-image" />
      <div className="hero-shade" />
      <div className="hero-content">
        <span className="eyebrow eyebrow-light"><span className="eyebrow-dot"/> A MORE PERSONAL WAY TO TRAVEL</span>
        <h1>Stay somewhere<br/> <em>extraordinary.</em></h1>
        <p>Considered homes, quieter corners and meaningful stays — chosen for the way you want to feel.</p>
        <div className="hero-actions"><Link to="/properties" className="button button-light">Explore our stays <ArrowUpRight size={17}/></Link><Link to="/about" className="hero-text-link">Discover our approach <ArrowRight size={16}/></Link></div>
        <div className="hero-bottom-note"><span>01 — 06</span><span className="hero-line"/><span>PLACES WITH A POINT OF VIEW</span></div>
      </div>
      <div className="hero-side-label">CURATED STAYS · INDIA</div>
      <form className="hero-search-glass" onSubmit={searchStays} aria-label="Find a stay">
        <label className="hero-search-field hero-destination"><span><MapPin size={16}/> DESTINATION</span><input value={destination} onChange={(e)=>setDestination(e.target.value)} placeholder="Where would you like to go?" aria-label="Destination" /></label>
        <label className="hero-search-field"><span><CalendarDays size={16}/> CHECK IN</span><input type="date" value={checkIn} min={new Date().toISOString().slice(0,10)} onChange={(e)=>setCheckIn(e.target.value)} aria-label="Check-in date" /></label>
        <label className="hero-search-field"><span><CalendarDays size={16}/> CHECK OUT</span><input type="date" value={checkOut} min={checkIn || new Date().toISOString().slice(0,10)} onChange={(e)=>setCheckOut(e.target.value)} aria-label="Check-out date" /></label>
        <label className="hero-search-field hero-guests"><span><Users size={16}/> GUESTS</span><select value={guests} onChange={(e)=>setGuests(e.target.value)} aria-label="Number of guests"><option>1 guest</option><option>2 guests</option><option>3 guests</option><option>4 guests</option><option>5 guests</option><option>6+ guests</option></select></label>
        <button className="hero-search-submit" type="submit"><ArrowUpRight size={20}/><span>Find a stay</span></button>
      </form>
      <a className="scroll-cue" href="#discover"><ArrowDown size={15}/> SCROLL TO DISCOVER</a>
    </section>

    <section className="intro-section section-pad" id="discover">
      <div className="intro-kicker"><span className="eyebrow">A DIFFERENT KIND OF GETAWAY</span><span className="small-rule"/></div>
      <div className="intro-layout"><h2>Not just a place<br/>to stay. <em>A place<br/>to come back to.</em></h2><div className="intro-copy"><p>We believe the right place changes how a journey feels. From tucked-away cabins to thoughtfully designed homes, Modern Hospitality brings together stays with character, comfort and a sense of belonging.</p><Link to="/about" className="text-link">A little about us <ArrowUpRight size={16}/></Link></div></div>
    </section>

    <section className="mood-section section-pad">
      <div className="section-heading"><div><span className="eyebrow">FOLLOW A FEELING</span><h2>What does your escape <em>look like?</em></h2></div><Link className="text-link" to="/destinations">Explore all destinations <ArrowUpRight size={16}/></Link></div>
      <div className="mood-grid">{moods.map((m) => <Link to={m.to} className="mood-card" key={m.n}><img src={m.image} alt={m.title} loading="lazy" onError={(e)=>{e.currentTarget.style.background="#d8ddd4";}}/><span className="mood-number">{m.n}</span><div className="mood-caption"><div><h3>{m.title}</h3><p>{m.sub}</p></div><span className="circle-arrow"><ArrowUpRight size={18}/></span></div></Link>)}</div>
    </section>

    <section className="featured-section section-pad">
      <div className="section-heading"><div><span className="eyebrow">PLACES WE LOVE</span><h2>Stays with <em>a story.</em></h2><p className="section-subtitle">A few places to start imagining your next escape.</p></div><Link className="button button-outline" to="/properties">View all stays <ArrowRight size={16}/></Link></div>
      <div className="property-grid">{properties.filter(p=>p.featured).slice(0,3).map((p,i)=><PropertyCard key={p.id} property={p} index={i}/>)}</div>
    </section>

    <section className="manifesto-section">
      <div className="manifesto-image"/>
      <div className="manifesto-shade"/>
      <div className="manifesto-content"><span className="eyebrow eyebrow-light">THE MODERN HOSPITALITY DIFFERENCE</span><h2>Good hospitality<br/>is felt in <em>the details.</em></h2><p>Clear communication, thoughtful recommendations and a real person to help bring your plans together. That's where a good stay begins.</p><Link to="/contact" className="button button-light">Talk to our team <ArrowUpRight size={17}/></Link></div>
      <div className="manifesto-points"><div><Compass/><span>Considered places</span></div><div><ShieldCheck/><span>Personal assistance</span></div><div><Leaf/><span>Room to slow down</span></div></div>
    </section>

    <section className="steps-section section-pad">
      <div className="section-heading"><div><span className="eyebrow">SIMPLE BY DESIGN</span><h2>Your next stay, <em>made personal.</em></h2></div><p className="section-subtitle steps-side">No guesswork, no complicated process.<br/>Just a conversation with our team.</p></div>
      <div className="steps-grid"><div className="step"><span>01</span><Sparkles/><h3>Find your feeling</h3><p>Explore stays that fit your plans, pace and idea of a good getaway.</p></div><div className="step"><span>02</span><Compass/><h3>Tell us what you need</h3><p>Share your dates, group size and the little details that matter.</p></div><div className="step"><span>03</span><ArrowRight/><h3>We'll take it from here</h3><p>Our team will get in touch to discuss availability and next steps.</p></div></div>
    </section>

    <section className="host-banner section-pad"><div><span className="eyebrow">FOR PROPERTY OWNERS</span><h2>A good place deserves<br/>to be <em>discovered.</em></h2><p>Have a considered space to share? Let's explore what a partnership could look like.</p><Link to="/list-your-property" className="button button-dark">Partner with us <ArrowUpRight size={16}/></Link></div><div className="host-banner-image"><img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85" alt="Thoughtfully designed modern home" loading="lazy"/></div></section>

    <section className="closing-cta"><span className="eyebrow eyebrow-light">THE GOOD PART STARTS HERE</span><h2>Somewhere new.<br/><em>Something memorable.</em></h2><Link to="/properties" className="button button-light">Find your stay <ArrowUpRight size={17}/></Link></section>
  </main>;
}
