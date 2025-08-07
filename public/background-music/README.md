# Background Music

This directory contains background music tracks that can be played alongside the meditation audio.

## File Structure

Place your background music files here with descriptive names:
- `ambient-nature.mp3` - Gentle nature sounds
- `cosmic-ambient.mp3` - Space/meditation ambient
- `zen-garden.mp3` - Peaceful garden sounds
- `ocean-waves.mp3` - Calming ocean waves
- `forest-birds.mp3` - Forest ambience with birds
- `meditation-bells.mp3` - Soft meditation bells
- `crystal-harmonics.mp3` - Crystal bowl harmonics
- `rain-meditation.mp3` - Gentle rain sounds

## Supported Formats

- MP3 (recommended for web compatibility)
- WAV
- OGG
- M4A

## Volume Settings

- Background music is automatically set to 75% of the main audio volume
- This ensures the background music doesn't overpower the meditation content
- Volume adjusts dynamically when main audio volume changes

## Usage

1. Add your background music files to this directory
2. Update the `backgroundMusicTracks` array in `src/components/AudioPlayer.tsx`
3. Ensure the `audioUrl` path matches your file name
4. Add appropriate title and description

## Recommended Characteristics

- **Loop-friendly**: Tracks should loop seamlessly
- **Non-intrusive**: Should complement, not distract from main audio
- **Consistent volume**: All tracks should have similar base volume levels
- **Long duration**: 5-10 minutes minimum for smooth looping 