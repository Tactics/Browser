import React, { RefObject } from 'react';
import { AsyncResult, Result } from '@tactics/js-monad';

declare function useDebounce<T>(value: T, delay: number): T;

declare function useThrottle<T>(value: T, interval?: number): T;

interface ViewportSize {
    width: number;
    height: number;
}
declare function useViewportSize(): ViewportSize;

declare function useMeasure(): [
    (node: Element) => void,
    {
        width: number;
        height: number;
    }
];

declare function useLongPress(callback: (event: Event) => void, options?: {
    threshold?: number;
    onStart?: (event: Event) => void;
    onFinish?: (event: Event) => void;
    onCancel?: (event: Event) => void;
}): {};

declare const useVisibilityChange: (callback: () => void) => () => void;

declare function useLockBodyScroll(): void;

declare function useHover(ref: RefObject<HTMLElement | Window | Document>): boolean;

type EventType = keyof DocumentEventMap | keyof WindowEventMap;
declare function useEventListener(eventType: EventType, callback: (event: Event) => void, element?: HTMLElement | Window | Document): void;

declare class CookieStorage implements Storage {
    get length(): number;
    clear(): void;
    getItem(key: string): string | null;
    key(index: number): string | null;
    removeItem(key: string): void;
    setItem(key: string, value: string): void;
    toString(): string;
}

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

declare function useOnScreen(ref: RefObject<Element>, rootMargin?: string): boolean;

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

export { BrowserAccessibilityPreferences, CookieStorage, type ScrollState, type ScrollToArgs, useAppleTouchFavicon, useBrowserAccessibilityPreferences, useCopyToClipboard, useDebounce, useDocumentTitle, useEventListener, useFavicon, useGeolocation, useHover, useIcoFavicon, useIdle, useLockBodyScroll, useLongPress, useMeasure, useMediaQuery, useOnScreen, usePrefersDarkMode, usePrefersHighContast, usePrefersLowContrast, usePrefersReducedMotion, usePrefersReducedTransparancy, useScript, useStorage, useSvgFavicon, useThrottle, useViewportSize, useVisibilityChange, useWindowScroll };
