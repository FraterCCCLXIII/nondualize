import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
        <span className="text-white font-bold text-sm">AC</span>
      </div>
      <span className="text-xl font-bold text-white hidden sm:block">
        Andrew Cohen
      </span>
    </Link>
  );
};

export default Logo;
