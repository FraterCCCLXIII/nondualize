# Awakening with Andrew Cohen

A meditation and spiritual teachings application featuring audio tracks from Andrew Cohen with immersive background visuals and ambient music.

## Features

- **Audio Meditation Tracks**: 8 curated meditation sessions from Andrew Cohen
- **Background Music**: Ambient music tracks that auto-activate with each meditation
- **Immersive Visuals**: Ken Burns slideshow with themed images for each track
- **Volume Controls**: Independent volume control for main audio and background music
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd andrew-visions-zen

# Step 3: Install the necessary dependencies
npm i

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

## Project Structure

```
src/
├── components/          # React components
│   ├── AudioPlayer.tsx # Main audio player
│   ├── TrackDrawer.tsx # Track selection drawer
│   ├── BackgroundSlideshow.tsx # Visual slideshow
│   └── ui/            # shadcn/ui components
├── pages/             # Page components
├── assets/            # Image assets
└── lib/              # Utility functions
```

## Audio Files

Place your audio files in the following directories:
- **Main tracks**: `public/audio/`
- **Background music**: `public/background-music/`

## Deployment

This project can be deployed to any static hosting service like:
- Vercel
- Netlify
- GitHub Pages
- AWS S3

## License

This project is for personal use and spiritual practice.
