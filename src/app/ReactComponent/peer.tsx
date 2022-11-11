import { useVideo } from "@100mslive/react-sdk";
import * as React from "react";

function Peer(peer: any) {
  const { videoRef } = useVideo({
    trackId: peer.peer.videoTrack,
  });
  debugger
  return (
    <div className="peer-container">
      <video
        ref={videoRef}
        className={`peer-video ${peer.peer.isLocal ? "local" : ""}`}
        autoPlay
        muted
        playsInline
      />
      <div className="peer-name">
        {peer.peer.name} {peer.peer.isLocal ? "(You)" : ""}
      </div>
    </div>
  );
}

export default Peer;
