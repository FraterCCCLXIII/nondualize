# Nondualize

An audio sanctuary for the transformative teachings of Andrew Cohen: a profound realizer and teacher on consciousness, evolution, and awakening.

This project was designed and built by Paul Bloch in memory of his teacher Andrew Cohen, creating a digital sanctuary for Andrew's transformative teachings.

## Features

- **Audio Meditation Tracks**: 8 curated meditation sessions from Andrew Cohen
- **Background Music**: Ambient music tracks that auto-activate with each meditation
- **Immersive Visuals**: Ken Burns slideshow with themed images for each track
- **Volume Controls**: Independent volume control for main audio and background music
- **Captions Support**: Optional captions for enhanced accessibility
- **Share Functionality**: Easy sharing of tracks via social media and direct links
- **Welcome Modal**: First-time user experience with instructions
- **Contact System**: Open source project with contact information
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Analytics Tracking**: User interaction tracking for insights

## Getting Started

### Prerequisites

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

```sh
# Step 1: Clone the repository
git clone https://github.com/FraterCCCLXIII/nondualize.git

# Step 2: Navigate to the project directory
cd nondualize

# Step 3: Install the necessary dependencies
npm install

# Step 4: Start the development server
npm run dev
```

## Technologies Used

This project is built with:

- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe JavaScript
- **React** - UI framework
- **shadcn/ui** - Modern component library
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Radix UI** - Accessible UI primitives
- **React Router** - Client-side routing
- **React Query** - Data fetching and caching
- **Google Analytics** - User analytics and tracking

## Project Structure

```
src/
├── components/          # React components
│   ├── AudioPlayer.tsx # Main audio player
│   ├── TrackDrawer.tsx # Track selection drawer
│   ├── BackgroundSlideshow.tsx # Visual slideshow
│   ├── WelcomeModal.tsx # First-time user experience
│   ├── ContactModal.tsx # Contact and open source info
│   ├── ShareModal.tsx # Social sharing functionality
│   ├── CaptionOverlay.tsx # Captions display
│   └── ui/            # shadcn/ui components
├── pages/             # Page components
├── assets/            # Image assets
├── hooks/            # Custom React hooks
└── lib/              # Utility functions and analytics
```

## Audio Files

Place your audio files in the following directories:
- **Main tracks**: `public/audio/` (8 meditation tracks from Andrew Cohen)
- **Background music**: `public/background-music/` (Ambient music for meditation)
- **Captions**: `public/transcripts/` (SRT files for accessibility)

## Deployment

This project is currently deployed on Vercel and can be deployed to any static hosting service like:
- Vercel
- Netlify
- GitHub Pages
- AWS S3

## Contributing

This is an open source project. Contributions and feedback are welcome!

- **Issues**: Report bugs or request features
- **Pull Requests**: Submit improvements or fixes
- **Contact**: Reach out for questions or collaboration

## Contact

For questions, feedback, or collaboration opportunities:
- **Email**: Available through the contact modal in the application
- **GitHub**: [View source code](https://github.com/FraterCCCLXIII/nondualize)

## License

This project is open source and dedicated to preserving Andrew Cohen's transformative teachings for the benefit of all seekers of truth and awakening.
