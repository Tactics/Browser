import { useMediaQuery } from "@/hooks/use-media-query";

export function usePrefersLowContrast(): boolean {
  return useMediaQuery("(prefers-contrast: less)");
}
