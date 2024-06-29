type prefersReducedMotion = "no-preference" | "reduce";
type prefersContrast = "no-preference" | "more" | "less" | "custom";
type prefersReducedTransparency = "no-preference" | "reduce";
type prefersColorSchema = "light" | "dark";
type invertedColors = "none" | "inverted";
declare class BrowserAccessibilityPreferences {
    readonly prefersReducedMotion: prefersReducedMotion;
    readonly prefersContrast: prefersContrast;
    readonly prefersReducedTransparency: prefersReducedTransparency;
    readonly prefersColorSchema: prefersColorSchema;
    readonly invertedColors: invertedColors;
    constructor(prefersReducedMotion: prefersReducedMotion, prefersContrast: prefersContrast, prefersReducedTransparency: prefersReducedTransparency, prefersColorSchema: prefersColorSchema, invertedColors: invertedColors);
    prefersDarkMode(): boolean;
    prefersHighContrast(): boolean;
    prefersLowContrast(): boolean;
}
declare const useBrowserAccessibilityPreferences: () => BrowserAccessibilityPreferences;

export { BrowserAccessibilityPreferences, type invertedColors, type prefersColorSchema, type prefersContrast, type prefersReducedMotion, type prefersReducedTransparency, useBrowserAccessibilityPreferences };
