# Background Slideshow System

## Overview

The BackgroundSlideshow component now supports themed image sets for each audio track. Each track has 8 carefully selected images that match the theme and content of the meditation.

## Track-Specific Image Themes

### Track 1: "What is Ego Death?"
- **Theme**: Dark, cosmic, transformative
- **Images**: Deep space, cosmic nebulae, transformative energy
- **Purpose**: Reflects the profound dissolution of the separate self

### Track 2: "What is Non-Duality?"
- **Theme**: Unity, oneness, cosmic harmony
- **Images**: Harmonious landscapes, unified cosmic scenes
- **Purpose**: Represents the fundamental unity of existence

### Track 3: "The Four Selves with Andrew Cohen"
- **Theme**: Layers, depth, transformation
- **Images**: Multi-layered scenes, depth of field, transformation
- **Purpose**: Reflects the different levels of self and their transformation

### Track 4: "Realisation and Transformation"
- **Theme**: Awakening, light, breakthrough
- **Images**: Light breaking through, awakening moments, transformation
- **Purpose**: Represents the journey from intellectual understanding to embodied awakening

### Track 5: "The Evolution of Nonduality"
- **Theme**: Evolution, growth, cosmic development
- **Images**: Evolutionary cosmic scenes, growth and development
- **Purpose**: Shows how the understanding of oneness evolves and deepens

### Track 6: "The Edge of Evolution"
- **Theme**: Cutting edge, advanced consciousness
- **Images**: Advanced cosmic scenes, cutting-edge consciousness
- **Purpose**: Represents the cutting edge of human consciousness

### Track 7: "Realigning the Soul"
- **Theme**: Alignment, harmony, soul connection
- **Images**: Harmonious alignment, soul connection scenes
- **Purpose**: Reflects aligning our deepest essence with the highest truth

### Track 8: "Rational Idealism"
- **Theme**: Balance of mind and spirit
- **Images**: Balanced cosmic and spiritual scenes
- **Purpose**: Represents bridging intellectual understanding and spiritual realization

## Technical Implementation

- Each track has exactly 8 images
- Images cycle every 8 seconds with a 2-second crossfade transition
- When switching tracks, the image set resets to the first image
- Images are imported as modules for optimal bundling
- Fallback to first image set if track index is invalid

## Image Selection Criteria

1. **Thematic Alignment**: Images must match the track's spiritual theme
2. **Visual Quality**: High-resolution, beautiful meditation-worthy images
3. **Atmospheric**: Create the right mood for deep listening
4. **Variety**: Each set includes different types of cosmic/nature scenes
5. **Harmony**: Images work well together in sequence 