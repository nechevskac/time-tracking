import React from "react";
import { useParams } from "react-router-dom";

import { Box, Typography } from "@material-ui/core";

import MainPage from "./MainPage";
import TimesPage from "./TimesPage";
import ProjectSummary from "./ProjectSummary";

const ProjectPage = () => {
  const { projectId } = useParams<{ projectId: string }>();

  return (
    <MainPage>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h5">Project Summary</Typography>
        <Box marginTop="16px">
          <ProjectSummary projectId={projectId} />
          <TimesPage projectId={projectId} />
        </Box>
      </Box>
    </MainPage>
  );
};

export default ProjectPage;
