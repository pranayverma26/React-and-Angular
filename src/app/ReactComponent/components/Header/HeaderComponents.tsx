import { useMedia } from "react-use";
import {
  selectDominantSpeaker,
  selectIsConnectedToRoom,
  useHMSStore,
} from "@100mslive/react-sdk";
import { VolumeOneIcon } from "@100mslive/react-icons";
import {
  Flex,
  styled,
  Text,
  textEllipsis,
  useTheme,
  config as cssConfig,
} from "@100mslive/react-ui";
import { useLogo } from "../AppData/useUISettings";
import { isStreamingKit } from "../../common/utils";
import * as React from "react";

export const SpeakerTag = () => {
  const dominantSpeaker = useHMSStore(selectDominantSpeaker);
  return dominantSpeaker && dominantSpeaker.name ? (
    <Flex
      align="center"
      justify="center"
      css={{ flex: "1 1 0", color: "$textPrimary", "@md": { display: "none" } }}
    >
      <VolumeOneIcon />
      <Text
        variant="md"
        css={{ ...textEllipsis(200), ml: "$2" }}
        title={dominantSpeaker.name}
      >
        {dominantSpeaker.name}
      </Text>
    </Flex>
  ) : (
    <></>
  );
};

const LogoImg = styled("img", {
  maxHeight: "$14",
  p: "$2",
  w: "auto",
  "@md": {
    maxHeight: "$12",
  },
});

export const Logo = () => {
  const { themeType } = useTheme();
  const logo = useLogo();
  const isMobile = useMedia(cssConfig.media.md);
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  // Hide logo for now as there is not enough space
  if (isConnected && isMobile && isStreamingKit()) {
    return null;
  }
  return (
    <a href="https://www.trainup.com/" target="_blank">
      <LogoImg src={logo} alt="Brand Logo" width={132} height={40} />
    </a>
  );
};
