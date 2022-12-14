import React from "react";
import { styled, flexCenter } from "@100mslive/react-ui";
import PreviewJoin from "./PreviewJoin";

const PreviewContainer = ({ token, onJoin, env, skipPreview, initialName }: any) => {
  return (
    <Container>
      <PreviewJoin
        initialName={initialName}
        skipPreview={skipPreview}
        env={env}
        onJoin={onJoin}
        token={token}
      />
    </Container>
  );
};

const Container = styled("div", {
  width: "100%",
  ...flexCenter,
  flexDirection: "column",
});

export default PreviewContainer;
