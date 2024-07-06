import { useBrowserAccessibilityPreferences } from "@/hooks/use-accessibility-preferences";
import { useMediaQuery } from "@/hooks/use-media-query";

export function usePrefersHighContast(): boolean {
  return useMediaQuery("(prefers-contrast: more)");
}
