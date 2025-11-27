import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function ytCommand(
  iframe: HTMLIFrameElement | null,
  command: "play" | "pause"
) {
  if (!iframe) return;
  iframe.contentWindow?.postMessage(
    JSON.stringify({
      event: "command",
      func: command === "play" ? "playVideo" : "pauseVideo",
      args: [],
    }),
    "*"
  );
}
