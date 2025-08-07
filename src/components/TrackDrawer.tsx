import { X, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  onTrackSelect: (index: number) => void;
}

export function TrackDrawer({
  isOpen,
  onClose,
  tracks,
  currentTrack,
  onTrackSelect
}: TrackDrawerProps) {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

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
        <div className="w-80 h-full glass-morphism border-r">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
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

          {/* Track List */}
          <ScrollArea className="h-[calc(100vh-88px)]">
            <div className="p-4">
              {tracks.map((track, index) => (
                <div
                  key={track.id}
                  className={`group cursor-pointer rounded-lg p-4 mb-3 transition-all duration-200 hover:bg-white/5 ${
                    index === currentTrack 
                      ? 'bg-[hsl(var(--primary)/0.2)] border border-[hsl(var(--primary)/0.3)]' 
                      : 'hover:bg-white/5'
                  }`}
                  onClick={() => onTrackSelect(index)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {index === currentTrack ? (
                        <div className="w-2 h-2 rounded-full bg-[hsl(var(--primary))] animate-pulse" />
                      ) : (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-8 h-8 opacity-0 group-hover:opacity-100 text-white hover:bg-white/10 transition-opacity"
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                      )}
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
                        {index === currentTrack && (
                          <span className="text-xs text-[hsl(var(--primary))] font-medium">
                            Playing
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </>
  );
}