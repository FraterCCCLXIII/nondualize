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
      
      // Wait for transition to complete before switching
      setTimeout(() => {
        setCurrentImage(nextImage);
        setNextImage((nextImage + 1) % images.length);
        setIsTransitioning(false);
      }, 4000); // Full transition duration
      
    }, 10000); // Change image every 10 seconds (longer for smoother experience)

    return () => clearInterval(interval);
  }, [nextImage]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Current Background Image with Ken Burns */}
      <div className="absolute inset-0">
        <img
          src={images[currentImage]}
          alt={`Background ${currentImage + 1}`}
          className={`w-full h-full object-cover ken-burns-${(currentImage % 4) + 1}`}
        />
      </div>

      {/* Next Background Image (for crossfade) with Ken Burns */}
      <div 
        className={`absolute inset-0 transition-opacity duration-[4000ms] ease-in-out ${
          isTransitioning ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <img
          src={images[nextImage]}
          alt={`Background ${nextImage + 1}`}
          className={`w-full h-full object-cover ken-burns-${(nextImage % 4) + 1}`}
        />
      </div>

      {/* Cosmic Overlay */}
      <div className="absolute inset-0 nebula-overlay opacity-30" />
      
      {/* Dark Overlay for Better Text Readability */}
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
}