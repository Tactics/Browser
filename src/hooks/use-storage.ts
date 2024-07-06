import React from "react";
import { Result } from "@tactics/js-monad";
import {
  getStorageItem,
  getStorageServerSnapshot,
  removeStorageItem,
  setStorageItem,
  useStorageSubscribe,
} from "@/storage/storage";

export function useStorage<T>(
  key: string,
  initialValue: T,
  storageArea: Storage,
): [Result<T>, (value: React.SetStateAction<T>) => void, () => void] {
  const getSnapshot = () => getStorageItem<T>(key, storageArea);
  const stored = React.useSyncExternalStore(
    useStorageSubscribe,
    getSnapshot,
    getStorageServerSnapshot,
  );

  const set = React.useCallback(
    (value: React.SetStateAction<T>) => {
      const nextState = value;
      if (nextState === null) {
        removeStorageItem(key, storageArea);
      } else {
        setStorageItem(key, nextState, storageArea);
      }
    },
    [key, stored],
  );

  const clear = React.useCallback(() => {
    removeStorageItem(key, storageArea);
  }, [key, stored]);

  React.useEffect(() => {
    setStorageItem(key, initialValue, storageArea);
  }, [key, initialValue]);

  return [stored, set, clear];
}
