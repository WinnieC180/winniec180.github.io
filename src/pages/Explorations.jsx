import { useState, useRef, useEffect } from "react";
import { motion as Motion } from "framer-motion";
import NavBar from "../components/Navbar";
import "./Explorations.css";
import { Move } from "lucide-react";

import gal1 from "../gallery/gallery_1.png";
import gal2 from "../gallery/gallery_2.png";
import gal3 from "../gallery/gallery_3.jpg";
import gal4 from "../gallery/gallery_4.jpg";
import gal5 from "../gallery/gallery_5.png";
import gal6 from "../gallery/gallery_6.jpg";
import gal7 from "../gallery/gallery_7.jpg";
import gal8 from "../gallery/gallery_8.jpg";
import gal9 from "../gallery/gallery_9.jpg";
import gal10 from "../gallery/gallery_10.jpg";
import gal11 from "../gallery/gallery_11.jpg";
import gal12 from "../gallery/gallery_12.jpg";
import gal13 from "../gallery/gallery_13.jpg";
import gal14 from "../gallery/gallery_14.jpg";
import gal15 from "../gallery/gallery_15.jpg";
import gal16 from "../gallery/gallery_16.jpg";
import gal17 from "../gallery/gallery_17.jpg";
import gal18 from "../gallery/gallery_18.jpg";
import gal19 from "../gallery/gallery_19.jpg";
import gal20 from "../gallery/gallery_20.jpg";

const galleryItems = [
  { id: 1, src: gal1, x: -300, y: -300, title: "My original characters 🐋" },
  { id: 2, src: gal2, x: 460, y: -200, title: "The biggest star ✨" },
  { id: 3, src: gal3, x: -730, y: -180, title: "Halloween 🎃 2025" },
  { id: 4, src: gal4, x: 820, y: 370, title: "Snorlax crochet | Brother's Bday" },
  { id: 5, src: gal5, x: -350, y: 100, title: "Spell 🔮| Drawing with markers" },
  { id: 6, src: gal6, x: 550, y: 750, title: "Blue flowers 🎐🩵 | Crochet" },
  { id: 7, src: gal7, x: 10, y: 300, title: <><em>Yoshi</em>™ | Original pattern</>, alt: "Yoshi™ | Original pattern" },
  { id: 8, src: gal8, x: 820, y: -380, title: "Tomato Hero! 🍅" },
  { id: 9, src: gal9, x: 400, y: 220, title: "Lavendar🪻 | Original pattern" },
  { id: 10, src: gal10, x: -750, y: 350, title: "Pure vanilla cookie 🍪 | Clay" },
  { id: 11, src: gal11, x: 100, y: -330, title: "Go Big Red! 🐻" },
  { id: 12, src: gal12, x: -600, y: -600, title: "The first cake I baked~ 🍰" },
  { id: 13, src: gal13, x: -350, y: 550, title: "Ice cream 🍦!!!" },
  { id: 14, src: gal14, x: 1000, y: 0, title: "Winter ❄️ @ Ithaca" },
  { id: 15, src: gal15, x: 450, y: -650, title: "Walking back from class~" },
  { id: 16, src: gal16, x: 100, y: 850, title: "High School Grad 🎓" },
  { id: 17, src: gal17, x: 1000, y: 850, title: "Aatrox | Clay" },
  { id: 18, src: gal18, x: -770, y: 850, title: "Soft Bunny Ი𐑼| Original pattern" },
  { id: 19, src: gal19, x: -100, y: -800, title: "Bear or Frog? | Original pattern" },
  { id: 20, src: gal20, x: -1150, y: 150, title: "Pandaa" },
];

function Explorations() {
  const [resetKey, setResetKey] = useState(0);
  const constraintsRef = useRef(null);

  useEffect(() => {
    document.title = "Winnie's Explorations";
  }, []);

  return (
    <div className="explorations-page centerFlex">
      <NavBar />

      <div className="viewport" ref={constraintsRef}>
        <Motion.div
          key={resetKey}
          className="canvas"
          drag
          dragConstraints={constraintsRef}
          transition={{ type: "spring", damping: 100, stiffness: 400 }}
        >
          {galleryItems.map((item) => (
            <Motion.div
              key={item.id}
              className="scatter-card centerFlex"
              style={{ flexDirection: "column" }}
              drag
              dragMomentum={false}
              dragPropagation={false}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ x: item.x, y: item.y, scale: 1, opacity: 1 }}
            >
              <img src={item.src} alt={item.alt ?? item.title} draggable="false" />
              <span>{item.title}</span>
            </Motion.div>
          ))}
          <div className="centerFlex" style={{ gap: "20px", flexDirection: "column" }}>
            <h2 style={{ width: "300px", textAlign: "center", fontSize: "1.6rem" }}>
              <em>Letting my creativity flow freely across the surface</em>
            </h2>
            <p className="centerFlex" style={{ gap: "10px", color: "var(--clr-page-span)" }}>
              <Move height={"20px"} /> Drag to move
            </p>
          </div>
        </Motion.div>
      </div>

      <button className="reset-btn" onClick={() => setResetKey((k) => k + 1)}>
        Reset View
      </button>
    </div>
  );
}

export default Explorations;