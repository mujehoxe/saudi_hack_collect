import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sliceText = (str: string, length = 20) => {
  return str.length > length ? str.slice(0, length) + "..." : str;
};
