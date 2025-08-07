import { useState, useEffect } from "react";

interface Caption {
  start: number;
  end: number;
  text: string;
}

interface CaptionOverlayProps {
  isActive: boolean;
  currentTime: number;
  captions: Caption[];
}

export function CaptionOverlay({ isActive, currentTime, captions }: CaptionOverlayProps) {
  const [currentCaption, setCurrentCaption] = useState<Caption | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (!isActive || !captions.length) {
      setIsFadingOut(true);
      setTimeout(() => {
        setCurrentCaption(null);
        setIsVisible(false);
        setIsFadingOut(false);
      }, 300);
      return;
    }

    // Find the current caption based on time
    const caption = captions.find(
      (cap) => currentTime >= cap.start && currentTime <= cap.end
    );

    if (caption && caption !== currentCaption) {
      // Fade out current caption first
      if (currentCaption) {
        setIsFadingOut(true);
        setTimeout(() => {
          setCurrentCaption(caption);
          setIsFadingOut(false);
          setIsVisible(true);
        }, 300);
      } else {
        // First caption - just fade in
        setCurrentCaption(caption);
        setIsVisible(true);
      }
    } else if (!caption && currentCaption) {
      // Fade out when no caption
      setIsFadingOut(true);
      setTimeout(() => {
        setCurrentCaption(null);
        setIsVisible(false);
        setIsFadingOut(false);
      }, 300);
    }
  }, [currentTime, captions, isActive, currentCaption]);

  if (!isActive || !currentCaption) {
    return null;
  }

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div
        className={`max-w-4xl mx-4 transition-opacity duration-300 ${
          isVisible && !isFadingOut ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="text-white text-2xl font-medium text-center leading-relaxed drop-shadow-[0_0_10px_rgba(0,0,0,0.8)] [text-shadow:_0_0_10px_rgba(0,0,0,0.8)]">
          {currentCaption.text}
        </p>
      </div>
    </div>
  );
} 