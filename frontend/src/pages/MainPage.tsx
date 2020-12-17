import React from "react";

import { Box, Typography, styled } from "@material-ui/core";

const Header = styled(Typography)({
  textAlign: "center",
});

type MainPageProps = {
  children: object;
}

const MainPage = (props: MainPageProps) => {
  const { children } = props;
  return (
    <>
      <Box marginBottom="50px">
        <Header variant="h4">Time Tracking Application</Header>
      </Box>
      {children}
    </>
  );
};

export default MainPage;
