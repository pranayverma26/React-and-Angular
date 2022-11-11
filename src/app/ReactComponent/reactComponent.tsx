import * as React from "react";
import AppComponent from "./app";
import { HMSRoomProvider } from "@100mslive/react-sdk";

export default function ReactComponent() {
  return (
    <div>
      <div>
        <HMSRoomProvider>
          <AppComponent></AppComponent>
        </HMSRoomProvider>
      </div>
    </div>
  );
}
