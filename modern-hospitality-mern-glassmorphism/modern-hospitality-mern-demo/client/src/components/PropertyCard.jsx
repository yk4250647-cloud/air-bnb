import { Link } from "react-router-dom";
import { ArrowUpRight, Heart, Star, Users, BedDouble } from "lucide-react";
import { useState } from "react";

export default function PropertyCard({ property, index = 0 }) {
  const [saved, setSaved] = useState(false);
  return (
    <article className="property-card" style={{ "--delay": `${index * 70}ms` }}>
      <div className="property-photo-wrap">
        <Link to={`/properties/${property.slug}`} className="property-photo-link" aria-label={`View ${property.name}`}>
          <img className="property-photo" src={property.image} alt={property.name} loading={index > 2 ? "lazy" : "eager"} onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"; }} />
        </Link>
        {property.tag && <span className="photo-tag">{property.tag}</span>}
        <button className={`save-button ${saved ? "is-saved" : ""}`} onClick={() => setSaved(!saved)} aria-label={saved ? "Remove from saved" : "Save property"}><Heart size={17} fill={saved ? "currentColor" : "none"} /></button>
      </div>
      <div className="property-card-body">
        <div className="property-title-row"><div><span className="property-type">{property.type}</span><h3><Link to={`/properties/${property.slug}`}>{property.name}</Link></h3><p className="property-location">{property.location}</p></div><span className="property-rating"><Star size={13} fill="currentColor" /> {property.rating}</span></div>
        <div className="property-meta"><span><Users size={14}/> {property.guests} guests</span><span><BedDouble size={14}/> {property.beds} beds</span></div>
        <div className="property-card-bottom"><p><strong>₹{property.price.toLocaleString("en-IN")}</strong> <span>/ night</span></p><Link to={`/properties/${property.slug}`} className="text-link">Explore stay <ArrowUpRight size={15}/></Link></div>
      </div>
    </article>
  );
}
