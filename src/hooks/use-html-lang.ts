import React from "react";

export function useHtmlLang(lang: string) {
  React.useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
}
