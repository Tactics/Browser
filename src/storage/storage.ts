import { Failure, Result, Success } from "@tactics/js-monad";

export const enum StorageFailures {
  NOT_AVAILABLE = "NOT_AVAILABLE",
  INVALID_FORMAT = "INVALID_FORMAT",
}

export function dispatchStorageEvent(
  key: string,
  newValue: any,
  oldValue: any,
  storageArea: Storage,
) {
  window.dispatchEvent(
    new StorageEvent("storage", { key, newValue, oldValue, storageArea }),
  );
}

export const getStorageServerSnapshot = () => {
  throw Error("this is a client-only hook");
};

// Helper functions to interact with sessionStorage
export function getStorageItem<T>(
  key: string,
  storageArea: Storage,
): Result<T> {
  const item = storageArea.getItem(key);
  if (!item) {
    return Failure.dueTo(
      `${key} is not available in ${storageArea} storage`,
      StorageFailures.NOT_AVAILABLE,
    );
  }

  try {
    const object = JSON.parse(item);
    return Success.of(object);
  } catch (error) {
    return Failure.dueTo(
      `${key} has invalid format in storage`,
      StorageFailures.INVALID_FORMAT,
    );
  }
}

export function setStorageItem<T>(
  key: string,
  value: T,
  storageArea: Storage,
): Result<T> {
  const currentItem = getStorageItem(key, storageArea);

  try {
    const item = JSON.stringify(value);
    storageArea.setItem(key, item);
    dispatchStorageEvent(
      key,
      value,
      currentItem instanceof Failure ? null : currentItem.unwrap(),
      storageArea,
    );
    return Success.of(value);
  } catch (error) {
    return Failure.dueTo(
      `${value} has invalid format to put into storage`,
      StorageFailures.INVALID_FORMAT,
    );
  }
}

export function removeStorageItem(
  key: string,
  storageArea: Storage,
): Result<string> {
  const currentItem = getStorageItem(key, storageArea);
  if (currentItem instanceof Failure) {
    storageArea.removeItem(key);
    return Success.of(key);
  }

  try {
    storageArea.removeItem(key);
    dispatchStorageEvent(key, null, currentItem.unwrap(), storageArea);
    return Success.of(key);
  } catch (error) {
    return Failure.dueTo(
      `${key} could not be removed from storage`,
      StorageFailures.INVALID_FORMAT,
    );
  }
}
