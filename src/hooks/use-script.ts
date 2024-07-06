import React from "react";
import { AsyncResult, Awaiting, Success, Failure } from "@tactics/js-monad";

interface ScriptOptions {
  removeOnUnmount?: boolean;
}

type SuccessResponse = "ready" | "external";

export function useScript(
  src: string,
  options: ScriptOptions = {},
): AsyncResult<SuccessResponse> {
  const [status, setStatus] = React.useState<AsyncResult<boolean>>(
    new Awaiting(),
  );
  const optionsRef = React.useRef<ScriptOptions>(options);

  React.useEffect(() => {
    let script: HTMLScriptElement | null = document.querySelector(
      `script[src="${src}"]`,
    );

    if (script) {
      // When status is null, a script is externally added outside of this function, we assume success and mark it as external
      const domStatus = script.getAttribute("data-status");
      switch (domStatus) {
        case "ready":
          setStatus(Success.of("ready"));
          break;
        case "error":
          setStatus(Failure.dueTo(`Failed to load script: ${src}`, "error"));
          break;
        default:
          setStatus(Success.of("external"));
          break;
      }
    } else {
      script = document.createElement("script");
      if (script) {
        script.src = src;
        script.async = true;
        document.body.appendChild(script);

        const handleScriptLoad = () => {
          script?.setAttribute("data-status", "ready");
          setStatus(Success.of(true));
          cleanupListeners();
        };

        const handleScriptError = () => {
          script?.setAttribute("data-status", "error");
          setStatus(Failure.dueTo(`Failed to load script: ${src}`, "error"));
          cleanupListeners();
        };

        const cleanupListeners = () => {
          script?.removeEventListener("load", handleScriptLoad);
          script?.removeEventListener("error", handleScriptError);
        };

        script.addEventListener("load", handleScriptLoad);
        script.addEventListener("error", handleScriptError);

        const removeOnUnmount = optionsRef.current.removeOnUnmount;
        return () => {
          if (removeOnUnmount === true) {
            script?.remove();
            cleanupListeners();
          }
        };
      } else {
        setStatus(
          Failure.dueTo(`Failed to add script tag for : ${src}`, "error"),
        );
      }
    }
  }, [src]);

  return status;
}
