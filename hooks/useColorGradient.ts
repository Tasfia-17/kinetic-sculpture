
import { useMemo } from 'react';

// Helper to convert a hex color string to an [r, g, b] array
const hexToRgb = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : [0, 0, 0];
};

// Helper to convert an [r, g, b] array to a hex color string
const rgbToHex = (r: number, g: number, b: number): string => {
  return '#' + [r, g, b].map(x => {
    const hex = Math.round(x).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
};

/**
 * Custom hook to generate an array of hex color strings representing a gradient.
 * @param startColor - The starting hex color (e.g., '#ff0000').
 * @param endColor - The ending hex color (e.g., '#0000ff').
 * @param count - The number of colors to generate in the gradient.
 * @returns An array of hex color strings.
 */
export const useColorGradient = (startColor: string, endColor: string, count: number): string[] => {
  return useMemo(() => {
    if (count <= 1) {
        return [startColor];
    }

    const start = hexToRgb(startColor);
    const end = hexToRgb(endColor);
    const gradient: string[] = [];

    for (let i = 0; i < count; i++) {
      const ratio = i / (count - 1);
      const r = start[0] + ratio * (end[0] - start[0]);
      const g = start[1] + ratio * (end[1] - start[1]);
      const b = start[2] + ratio * (end[2] - start[2]);
      gradient.push(rgbToHex(r, g, b));
    }

    return gradient;
  }, [startColor, endColor, count]);
};
