import React from 'react';

import { Box, styled } from '@material-ui/core';

const Root = styled(Box)({
  padding: '25px 100px 0 100px',
  backgroundColor: 'rgba(31, 54, 66, 0.04)',
  overflow: 'auto',
  minHeight: '96vh',
});

type RootWrapperProps = {
  children: object;
};

const RootWrapper = (props: RootWrapperProps) => {
  return <Root>{props.children}</Root>;
};

export default RootWrapper;
