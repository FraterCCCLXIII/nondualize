import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Menu, Volume2, VolumeX, Music, Square, Subtitles, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TrackDrawer } from "./TrackDrawer";
import { BackgroundSlideshow } from "./BackgroundSlideshow";
import { CaptionOverlay } from "./CaptionOverlay";
import { ShareModal } from "./ShareModal";
import { parseSrtFile, type Caption } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

// Singleton AudioContext to prevent multiple instances in production
let globalAudioContext: AudioContext | null = null;
const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  
  if (!globalAudioContext && ('AudioContext' in window || 'webkitAudioContext' in window)) {
    try {
      globalAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (e) {
      console.warn('Failed to create AudioContext:', e);
      return null;
    }
  }
  
  return globalAudioContext;
};

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
    audioUrl: "/audio/What is Ego Death.m4a",
    defaultBackgroundMusic: "bg1" // Expansion
  },
  {
    id: "2", 
    title: "What is Non-Duality?",
    description: "Understanding the fundamental unity of existence beyond the illusion of separation",
    duration: 4140, // ~69 minutes
    audioUrl: "/audio/What is Nonduality.m4a",
    defaultBackgroundMusic: "bg2" // Aura
  },
  {
    id: "3",
    title: "The Four Selves",
    description: "A deep exploration of the different levels of self and their transformation through spiritual practice",
    duration: 4740, // ~79 minutes
    audioUrl: "/audio/The Four Selves.m4a",
    defaultBackgroundMusic: "bg3" // Into Silence
  },
  {
    id: "4",
    title: "Realisation and Transformation",
    description: "The journey from intellectual understanding to embodied awakening and lasting change",
    duration: 5640, // ~94 minutes
    audioUrl: "/audio/Realization and Transformation.m4a",
    defaultBackgroundMusic: "bg4" // Resonance
  },
  {
    id: "5",
    title: "The Evolution of Nonduality",
    description: "How the understanding of oneness evolves and deepens through practice and insight",
    duration: 5880, // ~98 minutes
    audioUrl: "/audio/The Evolution of Nonduality.m4a",
    defaultBackgroundMusic: "bg5" // Transcendence
  },
  {
    id: "6",
    title: "The Edge of Evolution",
    description: "Exploring the cutting edge of human consciousness and spiritual development",
    duration: 4080, // ~68 minutes
    audioUrl: "/audio/The Edge of Evolution.m4a",
    defaultBackgroundMusic: "bg6" // Luminescence
  },
  {
    id: "7",
    title: "Realigning the Soul",
    description: "The process of aligning our deepest essence with the highest truth and purpose",
    duration: 4680, // ~78 minutes
    audioUrl: "/audio/Realigning the Soul.m4a",
    defaultBackgroundMusic: "bg7" // Expansion
  },
  {
    id: "8",
    title: "Rational Idealism",
    description: "Bridging the gap between intellectual understanding and spiritual realization",
    duration: 3420, // ~57 minutes
    audioUrl: "/audio/Rational Idealism.m4a",
    defaultBackgroundMusic: "bg8" // Aura
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

interface AudioPlayerProps {
  initialTrackIndex?: number;
}

export function AudioPlayer({ initialTrackIndex = 0 }: AudioPlayerProps) {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(initialTrackIndex);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [volume, setVolume] = useState(1);
  const [backgroundMusic, setBackgroundMusic] = useState<string | null>(null);
  const [isBackgroundMusicPlaying, setIsBackgroundMusicPlaying] = useState(true);
  const [backgroundMusicVolume, setBackgroundMusicVolume] = useState(0.2);
  const [selectedBackgroundTrack, setSelectedBackgroundTrack] = useState<string | null>(null);
  const [lastPlayingBackgroundTrack, setLastPlayingBackgroundTrack] = useState<string | null>(null);
  const [autoActivateBackgroundMusic, setAutoActivateBackgroundMusic] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isCaptionsActive, setIsCaptionsActive] = useState(false);
  const [captions, setCaptions] = useState<Caption[]>([]);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const backgroundAudioRef = useRef<HTMLAudioElement>(null);

  const track = mockTracks[currentTrack];

  // Initialize audio element with initial track
  useEffect(() => {
    const audio = audioRef.current;
    console.log('🎵 [AUDIO SYNC] Initializing audio element:', {
      hasAudio: !!audio,
      currentSrc: audio?.src,
      expectedSrc: track.audioUrl,
      trackTitle: track.title,
      trackIndex: currentTrack,
      timestamp: new Date().toISOString()
    });
    
    if (audio && !audio.src) {
      console.log('🎵 [AUDIO SYNC] Setting initial audio source and loading');
      audio.src = track.audioUrl;
      audio.load();
      
      // Mobile browser optimization: preload metadata
      audio.preload = 'metadata';
      
      // Add mobile-specific audio attributes
      audio.setAttribute('playsinline', 'true');
      audio.setAttribute('webkit-playsinline', 'true');
      
      console.log('🎵 [AUDIO SYNC] Audio element initialized:', {
        src: audio.src,
        preload: audio.preload,
        playsinline: audio.getAttribute('playsinline'),
        webkitPlaysinline: audio.getAttribute('webkit-playsinline'),
        timestamp: new Date().toISOString()
      });
    } else if (audio && audio.src) {
      console.log('🎵 [AUDIO SYNC] Audio element already has source:', {
        src: audio.src,
        timestamp: new Date().toISOString()
      });
    } else {
      console.warn('🎵 [AUDIO SYNC] Audio element not found during initialization');
    }
  }, []); // Run once on mount

  // Mobile audio context initialization
  useEffect(() => {
    const initMobileAudio = () => {
      const audio = audioRef.current;
      const backgroundAudio = backgroundAudioRef.current;
      
      if (audio) {
        // Prepare audio for mobile playback
        audio.muted = false;
        audio.volume = volume;
        
        // Ensure mobile-specific attributes are set
        audio.setAttribute('playsinline', 'true');
        audio.setAttribute('webkit-playsinline', 'true');
        audio.setAttribute('controls', 'false');
        
        // Try to create audio context for mobile browsers
        try {
          const audioContext = getAudioContext();
          if (audioContext && audioContext.state === 'suspended') {
            // Audio context is suspended, will resume on user interaction
          }
        } catch (e) {
          // Audio context not available
        }
      }
      
      if (backgroundAudio) {
        // Prepare background audio for mobile playback
        backgroundAudio.muted = false;
        backgroundAudio.volume = backgroundMusicVolume;
        backgroundAudio.setAttribute('playsinline', 'true');
        backgroundAudio.setAttribute('webkit-playsinline', 'true');
        backgroundAudio.setAttribute('controls', 'false');
      }
    };

    initMobileAudio();
  }, [hasUserInteracted, volume, backgroundMusicVolume]);

  // Consolidated audio event handling
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      const newTime = audio.currentTime;
      console.log('🎵 [AUDIO SYNC] timeupdate event:', {
        currentTime: newTime,
        duration: audio.duration,
        readyState: audio.readyState,
        paused: audio.paused,
        timestamp: new Date().toISOString()
      });
      setCurrentTime(newTime);
    };
    
    const updateDuration = () => {
      console.log('🎵 [AUDIO SYNC] loadedmetadata event:', {
        duration: audio.duration,
        src: audio.src,
        readyState: audio.readyState,
        timestamp: new Date().toISOString()
      });
      setDuration(audio.duration);
    };
    
    const handlePlay = () => {
      console.log('🎵 [AUDIO SYNC] play event fired:', {
        currentTime: audio.currentTime,
        duration: audio.duration,
        src: audio.src,
        readyState: audio.readyState,
        timestamp: new Date().toISOString()
      });
      setIsPlaying(true);
    };
    
    const handlePause = () => {
      console.log('🎵 [AUDIO SYNC] pause event fired:', {
        currentTime: audio.currentTime,
        duration: audio.duration,
        src: audio.src,
        timestamp: new Date().toISOString()
      });
      setIsPlaying(false);
    };
    
    const handleEnded = () => {
      console.log('🎵 [AUDIO SYNC] ended event fired, calling handleNext(true)');
      handleNext(true);
    };
    
    const handleError = (e: Event) => {
      console.error('🎵 [AUDIO SYNC] Audio error event:', {
        error: e,
        src: audio.src,
        readyState: audio.readyState,
        timestamp: new Date().toISOString()
      });
    };
    
    const handleLoadStart = () => {
      console.log('🎵 [AUDIO SYNC] loadstart event:', {
        src: audio.src,
        readyState: audio.readyState,
        timestamp: new Date().toISOString()
      });
    };
    
    const handleCanPlay = () => {
      console.log('🎵 [AUDIO SYNC] canplay event:', {
        src: audio.src,
        readyState: audio.readyState,
        duration: audio.duration,
        timestamp: new Date().toISOString()
      });
    };
    
    const handleCanPlayThrough = () => {
      console.log('🎵 [AUDIO SYNC] canplaythrough event:', {
        src: audio.src,
        readyState: audio.readyState,
        duration: audio.duration,
        timestamp: new Date().toISOString()
      });
    };

    // Add all event listeners
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('canplaythrough', handleCanPlayThrough);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('canplaythrough', handleCanPlayThrough);
    };
  }, [currentTrack]); // Removed isPlaying dependency to prevent listener recreation

  // Handle background music playback and volume
  useEffect(() => {
    const backgroundAudio = backgroundAudioRef.current;
    
    console.log('🎵 [AUDIO SYNC] Background music effect triggered:', {
      hasBackgroundAudio: !!backgroundAudio,
      isBackgroundMusicPlaying,
      backgroundMusic,
      backgroundAudioSrc: backgroundAudio?.src,
      backgroundAudioPaused: backgroundAudio?.paused,
      backgroundAudioCurrentTime: backgroundAudio?.currentTime,
      backgroundAudioReadyState: backgroundAudio?.readyState,
      timestamp: new Date().toISOString()
    });
    
    if (!backgroundAudio) {
      console.warn('🎵 [AUDIO SYNC] Background audio element not found');
      return;
    }

    if (isBackgroundMusicPlaying && backgroundMusic) {
      console.log('🎵 [AUDIO SYNC] Attempting to play background music:', {
        src: backgroundAudio.src,
        readyState: backgroundAudio.readyState,
        currentTime: backgroundAudio.currentTime,
        paused: backgroundAudio.paused,
        timestamp: new Date().toISOString()
      });
      
      // Don't set volume here - let the volume handlers manage it
      // backgroundAudio.volume = volume * backgroundMusicVolume;
      backgroundAudio.play().then(() => {
        console.log('🎵 [AUDIO SYNC] Background music play() promise resolved:', {
          src: backgroundAudio.src,
          currentTime: backgroundAudio.currentTime,
          paused: backgroundAudio.paused,
          timestamp: new Date().toISOString()
        });
      }).catch((error) => {
        console.error('🎵 [AUDIO SYNC] Background music play() failed:', {
          error,
          src: backgroundAudio.src,
          readyState: backgroundAudio.readyState,
          timestamp: new Date().toISOString()
        });
      });
    } else {
      console.log('🎵 [AUDIO SYNC] Pausing background music:', {
        reason: !isBackgroundMusicPlaying ? 'isBackgroundMusicPlaying is false' : 'no backgroundMusic',
        src: backgroundAudio.src,
        currentTime: backgroundAudio.currentTime,
        timestamp: new Date().toISOString()
      });
      backgroundAudio.pause();
    }
  }, [backgroundMusic, isBackgroundMusicPlaying]); // Keep backgroundMusic dependency for playback

  // Ensure volume is properly applied to audio elements
  useEffect(() => {
    const audio = audioRef.current;
    const backgroundAudio = backgroundAudioRef.current;
    
    if (audio) {
      audio.volume = volume;
    }
    
    if (backgroundAudio && backgroundMusic) {
      const bgVolume = volume * backgroundMusicVolume;
      backgroundAudio.volume = bgVolume;
    }
  }, [volume, backgroundMusicVolume, backgroundMusic]);

  // Auto-activate default background music for the first track on mount
  useEffect(() => {
    if (isBackgroundMusicPlaying && !backgroundMusic) {
      activateDefaultBackgroundMusic(0);
    }
  }, []); // Empty dependency array means this runs once on mount

  // Load captions for the current track
  useEffect(() => {
    const loadCaptions = async () => {
      try {
        // Map track indices to actual SRT file names
        const srtFileMap = [
          "Transcript-What-is-Ego-Death-mp3.srt",
          "Transcript-What-is-Nonduality-mp3.srt", 
          "Transcript-The-Four-Selves-mp3.srt",
          "Transcript-Realization-and-Transformation-mp3.srt",
          "Transcript-The-Evolution-of-Nonduality-mp3.srt",
          "Transcript-The-Edge-of-Evolution-mp3.srt",
          "Transcript-Realigning-the-Soul-mp3.srt",
          "Transcript-Rational-Idealism-mp3.srt"
        ];
        
        const srtFileName = srtFileMap[currentTrack];
        if (srtFileName) {
          const srtResponse = await fetch(`/transcripts/${srtFileName}`);
          if (srtResponse.ok) {
            const srtContent = await srtResponse.text();
            // Check if the response is actually SRT content (not HTML from 404)
            if (srtContent.includes('-->') && !srtContent.includes('<!DOCTYPE')) {
              const captionData = parseSrtFile(srtContent);
              setCaptions(captionData);
              return;
            }
          }
        }
        
        // No captions found
        setCaptions([]);
      } catch (error) {
        setCaptions([]);
      }
    };

    loadCaptions();
  }, [currentTrack]);



  // Update URL on initial load if we have an initial track index
  useEffect(() => {
    if (initialTrackIndex > 0) {
      updateTrackUrl(initialTrackIndex);
    }
  }, [initialTrackIndex]);

  // Centralized function to stop all audio playback
  const stopAllAudio = () => {
    console.log('🎵 [AUDIO SYNC] stopAllAudio called:', {
      currentTrack,
      trackTitle: track.title,
      isPlaying,
      currentTime,
      audioSrc: audioRef.current?.src,
      audioCurrentTime: audioRef.current?.currentTime,
      audioPaused: audioRef.current?.paused,
      backgroundMusic,
      backgroundAudioSrc: backgroundAudioRef.current?.src,
      backgroundAudioCurrentTime: backgroundAudioRef.current?.currentTime,
      backgroundAudioPaused: backgroundAudioRef.current?.paused,
      timestamp: new Date().toISOString()
    });
    
    // Stop main audio
    const audio = audioRef.current;
    if (audio) {
      console.log('🎵 [AUDIO SYNC] Stopping main audio:', {
        src: audio.src,
        currentTime: audio.currentTime,
        paused: audio.paused,
        readyState: audio.readyState,
        timestamp: new Date().toISOString()
      });
      audio.pause();
      audio.currentTime = 0;
    } else {
      console.warn('🎵 [AUDIO SYNC] Main audio element not found in stopAllAudio');
    }
    
    // Stop background audio
    const backgroundAudio = backgroundAudioRef.current;
    if (backgroundAudio) {
      console.log('🎵 [AUDIO SYNC] Stopping background audio:', {
        src: backgroundAudio.src,
        currentTime: backgroundAudio.currentTime,
        paused: backgroundAudio.paused,
        readyState: backgroundAudio.readyState,
        timestamp: new Date().toISOString()
      });
      backgroundAudio.pause();
      backgroundAudio.currentTime = 0;
    } else {
      console.log('🎵 [AUDIO SYNC] Background audio element not found in stopAllAudio');
    }
    
    // Update state to reflect stopped audio
    console.log('🎵 [AUDIO SYNC] Updating state to reflect stopped audio');
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    console.log('🎵 [AUDIO SYNC] togglePlay called:', {
      isPlaying,
      currentTrack,
      trackTitle: track.title,
      audioSrc: audio.src,
      audioReadyState: audio.readyState,
      audioCurrentTime: audio.currentTime,
      audioPaused: audio.paused,
      backgroundMusic,
      isBackgroundMusicPlaying,
      timestamp: new Date().toISOString()
    });

    // Mark that user has interacted with audio
    setHasUserInteracted(true);

    // Resume audio context if suspended (important for mobile/production)
    const resumeAudioContext = async () => {
      try {
        const audioContext = getAudioContext();
        if (audioContext && audioContext.state === 'suspended') {
          console.log('🎵 [AUDIO SYNC] Resuming suspended audio context in togglePlay');
          await audioContext.resume();
          console.log('🎵 [AUDIO SYNC] Audio context resumed successfully in togglePlay');
        } else {
          console.log('🎵 [AUDIO SYNC] Audio context state in togglePlay:', audioContext?.state);
        }
      } catch (e) {
        console.warn('🎵 [AUDIO SYNC] Audio context resume failed in togglePlay:', e);
      }
    };

    if (isPlaying) {
      console.log('🎵 [AUDIO SYNC] Pausing audio and background music');
      // Pause current audio and background music
      audio.pause();
      setIsPlaying(false);
      
      // Pause background music if it's active
      if (backgroundAudioRef.current && isBackgroundMusicPlaying) {
        console.log('🎵 [AUDIO SYNC] Pausing background music');
        backgroundAudioRef.current.pause();
      }
    } else {
      console.log('🎵 [AUDIO SYNC] Starting audio playback');
      // Resume audio context first
      resumeAudioContext();
      
      // Ensure audio has the correct source and is loaded
      if (audio.src !== track.audioUrl) {
        console.log('🎵 [AUDIO SYNC] Audio source mismatch, updating:', {
          currentSrc: audio.src,
          expectedSrc: track.audioUrl,
          timestamp: new Date().toISOString()
        });
        audio.src = track.audioUrl;
        audio.load();
      }

      // For mobile browsers, we need to ensure the audio is properly loaded and ready
      const playAudio = () => {
        console.log('🎵 [AUDIO SYNC] playAudio function called:', {
          audioReadyState: audio.readyState,
          audioSrc: audio.src,
          audioCurrentTime: audio.currentTime,
          timestamp: new Date().toISOString()
        });
        
        // Force load the audio if it's not ready
        if (audio.readyState < 2) {
          console.log('🎵 [AUDIO SYNC] Audio not ready, forcing load');
          audio.load();
        }
        
        setIsPlaying(true);
        
        audio.play().then(() => {
          console.log('🎵 [AUDIO SYNC] Main audio play() promise resolved in togglePlay:', {
            audioCurrentTime: audio.currentTime,
            audioPaused: audio.paused,
            audioDuration: audio.duration,
            timestamp: new Date().toISOString()
          });
          
          // If background music is enabled and should be active, activate the default background music
          if (isBackgroundMusicPlaying && autoActivateBackgroundMusic && !backgroundMusic) {
            console.log('🎵 [AUDIO SYNC] Activating default background music in togglePlay');
            activateDefaultBackgroundMusic(currentTrack);
          }
          
          // If background music is set but not playing, try to start it now (user interaction allows it)
          if (backgroundMusic && isBackgroundMusicPlaying && backgroundAudioRef.current) {
            console.log('🎵 [AUDIO SYNC] Starting existing background music in togglePlay');
            backgroundAudioRef.current.play().then(() => {
              console.log('🎵 [AUDIO SYNC] Background music started successfully in togglePlay');
            }).catch((error) => {
              console.error('🎵 [AUDIO SYNC] Background music start failed in togglePlay:', error);
            });
          }
        }).catch((error) => {
          console.error('🎵 [AUDIO SYNC] Audio play failed in togglePlay:', error);
          setIsPlaying(false);
          
          // On mobile, if play fails, try to load and play again
          audio.load();
          setTimeout(() => {
            audio.play().then(() => {
              console.log('🎵 [AUDIO SYNC] Audio retry successful in togglePlay');
              setIsPlaying(true);
            }).catch((retryError) => {
              console.error('🎵 [AUDIO SYNC] Audio retry play failed in togglePlay:', retryError);
              setIsPlaying(false);
            });
          }, 100);
        });
      };

      // Always try to play immediately for better mobile experience
      playAudio();
    }
  };

  const handlePrevious = (autoPlay: boolean = false) => {
    const newTrackIndex = currentTrack === 0 ? mockTracks.length - 1 : currentTrack - 1;
    
    
    // Stop all audio immediately using centralized function
    stopAllAudio();
    
    // Update track state immediately
    setCurrentTrack(newTrackIndex);
    updateTrackUrl(newTrackIndex);
    
    // Load and potentially play the new track
    const audio = audioRef.current;
    if (audio) {
      // Set new audio source immediately
      audio.src = mockTracks[newTrackIndex].audioUrl;
      audio.load();
      
      // Mark user interaction for mobile browsers
      setHasUserInteracted(true);
      
      // Only auto-play if explicitly requested (like when a track ends naturally)
      // Do NOT auto-play when user manually clicks next/previous buttons
      if (autoPlay) {
        const playPrevTrack = async () => {
          
          // Resume audio context if suspended (important for mobile/production)
          try {
            const audioContext = getAudioContext();
            if (audioContext && audioContext.state === 'suspended') {
              await audioContext.resume();
            }
          } catch (e) {
            console.warn('Audio context resume failed:', e);
          }
          
          audio.play().then(() => {
            // Note: setIsPlaying(true) is handled by the 'play' event listener
            
            // Handle background music for the new track
            if (isBackgroundMusicPlaying) {
              activateDefaultBackgroundMusic(newTrackIndex);
            }
          }).catch((error) => {
            console.error('Previous track play failed:', error);
            setIsPlaying(false);
          });
        };
        
        // Check if audio is ready to play, or wait for it
        if (audio.readyState >= 2) {
          playPrevTrack();
        } else {
          const handleCanPlay = () => {
            audio.removeEventListener('canplay', handleCanPlay);
            playPrevTrack();
          };
          audio.addEventListener('canplay', handleCanPlay);
        }
      }
    }
  };

  const handleNext = (autoPlay: boolean = false) => {
    const newTrackIndex = currentTrack === mockTracks.length - 1 ? 0 : currentTrack + 1;
    
    console.log('🎵 [AUDIO SYNC] handleNext called:', {
      autoPlay,
      currentTrack,
      newTrackIndex,
      currentTrackTitle: mockTracks[currentTrack]?.title,
      newTrackTitle: mockTracks[newTrackIndex]?.title,
      isPlaying,
      currentTime,
      audioReadyState: audioRef.current?.readyState,
      audioSrc: audioRef.current?.src,
      backgroundMusic,
      isBackgroundMusicPlaying,
      timestamp: new Date().toISOString()
    });
    
    // Stop all audio immediately using centralized function
    stopAllAudio();
    
    // Update track state immediately
    setCurrentTrack(newTrackIndex);
    updateTrackUrl(newTrackIndex);
    
    console.log('🎵 [AUDIO SYNC] Track state updated:', {
      newTrackIndex,
      newTrackUrl: mockTracks[newTrackIndex]?.audioUrl,
      timestamp: new Date().toISOString()
    });
    
    // Load and potentially play the new track
    const audio = audioRef.current;
    if (audio) {
      // Set new audio source immediately
      audio.src = mockTracks[newTrackIndex].audioUrl;
      audio.load();
      
      console.log('🎵 [AUDIO SYNC] Audio source set and loaded:', {
        newSrc: audio.src,
        readyState: audio.readyState,
        timestamp: new Date().toISOString()
      });
      
      // Mark user interaction for mobile browsers
      setHasUserInteracted(true);
      
      // Only auto-play if explicitly requested (like when a track ends naturally)
      // Do NOT auto-play when user manually clicks next/previous buttons
      if (autoPlay) {
        console.log('🎵 [AUDIO SYNC] Auto-play requested, preparing to play next track');
        
        const playNextTrack = async () => {
          console.log('🎵 [AUDIO SYNC] playNextTrack function called:', {
            audioReadyState: audio.readyState,
            audioSrc: audio.src,
            audioCurrentTime: audio.currentTime,
            audioPaused: audio.paused,
            timestamp: new Date().toISOString()
          });
          
          // Resume audio context if suspended (important for mobile/production)
          try {
            const audioContext = getAudioContext();
            if (audioContext && audioContext.state === 'suspended') {
              console.log('🎵 [AUDIO SYNC] Resuming suspended audio context');
              await audioContext.resume();
              console.log('🎵 [AUDIO SYNC] Audio context resumed successfully');
            } else {
              console.log('🎵 [AUDIO SYNC] Audio context state:', audioContext?.state);
            }
          } catch (e) {
            console.warn('🎵 [AUDIO SYNC] Audio context resume failed:', e);
          }
          
          console.log('🎵 [AUDIO SYNC] Attempting to play audio...');
          audio.play().then(() => {
            console.log('🎵 [AUDIO SYNC] Audio play() promise resolved successfully:', {
              audioCurrentTime: audio.currentTime,
              audioPaused: audio.paused,
              audioDuration: audio.duration,
              timestamp: new Date().toISOString()
            });
            
            // Note: setIsPlaying(true) is handled by the 'play' event listener
            
            // Handle background music for the new track
            if (isBackgroundMusicPlaying) {
              console.log('🎵 [AUDIO SYNC] Activating default background music for new track');
              activateDefaultBackgroundMusic(newTrackIndex);
            }
          }).catch((error) => {
            console.error('🎵 [AUDIO SYNC] Next track play failed:', error);
            setIsPlaying(false);
          });
        };
        
        // Check if audio is ready to play, or wait for it
        if (audio.readyState >= 2) {
          console.log('🎵 [AUDIO SYNC] Audio ready, calling playNextTrack immediately');
          playNextTrack();
        } else {
          console.log('🎵 [AUDIO SYNC] Audio not ready, waiting for canplay event');
          const handleCanPlay = () => {
            console.log('🎵 [AUDIO SYNC] canplay event fired, removing listener and playing');
            audio.removeEventListener('canplay', handleCanPlay);
            playNextTrack();
          };
          audio.addEventListener('canplay', handleCanPlay);
        }
      } else {
        console.log('🎵 [AUDIO SYNC] Auto-play not requested, track loaded but not playing');
      }
    } else {
      console.error('🎵 [AUDIO SYNC] Audio element not found!');
    }
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    // Mark that user has interacted with audio
    setHasUserInteracted(true);
    
    const newTime = value[0];
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const activateDefaultBackgroundMusic = (trackIndex: number) => {
    const track = mockTracks[trackIndex];
    
    console.log('🎵 [AUDIO SYNC] activateDefaultBackgroundMusic called:', {
      trackIndex,
      trackTitle: track.title,
      defaultBackgroundMusic: track.defaultBackgroundMusic,
      autoActivateBackgroundMusic,
      backgroundMusic,
      isBackgroundMusicPlaying,
      timestamp: new Date().toISOString()
    });
    
    if (track.defaultBackgroundMusic && autoActivateBackgroundMusic) {
      const bgTrack = backgroundMusicTracks.find(bg => bg.id === track.defaultBackgroundMusic);
      if (bgTrack) {
        console.log('🎵 [AUDIO SYNC] Found background track:', {
          bgTrackId: bgTrack.id,
          bgTrackTitle: bgTrack.title,
          bgTrackUrl: bgTrack.audioUrl,
          timestamp: new Date().toISOString()
        });
        
        // Stop current background music before switching
        const backgroundAudio = backgroundAudioRef.current;
        if (backgroundAudio) {
          console.log('🎵 [AUDIO SYNC] Stopping current background music:', {
            currentSrc: backgroundAudio.src,
            currentTime: backgroundAudio.currentTime,
            paused: backgroundAudio.paused,
            timestamp: new Date().toISOString()
          });
          backgroundAudio.pause();
          backgroundAudio.currentTime = 0;
        }
        
        // Set the new background music source
        setBackgroundMusic(bgTrack.audioUrl);
        setIsBackgroundMusicPlaying(true);
        setSelectedBackgroundTrack(bgTrack.id);
        
        console.log('🎵 [AUDIO SYNC] Background music state updated:', {
          newBackgroundMusic: bgTrack.audioUrl,
          isBackgroundMusicPlaying: true,
          selectedBackgroundTrack: bgTrack.id,
          timestamp: new Date().toISOString()
        });
        
        // Update the background audio element source
        if (backgroundAudio) {
          backgroundAudio.src = bgTrack.audioUrl;
          backgroundAudio.load();
          
          console.log('🎵 [AUDIO SYNC] Background audio element updated:', {
            newSrc: backgroundAudio.src,
            readyState: backgroundAudio.readyState,
            timestamp: new Date().toISOString()
          });
        }
      } else {
        console.warn('🎵 [AUDIO SYNC] Background track not found:', track.defaultBackgroundMusic);
      }
    } else {
      console.log('🎵 [AUDIO SYNC] Skipping background music activation:', {
        hasDefaultBackgroundMusic: !!track.defaultBackgroundMusic,
        autoActivateBackgroundMusic,
        timestamp: new Date().toISOString()
      });
    }
  };

  const handleTrackSelect = (trackIndex: number) => {
    
    // Stop all audio immediately using centralized function
    stopAllAudio();
    
    // Update track state immediately
    setCurrentTrack(trackIndex);
    setIsDrawerOpen(false); // Ensure drawer closes on mobile
    updateTrackUrl(trackIndex);
    
    // Load and play the new track
    const audio = audioRef.current;
    if (audio) {
      const newAudioUrl = mockTracks[trackIndex].audioUrl;
      
      // Set the new audio source immediately
      audio.src = newAudioUrl;
      audio.load();
      
      // Mark that user has interacted (since they selected a track)
      setHasUserInteracted(true);
      
      // Try to play the track when selected (user explicitly selected it)
      const playNewTrack = async () => {
        
        // Resume audio context if suspended (important for mobile/production)
        try {
          const audioContext = getAudioContext();
          if (audioContext && audioContext.state === 'suspended') {
            await audioContext.resume();
          }
        } catch (e) {
          console.warn('Audio context resume failed for selected track:', e);
        }
        
        audio.play().then(() => {
          // Note: setIsPlaying(true) is handled by the 'play' event listener
          
          // Activate default background music if background music is currently playing
          if (isBackgroundMusicPlaying) {
            activateDefaultBackgroundMusic(trackIndex);
          }
        }).catch((error) => {
          console.error('Selected track play failed:', error);
          setIsPlaying(false);
        });
      };
      
      // Check if audio is ready to play, or wait for it
      if (audio.readyState >= 2) {
        playNewTrack();
      } else {
        const handleCanPlay = () => {
          audio.removeEventListener('canplay', handleCanPlay);
          playNewTrack();
        };
        audio.addEventListener('canplay', handleCanPlay);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVolumeChange = (value: number[]) => {
    
    const newVolume = value[0];
    
    setVolume(newVolume);
    
    // Check if browser supports volume control (some mobile browsers don't)
    const audio = audioRef.current;
    if (audio) {
      try {
        // Test if volume can be set (some mobile browsers ignore this)
        const originalVolume = audio.volume;
        audio.volume = newVolume;
        
        // Verify the volume was actually set
        if (Math.abs(audio.volume - newVolume) > 0.01) {
          console.warn('Browser does not support volume control');
        } else {
          // Main audio element not found
        }
      } catch (error) {
        console.warn('Volume control not supported:', error);
      }
    } else {
      // Background audio element not found
    }
    
    // Update background music volume to 75% of main volume
    const backgroundAudio = backgroundAudioRef.current;
    if (backgroundAudio) {
      try {
        const bgVolume = newVolume * 0.75;
        backgroundAudio.volume = bgVolume;
      } catch (error) {
        console.warn('Background volume control not supported:', error);
      }
    } else {
      // Background audio element not found
    }
  };

  const handleBackgroundMusicSelect = (trackId: string) => {
    const selectedTrack = backgroundMusicTracks.find(track => track.id === trackId);
    if (selectedTrack) {
      // Stop current background music before switching
      const backgroundAudio = backgroundAudioRef.current;
      if (backgroundAudio) {
        backgroundAudio.pause();
        backgroundAudio.currentTime = 0;
      }
      
      setBackgroundMusic(selectedTrack.audioUrl);
      setIsBackgroundMusicPlaying(true);
      setSelectedBackgroundTrack(trackId);
      setLastPlayingBackgroundTrack(trackId);
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
    // Store the current track as the last playing track before stopping
    if (selectedBackgroundTrack) {
      setLastPlayingBackgroundTrack(selectedBackgroundTrack);
    }
    setBackgroundMusic(null);
    setIsBackgroundMusicPlaying(false);
    // Keep the selectedBackgroundTrack so the purple selected state persists
    // setSelectedBackgroundTrack(null);
  };

  const resumeLastBackgroundMusic = () => {
    if (lastPlayingBackgroundTrack) {
      const lastTrack = backgroundMusicTracks.find(track => track.id === lastPlayingBackgroundTrack);
      if (lastTrack) {
        setBackgroundMusic(lastTrack.audioUrl);
        setIsBackgroundMusicPlaying(true);
        setSelectedBackgroundTrack(lastPlayingBackgroundTrack);
      }
    }
  };

  const handleBackgroundMusicVolumeChange = (value: number[]) => {
    
    const newVolume = value[0];
    
    setBackgroundMusicVolume(newVolume);
    
    if (backgroundAudioRef.current) {
      const finalVolume = newVolume * volume;
      backgroundAudioRef.current.volume = finalVolume;
    } else {
      // Background audio element not found
    }
  };

  const toggleCaptions = () => {
    setIsCaptionsActive(!isCaptionsActive);
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

  // Update URL when track changes
  const updateTrackUrl = (trackIndex: number) => {
    const slug = getTrackSlug(trackIndex);
    navigate(`/track/${slug}`, { replace: true });
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Slideshow */}
      <BackgroundSlideshow trackIndex={currentTrack} isTransitioning={isTransitioning} />

      {/* Caption Overlay */}
      <CaptionOverlay 
        isActive={isCaptionsActive}
        currentTime={currentTime}
        captions={captions}
      />



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
        isPlaying={isPlaying}
      />

      {/* Audio Element */}
      <audio 
        ref={audioRef} 
        src={track.audioUrl} 
        preload="metadata"
        playsInline
        style={{ display: 'none' }}
        onError={(e) => {
          console.error('Audio error:', e);
          console.error('Audio src:', track.audioUrl);
        }}
        onLoadStart={() => {
        }}
        onCanPlay={() => {
        }}
      />
      
      {/* Background Music Element */}
      {backgroundMusic && (
        <audio 
          ref={backgroundAudioRef} 
          src={backgroundMusic} 
          loop 
          style={{ display: 'none' }}
        />
      )}

      {/* Player Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-2 md:p-6 pb-safe-mobile md:pb-6 mb-4 md:mb-0">
        <div className="rounded-xl p-2 md:p-4 max-w-2xl">
          {/* Track Info */}
          <div className={`mb-4 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            <h2 className="text-lg md:text-xl font-semibold text-white mb-1">
              {track.title}
            </h2>
            <p className="text-xs md:text-sm text-white/70 mb-3">
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
              className="w-full mb-2 slider-thumb"
            />
            <div className="flex justify-between text-xs text-white/60">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration || track.duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1 md:gap-2 flex-nowrap overflow-x-auto">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handlePrevious(true)}
              className="text-white hover:text-[hsl(var(--control-hover))] hover:bg-white/10 h-9 w-9 md:h-12 md:w-12 flex-shrink-0"
            >
              <SkipBack className="h-4 w-4 md:h-5 md:w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlay}
              className="text-white hover:text-[hsl(var(--control-hover))] hover:bg-white/10 h-9 w-9 md:h-12 md:w-12 flex-shrink-0"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5 md:h-6 md:w-6" />
              ) : (
                <Play className="h-5 w-5 md:h-6 md:w-6 ml-0.5" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleNext(true)}
              className="text-white hover:text-[hsl(var(--control-hover))] hover:bg-white/10 h-9 w-9 md:h-12 md:w-12 flex-shrink-0"
            >
              <SkipForward className="h-4 w-4 md:h-5 md:w-5" />
            </Button>

            {/* Volume Control */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-[hsl(var(--control-hover))] hover:bg-white/10 h-9 w-9 md:h-12 md:w-12 flex-shrink-0"
                >
                  <Volume2 className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent 
                className="w-48 p-4 glass-morphism border-white/20"
                side="top"
                align="center"
                sideOffset={8}
              >
                <div className="space-y-3">
                  <div className="text-sm font-medium text-white">Volume</div>
                  <Slider
                    value={[volume]}
                    max={1}
                    step={0.01}
                    onValueChange={handleVolumeChange}
                    className="w-full slider-thumb"
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
                  className={`text-white hover:text-[hsl(var(--control-hover))] hover:bg-white/10 h-9 w-9 md:h-12 md:w-12 flex-shrink-0 ${
                    isBackgroundMusicPlaying ? 'text-[hsl(var(--accent))]' : ''
                  }`}
                >
                  <Music className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </PopoverTrigger>

            {/* Caption Control - Only show if captions are available */}
            {captions.length > 0 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleCaptions}
                className={`text-white hover:text-[hsl(var(--control-hover))] hover:bg-white/10 h-9 w-9 md:h-12 md:w-12 flex-shrink-0 ${
                  isCaptionsActive ? 'text-[hsl(var(--accent))]' : ''
                }`}
              >
                <Subtitles className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
            )}

            {/* Share Control */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsShareModalOpen(true)}
              className="text-white hover:text-[hsl(var(--control-hover))] hover:bg-white/10 h-9 w-9 md:h-12 md:w-12 flex-shrink-0"
            >
              <Share2 className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
              <PopoverContent 
                className="w-64 p-4 glass-morphism border-white/20"
                side="top"
                align="center"
                sideOffset={8}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-white">Background Music</div>
                  </div>
                  <div className="max-h-48 overflow-y-auto custom-scrollbar space-y-2">
                    {backgroundMusicTracks.map((track) => (
                      <div
                        key={track.id}
                        className={`group p-2 rounded-md cursor-pointer transition-colors ${
                          selectedBackgroundTrack === track.id
                            ? 'bg-[hsl(var(--accent))]/20 border border-[hsl(var(--accent))]/30'
                            : 'hover:bg-white/10'
                        }`}
                        onClick={() => handleBackgroundMusicSelect(track.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-white">{track.title}</div>
                            <div className="text-xs text-white/60">{track.description}</div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (selectedBackgroundTrack === track.id && isBackgroundMusicPlaying) {
                                stopBackgroundMusic();
                              } else {
                                handleBackgroundMusicSelect(track.id);
                              }
                            }}
                            className={`h-6 w-6 ${
                              selectedBackgroundTrack === track.id 
                                ? 'opacity-100' 
                                : 'opacity-0 group-hover:opacity-100'
                            } text-white hover:text-white hover:bg-white/10 transition-opacity ml-2 flex-shrink-0`}
                          >
                            {selectedBackgroundTrack === track.id && isBackgroundMusicPlaying ? (
                              <VolumeX className="h-3 w-3" />
                            ) : (
                              <Play className="h-3 w-3 ml-0.5" />
                            )}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={isBackgroundMusicPlaying ? stopBackgroundMusic : (lastPlayingBackgroundTrack ? resumeLastBackgroundMusic : null)}
                        className={`h-8 w-8 rounded-full ${
                          lastPlayingBackgroundTrack 
                            ? 'bg-white/20 hover:bg-white/30 text-white' 
                            : 'bg-white/10 hover:bg-white/20 text-white/60'
                        }`}
                        disabled={!lastPlayingBackgroundTrack}
                      >
                        {isBackgroundMusicPlaying ? (
                          <VolumeX className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4 ml-0.5" />
                        )}
                      </Button>
                      <div className="flex-1">
                        <div className={`text-xs mb-3 ${selectedBackgroundTrack ? 'text-white/60' : 'text-white/30'}`}>
                          Background Music Volume
                        </div>
                        <Slider
                          value={[backgroundMusicVolume]}
                          max={1}
                          step={0.01}
                          onValueChange={handleBackgroundMusicVolumeChange}
                          className={`w-full slider-thumb touch-manipulation ${!selectedBackgroundTrack ? 'opacity-50' : ''}`}
                          style={{ touchAction: 'none' }}
                          disabled={!selectedBackgroundTrack}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        trackTitle={track.title}
        trackSlug={getTrackSlug(currentTrack)}
      />
    </div>
  );
}