# 🎵 Quick Audio Compression Commands

## **FFmpeg is now installed and ready to use!**

### **Quick Commands (run from project root):**

#### **1. Compress all audio files at once:**
```bash
./compress_audio.sh
```

#### **2. Manual compression examples:**

**MP3 compression (128kbps - good quality, smaller size):**
```bash
ffmpeg -i "public/audio/What is Ego Death.mp3" -b:a 128k "compressed_What is Ego Death.mp3"
```

**AAC compression (128kbps - better compression):**
```bash
ffmpeg -i "public/audio/What is Ego Death.mp3" -c:a aac -b:a 128k "compressed_What is Ego Death.m4a"
```

**Opus compression (96kbps - best compression):**
```bash
ffmpeg -i "public/audio/What is Ego Death.mp3" -c:a libopus -b:a 96k "compressed_What is Ego Death.opus"
```

### **Compression Quality Guide:**

| Format | Bitrate | Quality | File Size | Browser Support |
|--------|---------|---------|-----------|-----------------|
| **MP3** | 128k | Good | ~40% smaller | ✅ Excellent |
| **AAC** | 128k | Good | ~50% smaller | ✅ Excellent |
| **Opus** | 96k | Good | ~60% smaller | ⚠️ Limited |

### **Expected Results:**
- **Original files**: ~100-200MB total
- **MP3 compressed**: ~40-80MB total
- **AAC compressed**: ~30-60MB total  
- **Opus compressed**: ~20-40MB total

### **Recommendation:**
Start with **MP3 at 128kbps** for the best balance of quality, file size, and browser compatibility.

### **To use compressed files in your React app:**
1. Run the compression script
2. Replace original files with compressed versions
3. Or update `AudioPlayer.tsx` to point to compressed files

---

**Note**: The compression script will create a `public/audio-compressed/` directory with all your compressed files.
