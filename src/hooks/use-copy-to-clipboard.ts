import React from "react";
import { AsyncResult, Awaiting, Failure, Success } from "@tactics/js-monad";

export function useCopyToClipboard(): AsyncResult<string> {
  const [copiedText, setCopiedText] = React.useState<AsyncResult<string>>(
    new Awaiting(),
  );

  const copyToClipboard = React.useCallback((value: string) => {
    return (
      navigator.clipboard &&
      navigator.clipboard
        .writeText(value)
        .then(() => {
          setCopiedText(Success.of(value));
        })
        .catch((error: DOMException) => {
          setCopiedText(Failure.dueTo(error.message, error.name));
        })
    );
  }, []);

  return [copiedText, copyToClipboard];
}
