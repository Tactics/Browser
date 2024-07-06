import { useEffect } from "react";

export function useSvgFavicon(svg: string | SVGElement): void {
  useEffect(() => {
    // Query for the SVG icon link
    const svgQuery = 'link[rel="icon"][type="image/svg+xml"]';
    let svgLink = document.querySelector<HTMLLinkElement>(svgQuery);

    if (!svgLink) {
      svgLink = document.createElement("link");
      svgLink.type = "image/svg+xml";
      svgLink.rel = "icon";
      document.head.appendChild(svgLink);
    }

    if (svg instanceof SVGElement) {
      svgLink.href = "data:image/svg+xml;utf8," + svg;
    } else {
      svgLink.href = svg;
    }
  }, [svg]);
}
