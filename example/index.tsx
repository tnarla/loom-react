/// <reference types="vite/client" />

import { Suspense } from "react";
import { createRoot } from "react-dom";
import { ErrorBoundary } from "react-error-boundary";
import { LoomButton } from "../src/suspense";

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary
    fallbackRender={(props) => <div>Error: {JSON.stringify(props.error)}</div>}
  >
    <Suspense fallback="Loading Loom SDK...">
      <LoomButton
        apiKey={import.meta.env.VITE_LOOM_API_KEY as string}
        onInsertClicked={(data) => {
          console.log("Insert Clicked", data);
        }}
      >
        Record
      </LoomButton>
    </Suspense>
  </ErrorBoundary>
);
