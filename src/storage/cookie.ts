import Cookies from "js-cookie";

export class CookieStorage implements Storage {
  get length(): number {
    return Object.keys(Cookies.get()).length;
  }

  clear(): void {
    const allCookies = Cookies.get();
    for (const key in allCookies) {
      Cookies.remove(key);
    }
  }

  getItem(key: string): string | null {
    const value = Cookies.get(key);
    return value !== undefined ? value : null;
  }

  key(index: number): string | null {
    const keys = Object.keys(Cookies.get());
    return keys.length > index ? keys[index] : null;
  }

  removeItem(key: string): void {
    Cookies.remove(key);
  }

  setItem(key: string, value: string): void {
    Cookies.set(key, value);
  }

  // Optional: Implement toString() method for debugging or logging
  toString(): string {
    return JSON.stringify(Cookies.get(), null, 2);
  }
}
