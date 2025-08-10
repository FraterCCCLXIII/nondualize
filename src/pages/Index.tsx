import { AudioPlayer } from "@/components/AudioPlayer";
import Navigation from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <AudioPlayer />
      </div>
    </div>
  );
};

export default Index;
