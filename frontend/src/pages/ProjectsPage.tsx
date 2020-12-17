import React, { useState } from "react";

import { useQuery } from "@apollo/client";

import { Box, Typography, styled, Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

import { GET_PROJECTS } from "../graphql/queries";

import MainPage from "./MainPage";
import AddNewProjectForm from "./AddNewProjectForm";

import CustomTable from "../components/CustomTable";
import CustomModal from "../components/CustomModal";

import { projectColumns } from "../data/tableColumns";

const NoProjectsContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "75vh",
  border: "1px solid #6500ea",
  borderRadius: "20px",
  textAlign: "center",
});

const AddNewProject = styled(Button)({
  backgroundColor: "#6500ea",
  color: "#ffffff",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#6500ea",
    opacity: "0.9",
  },
  marginTop: "16px",
});

const ProjectsPage = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  const [isAddNewProjectModalOpen, setIsAddNewProjectModalOpen] = useState(
    false
  );

  return (
    <MainPage>
      {loading && (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Box display="flex" justifyContent="center">
          <Typography>Something went wrong. Please try again later.</Typography>
        </Box>
      )}
      {data && data.projects.length > 0 ? (
        <>
          <Typography variant="h5">Projects</Typography>
          <CustomTable
            name="projects"
            columns={projectColumns}
            data={data.projects}
          />
          <AddNewProject
            variant="contained"
            onClick={() => setIsAddNewProjectModalOpen(true)}
          >
            Add new project
          </AddNewProject>
        </>
      ) : (
        <>
          <NoProjectsContainer>
            <Typography variant="h6">
              Track time so you can focus on your best work
            </Typography>
            <AddNewProject
              variant="contained"
              onClick={() => setIsAddNewProjectModalOpen(true)}
            >
              Add new project
            </AddNewProject>
          </NoProjectsContainer>
        </>
      )}
      <CustomModal
        isOpen={isAddNewProjectModalOpen}
        title="Add new project"
        close={() => setIsAddNewProjectModalOpen(false)}
      >
        <AddNewProjectForm close={() => setIsAddNewProjectModalOpen(false)} />
      </CustomModal>
    </MainPage>
  );
};

export default ProjectsPage;
