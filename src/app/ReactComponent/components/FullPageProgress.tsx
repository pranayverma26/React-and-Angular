import { Loading, Flex } from "@100mslive/react-ui";
import React from 'react'

const FullPageProgress = () => (
  <Flex justify="center" align="center" css={{ size: "100%" }}>
    <Loading size={100} />
  </Flex>
);

export default FullPageProgress;
