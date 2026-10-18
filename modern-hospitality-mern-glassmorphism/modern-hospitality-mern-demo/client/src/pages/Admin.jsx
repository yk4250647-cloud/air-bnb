import { useEffect, useMemo, useState } from "react";
import { ArrowDownLeft, ArrowUpRight, ClipboardList, Mail, RefreshCw, Search, ShieldCheck, SlidersHorizontal, Users } from "lucide-react";
import { getInquiries, updateInquiry } from "../lib/api";

const statusLabel = { "new": "New", "in-progress": "In progress", "resolved": "Resolved", "closed": "Closed" };
const typeLabel = { booking: "Booking inquiry", contact: "General contact", partnership: "Property partnership" };

export default function Admin() {
  const [rows,setRows] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState("");
  const [filter,setFilter] = useState("all");
  const [query,setQuery] = useState("");
  const [selected,setSelected] = useState(null);
  const [notes,setNotes] = useState("");
  const [saving,setSaving] = useState(false);

  async function load() {
    setLoading(true); setError("");
    try { setRows(await getInquiries()); } catch(e) { setError(e.message); }
    finally { setLoading(false); }
  }
  useEffect(()=>{load();},[]);
  const filtered = useMemo(()=>rows.filter(r=>(filter==="all"||r.type===filter||r.status===filter)&&`${r.name} ${r.email} ${r.reference} ${r.propertyName||""}`.toLowerCase().includes(query.toLowerCase())),[rows,filter,query]);
  const stats = [
    { label:"All inquiries", value:rows.length, icon:ClipboardList },
    { label:"New", value:rows.filter(r=>r.status==="new").length, icon:Mail },
    { label:"Booking requests", value:rows.filter(r=>r.type==="booking").length, icon:Users },
    { label:"Partnerships", value:rows.filter(r=>r.type==="partnership").length, icon:ShieldCheck }
  ];
  async function save() {
    if (!selected) return;
    setSaving(true);
    try {
      const updated = await updateInquiry(selected._id || selected.reference, { status:selected.status, internalNotes:notes });
      setRows(prev=>prev.map(r=>(r._id||r.reference)===(updated._id||updated.reference)?updated:r));
      setSelected(updated); setNotes(updated.internalNotes||"");
    } catch(e) { setError(e.message); }
    finally { setSaving(false); }
  }

  return <main className="admin-page">
    <aside className="admin-sidebar"><div className="admin-brand"><span className="brand-mark"><ShieldCheck size={18}/></span><div><strong>Modern Hospitality</strong><small>DEMO OPERATIONS</small></div></div><span className="admin-nav-label">WORKSPACE</span><button className="admin-nav-item active"><ClipboardList size={17}/> Inquiries <span>{rows.length}</span></button><div className="admin-sidebar-bottom"><span className="demo-pill">DEMO MODE</span><p>Local demonstration dashboard. Not production secured.</p></div></aside>
    <section className="admin-main"><div className="admin-topbar"><div><span className="eyebrow">OPERATIONS / INBOX</span><h1>Inquiry <em>overview.</em></h1></div><button className="button button-outline" onClick={load}><RefreshCw size={15}/> Refresh</button></div>
      <div className="admin-welcome"><div><span className="eyebrow eyebrow-light">YOUR TEAM INBOX</span><h2>Every good stay starts<br/>with a <em>conversation.</em></h2><p>Review incoming booking requests, contact messages and property partnership inquiries.</p></div><div className="admin-welcome-icon"><ArrowDownLeft size={42}/></div></div>
      <div className="admin-stats">{stats.map(s=><div className="admin-stat" key={s.label}><span className="admin-stat-icon"><s.icon size={17}/></span><span>{s.label}</span><strong>{s.value}</strong></div>)}</div>
      {error&&<div className="form-error admin-error">{error}<button onClick={()=>setError("")}>Dismiss</button></div>}
      <div className="admin-table-card"><div className="admin-table-heading"><div><h2>Incoming inquiries</h2><p>Private messages submitted through the demo website.</p></div><span className="demo-pill">ILLUSTRATIVE ADMIN UI</span></div>
        <div className="admin-filters"><div className="admin-search"><Search size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search name, email or reference"/></div><div className="admin-filter"><SlidersHorizontal size={15}/><select value={filter} onChange={e=>setFilter(e.target.value)}><option value="all">All inquiries</option><option value="booking">Booking requests</option><option value="contact">General contacts</option><option value="partnership">Partnerships</option><option value="new">New</option><option value="in-progress">In progress</option><option value="resolved">Resolved</option><option value="closed">Closed</option></select></div></div>
        {loading?<div className="admin-empty">Loading inquiries…</div>:filtered.length?<div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>INQUIRY</th><th>TYPE</th><th>RECEIVED</th><th>STATUS</th><th></th></tr></thead><tbody>{filtered.map(row=><tr key={row._id||row.reference}><td><button className="admin-person" onClick={()=>{setSelected(row);setNotes(row.internalNotes||"");}}><span className="person-avatar">{(row.name||"?").split(" ").map(x=>x[0]).slice(0,2).join("").toUpperCase()}</span><span><strong>{row.name}</strong><small>{row.email}</small><small>{row.reference}</small></span></button></td><td><span className={`type-chip type-${row.type}`}>{typeLabel[row.type]||row.type}</span>{row.propertyName&&<small className="table-property">{row.propertyName}</small>}</td><td>{new Date(row.createdAt).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})}</td><td><span className={`status-chip status-${row.status}`}>{statusLabel[row.status]||row.status}</span></td><td><button className="table-open" onClick={()=>{setSelected(row);setNotes(row.internalNotes||"");}}>Open <ArrowUpRight size={14}/></button></td></tr>)}</tbody></table></div>:<div className="admin-empty"><ClipboardList size={30}/><h3>No inquiries to show</h3><p>Submit a contact, booking or property partnership form on the public site, then refresh this dashboard.</p></div>}
      </div>
      <p className="admin-footnote">Demo only · No reservation is confirmed by inquiry submission · Secure admin authentication is required before production use.</p>
    </section>
    {selected&&<div className="drawer-backdrop" onClick={()=>setSelected(null)}><aside className="inquiry-drawer" onClick={e=>e.stopPropagation()}><div className="drawer-head"><div><span className="eyebrow">INQUIRY DETAILS</span><h2>{selected.reference}</h2></div><button className="drawer-close" onClick={()=>setSelected(null)}>×</button></div><div className="drawer-person"><span className="person-avatar person-avatar-large">{(selected.name||"?").split(" ").map(x=>x[0]).slice(0,2).join("").toUpperCase()}</span><div><h3>{selected.name}</h3><p>{selected.email}</p><p>{selected.phone||"No phone provided"}</p></div></div><div className="drawer-field"><span>INQUIRY TYPE</span><strong>{typeLabel[selected.type]||selected.type}</strong></div>{selected.propertyName&&<div className="drawer-field"><span>PROPERTY</span><strong>{selected.propertyName}</strong></div>}{selected.checkIn&&<div className="drawer-field"><span>PREFERRED DATES</span><strong>{selected.checkIn} → {selected.checkOut}</strong><small>{selected.guests} guests</small></div>}<div className="drawer-field"><span>MESSAGE</span><p>{selected.message}</p></div><label className="drawer-label">Update status<select value={selected.status} onChange={e=>setSelected({...selected,status:e.target.value})}><option value="new">New</option><option value="in-progress">In progress</option><option value="resolved">Resolved</option><option value="closed">Closed</option></select></label><label className="drawer-label">Internal notes<textarea rows="4" value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Add a private note for your team…"/></label><button className="button button-dark button-wide" disabled={saving} onClick={save}>{saving?"Saving…":"Save changes"} <ArrowUpRight size={15}/></button><p className="fine-print">Internal notes are intended for admin use only.</p></aside></div>}
  </main>;
}
