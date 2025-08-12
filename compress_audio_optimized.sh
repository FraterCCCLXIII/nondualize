#!/bin/bash

# Optimized Audio Compression Script
# Goal: Cut file sizes in half while maintaining best quality

echo "🎵 Optimized Audio Compression - Cut File Sizes in Half"
echo "========================================================"

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

# Show current file sizes
echo "📊 Current file sizes:"
total_original=0
for file in "${audio_files[@]}"; do
    size=$(du -h "$file" | cut -f1)
    filename=$(basename "$file")
    echo "   $filename: $size"
    # Extract size in MB for calculation
    size_mb=$(du -m "$file" | cut -f1)
    total_original=$((total_original + size_mb))
done
echo "   Total: ${total_original}MB"
echo ""

# Compression options optimized for cutting file sizes in half
echo "🎛️ Optimized Compression Options (Goal: Cut file sizes in half):"
echo "   1. AAC - 160kbps (Excellent quality, ~50% smaller, universal support)"
echo "   2. MP3 - 192kbps (Very good quality, ~45% smaller, universal support)"
echo "   3. Opus - 128kbps (Best quality, ~60% smaller, limited browser support)"
echo ""

read -p "Choose compression option (1-3): " choice

case $choice in
    1)
        echo "🎵 Using AAC compression at 160kbps (Recommended for quality/size balance)..."
        total_compressed=0
        for file in "${audio_files[@]}"; do
            filename=$(basename "$file" .mp3)
            echo "Compressing: $filename.mp3"
            ffmpeg -i "$file" -c:a aac -b:a 160k -y "public/audio-compressed/compressed_$filename.m4a" 2>/dev/null
            if [ $? -eq 0 ]; then
                original_size=$(du -h "$file" | cut -f1)
                compressed_size=$(du -h "public/audio-compressed/compressed_$filename.m4a" | cut -f1)
                original_mb=$(du -m "$file" | cut -f1)
                compressed_mb=$(du -m "public/audio-compressed/compressed_$filename.m4a" | cut -f1)
                total_compressed=$((total_compressed + compressed_mb))
                reduction=$((100 - (compressed_mb * 100 / original_mb)))
                echo "  ✅ Done! $original_size → $compressed_size (${reduction}% smaller)"
            else
                echo "  ❌ Failed to compress $filename.mp3"
            fi
        done
        ;;
    2)
        echo "🎵 Using MP3 compression at 192kbps..."
        total_compressed=0
        for file in "${audio_files[@]}"; do
            filename=$(basename "$file")
            echo "Compressing: $filename"
            ffmpeg -i "$file" -b:a 192k -y "public/audio-compressed/compressed_$filename" 2>/dev/null
            if [ $? -eq 0 ]; then
                original_size=$(du -h "$file" | cut -f1)
                compressed_size=$(du -h "public/audio-compressed/compressed_$filename" | cut -f1)
                original_mb=$(du -m "$file" | cut -f1)
                compressed_mb=$(du -m "public/audio-compressed/compressed_$filename" | cut -f1)
                total_compressed=$((total_compressed + compressed_mb))
                reduction=$((100 - (compressed_mb * 100 / original_mb)))
                echo "  ✅ Done! $original_size → $compressed_size (${reduction}% smaller)"
            else
                echo "  ❌ Failed to compress $filename"
            fi
        done
        ;;
    3)
        echo "🎵 Using Opus compression at 128kbps..."
        total_compressed=0
        for file in "${audio_files[@]}"; do
            filename=$(basename "$file" .mp3)
            echo "Compressing: $filename.mp3"
            ffmpeg -i "$file" -c:a libopus -b:a 128k -y "public/audio-compressed/compressed_$filename.opus" 2>/dev/null
            if [ $? -eq 0 ]; then
                original_size=$(du -h "$file" | cut -f1)
                compressed_size=$(du -h "public/audio-compressed/compressed_$filename.opus" | cut -f1)
                original_mb=$(du -m "$file" | cut -f1)
                compressed_mb=$(du -m "public/audio-compressed/compressed_$filename.opus" | cut -f1)
                total_compressed=$((total_compressed + compressed_mb))
                reduction=$((100 - (compressed_mb * 100 / original_mb)))
                echo "  ✅ Done! $original_size → $compressed_size (${reduction}% smaller)"
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
echo "📊 Results Summary:"
echo "   Original total: ${total_original}MB"
echo "   Compressed total: ${total_compressed}MB"
echo "   Overall reduction: $((100 - (total_compressed * 100 / total_original)))%"
echo "   Space saved: $((total_original - total_compressed))MB"
echo ""
echo "📂 Compressed files are saved in: public/audio-compressed/"
echo ""
echo "💡 To use the compressed files in your React app:"
echo "   1. Replace the original files with compressed versions"
echo "   2. Or update the audio URLs in AudioPlayer.tsx"
echo ""
echo "🔍 Quality notes:"
case $choice in
    1)
        echo "   AAC 160kbps: Excellent quality, minimal perceptible loss"
        echo "   Browser support: Universal (Safari, Chrome, Firefox, Edge)"
        ;;
    2)
        echo "   MP3 192kbps: Very good quality, slight quality loss"
        echo "   Browser support: Universal (all browsers)"
        ;;
    3)
        echo "   Opus 128kbps: Excellent quality, minimal perceptible loss"
        echo "   Browser support: Limited (Chrome, Firefox, Edge, no Safari)"
        ;;
esac
