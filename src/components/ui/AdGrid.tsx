import React, { useEffect, useState } from "react";

const adImages = [
  [
    // Top large ad images
    "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80",
  ],
  [
    // Bottom left ad images
    "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
  ],
  [
    // Bottom right ad images
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1465101178521-c1a9136a3b41?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1495103033382-fe343886b671?auto=format&fit=crop&w=600&q=80",
  ],
];

function useAdImageCycle(images: string[], interval = 10000) {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const fadeOut = setTimeout(() => setFade(false), interval - 800);
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % images.length);
      setFade(true);
    }, interval);
    return () => {
      clearTimeout(timer);
      clearTimeout(fadeOut);
    };
  }, [index, images.length, interval]);

  return { src: images[index], fade };
}

const AdGrid: React.FC = () => {
  const topAd = useAdImageCycle(adImages[0]);
  const leftAd = useAdImageCycle(adImages[1]);
  const rightAd = useAdImageCycle(adImages[2]);

  return (
    <div
      style={{
        background: "#121212",
        padding: 0,
        borderRadius: 24,
        width: '100%',
        height: '100%',
        maxWidth: '100%',
        margin: 0,
        boxShadow: "0 6px 32px 0 rgba(0,0,0,0.18)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateRows: "1.2fr 0.8fr",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          height: '100%',
        }}
      >
        {/* Top large ad */}
        <div
          style={{
            gridColumn: "1 / span 2",
            border: "1.5px solid #e0e0e0",
            borderRadius: 20,
            boxShadow: "rgba(0,0,0,0.1) 0px 4px 10px",
            overflow: "hidden",
            background: "#181818",
            minHeight: 0,
            position: "relative",
            width: '100%',
            height: '100%',
          }}
        >
          <img
            src={topAd.src}
            alt="Ad 1"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 20,
              opacity: topAd.fade ? 1 : 0,
              transition: 'opacity 0.7s',
            }}
          />
        </div>
        {/* Bottom left ad */}
        <div
          style={{
            border: "1.5px solid #e0e0e0",
            borderRadius: 20,
            boxShadow: "rgba(0,0,0,0.1) 0px 4px 10px",
            overflow: "hidden",
            background: "#181818",
            minHeight: 0,
            position: "relative",
            width: '100%',
            height: '100%',
          }}
        >
          <img
            src={leftAd.src}
            alt="Ad 2"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 20,
              opacity: leftAd.fade ? 1 : 0,
              transition: 'opacity 0.7s',
            }}
          />
        </div>
        {/* Bottom right ad */}
        <div
          style={{
            border: "1.5px solid #e0e0e0",
            borderRadius: 20,
            boxShadow: "rgba(0,0,0,0.1) 0px 4px 10px",
            overflow: "hidden",
            background: "#181818",
            minHeight: 0,
            position: "relative",
            width: '100%',
            height: '100%',
          }}
        >
          <img
            src={rightAd.src}
            alt="Ad 3"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 20,
              opacity: rightAd.fade ? 1 : 0,
              transition: 'opacity 0.7s',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AdGrid;