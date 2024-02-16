import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function hslToHex(hsl: string) {
  const splitHsl = hsl.split(' ');
  const h = parseFloat(splitHsl[0]);
  const s = parseFloat(splitHsl[1].split('%')[0]);
  let l = parseFloat(splitHsl[2].split('%')[0]);

  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0'); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export function cssVar(name: string) {
  const hsl = getComputedStyle(document.documentElement).getPropertyValue(name);
  return hslToHex(hsl);
}

// Rounds time to nearest 15 minutes and converts to HH:MM string format
export const getTimeString = (hours: number) => {
  const dateTime = new Date(Math.round(new Date().setHours(hours) / 9e5) * 9e5);
  const time = dateTime.toTimeString().split(':', 2);
  return time.join(':');
};

export async function checkImageExists(url: string) {
  const res = await fetch(url);
  const buff = await res.blob();

  return buff.type.startsWith('image/');
}
