import { useState, useEffect } from "react";

// Import all available images
import img1 from "@/assets/pexels-dennisariel-32880873.jpg";
import img2 from "@/assets/pexels-lum3n-44775-167684.jpg";
import img3 from "@/assets/pexels-dennisariel-32880874.jpg";
import img4 from "@/assets/pexels-simon73-1323550.jpg";
import img5 from "@/assets/pexels-todd-trapani-488382-1420440.jpg";
import img6 from "@/assets/pexels-luisfe-5191926.jpg";
import img7 from "@/assets/pexels-alberlan-7311921.jpg";
import img8 from "@/assets/pexels-sliceisop-2873669.jpg";
import img9 from "@/assets/pexels-umkreisel-app-2832071.jpg";
import img10 from "@/assets/pexels-daniel-cid-634838605-17505898.jpg";
import img11 from "@/assets/pexels-jmueller-6444367.jpg";
import img12 from "@/assets/pexels-nicole-avagliano-1132392-2706654.jpg";
import img13 from "@/assets/pexels-scott-lord-564881271-32511120.jpg";
import img14 from "@/assets/pexels-scott-lord-564881271-30820838.jpg";
import img15 from "@/assets/pexels-dennisariel-32054508.jpg";
import img16 from "@/assets/pexels-nivdex-796206.jpg";
import img17 from "@/assets/pexels-eberhardgross-1624360.jpg";
import img18 from "@/assets/pexels-merlin-11167645.jpg";
import img19 from "@/assets/pexels-neilyonamine-8237959.jpg";
import img20 from "@/assets/pexels-alex-andrews-271121-3805983.jpg";
import img21 from "@/assets/pexels-pixabay-41951.jpg";
import img22 from "@/assets/pexels-arnie-chou-304906-1229042.jpg";
import img23 from "@/assets/pexels-faikackmerd-1025469.jpg";
import img24 from "@/assets/pexels-eberhardgross-2098427.jpg";
import img25 from "@/assets/pexels-dennisariel-33263307.jpg";
import img26 from "@/assets/pexels-necatiomerk-33260303.jpg";
import img27 from "@/assets/pexels-david-paul-2150063702-33313322.jpg";

// Define themed image sets for each track
const trackImageSets = [
  // Track 1: "What is Ego Death?" - Dark, cosmic, transformative images
  [img1, img3, img9, img15, img25, img26, img27, img13],
  
  // Track 2: "What is Non-Duality?" - Unity, oneness, cosmic harmony
  [img2, img4, img10, img16, img17, img24, img22, img23],
  
  // Track 3: "The Four Selves with Andrew Cohen" - Layers, depth, transformation
  [img5, img6, img7, img8, img11, img12, img14, img18],
  
  // Track 4: "Realisation and Transformation" - Awakening, light, breakthrough
  [img19, img20, img21, img1, img3, img9, img15, img25],
  
  // Track 5: "The Evolution of Nonduality" - Evolution, growth, cosmic development
  [img26, img27, img13, img2, img4, img10, img16, img17],
  
  // Track 6: "The Edge of Evolution" - Cutting edge, advanced consciousness
  [img24, img22, img23, img5, img6, img7, img8, img11],
  
  // Track 7: "Realigning the Soul" - Alignment, harmony, soul connection
  [img12, img14, img18, img19, img20, img21, img1, img3],
  
  // Track 8: "Rational Idealism" - Balance of mind and spirit
  [img9, img15, img25, img26, img27, img13, img2, img4]
];

interface BackgroundSlideshowProps {
  trackIndex: number;
  isTransitioning?: boolean;
}

export function BackgroundSlideshow({ trackIndex, isTransitioning = false }: BackgroundSlideshowProps) {
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Get the image set for the current track
  const images = trackImageSets[trackIndex] || trackImageSets[0];

  useEffect(() => {
    setCurrentImages(images);
    setImagesLoaded(false);
    
    // Preload images for smooth transitions
    const preloadImages = async () => {
      const imagePromises = images.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => resolve(src);
          img.onerror = () => resolve(src); // Continue even if some images fail
          img.src = src;
        });
      });
      
      await Promise.all(imagePromises);
      setImagesLoaded(true);
    };
    
    preloadImages();
  }, [trackIndex, images]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* CSS Animated Slideshow Container */}
      <div className={`fling-minislide transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'} ${imagesLoaded ? 'images-ready' : ''}`}>
        {currentImages.map((image, index) => (
          <img
            key={`${trackIndex}-${index}`}
            src={image}
            alt={`Background ${index + 1}`}
            style={{
              animationDelay: `${index * 8}s`,
            }}
            className="background-image"
          />
        ))}
      </div>

      {/* Cosmic Overlay */}
      <div className="absolute inset-0 nebula-overlay opacity-30" />
      
      {/* Dark Overlay for Better Text Readability */}
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
}