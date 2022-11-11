import { useState } from "react";
import { useLocalStorage } from "react-use";

export const UserPreferencesKeys = {
  PREVIEW: "preview",
  NOTIFICATIONS: "notifications",
  UI_SETTINGS: "uiSettings",
  RTMP_URLS: "rtmpUrls",
};

export const defaultPreviewPreference = {
  name: "",
  isAudioMuted: false,
  isVideoMuted: false,
};

export const useUserPreferences = (key: any, defaultPreference: any = null) => {
  const [localStorageValue, setStorageValue] = useLocalStorage(
    key,
    defaultPreference
  );
  const [preference, setPreference] = useState(
    localStorageValue || defaultPreference
  );
  const changePreference = (value: any) => {
    setPreference(value);
    setStorageValue(value);
  };
  return [preference, changePreference];
};
