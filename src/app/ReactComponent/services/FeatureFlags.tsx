import { useEffect } from "react";
import { enviornmentConstant } from "../constant";
declare const window: any;
export class FeatureFlags {
  static enableTranscription: boolean =
   enviornmentConstant.REACT_APP_ENABLE_TRANSCRIPTION === "true";
  static enableStatsForNerds: boolean =
   enviornmentConstant.REACT_APP_ENABLE_STATS_FOR_NERDS === "true";
  static enableWhiteboard =
   enviornmentConstant.REACT_APP_ENABLE_WHITEBOARD &&
   enviornmentConstant.REACT_APP_PUSHER_APP_KEY &&
   enviornmentConstant.REACT_APP_PUSHER_AUTHENDPOINT;

  static init() {
    if (!window.HMS) {
      window.HMS = {};
    }
    // unsubscribe for muted audio tracks
    window.HMS.AUDIO_SINK = false;
    // some extra config to hls js to bring down latency
    window.HMS.OPTIMISE_HLS_LATENCY = false;
    // ask permissions in preview even if role doesn't have it
    window.HMS.ALWAYS_REQUEST_PERMISSIONS = false;
    // add support for server degradation
    window.HMS.FREEZE_VIDEO_LIST = false; //enviornmentConstant..REACT_APP_ENV === "qa";
    window.HMS.SHOW_NS = enviornmentConstant.REACT_APP_ENV !== "prod";
  }

  static showNS() {
    return window?.HMS?.SHOW_NS;
  }

  static freezeVideoList() {
    return window?.HMS?.FREEZE_VIDEO_LIST;
  }

  static optimiseHLSLatency() {
    return window?.HMS?.OPTIMISE_HLS_LATENCY;
  }

  static alwaysRequestPermissions() {
    return window?.HMS?.ALWAYS_REQUEST_PERMISSIONS;
  }
}

export function FeatureFlagsInit() {
  useEffect(() => {
    FeatureFlags.init();
  }, []);
  return null;
}
