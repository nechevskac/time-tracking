import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { useMutation } from "@apollo/client";

import { Box, IconButton, Tooltip, styled } from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import { Routes } from "../App";

import { DELETE_PROJECT, GET_PROJECTS } from "../graphql/queries";

import AddNewProjectForm from "./AddNewProjectForm";

import CustomModal from "../components/CustomModal";

const ViewIcon = styled(VisibilityIcon)({
  color: "#6500ea",
});

const DelIcon = styled(DeleteIcon)({
  color: "#e22b2a",
});

type ProjectActionsProps = {
  projectId: number;
};

const ProjectActions = (props: ProjectActionsProps) => {
  const { projectId } = props;

  const history = useHistory();

  const [isEditProjectModalOpen, setIsEditProjectModalOpen] = useState(
    false
  );

  const goToProjectPage = (id: number) => {
    history.push(Routes.PROJECT.replace(":projectId", id.toString()));
  };

  const editProject = (id: number) => {
    setIsEditProjectModalOpen(true);
  };

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  const removeProject = (id: number) => {
    deleteProject({ variables: { projectId: id } });
  };

  return (
    <>
      <Box display="flex" width="30%" justifyContent="space-between">
        <Tooltip title="View Project" placement="top">
          <IconButton onClick={() => goToProjectPage(projectId)}>
            <ViewIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit Project" placement="top">
          <IconButton onClick={() => editProject(projectId)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete Project" placement="top">
          <IconButton onClick={() => removeProject(projectId)}>
            <DelIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <CustomModal
        isOpen={isEditProjectModalOpen}
        title="Edit project"
        close={() => setIsEditProjectModalOpen(false)}
      >
        <AddNewProjectForm projectId={projectId} close={() => setIsEditProjectModalOpen(false)} />
      </CustomModal>
    </>
  );
};

export default ProjectActions;
