#!/bin/bash

# AAC Medium Quality Compression Script - Fixed for spaces in filenames
# Goal: Cut file sizes by ~60% while maintaining good quality

echo "🎵 AAC Medium Quality Compression - Cut File Sizes by ~60%"
echo "=========================================================="

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

# Get all audio files using find with proper handling of spaces
echo "🔍 Finding audio files..."
audio_files=()
while IFS= read -r -d '' file; do
    audio_files+=("$file")
done < <(find public/audio -name "*.mp3" -type f -print0)

if [ ${#audio_files[@]} -eq 0 ]; then
    echo "❌ No audio files found in public/audio/"
    exit 1
fi

echo "Found ${#audio_files[@]} audio files to compress"
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

echo "🎛️ Compression Settings:"
echo "   Format: AAC (Advanced Audio Coding)"
echo "   Bitrate: 128kbps (Medium quality)"
echo "   Expected reduction: ~60% smaller"
echo "   Output format: .m4a files"
echo "   Browser support: Universal (Safari, Chrome, Firefox, Edge)"
echo ""

read -p "Press Enter to start compression, or Ctrl+C to cancel..."

echo ""
echo "🎵 Starting AAC compression at 128kbps..."
echo "This will take a few minutes depending on file sizes..."
echo ""

total_compressed=0
successful=0
failed=0

for file in "${audio_files[@]}"; do
    filename=$(basename "$file" .mp3)
    echo "Compressing: $filename.mp3"
    
    # Compress with AAC at 128kbps
    ffmpeg -i "$file" -c:a aac -b:a 128k -y "public/audio-compressed/compressed_$filename.m4a" 2>/dev/null
    
    if [ $? -eq 0 ]; then
        original_size=$(du -h "$file" | cut -f1)
        compressed_size=$(du -h "public/audio-compressed/compressed_$filename.m4a" | cut -f1)
        original_mb=$(du -m "$file" | cut -f1)
        compressed_mb=$(du -m "public/audio-compressed/compressed_$filename.m4a" | cut -f1)
        total_compressed=$((total_compressed + compressed_mb))
        reduction=$((100 - (compressed_mb * 100 / original_mb)))
        echo "  ✅ Done! $original_size → $compressed_size (${reduction}% smaller)"
        successful=$((successful + 1))
    else
        echo "  ❌ Failed to compress $filename.mp3"
        failed=$((failed + 1))
    fi
done

echo ""
echo "🎉 Compression complete!"
echo "📊 Results Summary:"
echo "   Original total: ${total_original}MB"
echo "   Compressed total: ${total_compressed}MB"
if [ $total_original -gt 0 ]; then
    echo "   Overall reduction: $((100 - (total_compressed * 100 / total_original)))%"
    echo "   Space saved: $((total_original - total_compressed))MB"
fi
echo "   Files processed: ${successful} successful, ${failed} failed"
echo ""
echo "📂 Compressed files are saved in: public/audio-compressed/"
echo ""

# Show file size comparison
echo "📋 File Size Comparison:"
for file in "${audio_files[@]}"; do
    filename=$(basename "$file" .mp3)
    original_size=$(du -h "$file" | cut -f1)
    if [ -f "public/audio-compressed/compressed_$filename.m4a" ]; then
        compressed_size=$(du -h "public/audio-compressed/compressed_$filename.m4a" | cut -f1)
        echo "   $filename: $original_size → $compressed_size"
    fi
done

echo ""
echo "💡 To use the compressed files in your React app:"
echo "   1. Replace the original files with compressed versions"
echo "   2. Or update the audio URLs in AudioPlayer.tsx to point to .m4a files"
echo ""
echo "🔍 Quality notes:"
echo "   AAC 128kbps: Good quality for spoken word content"
echo "   Minimal quality loss, excellent for podcasts/lectures"
echo "   Browser support: Universal (Safari, Chrome, Firefox, Edge)"
echo ""
echo "🎯 Next steps:"
echo "   1. Listen to a few compressed files to verify quality"
echo "   2. If satisfied, replace original files or update app URLs"
echo "   3. Enjoy 60% smaller file sizes!"
