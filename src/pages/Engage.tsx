import EncapsulatedAudioPlayer from "@/components/EncapsulatedAudioPlayer";
import Navigation from "@/components/Navigation";

const Engage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-6 text-white">Engage</h1>
          <p className="text-lg text-white/80">
            Connect and engage with the community and resources.
          </p>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <EncapsulatedAudioPlayer />
      </div>
    </div>
  );
};

export default Engage;
