import { useState, useEffect } from "react";
import cosmic1 from "@/assets/cosmic-1.jpg";
import nature1 from "@/assets/nature-1.jpg";
import cosmic2 from "@/assets/cosmic-2.jpg";
import nature2 from "@/assets/nature-2.jpg";

const images = [cosmic1, nature1, cosmic2, nature2];

export function BackgroundSlideshow() {
  const [currentImage, setCurrentImage] = useState(0);
  const [nextImage, setNextImage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentImage(nextImage);
        setNextImage((nextImage + 1) % images.length);
        setIsTransitioning(false);
      }, 2000); // Match transition duration
      
    }, 8000); // Change image every 8 seconds

    return () => clearInterval(interval);
  }, [nextImage]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Current Background Image */}
      <div className="absolute inset-0">
        <img
          src={images[currentImage]}
          alt={`Background ${currentImage + 1}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Next Background Image (for crossfade) */}
      <div 
        className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
          isTransitioning ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <img
          src={images[nextImage]}
          alt={`Background ${nextImage + 1}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Cosmic Overlay */}
      <div className="absolute inset-0 nebula-overlay opacity-30" />
      
      {/* Dark Overlay for Better Text Readability */}
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
}