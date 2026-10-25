import { useEffect, useRef, useState } from "react";
import NavBar from "../components/Navbar";
import { useTheme } from "../theme";
import Pond from "./pondEngine";
import PondLoader from "./PondLoader";
import { preloadImage, isReady } from "./pondPreload";
import "./Explorations.css";
import { Move } from "lucide-react";
import { galleryItems } from "./galleryItems";

const srcs = galleryItems.map((g) => g.src);
const allReady = () => srcs.every(isReady);
const MIN_SHOW = 1200; // ms the loader stays up on the first visit

// Resets on page refresh / new open; survives navigating between pages.
let loaderShown = false;

function Explorations() {
  const night = useTheme() === "dark";
  const nightRef = useRef(night);
  useEffect(() => { nightRef.current = night; }, [night]);
  const wrap = useRef(null), canvas = useRef(null), glCanvas = useRef(null), layer = useRef(null), pond = useRef(null);

  const [firstVisit] = useState(() => !loaderShown);
  const [done, setDone] = useState(() => !firstVisit && allReady());
  const [loaded, setLoaded] = useState(0);
  const [visible, setVisible] = useState(firstVisit);

  useEffect(() => {
    if (done) return;
    let live = true;
    const start = performance.now();
    const grace = !firstVisit && setTimeout(() => live && setVisible(true), 300);
    const cap = setTimeout(() => live && setDone(true), 8000);

    let real = 0;
    const tick = () => {
      if (!live) return;
      const timeP = Math.min(1, (performance.now() - start) / MIN_SHOW);
      const shown = Math.round(Math.min(real, firstVisit ? timeP * srcs.length : real));
      setLoaded(shown);
      if (shown >= srcs.length) { setDone(true); return; }
      requestAnimationFrame(tick);
    };
    srcs.forEach((s) => preloadImage(s).then(() => { real++; }));
    requestAnimationFrame(tick);

    return () => { live = false; clearTimeout(grace); clearTimeout(cap); };
  }, []);

  useEffect(() => { if (done) loaderShown = true; }, [done]);

  useEffect(() => {
    document.title = "Winnie's Explorations";
    // wait two frames so the loader paints before the heavy pond setup runs
    let id = requestAnimationFrame(() => {
      id = requestAnimationFrame(() => {
        pond.current = new Pond({
          wrap: wrap.current, canvas: canvas.current, glCanvas: glCanvas.current, layer: layer.current,
          items: galleryItems, getNight: () => nightRef.current,
        });
      });
    });
    return () => { cancelAnimationFrame(id); pond.current && pond.current.destroy(); };
  }, []);

  return (
    <div className="explorations-page">
      <NavBar />
      {visible && <PondLoader loaded={loaded} total={srcs.length} done={done} />}
      <div className="pond" ref={wrap}>
        <canvas className="pond-canvas" ref={canvas} />
        <canvas className="pond-canvas pond-gl" ref={glCanvas} />
        <div className="pond-layer" ref={layer} style={{ visibility: done ? "visible" : "hidden" }}>
          <div className="pond-intro">
            <h2><em>Letting my creativity flow freely across the surface</em></h2>
            <p><Move height={"20px"} /> Drag to move</p>
          </div>
          {galleryItems.map((item, i) => (
            <div key={item.id} className="pond-card" data-card={i}>
              <div className="pond-card-inner">
                <img src={item.src} alt={item.alt ?? item.title} draggable="false" />
                <span>{item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button className="reset-btn" onClick={() => pond.current && pond.current.reset()}>
        Reset View
      </button>
    </div>
  );
}

export default Explorations;