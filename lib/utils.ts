import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function labelize(value: string) {
  return value
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function resolveApiUrl(path: string): string {
  return path.startsWith('http') ? path : `${process.env.NEXT_PUBLIC_API_URL ?? ''}${path}`;
}
