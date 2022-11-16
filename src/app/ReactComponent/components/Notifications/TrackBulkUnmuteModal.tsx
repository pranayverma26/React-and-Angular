import React, { useState, useEffect } from "react";
import {
  HMSNotificationTypes,
  useHMSActions,
  useHMSNotifications,
} from "@100mslive/react-sdk";
import { MicOnIcon } from "@100mslive/react-icons";
import { RequestDialog } from "../../primitives/DialogContent";

export const TrackBulkUnmuteModal = () => {
  const hmsActions = useHMSActions();
  const [muteNotification, setMuteNotification] = useState(null);
  const notification: any = useHMSNotifications(
    HMSNotificationTypes.CHANGE_MULTI_TRACK_STATE_REQUEST
  );

  useEffect(() => {
    if (notification?.data.enabled) {
      setMuteNotification(notification.data);
    }
  }, [notification]);

  if (!muteNotification) {
    return null;
  }

  const { requestedBy: peer, tracks, enabled }: any = muteNotification;

  return (
    <RequestDialog
      title="Track Unmute Request"
      body={`${peer?.name} has requested you to unmute your tracks.`}
      onOpenChange={(value: any) => !value && setMuteNotification(null)}
      onAction={() => {
        tracks.forEach((track: any) => {
          hmsActions.setEnabledTrack(track.id, enabled);
        });
        setMuteNotification(null);
      }}
      Icon={MicOnIcon}
    />
  );
};
