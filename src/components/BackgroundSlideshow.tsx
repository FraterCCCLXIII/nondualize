import { useState, useEffect, useRef } from "react";

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
  const slideshowRef = useRef<HTMLDivElement>(null);

  // Get the image set for the current track
  const images = trackImageSets[trackIndex] || trackImageSets[0];

  useEffect(() => {
    setCurrentImages(images);
  }, [trackIndex, images]);

  // Ken Burns effect with smooth transitions
  useEffect(() => {
    if (currentImages.length === 0) return;

    const slideshow = slideshowRef.current;
    if (!slideshow) return;

    const imageElements = slideshow.querySelectorAll('img');
    if (imageElements.length === 0) return;

    // Set the first image as active when component mounts or images change
    imageElements.forEach((img, index) => {
      img.className = index === 0 ? 'ken-burns-image fx' : 'ken-burns-image';
    });

    let currentIndex = 0;
    const numberOfImages = imageElements.length;

    const kenBurns = () => {
      if (numberOfImages === 0) return;
      
      // Move to next image
      currentIndex = (currentIndex + 1) % numberOfImages;
      
      // Set current image as active
      imageElements[currentIndex].className = 'ken-burns-image fx';
      
      // Clean up the image that's no longer needed (2 images back)
      if (currentIndex === 0) { 
        imageElements[numberOfImages - 2].className = 'ken-burns-image';
      } else if (currentIndex === 1) { 
        imageElements[numberOfImages - 1].className = 'ken-burns-image';
      } else if (currentIndex > 1) { 
        imageElements[currentIndex - 2].className = 'ken-burns-image';
      }
    };

    // Start the Ken Burns effect
    const interval = setInterval(kenBurns, 6000); // 6 seconds per image

    return () => {
      clearInterval(interval);
    };
  }, [currentImages]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Ken Burns Slideshow Container */}
      <div ref={slideshowRef} className="ken-burns-slideshow">
        {currentImages.map((image, index) => (
          <img
            key={`${trackIndex}-${index}`}
            src={image}
            alt={`Background ${index + 1}`}
            className="ken-burns-image"
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