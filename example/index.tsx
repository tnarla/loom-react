/// <reference types="vite/client" />

import { render } from "react-dom";
import { LoomButton } from "../src";

render(
  <LoomButton
    apiKey={import.meta.env.VITE_LOOM_API_KEY as string}
    onInsertClicked={(data) => {
      console.log("Insert Clicked", data);
    }}
  >
    Record
  </LoomButton>,
  document.getElementById("root")!
);
