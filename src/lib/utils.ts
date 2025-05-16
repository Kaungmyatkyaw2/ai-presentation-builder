import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const timeAgo = (timeStamp: string) => {
  const now = new Date();
  const diffInSecond =
    Math.floor(now.getTime() - new Date(timeStamp).getTime()) / 1000;

  const intervals = [
    { label: "year", value: 60 * 60 * 24 * 365 },
    { label: "month", value: 60 * 60 * 24 * 30 },
    { label: "days", value: 60 * 60 * 24 },
    { label: "hours", value: 60 * 60 },
    { label: "mins", value: 60 },
    { label: "sec", value: 1 },
  ];

  for (let i =0;i < intervals.length;i ++) {
    const interval = intervals[i]
    const count = Math.floor(diffInSecond / interval.value)

    if (count >= 1) {
      return `${count} ${interval.label} ago`
    }
  }

  return "just now"
};
