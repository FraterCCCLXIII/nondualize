

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-10">
      {/* Main Logo - At the top of the page */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 text-center">
        <div className="flex flex-col items-center">
          <h1 className="text-xl md:text-4xl font-light text-white mb-1 font-cinzel">Awakening</h1>
          <span className="text-sm md:text-lg font-light text-white/80">with Andrew Cohen</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
