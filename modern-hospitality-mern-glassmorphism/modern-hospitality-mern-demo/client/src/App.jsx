import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Header, Footer } from "./components/Layout";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import Contact from "./pages/Contact";
import Host from "./pages/Host";
import About from "./pages/About";
import Admin from "./pages/Admin";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [pathname]);
  return null;
}

function Destinations() {
  return <main className="inner-page destination-page"><section className="destination-hero section-pad"><span className="eyebrow">A COUNTRY OF MANY MOODS</span><h1>Find your kind<br/>of <em>somewhere.</em></h1><p>From mountain air to salt-soaked afternoons, discover the feeling you're travelling for.</p></section><section className="destination-tiles section-pad">{[["Mountains","The quiet of higher places","https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1000&q=85"],["Beach","A slower rhythm by the sea","https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1000&q=85"],["City","Culture around every corner","https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85"]].map(([region,sub,image],i)=><a href={`/properties?region=${region}`} className="destination-tile" key={region}><img src={image} alt={region}/><span>0{i+1}</span><div><h2>{region}</h2><p>{sub}</p></div><ArrowUpRightMark/></a>)}</section></main>;
}
function ArrowUpRightMark(){return <span className="circle-arrow">↗</span>;}

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  return <><ScrollToTop/>{!isAdmin&&<Header/>}<Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/properties" element={<Properties/>}/>
    <Route path="/properties/:slug" element={<PropertyDetail/>}/>
    <Route path="/destinations" element={<Destinations/>}/>
    <Route path="/contact" element={<Contact/>}/>
    <Route path="/booking-inquiry" element={<Contact/>}/>
    <Route path="/list-your-property" element={<Host/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/admin" element={<Admin/>}/>
    <Route path="*" element={<main className="not-found"><span className="eyebrow">404 · NOT FOUND</span><h1>This page took a different turn.</h1><a className="button button-dark" href="/">Back home</a></main>}/>
  </Routes>{!isAdmin&&<Footer/>}</>;
}
