/// <reference types="react/experimental" />
/// <reference types="react-dom/experimental" />

import { useEffect, useState } from "react";
import { Hooks } from "@loomhq/loom-sdk";
import { useSupported } from "./useSupported";
import { useSDK } from "./useSDK";

type UseLoomReturn = [
  ref: (el: HTMLElement | null) => void,
];

export function useLoom(apiKey: string, hooks: Hooks): UseLoomReturn {
	useSupported();
	const sdk = useSDK(apiKey);
  const [buttonEl, setButtonEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!buttonEl) return;

    sdk.configureButton({
      element: buttonEl,
      hooks: hooks,
    });
  }, [sdk, buttonEl, hooks]);

  return [setButtonEl];
}
