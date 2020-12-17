import React from "react";

import { useQuery } from "@apollo/client";

import { Box, Typography, styled, Tooltip } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";

import { GET_PROJECTS } from "../graphql/queries";

import { Project } from "../types/project";

const Container = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "500px",
  padding: "20px",
  borderRadius: "20px",
  backgroundColor: "#f7f2ff",
  boxShadow: "0 1px 4px 0 rgba(0, 21, 41, 0.12)",
});

const Name = styled(Typography)({
  fontSize: "18px",
  fontWeight: 400,
  textTransform: "uppercase",
});

const Description = styled(Typography)({
  fontSize: "16px",
  color: "#aeaeae",
});

const HoursIcon = styled(QueryBuilderIcon)({
  color: "#6500ea",
  marginRight: "8px",
});

type ProjectSummaryProps = {
  projectId: string;
};

const ProjectSummary = (props: ProjectSummaryProps) => {
  const { projectId } = props;

  const { loading, data } = useQuery(GET_PROJECTS);

  let projectById: Project = data && data.projects.filter(
    (project: Project) => project.id.toString() === projectId
  )[0];

  return (
    <>
      {loading && (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      )}
      {data && projectById && (<Container>
        <Box>
          <Name>{projectById.name}</Name>
          <Description>{projectById.description}</Description>
        </Box>
        <Tooltip title="Total hours" placement="top">
          <Box display="flex" flexDirection="row">
            <HoursIcon /> <Typography>{projectById.totalHours ? projectById.totalHours : 0} h</Typography>
          </Box>
        </Tooltip>
      </Container>)}
    </>
  );
};

export default ProjectSummary;
