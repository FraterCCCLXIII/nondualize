# Caption System Documentation

## Overview
This directory contains force-aligned caption files for each audio track. The captions are synchronized with the audio playback and provide a burn-in effect for accessibility.

## File Structure
- `track-1-captions.json` - Captions for "What is Ego Death?"
- `track-2-captions.json` - Captions for "What is Non-Duality?"
- `track-3-captions.json` - Captions for "The Four Selves with Andrew Cohen"
- `track-7-captions.srt` - Captions for "Realigning the Soul" (SRT format)
- etc.

## Caption File Format
Each caption file should be a JSON array with the following structure:

```json
[
  {
    "start": 0,
    "end": 3.5,
    "text": "What is ego death?"
  },
  {
    "start": 3.5,
    "end": 8.2,
    "text": "This is perhaps one of the most profound questions"
  }
]
```

## Fields
- **start**: Start time in seconds (float)
- **end**: End time in seconds (float)
- **text**: The caption text to display

## Adding New Captions
1. Create a new caption file following the naming convention: `track-{trackNumber}-captions.json` (JSON format) or `track-{trackNumber}-captions.srt` (SRT format)
2. Use precise timing that matches the audio content
3. Keep caption text concise and readable
4. Ensure smooth transitions between captions
5. The system will automatically try JSON format first, then SRT format if JSON is not found

## Features
- **Burn-in effect**: Captions fade in/out smoothly
- **Force-aligned**: Precise timing synchronization
- **Accessibility**: High contrast, readable text
- **Responsive**: Adapts to different screen sizes

## Technical Notes
- Captions are loaded automatically when switching tracks
- The system gracefully handles missing caption files
- Caption timing is synchronized with audio playback
- Captions can be toggled on/off via the UI
- Supports both JSON and SRT subtitle formats
- SRT files are automatically parsed and speaker labels are removed 