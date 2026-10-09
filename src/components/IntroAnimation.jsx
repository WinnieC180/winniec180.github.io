import { useEffect, useRef } from "react";
import loaderSvg from "../assets/fishLoader.svg?raw";
import loaderSvgNight from "../assets/fishLoaderNight.svg?raw";
import "./intro.css";

// Plays once (~3.7s): fish jumps inside the sky window, then a circle opens from the splash to reveal the page.
const DURATION = 3700;

function IntroAnimation({ onEnter }) {
  const stage = useRef(null);
  const enterRef = useRef(onEnter);

  useEffect(() => {
    enterRef.current = onEnter;
  }, [onEnter]);

  useEffect(() => {
    const el = stage.current;
    const night = document.documentElement.getAttribute("data-theme") === "dark";
    el.innerHTML = night ? loaderSvgNight : loaderSvg; // re-inserting restarts the SVG animation
    const svg = el.querySelector("svg");

    // Keep the window at 1:1 size, centered; shrink only on small screens.
    const fit = () => {
      const w = window.innerWidth, h = window.innerHeight;
      const k = Math.min(1, w / 520, h / 480), vw = w / k, vh = h / k;
      svg.setAttribute("viewBox", `${720 - vw / 2} ${442 - vh / 2} ${vw} ${vh}`);
    };
    fit();
    window.addEventListener("resize", fit);
    const t = setTimeout(() => enterRef.current?.(), DURATION);

    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", fit);
      el.innerHTML = "";
    };
  }, []);

  return <div ref={stage} className="fishIntro" role="img" aria-label="Loading" />;
}

export default IntroAnimation;
