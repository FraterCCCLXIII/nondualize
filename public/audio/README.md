# Audio Files

This directory contains audio files for the meditation/zen app.

## Current Track List

1. **What is Ego Death?** - Exploring the profound dissolution of the separate self
2. **What is Non-Duality?** - Understanding the fundamental unity of existence
3. **The Four Selves with Andrew Cohen** - Deep exploration of different levels of self
4. **Realisation and Transformation** - Journey from intellectual understanding to embodied awakening
5. **The Evolution of Nonduality** - How the understanding of oneness evolves and deepens
6. **The Edge of Evolution** - Exploring the cutting edge of human consciousness
7. **Realigning the Soul** - Aligning our deepest essence with the highest truth
8. **Rational Idealism** - Bridging intellectual understanding and spiritual realization

## File Structure

The audio files are named exactly as they appear in the track list:
- `What is Ego Death-.mp3`
- `What is Non-Duality-.mp3`
- `The Four Selves with Andrew Cohen.mp3`
- `Realisation and Transformation.mp3`
- `The Evolution of Nonduality.mp3`
- `The Edge of Evolution.mp3`
- `Realigning the Soul.mp3`
- `Rational Idealism.mp3`

## Supported Formats

- MP3 (recommended for web compatibility)
- WAV
- OGG
- M4A

## File Size Considerations

- Current files range from 57MB to 98MB
- These are high-quality audio files suitable for deep listening
- Consider the loading time for users on slower connections

## Adding New Tracks

1. Add your audio file to this directory
2. Update the `mockTracks` array in `src/components/AudioPlayer.tsx`
3. Ensure the `audioUrl` path matches your file name exactly
4. Update the `duration` field with the actual track length in seconds
5. Add appropriate title and description 