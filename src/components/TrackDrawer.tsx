import { X, Play, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect } from "react";
import { NavigationModal } from "./NavigationModal";

// Import track images (using the same images as BackgroundSlideshow)
import img1 from "@/assets/pexels-dennisariel-32880873.jpg";
import img2 from "@/assets/pexels-lum3n-44775-167684.jpg";
import img3 from "@/assets/pexels-dennisariel-32880874.jpg";
import img4 from "@/assets/pexels-simon73-1323550.jpg";
import img5 from "@/assets/pexels-todd-trapani-488382-1420440.jpg";
import img6 from "@/assets/pexels-luisfe-5191926.jpg";
import img7 from "@/assets/pexels-alberlan-7311921.jpg";
import img8 from "@/assets/pexels-sliceisop-2873669.jpg";

// Track image mapping (first image from each track's set)
const trackImages = [
  img1,  // Track 1: "What is Ego Death?"
  img2,  // Track 2: "What is Non-Duality?"
  img5,  // Track 3: "The Four Selves"
  img6,  // Track 4: "Realisation and Transformation"
  img7,  // Track 5: "The Evolution of Nonduality"
  img8,  // Track 6: "The Edge of Evolution"
  img3,  // Track 7: "Realigning the Soul"
  img4   // Track 8: "Rational Idealism"
];

interface Track {
  id: string;
  title: string;
  description: string;
  duration: number;
  audioUrl: string;
}

interface TrackDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  tracks: Track[];
  currentTrack: number;
  onTrackSelect: (trackIndex: number) => void;
  isPlaying: boolean; // Add this prop to track actual playback state
}

export function TrackDrawer({
  isOpen,
  onClose,
  tracks,
  currentTrack,
  onTrackSelect,
  isPlaying
}: TrackDrawerProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPageSlug, setCurrentPageSlug] = useState("");

  // Debug: Log when component receives props
  useEffect(() => {
    console.log('TrackDrawer props:', { isOpen, currentTrack, isPlaying, onTrackSelect: typeof onTrackSelect });
  }, [isOpen, currentTrack, isPlaying, onTrackSelect]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTrackSlug = (trackIndex: number) => {
    const trackSlugs = [
      "what-is-ego-death",
      "what-is-non-duality", 
      "the-four-selves",
      "realisation-and-transformation",
      "the-evolution-of-nonduality",
      "the-edge-of-evolution",
      "realigning-the-soul",
      "rational-idealism"
    ];
    return trackSlugs[trackIndex] || "what-is-ego-death";
  };

  const handleShare = (trackIndex: number, trackTitle: string) => {
    const trackSlug = getTrackSlug(trackIndex);
    const trackUrl = `${window.location.origin}/track/${trackSlug}`;
    const text = `Listen to "${trackTitle}" with Andrew Cohen`;
    
    if (navigator.share) {
      navigator.share({
        title: trackTitle,
        text: text,
        url: trackUrl,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(trackUrl);
    }
  };



  const navigationLinks = [
    { name: "Life", slug: "life" },
    { name: "Teachings", slug: "teachings" },
    { name: "Books", slug: "books" },
    { name: "Archive", slug: "archive" },
    { name: "Engage", slug: "engage" },
  ];

  const handleNavigationClick = (slug: string) => {
    setCurrentPageSlug(slug);
    setModalOpen(true);
  };

  // Listen for custom events to open modals from URL navigation
  useEffect(() => {
    const handleOpenModal = (event: CustomEvent) => {
      const { pageSlug } = event.detail;
      setCurrentPageSlug(pageSlug);
      setModalOpen(true);
    };

    window.addEventListener('openNavigationModal', handleOpenModal as EventListener);
    
    return () => {
      window.removeEventListener('openNavigationModal', handleOpenModal as EventListener);
    };
  }, []);

  return (
    <>
      {/* Backdrop - Fade in/out */}
      <div
        className={`fixed inset-0 z-30 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
      </div>

      {/* Drawer - Slide in/out */}
      <div
        className={`fixed inset-y-0 left-0 z-40 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="w-80 h-full glass-morphism border-r flex flex-col">
          {/* Header - Fixed */}
          <div className="flex items-center justify-between p-6 border-b border-white/10 flex-shrink-0">
            <div className="flex flex-col">
              <span className="text-sm font-light text-white/80">Awakening with</span>
              <h2 className="text-xl font-semibold text-white">Andrew Cohen</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Scrollable Content Area */}
          <ScrollArea className="flex-1">
            <div className="p-6">
              {/* Navigation Links */}
              <div className="mb-6">
                <nav className="space-y-3">
                  {navigationLinks.map((link) => (
                    <button
                      key={link.name}
                      onClick={() => handleNavigationClick(link.slug)}
                      className="block w-full text-left text-white/70 hover:text-white transition-colors duration-200 font-medium text-sm"
                    >
                      {link.name}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Track List */}
              <div className="space-y-3">
                {tracks.map((track, index) => (
                  <div
                    key={track.id}
                    className={`group cursor-pointer rounded-lg p-4 mb-3 transition-all duration-200 hover:bg-white/5 ${
                      index === currentTrack 
                        ? 'bg-[hsl(var(--primary)/0.2)] border border-[hsl(var(--primary)/0.3)]' 
                        : 'hover:bg-white/5'
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('Track clicked:', index, track.title);
                      console.log('onTrackSelect function:', onTrackSelect);
                      console.log('Event target:', e.target);
                      if (typeof onTrackSelect === 'function') {
                        onTrackSelect(index);
                      } else {
                        console.error('onTrackSelect is not a function:', onTrackSelect);
                      }
                    }}
                  >
                    <div className="flex items-start gap-3">
                      {/* Image Square */}
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg border border-white/10 flex items-center justify-center">
                        <img
                          src={trackImages[index]}
                          alt={`Track ${index + 1} image`}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-white mb-1 line-clamp-1">
                          {track.title}
                        </h3>
                        <p className="text-xs text-white/60 mb-2 line-clamp-2">
                          {track.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-white/40">
                            Duration: {formatDuration(track.duration)}
                          </span>
                          <div className="flex items-center gap-2">
                            {index === currentTrack && isPlaying && (
                              <span className="text-xs text-[hsl(var(--primary))] font-medium">
                                Playing
                              </span>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleShare(index, track.title);
                              }}
                              className="w-6 h-6 opacity-0 group-hover:opacity-100 text-white/60 hover:text-white hover:bg-white/10 transition-opacity"
                            >
                              <Share2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Navigation Modal */}
      <NavigationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        pageSlug={currentPageSlug}
      />
    </>
  );
}