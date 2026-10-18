import { useState } from "react";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { submitInquiry } from "../lib/api";

export default function InquiryForm({ type = "contact", property, compact = false }) {
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "", email: "", phone: "", subject: property ? `Inquiry about ${property.name}` : "",
    message: "", checkIn: "", checkOut: "", guests: "2", destination: property?.location || "",
    propertyType: "", numberOfUnits: "1", budget: "", preferredContact: "email"
  });
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault(); setBusy(true); setError(""); setResult(null);
    try {
      const payload = {
        ...form, type, propertyId: property?.id || "", propertyName: property?.name || "",
        guests: Number(form.guests) || undefined,
        numberOfUnits: Number(form.numberOfUnits) || undefined,
        message: form.message.trim()
      };
      const data = await submitInquiry(payload);
      setResult(data.inquiry?.reference || "Received");
      setForm({ name: "", email: "", phone: "", subject: "", message: "", checkIn: "", checkOut: "", guests: "2", destination: property?.location || "", propertyType: "", numberOfUnits: "1", budget: "", preferredContact: "email" });
    } catch (err) {
      setError(`${err.message} Make sure the demo API is running on port 5000.`);
    } finally { setBusy(false); }
  }

  if (result) return <div className="form-success"><span className="success-icon"><CheckCircle2 size={25}/></span><span className="eyebrow">MESSAGE RECEIVED</span><h3>Thank you, {form.name || "traveller"}.</h3><p>Your inquiry has been recorded for the Modern Hospitality team.</p><div className="reference-box"><span>YOUR REFERENCE</span><strong>{result}</strong></div><p className="fine-print">This is an inquiry, not a confirmed reservation. Our team will follow up using your preferred contact details.</p><button className="button button-outline" onClick={() => setResult(null)}>Send another inquiry</button></div>;

  return (
    <form className={`inquiry-form ${compact ? "inquiry-form-compact" : ""}`} onSubmit={handleSubmit}>
      {property && <div className="selected-property"><img src={property.image} alt="" onError={(e) => {e.currentTarget.style.display="none";}}/><div><span>YOUR SELECTED STAY</span><strong>{property.name}</strong><small>{property.location}</small></div></div>}
      <div className="form-grid">
        <label>Full name<input name="name" value={form.name} onChange={change} placeholder="Your name" required maxLength={120}/></label>
        <label>Email address<input type="email" name="email" value={form.email} onChange={change} placeholder="you@example.com" required maxLength={180}/></label>
        <label>Phone number <span className="optional">(optional)</span><input name="phone" value={form.phone} onChange={change} placeholder="+91 98765 43210"/></label>
        <label>Preferred contact<select name="preferredContact" value={form.preferredContact} onChange={change}><option value="email">Email</option><option value="phone">Phone</option><option value="whatsapp">WhatsApp</option></select></label>
        {type === "booking" && <>
          <label>Check-in<input type="date" name="checkIn" value={form.checkIn} onChange={change} min={new Date().toISOString().slice(0,10)} required/></label>
          <label>Check-out<input type="date" name="checkOut" value={form.checkOut} onChange={change} min={form.checkIn || new Date().toISOString().slice(0,10)} required/></label>
          <label>Guests<select name="guests" value={form.guests} onChange={change}>{[1,2,3,4,5,6,7,8,9,10].map(n=><option key={n} value={n}>{n} {n===1?"guest":"guests"}</option>)}</select></label>
          <label>Destination<input name="destination" value={form.destination} onChange={change} placeholder="Where would you like to go?"/></label>
        </>}
        {type === "partnership" && <>
          <label>Property type<select name="propertyType" value={form.propertyType} onChange={change} required><option value="">Choose property type</option><option>Villa</option><option>Apartment</option><option>Private room</option><option>Homestay</option><option>Hotel / resort</option><option>Cabin / cottage</option><option>Other</option></select></label>
          <label>Number of units<input type="number" min="1" max="500" name="numberOfUnits" value={form.numberOfUnits} onChange={change} required/></label>
          <label>City / destination<input name="destination" value={form.destination} onChange={change} placeholder="City, state" required/></label>
          <label>Indicative nightly price<input name="budget" value={form.budget} onChange={change} placeholder="e.g. ₹5,000–₹8,000"/></label>
        </>}
        <label className="full-field">Subject<input name="subject" value={form.subject} onChange={change} placeholder={type === "partnership" ? "Tell us about your property" : "How can we help?"}/></label>
        <label className="full-field">Message<textarea name="message" value={form.message} onChange={change} rows="5" placeholder={type === "partnership" ? "Share a little about your property, location and what you are looking for..." : "Tell us a little more about your plans..."} required minLength={8} maxLength={4000}/><span className="field-hint">Please include any details that will help our team assist you.</span></label>
      </div>
      {error && <div className="form-error" role="alert">{error}</div>}
      <label className="consent-row"><input type="checkbox" required/><span>I agree that Modern Hospitality may contact me about this inquiry.</span></label>
      <button className="button button-dark button-wide" type="submit" disabled={busy}>{busy ? <><LoaderCircle className="spin" size={17}/> Sending...</> : <>Send inquiry <ArrowRight size={17}/></>}</button>
      <p className="fine-print">Your details are used to respond to this inquiry. Submitting this form does not confirm a reservation or property partnership.</p>
    </form>
  );
}
