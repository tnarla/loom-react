import { SDKResult, setup } from "@loomhq/loom-sdk";

// TODO: Move this to a suspense cache once it exists:
const sdks = new Map<string, SDKResult>();

export function useSDK(apiKey: string): SDKResult {
  const sdkForAPIKey = sdks.get(apiKey);
  if (sdkForAPIKey) {
    return sdkForAPIKey;
  }

  throw setup({ apiKey }).then((sdk) => {
    // TODO: Handle SDK failure
    sdks.set(apiKey, sdk);
  });
}
