import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { TrackDrawer } from "./TrackDrawer";
import { BackgroundSlideshow } from "./BackgroundSlideshow";

interface Track {
  id: string;
  title: string;
  description: string;
  duration: number;
  audioUrl: string;
}

const mockTracks: Track[] = [
  {
    id: "1",
    title: "What is Ego Death?",
    description: "Exploring the profound dissolution of the separate self and the awakening to true consciousness",
    duration: 3900, // ~65 minutes
    audioUrl: "/audio/What is Ego Death-.mp3"
  },
  {
    id: "2", 
    title: "What is Non-Duality?",
    description: "Understanding the fundamental unity of existence beyond the illusion of separation",
    duration: 4140, // ~69 minutes
    audioUrl: "/audio/What is Non-Duality-.mp3"
  },
  {
    id: "3",
    title: "The Four Selves with Andrew Cohen",
    description: "A deep exploration of the different levels of self and their transformation through spiritual practice",
    duration: 4740, // ~79 minutes
    audioUrl: "/audio/The Four Selves with Andrew Cohen.mp3"
  },
  {
    id: "4",
    title: "Realisation and Transformation",
    description: "The journey from intellectual understanding to embodied awakening and lasting change",
    duration: 5640, // ~94 minutes
    audioUrl: "/audio/Realisation and Transformation.mp3"
  },
  {
    id: "5",
    title: "The Evolution of Nonduality",
    description: "How the understanding of oneness evolves and deepens through practice and insight",
    duration: 5880, // ~98 minutes
    audioUrl: "/audio/The Evolution of Nonduality.mp3"
  },
  {
    id: "6",
    title: "The Edge of Evolution",
    description: "Exploring the cutting edge of human consciousness and spiritual development",
    duration: 4080, // ~68 minutes
    audioUrl: "/audio/The Edge of Evolution.mp3"
  },
  {
    id: "7",
    title: "Realigning the Soul",
    description: "The process of aligning our deepest essence with the highest truth and purpose",
    duration: 4680, // ~78 minutes
    audioUrl: "/audio/Realigning the Soul.mp3"
  },
  {
    id: "8",
    title: "Rational Idealism",
    description: "Bridging the gap between intellectual understanding and spiritual realization",
    duration: 3420, // ~57 minutes
    audioUrl: "/audio/Rational Idealism.mp3"
  }
];

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const track = mockTracks[currentTrack];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleNext);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleNext);
    };
  }, [currentTrack]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    setCurrentTrack((prev) => (prev === 0 ? mockTracks.length - 1 : prev - 1));
    setCurrentTime(0);
  };

  const handleNext = () => {
    setCurrentTrack((prev) => (prev === mockTracks.length - 1 ? 0 : prev + 1));
    setCurrentTime(0);
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const newTime = value[0];
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleTrackSelect = (trackIndex: number) => {
    setCurrentTrack(trackIndex);
    setCurrentTime(0);
    setIsDrawerOpen(false);
    
    // Auto-play the selected track
    setTimeout(() => {
      const audio = audioRef.current;
      if (audio) {
        audio.play().catch((error) => {
          console.log('Auto-play prevented by browser:', error);
        });
        setIsPlaying(true);
      }
    }, 100); // Small delay to ensure audio element is updated
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Slideshow */}
      <BackgroundSlideshow trackIndex={currentTrack} />

      {/* Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className={`absolute top-4 left-4 z-50 glass-morphism hover:bg-[hsl(var(--control-hover))] text-white transition-opacity duration-300 ${
          isDrawerOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        onClick={() => setIsDrawerOpen(true)}
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Track Drawer */}
      <TrackDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        tracks={mockTracks}
        currentTrack={currentTrack}
        onTrackSelect={handleTrackSelect}
      />

      {/* Audio Element */}
      <audio ref={audioRef} src={track.audioUrl} />

      {/* Player Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="rounded-xl p-4 max-w-2xl">
          {/* Track Info */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-white mb-1">
              {track.title}
            </h2>
            <p className="text-sm text-white/70 mb-3">
              {track.description}
            </p>
          </div>

          {/* Timeline */}
          <div className="mb-4">
            <Slider
              value={[currentTime]}
              max={duration || track.duration}
              step={1}
              onValueChange={handleSeek}
              className="w-full mb-2"
            />
            <div className="flex justify-between text-xs text-white/60">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration || track.duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevious}
              className="text-white hover:text-[hsl(var(--control-hover))] hover:bg-white/10"
            >
              <SkipBack className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlay}
              className="text-white hover:text-[hsl(var(--control-hover))] hover:bg-white/10 h-12 w-12"
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6 ml-0.5" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleNext}
              className="text-white hover:text-[hsl(var(--control-hover))] hover:bg-white/10"
            >
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}