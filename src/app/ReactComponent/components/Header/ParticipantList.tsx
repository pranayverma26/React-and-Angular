import * as React from "react";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useDebounce, useMeasure } from "react-use";
import { FixedSizeList } from "react-window";
import {
  selectAudioTrackByPeerID,
  selectLocalPeerID,
  selectPeerCount,
  selectPeerMetadata,
  selectPermissions,
  useHMSActions,
  useHMSStore,
  useParticipants,
} from "@100mslive/react-sdk";
import {
  CrossIcon,
  ChangeRoleIcon,
  HandRaiseIcon,
  PeopleIcon,
  SearchIcon,
  VerticalMenuIcon,
  SpeakerIcon,
} from "@100mslive/react-icons";
import {
  Flex,
  Box,
  Text,
  Avatar,
  textEllipsis,
  Input,
  Dropdown,
  Slider,
} from "@100mslive/react-ui";
import { RoleChangeModal } from "../RoleChangeModal";
import { ConnectionIndicator } from "../Connection/ConnectionIndicator";
import { ParticipantFilter } from "./ParticipantFilter";
import IconButton from "../../IconButton";
import {
  useIsSidepaneTypeOpen,
  useSidepaneToggle,
} from "../AppData/useSidepane";
import { isInternalRole } from "../../common/utils";
import { SIDE_PANE_OPTIONS } from "../../common/constants";

export const ParticipantList = () => {
  const [filter, setFilter]: any = useState();
  const { participants, isConnected, peerCount, rolesWithParticipants } =
    useParticipants(filter);
  const [selectedPeerId, setSelectedPeerId] = useState(null);
  const toggleSidepane = useSidepaneToggle(SIDE_PANE_OPTIONS.PARTICIPANTS);
  const onSearch = useCallback((value: any) => {
    setFilter((filterValue: any) => {
      if (!filterValue) {
        filterValue = {};
      }
      filterValue.search = value;
      return { ...filterValue };
    });
  }, []);
  if (peerCount === 0) {
    return null;
  }

  return (
    <Fragment>
      <Flex direction="column" css={{ size: "100%" }}>
        <Flex align="center" css={{ w: "100%", mb: "$10" }}>
          <Text css={{ fontWeight: "$semiBold", mr: "$4" }}>Participants</Text>
          <ParticipantFilter
            selection={filter}
            onSelection={setFilter}
            isConnected={isConnected}
            roles={rolesWithParticipants}
          />
          <IconButton
            onClick={toggleSidepane}
            css={{ w: "$11", h: "$11", ml: "auto" }}
          >
            <CrossIcon />
          </IconButton>
        </Flex>
        {!filter?.search && participants.length === 0 ? null : (
          <ParticipantSearch onSearch={onSearch} />
        )}
        {participants.length === 0 && (
          <Flex align="center" justify="center" css={{ w: "100%", p: "$8 0" }}>
            <Text variant="sm">
              {!filter ? "No participants" : "No matching participants"}
            </Text>
          </Flex>
        )}
        <VirtualizedParticipants
          participants={participants}
          isConnected={isConnected}
          setSelectedPeerId={setSelectedPeerId}
        />
      </Flex>
      {selectedPeerId && (
        <RoleChangeModal
          peerId={selectedPeerId}
          onOpenChange={(value: any) => {
            !value && setSelectedPeerId(null);
          }}
        />
      )}
    </Fragment>
  );
};

export const ParticipantCount = () => {
  const peerCount = useHMSStore(selectPeerCount);
  const toggleSidepane = useSidepaneToggle(SIDE_PANE_OPTIONS.PARTICIPANTS);
  const isParticipantsOpen = useIsSidepaneTypeOpen(
    SIDE_PANE_OPTIONS.PARTICIPANTS
  );
  useEffect(() => {
    if (isParticipantsOpen && peerCount === 0) {
      toggleSidepane();
    }
  }, [isParticipantsOpen, peerCount, toggleSidepane]);

  if (peerCount === 0) {
    return null;
  }
  return (
    <IconButton
      css={{
        w: "auto",
        p: "$4",
        h: "auto",
      }}
      onClick={() => {
        if (peerCount > 0) {
          toggleSidepane();
        }
      }}
      active={!isParticipantsOpen}
      data-testid="participant_list"
    >
      <PeopleIcon />
      <Text variant="sm" css={{ mx: "$4", c: "inherit" }}>
        {peerCount}
      </Text>
    </IconButton>
  );
};

const VirtualizedParticipants = ({
  participants,
  canChangeRole,
  isConnected,
  setSelectedPeerId,
}: any) => {
  const [ref, { width, height }]: any = useMeasure();
  return (
    <Box
      ref={ref}
      css={{
        flex: "1 1 0",
        mr: "-$10",
      }}
    >
      <FixedSizeList
        itemSize={68}
        itemCount={participants.length}
        width={width}
        height={height}
      >
        {({ index, style }: any) => {
          return (
            <div style={style} key={participants[index].id}>
              <Participant
                peer={participants[index]}
                canChangeRole={canChangeRole}
                showActions={isConnected}
                onParticipantAction={setSelectedPeerId}
              />
            </div>
          );
        }}
      </FixedSizeList>
    </Box>
  );
};

const Participant = ({
  peer,
  canChangeRole,
  showActions,
  onParticipantAction,
}: any) => {
  return (
    <Flex
      key={peer.id}
      css={{ w: "100%", py: "$4", pr: "$10" }}
      align="center"
      data-testid={"participant_" + peer.name}
    >
      <Avatar
        name={peer.name}
        css={{
          position: "unset",
          transform: "unset",
          mr: "$8",
          fontSize: "$sm",
          size: "$12",
          p: "$4",
        }}
      />
      <Flex direction="column" css={{ flex: "1 1 0" }}>
        <Text
          variant="md"
          css={{ ...textEllipsis(150), fontWeight: "$semiBold" }}
        >
          {peer.name}
        </Text>
        <Text variant="sub2">{peer.roleName}</Text>
      </Flex>
      {showActions && (
        <ParticipantActions
          peerId={peer.id}
          role={peer.roleName}
          onSettings={() => {
            onParticipantAction(peer.id);
          }}
          canChangeRole={canChangeRole}
        />
      )}
    </Flex>
  );
};

/**
 * shows settings to change for a participant like changing their role
 */
const ParticipantActions = React.memo(({ onSettings, peerId, role }: any) => {
  const isHandRaised = useHMSStore(selectPeerMetadata(peerId))?.isHandRaised;
  const canChangeRole = useHMSStore(selectPermissions)?.changeRole;
  const audioTrack = useHMSStore(selectAudioTrackByPeerID(peerId));
  const localPeerId = useHMSStore(selectLocalPeerID);
  const canChangeVolume = peerId !== localPeerId && audioTrack;
  const shouldShowMoreActions = canChangeRole || canChangeVolume;

  return (
    <Flex align="center" css={{ flexShrink: 0 }}>
      <ConnectionIndicator peerId={peerId} />
      {isHandRaised && <HandRaiseIcon />}
      {shouldShowMoreActions && !isInternalRole(role) && (
        <ParticipantMoreActions
          onRoleChange={onSettings}
          peerId={peerId}
          role={role}
        />
      )}
    </Flex>
  );
});

const ParticipantMoreActions = ({ onRoleChange, peerId }: any) => {
  const canChangeRole = useHMSStore(selectPermissions)?.changeRole;
  const [open, setOpen] = useState(false);
  return (
    <Dropdown.Root open={open} onOpenChange={(value) => setOpen(value)}>
      <Dropdown.Trigger
        asChild
        data-testid="participant_more_actions"
        css={{ p: "$2", r: "$0" }}
        tabIndex={0}
      >
        <Text>
          <VerticalMenuIcon />
        </Text>
      </Dropdown.Trigger>
      <Dropdown.Portal>
        <Dropdown.Content align="end" sideOffset={8} css={{ w: "$64" }}>
          {canChangeRole && (
            <Dropdown.Item onClick={() => onRoleChange(peerId)}>
              <ChangeRoleIcon />
              <Text css={{ ml: "$4" }}>Change Role</Text>
            </Dropdown.Item>
          )}
          <ParticipantVolume peerId={peerId} />
        </Dropdown.Content>
      </Dropdown.Portal>
    </Dropdown.Root>
  );
};

const ParticipantVolume = ({ peerId }: any) => {
  const audioTrack: any = useHMSStore(selectAudioTrackByPeerID(peerId));
  const localPeerId: any = useHMSStore(selectLocalPeerID);
  const hmsActions: any = useHMSActions();
  // No volume control for local peer or non audio publishing role
  if (peerId === localPeerId || !audioTrack) {
    return null;
  }

  return (
    <Dropdown.Item css={{ h: "auto" }}>
      <Flex direction="column" css={{ w: "100%" }}>
        <Flex align="center">
          <SpeakerIcon />
          <Text css={{ ml: "$4" }}>
            Volume{audioTrack.volume ? `(${audioTrack.volume})` : ""}
          </Text>
        </Flex>
        <Slider
          css={{ my: "0.5rem" }}
          step={5}
          value={[audioTrack.volume]}
          onValueChange={(e: any) => {
            hmsActions.setVolume(e[0], audioTrack?.id);
          }}
        />
      </Flex>
    </Dropdown.Item>
  );
};

export const ParticipantSearch = ({ onSearch, placeholder }: any) => {
  const [value, setValue] = React.useState("");
  useDebounce(
    () => {
      onSearch(value);
    },
    300,
    [value, onSearch]
  );
  return (
    <Box css={{ p: "$4 0", my: "$8", position: "relative" }}>
      <Box
        css={{
          position: "absolute",
          left: "$4",
          top: "$2",
          transform: "translateY(50%)",
          color: "$textMedEmp",
        }}
      >
        <SearchIcon />
      </Box>
      <Input
        type="text"
        placeholder={placeholder || "Find what you are looking for"}
        css={{ w: "100%", pl: "$14" }}
        value={value}
        onKeyDown={(event) => {
          event.stopPropagation();
        }}
        onChange={(event) => {
          setValue(event.currentTarget.value);
        }}
        autoComplete="off"
        aria-autocomplete="none"
      />
    </Box>
  );
};
