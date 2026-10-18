import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, BedDouble, Check, MapPin, Star, Users } from "lucide-react";
import { properties } from "../data/properties";
import InquiryForm from "../components/InquiryForm";
import PropertyCard from "../components/PropertyCard";

export default function PropertyDetail() {
  const { slug } = useParams();
  const property = properties.find(p=>p.slug===slug);
  if (!property) return <main className="not-found"><span className="eyebrow">STAY NOT FOUND</span><h1>Looks like this place has wandered off.</h1><Link to="/properties" className="button button-dark">Back to all stays</Link></main>;
  const gallery = property.images?.length ? property.images : [property.image];
  return <main className="detail-page">
    <div className="detail-top section-pad"><Link to="/properties" className="back-link"><ArrowLeft size={16}/> All stays</Link><span className="eyebrow">{property.type} · {property.region.toUpperCase()}</span><h1>{property.name}</h1><p className="detail-location"><MapPin size={16}/>{property.location} <span>·</span><Star size={15} fill="currentColor"/>{property.rating} <span>·</span> Illustrative demo listing</p></div>
    <section className="detail-gallery section-pad">{gallery.slice(0,3).map((src,i)=><div className={`detail-gallery-item gallery-item-${i}`} key={src+i}><img src={src} alt={`${property.name} view ${i+1}`} onError={(e)=>{e.currentTarget.src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80";}}/></div>)}</section>
    <section className="detail-main section-pad"><div className="detail-copy"><span className="eyebrow">A PLACE TO SETTLE IN</span><h2>A stay with room<br/>for <em>what matters.</em></h2><p className="detail-description">{property.description}</p><div className="detail-stats"><span><Users/>{property.guests} guests</span><span><BedDouble/>{property.beds} bedrooms</span><span><Check/>{property.baths} bathrooms</span></div><div className="amenities-block"><h3>Thoughtful comforts</h3><div className="amenity-list">{property.amenities.map(a=><span key={a}><Check size={15}/>{a}</span>)}</div></div><div className="host-note"><div className="host-avatar">MH</div><div><strong>Need a little more information?</strong><p>Our team can help with dates, details and special requests.</p><Link to="/contact" className="text-link">Ask our team <ArrowUpRight size={15}/></Link></div></div></div>
      <aside className="detail-inquiry"><div className="inquiry-price"><span>Indicative rate from</span><strong>₹{property.price.toLocaleString("en-IN")} <small>/ night</small></strong></div><p>Tell us a little about your plans. Our team will confirm availability and pricing with you.</p><InquiryForm type="booking" property={property} compact/></aside>
    </section>
    <section className="related-section section-pad"><div className="section-heading"><div><span className="eyebrow">KEEP EXPLORING</span><h2>More places to <em>consider.</em></h2></div><Link to="/properties" className="text-link">All stays <ArrowUpRight size={16}/></Link></div><div className="property-grid">{properties.filter(p=>p.id!==property.id).slice(0,3).map((p,i)=><PropertyCard key={p.id} property={p} index={i}/>)}</div></section>
  </main>;
}
