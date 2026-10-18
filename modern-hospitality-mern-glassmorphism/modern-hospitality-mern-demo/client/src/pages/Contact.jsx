import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, MessageCircle, Phone, Clock3, ChevronDown } from "lucide-react";
import { useState } from "react";
import InquiryForm from "../components/InquiryForm";

const faqs = [
  ["Does sending an inquiry confirm my stay?", "Not yet. Our team will contact you to discuss availability, final pricing and the next steps. Your stay is confirmed only after arrangements are agreed directly with our team."],
  ["How quickly will someone get back to me?", "Response times depend on the volume and nature of inquiries. Share your preferred contact method and we'll use it to follow up."],
  ["Can I ask about a specific property?", "Absolutely. Open a property page and use its inquiry form, or mention the property name in the message on this page."],
  ["I own a property. Is this the right place to contact you?", "Yes. You can submit a partnership inquiry here or use our dedicated List Your Property page to tell us more about your space."]
];

export default function Contact() {
  const [openFaq,setOpenFaq] = useState(0);
  return <main className="inner-page contact-page">
    <section className="contact-hero section-pad"><div className="contact-hero-copy"><span className="eyebrow"><span className="eyebrow-dot"/> A REAL PERSON, WHEN YOU NEED ONE</span><h1>Let's make your<br/>next stay <em>happen.</em></h1><p>Planning a getaway, curious about a property or looking to work together? Tell us what you're thinking. We'd love to help.</p><div className="contact-hero-links"><a href="mailto:hello@modernhospitality.example"><Mail size={16}/> hello@modernhospitality.example</a><span><Clock3 size={16}/> Monday – Saturday · 9 AM – 6 PM</span></div></div><div className="contact-hero-image"><img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85" alt="Warm, thoughtfully designed vacation home"/></div></section>
    <section className="contact-body section-pad"><div className="contact-form-column"><div className="section-heading section-heading-left"><div><span className="eyebrow">START A CONVERSATION</span><h2>How can we <em>help?</em></h2><p className="section-subtitle">Share a few details and our team will take it from there.</p></div></div><InquiryForm type="contact"/></div>
      <aside className="contact-aside"><div className="contact-aside-card"><span className="eyebrow">GET IN TOUCH</span><h3>Every good journey<br/>starts with a conversation.</h3><div className="contact-method"><span className="contact-method-icon"><Mail/></span><div><small>GENERAL ENQUIRIES</small><a href="mailto:hello@modernhospitality.example">hello@modernhospitality.example</a></div></div><div className="contact-method"><span className="contact-method-icon"><Phone/></span><div><small>PHONE</small><p>Contact details to be confirmed</p></div></div><div className="contact-method"><span className="contact-method-icon"><MessageCircle/></span><div><small>PROPERTY PARTNERSHIPS</small><Link to="/list-your-property">Tell us about your property <ArrowUpRight size={14}/></Link></div></div><div className="contact-note"><span className="eyebrow">A SMALL NOTE</span><p>Modern Hospitality is currently presenting a demo experience. Property details and contact channels will be finalized before launch.</p></div></div><div className="contact-aside-image"><img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85" alt="Calm interior detail" loading="lazy"/></div></aside>
    </section>
    <section className="faq-section section-pad"><div><span className="eyebrow">A FEW QUICK ANSWERS</span><h2>Before you <em>reach out.</em></h2><p className="section-subtitle">A little clarity goes a long way.</p></div><div className="faq-list">{faqs.map(([q,a],i)=><div className={`faq-item ${openFaq===i?"faq-open":""}`} key={q}><button onClick={()=>setOpenFaq(openFaq===i?-1:i)} aria-expanded={openFaq===i}><span>{q}</span><ChevronDown size={18}/></button>{openFaq===i&&<p>{a}</p>}</div>)}</div></section>
  </main>;
}
