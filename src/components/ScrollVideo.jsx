import { useEffect, useRef } from "react";

export const ScrollVideo = ({ src, name }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current.play().catch((err) => console.log("Autoplay blocked", err));
        } else {
          videoRef.current.pause();
        }
      },
      { threshold: 0.6 } 
    );

    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="video-card">
      <video
        ref={videoRef}
        src={src}
        loop
        muted
        playsInline
        className="clean-video"
      />
      <p className="video-name">{name}</p>
    </div>
  );
};