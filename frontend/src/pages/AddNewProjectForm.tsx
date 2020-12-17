import React, { useState } from "react";

import { gql, useMutation, useQuery } from "@apollo/client";

import { Box, Button, styled } from "@material-ui/core";

import { GET_PROJECTS } from "../graphql/queries";

import TextFieldInput from "../components/TextFieldInput";

import { CreateNewProject } from "../types/createNewProject";
import { FormInput } from "../types/formInput";
import { Project } from "../types/project";

const Save = styled(Button)({
  backgroundColor: "#6500ea",
  color: "#ffffff",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#6500ea",
    opacity: "0.9",
  },
  marginTop: "75px",
});

type AddNewProjectFormProps = {
  projectId?: number;
  close: () => void;
};

const AddNewProjectForm = (props: AddNewProjectFormProps) => {
  const { projectId, close } = props;

  const { data } = useQuery(GET_PROJECTS);

  let projectById: Project =
    data &&
    data.projects.filter((project: Project) => project.id === projectId)[0];

  const [createNewProject, setCreateNewProject] = useState<CreateNewProject>({
    name: projectId ? projectById.name : "",
    description: projectId ? projectById.description : "",
  });

  const handleChange = (newInput: FormInput) => {
    setCreateNewProject({
      ...createNewProject,
      [newInput.name]: newInput.value,
    });
  };

  const clearState = () => {
    setCreateNewProject({
      name: "",
      description: "",
    });
  };

  const CREATE_PROJECT = gql`
    mutation {
      createProject(projectInput: {name: "${createNewProject.name}", description: "${createNewProject.description}" }) {
        id
        name
        description
      }
    }
  `;

  const UPDATE_PROJECT = gql`
    mutation {
      updateProject(projectId: "${projectId}", projectInput: {name: "${createNewProject.name}", description: "${createNewProject.description}" }) {
        id
        name
        description
      }
    }
  `;

  const [createProject] = useMutation(CREATE_PROJECT, {
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  const saveNewProject = () => {
    if (projectId) {
      updateProject();
    } else {
      createProject();
    }
    close();
    clearState();
  };

  return (
    <>
      <TextFieldInput
        name="name"
        value={createNewProject.name}
        onChange={handleChange}
        placeholder="Name*"
        type="text"
      />
      <TextFieldInput
        name="description"
        value={createNewProject.description}
        onChange={handleChange}
        placeholder="Description*"
        type="text"
      />
      <Box display="flex" justifyContent="flex-end">
        <Save
          variant="contained"
          onClick={saveNewProject}
          disabled={
            createNewProject.name === "" || createNewProject.description === ""
          }
        >
          Save
        </Save>
      </Box>
    </>
  );
};

export default AddNewProjectForm;
