import React, {
  useCallback,
  useEffect,
  useRef,
  useSyncExternalStore,
} from "react";
import { Result } from "@tactics/js-monad";
import {
  getStorageItem,
  getStorageServerSnapshot,
  removeStorageItem,
  setStorageItem,
} from "@/storage/storage";

function deepEqual(obj1: any, obj2: any): boolean {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export function useStorage<T>(
  key: string,
  initialValue: T,
  storageArea: Storage,
): [Result<T>, (value: React.SetStateAction<T>) => void, () => void] {
  // Memoize the getSnapshot function
  const getSnapshot = useCallback(
    () => getStorageItem<T>(key, storageArea),
    [key, storageArea],
  );

  // Use a ref to cache the previous result of getSnapshot
  const previousSnapshotRef = useRef<Result<T>>(getSnapshot());

  const subscribe = useCallback((callback: (event: StorageEvent) => void) => {
    window.addEventListener("storage", callback);
    return () => window.removeEventListener("storage", callback);
  }, []);

  // Create a wrapper function to manage the cached snapshot
  const getSnapshotWithCache = useCallback(() => {
    const newSnapshot = getSnapshot();
    if (
      previousSnapshotRef.current === null ||
      !deepEqual(previousSnapshotRef.current, newSnapshot) // Needed since we create new objects with the same value
    ) {
      previousSnapshotRef.current = newSnapshot;
    }
    return previousSnapshotRef.current;
  }, [getSnapshot]);

  const stored = useSyncExternalStore(
    subscribe,
    getSnapshotWithCache,
    getStorageServerSnapshot,
  );

  const set = useCallback(
    (value: React.SetStateAction<T>) => {
      const nextState = value;
      if (nextState === null) {
        removeStorageItem(key, storageArea);
      } else {
        setStorageItem(key, nextState, storageArea);
      }
    },
    [key, storageArea],
  );

  const clear = useCallback(() => {
    removeStorageItem(key, storageArea);
  }, [key, storageArea]);

  useEffect(() => {
    setStorageItem(key, initialValue, storageArea);
  }, [key, initialValue, storageArea]);

  return [stored, set, clear];
}
