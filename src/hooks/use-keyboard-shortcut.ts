import { useEffect } from "react";
import useKeyboardShortcutOriginal from "use-keyboard-shortcut";

export type ShortcutKeys = string[];
export interface ShortcutOptions {
  overrideSystem?: boolean;
  ignoreInputFields?: boolean;
}

export function useKeyboardShortcuts(
  keys: ShortcutKeys,
  callback: (shortcutKeys: ShortcutKeys) => void,
  options: ShortcutOptions,
): void {
  useEffect(() => {
    const { flushHeldKeys } = useKeyboardShortcutOriginal(
      keys,
      callback,
      options,
    );
    flushHeldKeys();
  }, [keys, callback, options]);
}
