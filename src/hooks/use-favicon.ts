import { useEffect } from "react";
import { useAppleTouchFavicon } from "@/hooks/use-apple-touch-favicon";
import { useIcoFavicon } from "@/hooks/use-ico-favicon";
import { useSvgFavicon } from "@/hooks/use-svg-favicon";

// https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs
export function useFavicon(
  svg: string | SVGElement,
  ico: string, // 32x32
  appleTouch: string, // 180×180
): void {
  useEffect(() => {
    useSvgFavicon(svg);
    useIcoFavicon(ico);
    useAppleTouchFavicon(appleTouch);
  }, [svg, ico, appleTouch]);
}
