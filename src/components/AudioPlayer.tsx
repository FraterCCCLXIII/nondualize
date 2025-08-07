import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Menu, Volume2, Music, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TrackDrawer } from "./TrackDrawer";
import { BackgroundSlideshow } from "./BackgroundSlideshow";

interface Track {
  id: string;
  title: string;
  description: string;
  duration: number;
  audioUrl: string;
  defaultBackgroundMusic?: string; // ID of the default background music track
}

const mockTracks: Track[] = [
  {
    id: "1",
    title: "What is Ego Death?",
    description: "Exploring the profound dissolution of the separate self and the awakening to true consciousness",
    duration: 3900, // ~65 minutes
    audioUrl: "/audio/What is Ego Death-.mp3",
    defaultBackgroundMusic: "bg1" // Expansion
  },
  {
    id: "2", 
    title: "What is Non-Duality?",
    description: "Understanding the fundamental unity of existence beyond the illusion of separation",
    duration: 4140, // ~69 minutes
    audioUrl: "/audio/What is Non-Duality-.mp3",
    defaultBackgroundMusic: "bg2" // Aura
  },
  {
    id: "3",
    title: "The Four Selves with Andrew Cohen",
    description: "A deep exploration of the different levels of self and their transformation through spiritual practice",
    duration: 4740, // ~79 minutes
    audioUrl: "/audio/The Four Selves with Andrew Cohen.mp3",
    defaultBackgroundMusic: "bg3" // Into Silence
  },
  {
    id: "4",
    title: "Realisation and Transformation",
    description: "The journey from intellectual understanding to embodied awakening and lasting change",
    duration: 5640, // ~94 minutes
    audioUrl: "/audio/Realisation and Transformation.mp3",
    defaultBackgroundMusic: "bg4" // Resonance
  },
  {
    id: "5",
    title: "The Evolution of Nonduality",
    description: "How the understanding of oneness evolves and deepens through practice and insight",
    duration: 5880, // ~98 minutes
    audioUrl: "/audio/The Evolution of Nonduality.mp3",
    defaultBackgroundMusic: "bg5" // Transcendence
  },
  {
    id: "6",
    title: "The Edge of Evolution",
    description: "Exploring the cutting edge of human consciousness and spiritual development",
    duration: 4080, // ~68 minutes
    audioUrl: "/audio/The Edge of Evolution.mp3",
    defaultBackgroundMusic: "bg6" // Luminescence
  },
  {
    id: "7",
    title: "Realigning the Soul",
    description: "The process of aligning our deepest essence with the highest truth and purpose",
    duration: 4680, // ~78 minutes
    audioUrl: "/audio/Realigning the Soul.mp3",
    defaultBackgroundMusic: "bg1" // Expansion
  },
  {
    id: "8",
    title: "Rational Idealism",
    description: "Bridging the gap between intellectual understanding and spiritual realization",
    duration: 3420, // ~57 minutes
    audioUrl: "/audio/Rational Idealism.mp3",
    defaultBackgroundMusic: "bg2" // Aura
  }
];

// Background music tracks
const backgroundMusicTracks = [
  {
    id: "bg1",
    title: "Expansion",
    description: "A journey into infinite space and consciousness",
    audioUrl: "/background-music/sunrise-meditation-369921.mp3"
  },
  {
    id: "bg2",
    title: "Aura",
    description: "Radiant energy fields and subtle vibrations",
    audioUrl: "/background-music/quiet-contemplation-meditation-283536.mp3"
  },
  {
    id: "bg3",
    title: "Into Silence",
    description: "The profound depth of inner stillness",
    audioUrl: "/background-music/autumn-sky-meditation-7618.mp3"
  },
  {
    id: "bg4",
    title: "Resonance",
    description: "Harmonic frequencies that align the soul",
    audioUrl: "/background-music/meditation-relax-sleep-music-346733.mp3"
  },
  {
    id: "bg5",
    title: "Transcendence",
    description: "Beyond the boundaries of ordinary perception",
    audioUrl: "/background-music/meditate-meditation-music-346429.mp3"
  },
  {
    id: "bg6",
    title: "Luminescence",
    description: "The inner light that guides transformation",
    audioUrl: "/background-music/meditation-yoga-relaxing-music-378307.mp3"
  },
  {
    id: "bg7",
    title: "Essence",
    description: "The core truth that lies beneath all experience",
    audioUrl: "/background-music/meditation-music-338902.mp3"
  },
  {
    id: "bg8",
    title: "Awakening",
    description: "The moment when consciousness realizes itself",
    audioUrl: "/background-music/meditation-music-322801.mp3"
  },
  {
    id: "bg9",
    title: "Unity",
    description: "The seamless oneness of all existence",
    audioUrl: "/background-music/meditation-yoga-relaxing-music-380330.mp3"
  }
];

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [volume, setVolume] = useState(1);
  const [backgroundMusic, setBackgroundMusic] = useState<string | null>(null);
  const [isBackgroundMusicPlaying, setIsBackgroundMusicPlaying] = useState(true);
  const [backgroundMusicVolume, setBackgroundMusicVolume] = useState(0.2);
  const [selectedBackgroundTrack, setSelectedBackgroundTrack] = useState<string | null>(null);
  const [autoActivateBackgroundMusic, setAutoActivateBackgroundMusic] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const backgroundAudioRef = useRef<HTMLAudioElement>(null);

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

  // Handle background music playback and volume
  useEffect(() => {
    const backgroundAudio = backgroundAudioRef.current;
    if (!backgroundAudio) return;

    if (isBackgroundMusicPlaying) {
      backgroundAudio.volume = volume * backgroundMusicVolume;
      backgroundAudio.play().catch((error) => {
        console.log('Background music auto-play prevented:', error);
      });
    } else {
      backgroundAudio.pause();
    }
  }, [backgroundMusic, isBackgroundMusicPlaying, volume, backgroundMusicVolume]);

  // Auto-activate default background music for the first track on mount
  useEffect(() => {
    if (isBackgroundMusicPlaying && !backgroundMusic) {
      activateDefaultBackgroundMusic(0);
    }
  }, []); // Empty dependency array means this runs once on mount

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      
      // Pause background music if it's active
      if (backgroundAudioRef.current && isBackgroundMusicPlaying) {
        backgroundAudioRef.current.pause();
      }
    } else {
      audio.play();
      
      // If background music is enabled and should be active, activate the default background music
      if (isBackgroundMusicPlaying && autoActivateBackgroundMusic && !backgroundAudioRef.current?.src) {
        activateDefaultBackgroundMusic(currentTrack);
      }
      
      // If background music is set but not playing, try to start it now (user interaction allows it)
      if (backgroundMusic && isBackgroundMusicPlaying && backgroundAudioRef.current) {
        backgroundAudioRef.current.play().catch((error) => {
          console.log('Background music play failed:', error);
        });
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    const newTrackIndex = currentTrack === 0 ? mockTracks.length - 1 : currentTrack - 1;
    
    // Start fade out transition
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentTrack(newTrackIndex);
      setCurrentTime(0);
      
      // Activate default background music if background music is currently playing
      if (isBackgroundMusicPlaying) {
        activateDefaultBackgroundMusic(newTrackIndex);
      }
      
      // Auto-start the audio
      setTimeout(() => {
        const audio = audioRef.current;
        if (audio) {
          audio.play().catch((error) => {
            console.log('Auto-play prevented by browser:', error);
          });
          setIsPlaying(true);
        }
      }, 100);
      
      // Fade in transition
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 300); // Fade out duration
  };

  const handleNext = () => {
    const newTrackIndex = currentTrack === mockTracks.length - 1 ? 0 : currentTrack + 1;
    
    // Start fade out transition
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentTrack(newTrackIndex);
      setCurrentTime(0);
      
      // Activate default background music if background music is currently playing
      if (isBackgroundMusicPlaying) {
        activateDefaultBackgroundMusic(newTrackIndex);
      }
      
      // Auto-start the audio
      setTimeout(() => {
        const audio = audioRef.current;
        if (audio) {
          audio.play().catch((error) => {
            console.log('Auto-play prevented by browser:', error);
          });
          setIsPlaying(true);
        }
      }, 100);
      
      // Fade in transition
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 300); // Fade out duration
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const newTime = value[0];
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const activateDefaultBackgroundMusic = (trackIndex: number) => {
    const track = mockTracks[trackIndex];
    
    if (track.defaultBackgroundMusic && autoActivateBackgroundMusic) {
      const bgTrack = backgroundMusicTracks.find(bg => bg.id === track.defaultBackgroundMusic);
      if (bgTrack) {
        setBackgroundMusic(bgTrack.audioUrl);
        setIsBackgroundMusicPlaying(true);
        setSelectedBackgroundTrack(bgTrack.id);
      }
    }
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

    // Activate default background music
    activateDefaultBackgroundMusic(trackIndex);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    // Update background music volume to 75% of main volume
    if (backgroundAudioRef.current) {
      backgroundAudioRef.current.volume = newVolume * 0.75;
    }
  };

  const handleBackgroundMusicSelect = (trackId: string) => {
    const selectedTrack = backgroundMusicTracks.find(track => track.id === trackId);
    if (selectedTrack) {
      setBackgroundMusic(selectedTrack.audioUrl);
      setIsBackgroundMusicPlaying(true);
      setSelectedBackgroundTrack(trackId);
    }
  };

  const toggleBackgroundMusic = () => {
    if (isBackgroundMusicPlaying) {
      setIsBackgroundMusicPlaying(false);
    } else {
      setIsBackgroundMusicPlaying(true);
    }
  };

  const stopBackgroundMusic = () => {
    setBackgroundMusic(null);
    setIsBackgroundMusicPlaying(false);
    setSelectedBackgroundTrack(null);
  };

  const handleBackgroundMusicVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setBackgroundMusicVolume(newVolume);
    if (backgroundAudioRef.current) {
      backgroundAudioRef.current.volume = newVolume * volume;
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Slideshow */}
      <BackgroundSlideshow trackIndex={currentTrack} isTransitioning={isTransitioning} />

      {/* Main Title */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-40 text-center">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-light text-white mb-1 font-cinzel">Awakening</h1>
          <span className="text-lg font-light text-white/80">with Andrew Cohen</span>
        </div>
      </div>

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
      
      {/* Background Music Element */}
      {backgroundMusic && (
        <audio 
          ref={backgroundAudioRef} 
          src={backgroundMusic} 
          loop 
        />
      )}

      {/* Player Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="rounded-xl p-4 max-w-2xl">
          {/* Track Info */}
          <div className={`mb-4 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
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

            {/* Volume Control */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-[hsl(var(--control-hover))] hover:bg-white/10"
                >
                  <Volume2 className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-4 glass-morphism border-white/20">
                <div className="space-y-3">
                  <div className="text-sm font-medium text-white">Volume</div>
                  <Slider
                    value={[volume]}
                    max={1}
                    step={0.01}
                    onValueChange={handleVolumeChange}
                    className="w-full"
                  />
                  <div className="text-xs text-white/60 text-center">
                    {Math.round(volume * 100)}%
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Background Music Control */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`text-white hover:text-[hsl(var(--control-hover))] hover:bg-white/10 ${
                    isBackgroundMusicPlaying ? 'text-[hsl(var(--accent))]' : ''
                  }`}
                >
                  <Music className="h-5 w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-4 glass-morphism border-white/20">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-white">Background Music</div>
                    {selectedBackgroundTrack && (
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={toggleBackgroundMusic}
                          className="h-8 w-8 rounded-full bg-white/20 hover:bg-white/30 text-white"
                        >
                          {isBackgroundMusicPlaying ? (
                            <Pause className="h-3 w-3" />
                          ) : (
                            <Play className="h-3 w-3 ml-0.5" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={stopBackgroundMusic}
                          className="h-8 w-8 rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-400"
                        >
                          <Square className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="max-h-48 overflow-y-auto custom-scrollbar space-y-2">
                    {backgroundMusicTracks.map((track) => (
                      <div
                        key={track.id}
                        className={`p-2 rounded-md cursor-pointer transition-colors ${
                          selectedBackgroundTrack === track.id
                            ? 'bg-[hsl(var(--accent))]/20 border border-[hsl(var(--accent))]/30'
                            : 'hover:bg-white/10'
                        }`}
                        onClick={() => handleBackgroundMusicSelect(track.id)}
                      >
                        <div className="text-sm font-medium text-white">{track.title}</div>
                        <div className="text-xs text-white/60">{track.description}</div>
                      </div>
                    ))}
                  </div>
                  {selectedBackgroundTrack && (
                    <div className="space-y-2">
                      <div className="text-xs text-white/60">Background Music Volume</div>
                      <Slider
                        value={[backgroundMusicVolume]}
                        max={1}
                        step={0.01}
                        onValueChange={handleBackgroundMusicVolumeChange}
                        className="w-full"
                      />
                      <div className="text-xs text-white/60 text-center">
                        {Math.round(backgroundMusicVolume * 100)}% of main volume
                      </div>
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
}