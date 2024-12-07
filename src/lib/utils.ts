import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import crypto from "crypto";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hashValue(inputValue: string | number) {
  return crypto
    .createHash("sha256")
    .update(inputValue.toString())
    .digest("hex");
}
