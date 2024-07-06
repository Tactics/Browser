import { BrowserAccessibilityPreferences } from "@/accessibility/preferences";
import { useMediaQuery } from "@/hooks/use-media-query";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { usePrefersLowContrast } from "@/hooks/use-prefers-low-contrast";
import { usePrefersHighContast } from "@/hooks/use-prefers-high-contast";
import { usePrefersReducedTransparancy } from "@/hooks/use-prefers-reduced-transparancy";
import { usePrefersDarkMode } from "@/hooks/use-prefers-dark-mode";

const useBrowserAccessibilityPreferences =
  (): BrowserAccessibilityPreferences => {
    const hasReducedMotion = usePrefersReducedMotion();
    const hasHighContrast = usePrefersHighContast();
    const hasLowContrast = usePrefersLowContrast();
    const hasReducedTransparency = usePrefersReducedTransparancy();
    const hasDarkMode = usePrefersDarkMode();

    return new BrowserAccessibilityPreferences(
      hasReducedMotion,
      hasHighContrast,
      hasLowContrast,
      hasReducedTransparency,
      hasDarkMode,
    );
  };

export { useBrowserAccessibilityPreferences };
