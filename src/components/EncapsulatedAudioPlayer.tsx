import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AudioPlayer } from "./AudioPlayer";
import { Maximize2, Minimize2 } from "lucide-react";
import { Button } from "./ui/button";

interface EncapsulatedAudioPlayerProps {
  initialTrackIndex?: number;
}

const EncapsulatedAudioPlayer = ({ initialTrackIndex = 0 }: EncapsulatedAudioPlayerProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const handleExpand = () => {
    if (isExpanded) {
      // Collapse - go back to previous page
      navigate(-1);
    } else {
      // Expand - go to full player page
      navigate("/");
    }
    setIsExpanded(!isExpanded);
  };

  if (isExpanded) {
    return (
      <div className="fixed inset-0 z-50 bg-black">
        <div className="absolute top-4 right-4 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleExpand}
            className="text-white hover:bg-white/20"
          >
            <Minimize2 className="h-5 w-5" />
          </Button>
        </div>
        <AudioPlayer initialTrackIndex={initialTrackIndex} />
      </div>
    );
  }

  return (
    <div className="relative bg-black/80 backdrop-blur-sm border-t border-white/10">
      <div className="absolute top-2 right-2 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleExpand}
          className="text-white hover:bg-white/20"
        >
          <Maximize2 className="h-5 w-5" />
        </Button>
      </div>
      <AudioPlayer initialTrackIndex={initialTrackIndex} />
    </div>
  );
};

export default EncapsulatedAudioPlayer;
