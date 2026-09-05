import { useState, useEffect } from "react";
import "./style.css";

function IntroAnimation({ onEnter }) {
  const [isRevealing, setIsRevealing] = useState(false);
  const [dimensions] = useState(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
  }));

  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsRevealing(true);
      });
    });

    const timeoutId = setTimeout(() => {
      onEnter();
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [onEnter]);

  const { width, height } = dimensions;
  const cx = width / 2;
  const cy = height / 2;
  const maxRadius = Math.sqrt(cx * cx + cy * cy) * 1.05; // covers farthest corner
  const radius = isRevealing ? maxRadius : 0;

  return (
    <>
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <mask id="revealMask" maskUnits="userSpaceOnUse" x="0" y="0" width={width} height={height}>
          <rect x="0" y="0" width={width} height={height} fill="white" />
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="black"
            style={{ transition: "r 1s cubic-bezier(0.65, 0, 0.35, 1)" }}
          />
        </mask>
      </svg>

      <div
        className="introAnimation"
        style={{
          maskImage: "url(#revealMask)",
          WebkitMaskImage: "url(#revealMask)",
        }}
      >
        {/* Your video/image/label content goes here if you still want something visible while it plays */}
      </div>
    </>
  );
}

export default IntroAnimation;