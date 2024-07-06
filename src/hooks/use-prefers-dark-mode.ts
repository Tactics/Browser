import { useMediaQuery } from "@/hooks/use-media-query";

export function usePrefersDarkMode(): boolean {
  return useMediaQuery("(prefers-color-scheme: dark)");
}
