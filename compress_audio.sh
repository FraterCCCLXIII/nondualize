#!/bin/bash

# Audio Compression Script using FFmpeg
# This script will compress all audio files in the public/audio directory

echo "🎵 Audio Compression Script using FFmpeg"
echo "========================================"

# Check if FFmpeg is available
if ! command -v ffmpeg &> /dev/null; then
    echo "❌ FFmpeg is not installed. Please install it first."
    exit 1
fi

# Check if the audio directory exists
if [ ! -d "public/audio" ]; then
    echo "❌ Audio directory not found. Please run this from the project root."
    exit 1
fi

# Create output directory for compressed audio
echo "📁 Creating output directory..."
mkdir -p public/audio-compressed

# Get all audio files
audio_files=($(find public/audio -name "*.mp3" -type f))

if [ ${#audio_files[@]} -eq 0 ]; then
    echo "❌ No audio files found in public/audio/"
    exit 1
fi

echo "🔍 Found ${#audio_files[@]} audio files to compress"
echo ""

# Compression options
echo "🎛️ Compression Options:"
echo "   1. MP3 - 128kbps (good quality, smaller size)"
echo "   2. AAC - 128kbps (better compression, smaller size)"
echo "   3. Opus - 96kbps (best compression, smallest size)"
echo ""

read -p "Choose compression option (1-3): " choice

case $choice in
    1)
        echo "🎵 Using MP3 compression at 128kbps..."
        for file in "${audio_files[@]}"; do
            filename=$(basename "$file")
            echo "Compressing: $filename"
            ffmpeg -i "$file" -b:a 128k -y "public/audio-compressed/compressed_$filename" 2>/dev/null
            if [ $? -eq 0 ]; then
                original_size=$(du -h "$file" | cut -f1)
                compressed_size=$(du -h "public/audio-compressed/compressed_$filename" | cut -f1)
                echo "  ✅ Done! $original_size → $compressed_size"
            else
                echo "  ❌ Failed to compress $filename"
            fi
        done
        ;;
    2)
        echo "🎵 Using AAC compression at 128kbps..."
        for file in "${audio_files[@]}"; do
            filename=$(basename "$file" .mp3)
            echo "Compressing: $filename.mp3"
            ffmpeg -i "$file" -c:a aac -b:a 128k -y "public/audio-compressed/compressed_$filename.m4a" 2>/dev/null
            if [ $? -eq 0 ]; then
                original_size=$(du -h "$file" | cut -f1)
                compressed_size=$(du -h "public/audio-compressed/compressed_$filename.m4a" | cut -f1)
                echo "  ✅ Done! $original_size → $compressed_size"
            else
                echo "  ❌ Failed to compress $filename.mp3"
            fi
        done
        ;;
    3)
        echo "🎵 Using Opus compression at 96kbps..."
        for file in "${audio_files[@]}"; do
            filename=$(basename "$file" .mp3)
            echo "Compressing: $filename.mp3"
            ffmpeg -i "$file" -c:a libopus -b:a 96k -y "public/audio-compressed/compressed_$filename.opus" 2>/dev/null
            if [ $? -eq 0 ]; then
                original_size=$(du -h "$file" | cut -f1)
                compressed_size=$(du -h "public/audio-compressed/compressed_$filename.opus" | cut -f1)
                echo "  ✅ Done! $original_size → $compressed_size"
            else
                echo "  ❌ Failed to compress $filename.mp3"
            fi
        done
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again and choose 1, 2, or 3."
        exit 1
        ;;
esac

echo ""
echo "🎉 Compression complete!"
echo "📂 Compressed files are saved in: public/audio-compressed/"
echo ""
echo "📊 File size comparison:"
echo "   Original files: public/audio/"
echo "   Compressed files: public/audio-compressed/"
echo ""
echo "💡 To use the compressed files in your React app:"
echo "   1. Replace the original files with compressed versions"
echo "   2. Or update the audio URLs in AudioPlayer.tsx"
echo ""
echo "🔍 Note: Opus format offers the best compression but may not be supported in all browsers"
echo "   MP3 and AAC have better browser compatibility"
