import * as React from "react";
import { Suspense, useEffect, useCallback, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";
import { HMSRoomProvider } from "@100mslive/react-sdk";
import { HMSThemeProvider, Box } from "@100mslive/react-ui";
//import { Notifications } from "./components/Notifications";
import { Confetti } from "./plugins/confetti";
import { RemoteStopScreenshare } from "./plugins/RemoteStopScreenshare";
import { ToastContainer } from "./components/Toast/ToastContainer";
import FullPageProgress from "./components/FullPageProgress";
import { KeyboardHandler } from "./components/Input/KeyboardInputManager";
import PostLeave from "./components/PostLeave";
import { AppData } from "./components/AppData/AppData";
//import { ErrorBoundary } from "./components/ErrorBoundary";
import ErrorPage from "./components/ErrorPage";
//import { Init } from "./components/init/Init";
import { hmsActions, hmsNotifications, hmsStats, hmsStore } from "./hms";
import { FeatureFlags } from "./services/FeatureFlags";
import {
  getUserToken as defaultGetUserToken,
  getBackendEndpoint,
} from "./services/tokenService";
import { getRoutePrefix, shadeColor } from "./common/utils";
// import "./base.css";
// import "./index.css";
import { enviornmentConstant } from "./constant";

const Conference = React.lazy(() => import("./components/conference"));
const PreviewScreen = React.lazy(() => import("./components/PreviewScreen"));

const defaultTokenEndpoint =
  enviornmentConstant.REACT_APP_TOKEN_GENERATION_ENDPOINT_DOMAIN
    ? `${getBackendEndpoint()}${
        enviornmentConstant.REACT_APP_TOKEN_GENERATION_ENDPOINT_DOMAIN
      }/`
    : enviornmentConstant.REACT_APP_TOKEN_GENERATION_ENDPOINT;

const envPolicyConfig = JSON.parse(
  enviornmentConstant.REACT_APP_POLICY_CONFIG || "{}"
);

let appName;
if (window.location.host.includes("localhost")) {
  appName = "localhost";
} else {
  appName = window.location.host.split(".")[0];
}

document.title =
  enviornmentConstant.REACT_APP_TITLE || `${appName}'s ${document.title}`;

// TODO: remove now that there are options to change to portrait
const getAspectRatio = ({ width, height }: any) => {
  const host =
    enviornmentConstant.REACT_APP_HOST_NAME || window.location.hostname;
  const portraitDomains = (
    enviornmentConstant.REACT_APP_PORTRAIT_MODE_DOMAINS || ""
  ).split(",");
  if (portraitDomains.includes(host) && width > height) {
    return { width: height, height: width };
  }
  return { width, height };
};

export function EdtechComponent({
  roomId = "",
  tokenEndpoint = defaultTokenEndpoint,
  themeConfig: {
    aspectRatio = "1-1",
    font = "Roboto",
    color = "#2F80FF",
    theme = "dark",
    logo = "",
    headerPresent = "false",
    metadata = "",
    recordingUrl = "",
  },
  getUserToken = defaultGetUserToken,
  policyConfig = envPolicyConfig,
  getDetails = () => {},
}) {
  const { 0: width, 1: height } = aspectRatio
    .split("-")
    .map((el) => parseInt(el));

  let [isPreviewScreen, setIsPreviewScreen] = useState(true);
  let [isMeetingScreen, setIsMeetingScreen] = useState(false);
  let [userRole, setIsUserRole] = useState("");

  const onJoinSuccess = (role: string) => {
    setIsPreviewScreen(false);
    setIsMeetingScreen(true);
    setIsUserRole(role);
  };

  const getUserTokenCallback = useCallback(getUserToken, []); //eslint-disable-line
  return (
    <HMSThemeProvider
      themeType={ThemeTypes.dark}
      aspectRatio={getAspectRatio({ width, height })}
    >
      <HMSRoomProvider
        isHMSStatsOn={FeatureFlags.enableStatsForNerds}
        actions={hmsActions}
        store={hmsStore}
        notifications={hmsNotifications}
      >
        <AppData
          appDetails={metadata}
          policyConfig={policyConfig}
          recordingUrl={recordingUrl}
          logo={logo}
          tokenEndpoint={tokenEndpoint}
        />

        {/* <Init /> */}
        <Box
          css={{
            bg: "$mainBg",
            w: "100%",
            ...(headerPresent === "true"
              ? { flex: "1 1 0", minHeight: 0 }
              : { h: "100%" }),
          }}
        >
          {isPreviewScreen && (
            <Suspense fallback={<FullPageProgress />}>
              <PreviewScreen
                getUserToken={getUserToken}
                onJoinSuccess={(role: string) => onJoinSuccess(role)}
              />
            </Suspense>
          )}
          {isMeetingScreen && (
            <Suspense fallback={<FullPageProgress />}>
              <Conference />
            </Suspense>
          )}
        </Box>
      </HMSRoomProvider>
    </HMSThemeProvider>
  );
}

const RedirectToPreview = ({ getDetails }: any) => {
  const { roomId, role } = useParams();
  useEffect(() => {
    getDetails();
  }, [roomId]); //eslint-disable-line

  console.error({ roomId, role });

  if (!roomId && !role) {
    return <Navigate to="/" />;
  }
  if (!roomId) {
    return <Navigate to="/" />;
  }
  if (["streaming", "preview", "meeting", "leave"].includes(roomId) && !role) {
    return <Navigate to="/" />;
  }

  return (
    <Navigate to={`${getRoutePrefix()}/preview/${roomId}/${role || ""}`} />
  );
};

const RouteList = ({ getUserToken, getDetails }: any) => {
  return (
    <Routes>
      <Route path="preview">
        <Route
          path=":roomId/:role"
          element={
            <Suspense fallback={<FullPageProgress />}>
              <PreviewScreen getUserToken={getUserToken} />
            </Suspense>
          }
        />
        <Route
          path=":roomId"
          element={
            <Suspense fallback={<FullPageProgress />}>
              <PreviewScreen getUserToken={getUserToken} />
            </Suspense>
          }
        />
      </Route>
      <Route path="meeting">
        <Route
          path=":roomId/:role"
          element={
            <Suspense fallback={<FullPageProgress />}>
              <Conference />
            </Suspense>
          }
        />
        <Route
          path=":roomId"
          element={
            <Suspense fallback={<FullPageProgress />}>
              <Conference />
            </Suspense>
          }
        />
      </Route>
      <Route path="leave">
        <Route path=":roomId/:role" element={<PostLeave />} />
        <Route path=":roomId" element={<PostLeave />} />
      </Route>
      <Route
        path="/:roomId/:role"
        element={<RedirectToPreview getDetails={getDetails} />}
      />
      <Route
        path="/:roomId/"
        element={<RedirectToPreview getDetails={getDetails} />}
      />
      <Route path="*" element={<ErrorPage error="Invalid URL!" />} />
    </Routes>
  );
};

function AppRoutes({ getUserToken, getDetails }: any) {
  return (
    <Router>
      <ToastContainer />
      {/* <Notifications /> */}
      <Confetti />
      <RemoteStopScreenshare />
      <KeyboardHandler />
      <Routes>
        <Route
          path="/*"
          element={
            <RouteList getUserToken={getUserToken} getDetails={getDetails} />
          }
        />
        <Route
          path="/streaming/*"
          element={
            <RouteList getUserToken={getUserToken} getDetails={getDetails} />
          }
        />
      </Routes>
    </Router>
  );
}

export default function App() {
  return (
    <EdtechComponent
      themeConfig={{
        aspectRatio: enviornmentConstant.REACT_APP_TILE_SHAPE,
        theme: enviornmentConstant.REACT_APP_THEME,
        color: enviornmentConstant.REACT_APP_COLOR,
        logo: enviornmentConstant.REACT_APP_LOGO,
        font: enviornmentConstant.REACT_APP_FONT,
      }}
      getUserToken={defaultGetUserToken}
    />
  );
}

export enum ThemeTypes {
  light = "light",
  dark = "dark",
}
