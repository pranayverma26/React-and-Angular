import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSearchParam } from "react-use";
import { v4 } from "uuid";
import { Box, Flex, Loading, styled } from "@100mslive/react-ui";
import { Header } from "./Header";
import { ErrorDialog } from "../primitives/DialogContent";
import { useSetUiSettings, useTokenEndpoint } from "./AppData/useUISettings";
import PreviewContainer from "./Preview/PreviewContainer";
import SidePane from "../layouts/SidePane";
import { useNavigation } from "./hooks/useNavigation";
import getToken from "../services/tokenService";
import {
  QUERY_PARAM_SKIP_PREVIEW_HEADFUL,
  QUERY_PARAM_NAME,
  QUERY_PARAM_SKIP_PREVIEW,
  QUERY_PARAM_AUTH_TOKEN,
  UI_SETTINGS,
} from "../common/constants";
import { enviornmentConstant } from "../constant";

/**
 * query params exposed -
 * skip_preview=true => used by recording and streaming service, skips preview and directly joins
 *                      header and footer don't show up in this case
 * skip_preview_headful=true => used by automation testing to skip preview without impacting the UI
 * name=abc => gives the initial name for the peer joining
 * auth_token=123 => uses the passed in token to join instead of fetching from token endpoint
 * ui_mode=activespeaker => lands in active speaker mode after joining the room
 */

const env = enviornmentConstant.REACT_APP_ENV;
const PreviewScreen = React.memo(({ getUserToken, onJoinSuccess }: any) => {
  //const navigate = useNavigation();
  const tokenEndpoint = useTokenEndpoint();
  const [, setIsHeadless]: any = useSetUiSettings(UI_SETTINGS.isHeadless);
  let routeData =  { roomId: "635fdee94208780bf66732ae", role: "host" }; //= useParams(); // from the url
  const [token, setToken]: any = useState(null);
  const [error, setError]: any = useState({ title: "", body: "" });
  // way to skip preview for automated tests, beam recording and streaming
  const beamInToken = useSearchParam("token") === "beam_recording"; // old format to remove
  let skipPreview = useSearchParam(QUERY_PARAM_SKIP_PREVIEW) === "true";
  // use this field to join directly for quick testing while in local
  const directJoinHeadfulFromEnv =
   enviornmentConstant.REACT_APP_HEADLESS_JOIN === "true";
  const directJoinHeadful =
    useSearchParam(QUERY_PARAM_SKIP_PREVIEW_HEADFUL) === "true" ||
    directJoinHeadfulFromEnv;
  skipPreview = skipPreview || beamInToken || directJoinHeadful;
  const initialName =
    useSearchParam(QUERY_PARAM_NAME) || (skipPreview ? "Beam" : "");
  let authToken = useSearchParam(QUERY_PARAM_AUTH_TOKEN);

  useEffect(() => {
    if (authToken) {
      setToken(authToken);
      return;
    }
    if (!tokenEndpoint || !routeData.roomId) {
      return;
    }
    const getTokenFn = !routeData.role
      ? () => getUserToken(v4())
      : () => getToken(tokenEndpoint, v4(), routeData.role, routeData.roomId);
    getTokenFn()
      .then((token: any) => {
        setToken(token);
      })
      .catch((error: any) => {
        setError(convertPreviewError(error));
      });
  }, [tokenEndpoint, routeData.roomId, getUserToken, routeData.role, authToken]);

  const onJoin = () => {
    !directJoinHeadful && setIsHeadless(skipPreview);
    let meetingURL = `/meeting/${routeData.roomId}`;
    if (routeData.role) {
      meetingURL += `/${routeData.role}`;
    }
    onJoinSuccess(routeData.role)
   // navigate(meetingURL);
  };

  if (error.title) {
    return <ErrorDialog title={error.title}>{error.body}</ErrorDialog>;
  }
  return (
    <Flex direction="column" css={{ size: "100%" }}>
      <Box
        css={{ h: "$18", "@md": { h: "$17", flexShrink: 0 } }}
        data-testid="header"
      >
        <Header  />
      </Box>
      <Flex
        css={{ flex: "1 1 0", position: "relative", overflowY: "auto" }}
        justify="center"
        align="center"
      >
        {token ? (
          <>
            <PreviewContainer
              initialName={initialName}
              skipPreview={skipPreview}
              env={env}
              onJoin={onJoin}
              token={token}
            />
          </>
        ) : (
          <Loading size={100} />
        )}
        <SidePane
          css={{
            position: "unset",
            mr: "$10",
            "@lg": { position: "fixed", mr: "$0" },
          }}
        />
      </Flex>
    </Flex>
  );
});

const convertPreviewError = (error:any) => {
  console.error("[error]", { error });
  if (error.response && error.response.status === 404) {
    return {
      title: "Room does not exist",
      body: ErrorWithSupportLink(
        "We could not find a room corresponding to this link."
      ),
    };
  } else if (error.response && error.response.status === 403) {
    return {
      title: "Accessing room using this link format is disabled",
      body: ErrorWithSupportLink(
        "You can re-enable this from the developer section in Dashboard."
      ),
    };
  } else {
    console.error("Token API Error", error);
    return {
      title: "Error fetching token",
      body: ErrorWithSupportLink(
        "An error occurred while fetching the app token. Please look into logs for more details."
      ),
    };
  }
};

const Link = styled("a", {
  color: "#2f80e1",
});

export const ErrorWithSupportLink = (errorMessage:any) => (
  <div>
    {errorMessage} If you think this is a mistake on our side, please create{" "}
    <Link
      target="_blank"
      href="https://github.com/100mslive/100ms-web/issues"
      rel="noreferrer"
    >
      an issue
    </Link>{" "}
    or reach out over{" "}
    <Link
      target="_blank"
      href="https://discord.com/invite/kGdmszyzq2"
      rel="noreferrer"
    >
      Discord
    </Link>
    .
  </div>
);

export default PreviewScreen;
