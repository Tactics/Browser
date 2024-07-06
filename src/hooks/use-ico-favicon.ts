import { useEffect } from "react";

export function useIcoFavicon(
  ico: string, // 32x32
): void {
  useEffect(() => {
    // Query for the ico link
    const icoQuery = 'link[rel="icon"]:not([type="image/svg+xml"])';
    let icoLink = document.querySelector<HTMLLinkElement>(icoQuery);
    if (!icoLink) {
      icoLink = document.createElement("link");
      icoLink.rel = "icon";
      document.head.appendChild(icoLink);
    }

    icoLink.href = ico;
  }, [ico]);
}
