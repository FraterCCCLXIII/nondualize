import { useParams, useNavigate } from "react-router-dom";
import { AudioPlayer } from "@/components/AudioPlayer";

export function TrackPage() {
  const { trackSlug } = useParams();
  const navigate = useNavigate();

  // Convert slug back to track index
  const getTrackIndexFromSlug = (slug: string) => {
    const trackMap: { [key: string]: number } = {
      "what-is-ego-death": 0,
      "what-is-non-duality": 1,
      "the-four-selves": 2,
      "realisation-and-transformation": 3,
      "the-evolution-of-nonduality": 4,
      "the-edge-of-evolution": 5,
      "realigning-the-soul": 6,
      "rational-idealism": 7,
    };
    return trackMap[slug];
  };

  const trackIndex = getTrackIndexFromSlug(trackSlug || "");

  // Debug logging for routing issues
  console.log('TrackPage - trackSlug:', trackSlug, 'trackIndex:', trackIndex);

  // If invalid slug, redirect to home
  if (!trackSlug || trackIndex === undefined) {
    console.log('TrackPage - Invalid slug, redirecting to home');
    navigate("/");
    return null;
  }

  return (
    <div className="h-screen w-full">
      <AudioPlayer initialTrackIndex={trackIndex} />
    </div>
  );
} 