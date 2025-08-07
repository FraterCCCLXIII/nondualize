import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface Caption {
  start: number;
  end: number;
  text: string;
}

/**
 * Parses an SRT subtitle file and converts it to the caption format used by the application.
 * SRT format: sequence number, timestamp range, text, blank line
 */
export function parseSrtFile(srtContent: string): Caption[] {
  const captions: Caption[] = [];
  const blocks = srtContent.trim().split('\n\n');
  
  for (const block of blocks) {
    const lines = block.split('\n').filter(line => line.trim());
    if (lines.length < 3) continue;
    
    // Skip the sequence number (first line)
    const timestampLine = lines[1];
    const textLines = lines.slice(2);
    
    // Parse timestamp line (format: "00:00:01,022 --> 00:00:02,625")
    const timestampMatch = timestampLine.match(/(\d{2}):(\d{2}):(\d{2}),(\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2}),(\d{3})/);
    if (!timestampMatch) continue;
    
    const [, startH, startM, startS, startMs, endH, endM, endS, endMs] = timestampMatch;
    
    const start = parseInt(startH) * 3600 + parseInt(startM) * 60 + parseInt(startS) + parseInt(startMs) / 1000;
    const end = parseInt(endH) * 3600 + parseInt(endM) * 60 + parseInt(endS) + parseInt(endMs) / 1000;
    
    // Combine all text lines and clean up speaker labels
    const text = textLines
      .join(' ')
      .replace(/^Speaker \d+:\s*/g, '') // Remove speaker labels
      .trim();
    
    if (text) {
      captions.push({ start, end, text });
    }
  }
  
  return captions;
}
