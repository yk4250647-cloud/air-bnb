import { useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search, SlidersHorizontal, MapPin, ArrowUpRight } from "lucide-react";
import PropertyCard from "../components/PropertyCard";
import { properties } from "../data/properties";
import { PageIntro } from "../components/Layout";

export default function Properties() {
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get("destination") || "");
  const [region, setRegion] = useState(params.get("region") || "All stays");
  const [sort, setSort] = useState("recommended");
  const [maxPrice, setMaxPrice] = useState("20000");
  const filtered = useMemo(() => {
    let result = properties.filter(p => (region === "All stays" || p.region.toLowerCase() === region.toLowerCase()) &&
      (`${p.name} ${p.location} ${p.region} ${p.type}`).toLowerCase().includes(query.toLowerCase()) &&
      p.price <= Number(maxPrice));
    if (sort === "price-low") result.sort((a,b)=>a.price-b.price);
    if (sort === "price-high") result.sort((a,b)=>b.price-a.price);
    if (sort === "rating") result.sort((a,b)=>Number(b.rating)-Number(a.rating));
    return result;
  }, [query, region, sort, maxPrice]);

  return <main className="inner-page">
    <PageIntro eyebrow="THE STAY COLLECTION" title={<>Find a place that<br/><em>feels like yours.</em></>} text="A considered collection of homes, hideaways and places to pause."/>
    <section className="listing-controls section-pad">
      <div className="search-control"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search a place, region or stay"/></div>
      <div className="filter-control"><SlidersHorizontal size={17}/><select value={region} onChange={e=>setRegion(e.target.value)}><option>All stays</option><option>Mountains</option><option>Beach</option><option>City</option></select></div>
      <div className="filter-control"><span>Up to ₹</span><select value={maxPrice} onChange={e=>setMaxPrice(e.target.value)}><option value="5000">5,000 / night</option><option value="8000">8,000 / night</option><option value="12000">12,000 / night</option><option value="20000">20,000 / night</option></select></div>
      <div className="filter-control"><select value={sort} onChange={e=>setSort(e.target.value)} aria-label="Sort properties"><option value="recommended">Recommended</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="rating">Top rated</option></select></div>
    </section>
    <section className="properties-results section-pad"><div className="results-top"><p><strong>{filtered.length}</strong> considered stays <span>· Illustrative demo listings</span></p><span className="results-note"><MapPin size={14}/> Across India</span></div>
      {filtered.length ? <div className="property-grid property-grid-four">{filtered.map((p,i)=><PropertyCard key={p.id} property={p} index={i}/>)}</div> : <div className="empty-state"><Search size={28}/><h3>No stays found just yet</h3><p>Try a different destination or widen your price range.</p><button className="button button-outline" onClick={()=>{setQuery("");setRegion("All stays");setMaxPrice("20000");}}>Clear filters</button></div>}
    </section>
    <section className="listings-help"><p>Found a place you love, or need a little help choosing?</p><Link to="/contact" className="text-link">Talk to our team <ArrowUpRight size={16}/></Link></section>
  </main>;
}
