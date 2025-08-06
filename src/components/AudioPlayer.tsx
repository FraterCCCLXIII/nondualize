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
    title: "The Pathless Path",
    description: "A journey into the depths of consciousness and awakening",
    duration: 1847, // 30:47
    audioUrl: "/api/placeholder-audio"
  },
  {
    id: "2", 
    title: "Beyond the Self",
    description: "Exploring the nature of identity and transcendence",
    duration: 2156, // 35:56
    audioUrl: "/api/placeholder-audio"
  },
  {
    id: "3",
    title: "Evolutionary Enlightenment",
    description: "The next step in human consciousness development",
    duration: 2890, // 48:10
    audioUrl: "/api/placeholder-audio"
  },
  {
    id: "4",
    title: "The Miracle of Awakening",
    description: "Understanding the profound shift in perspective",
    duration: 1623, // 27:03
    audioUrl: "/api/placeholder-audio"
  },
  {
    id: "5",
    title: "Cosmic Consciousness",
    description: "Experiencing unity with the infinite",
    duration: 2344, // 39:04
    audioUrl: "/api/placeholder-audio"
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
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Slideshow */}
      <BackgroundSlideshow />

      {/* Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 left-4 z-50 glass-morphism hover:bg-[hsl(var(--control-hover))] text-white"
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
        <div className="glass-morphism rounded-xl p-4 max-w-2xl">
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