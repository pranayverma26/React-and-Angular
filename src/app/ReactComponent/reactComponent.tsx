import * as React from "react";
import AppComponent from "./app";
import { HMSRoomProvider } from "@100mslive/react-sdk";

export default function ReactComponent(props: any) {
  return (
    <div>
      <HMSRoomProvider>
        <AppComponent role={props.role} room={props.room}></AppComponent>
      </HMSRoomProvider>
    </div>
  );
}
