export type prefersReducedMotion = "no-preference" | "reduce";
export type prefersContrast = "no-preference" | "more" | "less" | "custom";
export type prefersReducedTransparency = "no-preference" | "reduce";
export type prefersColorSchema = "light" | "dark";
export type invertedColors = "none" | "inverted";

export class BrowserAccessibilityPreferences {
  readonly prefersReducedMotion: prefersReducedMotion;
  readonly prefersContrast: prefersContrast;
  readonly prefersReducedTransparency: prefersReducedTransparency;
  readonly prefersColorSchema: prefersColorSchema;
  readonly invertedColors: invertedColors;

  constructor(
    prefersReducedMotion: prefersReducedMotion,
    prefersContrast: prefersContrast,
    prefersReducedTransparency: prefersReducedTransparency,
    prefersColorSchema: prefersColorSchema,
    invertedColors: invertedColors,
  ) {
    this.prefersReducedMotion = prefersReducedMotion;
    this.prefersContrast = prefersContrast;
    this.prefersReducedTransparency = prefersReducedTransparency;
    this.prefersColorSchema = prefersColorSchema;
    this.invertedColors = invertedColors;
  }

  prefersDarkMode(): boolean {
    return this.prefersColorSchema === "dark";
  }

  prefersHighContrast(): boolean {
    return this.prefersContrast === "more";
  }

  prefersLowContrast(): boolean {
    return this.prefersContrast === "less";
  }
}

const useBrowserAccessibilityPreferences =
  (): BrowserAccessibilityPreferences => {
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "reduce"
      : "no-preference";

    const prefersContrast = matchMedia("(prefers-contrast: more)").matches
      ? "more"
      : matchMedia("(prefers-contrast: less)").matches
        ? "less"
        : matchMedia("(prefers-contrast: custom)").matches
          ? "custom"
          : "no-preference";

    const prefersReducedTransparency = matchMedia(
      "(prefers-reduced-transparency: reduce)",
    ).matches
      ? "reduce"
      : "no-preference";

    const prefersColorSchema = matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    const invertedColors = matchMedia("(inverted-colors: inverted)").matches
      ? "inverted"
      : "none";

    return new BrowserAccessibilityPreferences(
      reducedMotion,
      prefersContrast,
      prefersReducedTransparency,
      prefersColorSchema,
      invertedColors,
    );
  };

export { useBrowserAccessibilityPreferences };
