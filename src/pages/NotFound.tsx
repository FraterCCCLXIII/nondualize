import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const handleGoHome = () => {
    navigate("/", { replace: true });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/20 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 text-center p-8 max-w-2xl mx-auto">
        {/* Main Content */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-white/20 mb-4 font-cinzel">404</div>
          <h1 className="text-4xl md:text-5xl font-light text-white mb-4 font-cinzel">
            Page Not Found
          </h1>
          <p className="text-xl text-white/70 mb-2">
            The path you're seeking doesn't exist
          </p>
          <p className="text-lg text-white/50 mb-8">
            Like the journey of awakening, sometimes we must find our way back to the beginning
          </p>
        </div>

        {/* Error Details */}
        <div className="mb-8 p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
          <p className="text-sm text-white/60 mb-2">Attempted path:</p>
          <code className="text-white/80 font-mono text-sm break-all">
            {location.pathname}
          </code>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={handleGoHome}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 transition-all duration-200 backdrop-blur-sm"
          >
            <Home className="h-4 w-4" />
            Return Home
          </Button>
          
          <Button
            onClick={handleGoBack}
            variant="outline"
            className="flex items-center gap-2 px-6 py-3 text-white border-white/20 hover:bg-white/10 hover:border-white/30 transition-all duration-200 backdrop-blur-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
        </div>

        {/* Additional Help */}
        <div className="mt-8 text-center">
          <p className="text-white/40 text-sm mb-4">
            Looking for something specific?
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-sm">
            <button
              onClick={() => navigate("/track/what-is-ego-death")}
              className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors duration-200"
            >
              What is Ego Death?
            </button>
            <button
              onClick={() => navigate("/track/what-is-non-duality")}
              className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors duration-200"
            >
              What is Non-Duality?
            </button>
            <button
              onClick={() => navigate("/track/the-four-selves")}
              className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors duration-200"
            >
              The Four Selves
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
