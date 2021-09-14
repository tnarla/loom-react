import { isSupported } from "@loomhq/loom-sdk";

// TODO: Move this to a suspense cache once it exists:
let supportedResult: boolean;

export class UnsupportedError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export function useSupported(): void {
  if (typeof supportedResult !== "boolean") {
    throw isSupported().then(({ supported }) => {
      supportedResult = supported;
    });
  }

  if (!supportedResult) {
    throw new UnsupportedError("Loom SDK is not supported on this platform.");
  }
}
