import { AsyncResult, Result } from '@tactics/js-monad';
import React from 'react';

declare function useDocumentTitle(title: string): void;

declare function useFavicon(svg: string | SVGElement, ico: string, // 32x32
appleTouch: string): void;

declare function useIcoFavicon(ico: string): void;

declare function useSvgFavicon(svg: string | SVGElement): void;

declare function useAppleTouchFavicon(appleTouch: string): void;

declare function useCopyToClipboard(): AsyncResult<string>;

interface GeolocationState {
    accuracy: number | null;
    altitude: number | null;
    altitudeAccuracy: number | null;
    heading: number | null;
    latitude: number | null;
    longitude: number | null;
    speed: number | null;
    timestamp: number | null;
}
interface GeolocationOptions {
    enableHighAccuracy?: boolean;
    timeout?: number;
    maximumAge?: number;
}
declare function useGeolocation(options?: GeolocationOptions): AsyncResult<GeolocationState>;

declare function useIdle(ms?: number): boolean;

declare function useMediaQuery(query: string): boolean;

declare function usePrefersDarkMode(): boolean;

declare function usePrefersHighContast(): boolean;

declare function usePrefersLowContrast(): boolean;

declare function usePrefersReducedMotion(): boolean;

declare function usePrefersReducedTransparancy(): boolean;

interface ScriptOptions {
    removeOnUnmount?: boolean;
}
type SuccessResponse = "ready" | "external";
declare function useScript(src: string, options?: ScriptOptions): AsyncResult<SuccessResponse>;

declare function useStorage<T>(key: string, initialValue: T, storageArea: Storage): [Result<T>, (value: React.SetStateAction<T>) => void, () => void];

interface ScrollState {
    x: number;
    y: number;
}
type ScrollToArgs = [options: ScrollToOptions] | [x: number, y: number];
declare function useWindowScroll(): [
    ScrollState,
    (...args: ScrollToArgs) => void
];

interface WindowSize {
    width: number;
    height: number;
}
declare function useWindowSize(): WindowSize;

declare class BrowserAccessibilityPreferences {
    readonly reducedMotion: boolean;
    readonly highContrast: boolean;
    readonly lowContrast: boolean;
    readonly reducedTransparency: boolean;
    readonly darkMode: boolean;
    constructor(reducedMotion: boolean, highContrast: boolean, lowContrast: boolean, reducedTransparency: boolean, darkMode: boolean);
    prefersDarkMode(): boolean;
    prefersHighContrast(): boolean;
    prefersLowContrast(): boolean;
    prefersReducedMotion(): boolean;
    prefersTransparency(): boolean;
}

declare const useBrowserAccessibilityPreferences: () => BrowserAccessibilityPreferences;

export { BrowserAccessibilityPreferences, type ScrollState, type ScrollToArgs, type WindowSize, useAppleTouchFavicon, useBrowserAccessibilityPreferences, useCopyToClipboard, useDocumentTitle, useFavicon, useGeolocation, useIcoFavicon, useIdle, useMediaQuery, usePrefersDarkMode, usePrefersHighContast, usePrefersLowContrast, usePrefersReducedMotion, usePrefersReducedTransparancy, useScript, useStorage, useSvgFavicon, useWindowScroll, useWindowSize };
