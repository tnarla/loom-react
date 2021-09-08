import { useEffect, useRef, useState } from 'react';
import { isSupported, setup, SDKResult } from "@loomhq/loom-sdk";

type UseLoomReturn = [ref: (el: HTMLElement | null) => void, supported: boolean];

export function useLoom(apiKey: string): UseLoomReturn {
  const [buttonEl, setButtonEl] = useState<HTMLElement | null>(null);
  const [supported, setSupported] = useState(false);
  const [sdk, setSdk] = useState<SDKResult | null>(null);
  
  // First, we define an effect to determine if the browser is supported:
  useEffect(() => {
    (async () => {
      // TODO: We could cache the result of `isSupported`.
      // Check to see if the browser is supported:
      const { supported } = await isSupported();
      
      // Set the supported state to true:
      setSupported(supported);
    })();
  }, []);
  
  // Next, we use a separate effect to setup the loomSDK:
  useEffect(() => {
    if (!supported) return;
    
    (async () => {
      setSdk(await setup({ apiKey }));
    })();
  }, [supported, apiKey]);
  
  // Finally, we have an effect that is responsible for configuring the button itself.
  useEffect(() => {
    if (!buttonEl || !sdk) return;
    
    sdk.configureButton({
      element: buttonEl,
      hooks: {
        // TODO: Hooks:
//         onInsertClicked: (shareLink) => {
//           console.log("clicked insert");
//           console.log(shareLink);
//         },
//         onStart: () => console.log("start"),
//         onCancel: () => console.log("cancelled"),
//         onComplete: () => console.log("complete"),
      }
    });
  }, [sdk, buttonEl]);
  
  return [setButtonEl, supported];
}