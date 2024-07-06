import { useBrowserAccessibilityPreferences } from "@/hooks/use-accessibility-preferences";
import { useMediaQuery } from "@/hooks/use-media-query";

export function usePrefersReducedTransparancy(): boolean {
  return useMediaQuery("(prefers-reduced-transparency: reduce)");
}
