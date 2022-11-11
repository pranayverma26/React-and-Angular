import React from "react";
import { Dropdown, Flex, Text } from "@100mslive/react-ui";

function formatDuration(duration: any) {
  if (!duration) {
    return "";
  }
  let mins: any = Math.floor(duration / 60);
  if (mins < 10) {
    mins = `0${String(mins)}`;
  }
  let secs: any = Math.floor(duration % 60);
  if (secs < 10) {
    secs = `0${String(secs)}`;
  }

  return `${mins}:${secs}`;
}

export const PlaylistItem = React.memo(
  ({ name, metadata, duration, selected, onClick }: any) => {
    return (
      <Dropdown.Item
        css={{
          flexDirection: "column",
          alignItems: "flex-start",
          h: "$18",
          p: "$8",
          "&:hover": {
            cursor: "pointer",
            bg: "$menuBg",
          },
          "&:focus-visible": {
            bg: "$menuBg",
          },
        }}
        onClick={onClick}
      >
        <Flex
          align="center"
          justify="between"
          css={{ width: "100%", minHeight: 0 }}
        >
          <Text
            variant="md"
            css={{ color: selected ? "$brandDefault" : "$textPrimary" }}
          >
            {name}
          </Text>
          <Text variant="xs">{formatDuration(duration)}</Text>
        </Flex>
        {metadata?.description && (
          <Text variant="xs" css={{ mt: "$4" }}>
            {metadata?.description}
          </Text>
        )}
      </Dropdown.Item>
    );
  }
);
