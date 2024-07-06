export class BrowserAccessibilityPreferences {
  readonly reducedMotion: boolean;
  readonly highContrast: boolean;
  readonly lowContrast: boolean;
  readonly reducedTransparency: boolean;
  readonly darkMode: boolean;

  constructor(
    reducedMotion: boolean,
    highContrast: boolean,
    lowContrast: boolean,
    reducedTransparency: boolean,
    darkMode: boolean,
  ) {
    this.reducedMotion = reducedMotion;
    this.highContrast = highContrast;
    this.lowContrast = lowContrast;
    this.reducedTransparency = reducedTransparency;
    this.darkMode = darkMode;
  }

  prefersDarkMode(): boolean {
    return this.darkMode;
  }

  prefersHighContrast(): boolean {
    return this.highContrast;
  }

  prefersLowContrast(): boolean {
    return this.lowContrast;
  }

  prefersReducedMotion(): boolean {
    return this.reducedMotion;
  }

  prefersTransparency(): boolean {
    return this.reducedTransparency;
  }
}
