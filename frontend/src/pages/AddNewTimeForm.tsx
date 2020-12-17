import React, { useState } from "react";

import { gql, useMutation } from "@apollo/client";

import { Box, Button, styled } from "@material-ui/core";

import TextFieldInput from "../components/TextFieldInput";

import { GET_PROJECTS, GET_TIMES } from "../graphql/queries";

import { CreateNewTime } from "../types/createNewTime";
import { FormInput } from "../types/formInput";

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

type AddNewTimeFormProps = {
  close: () => void;
  projectId: string;
};

const AddNewTimeForm = (props: AddNewTimeFormProps) => {
  const { close, projectId } = props;

  const [createNewTime, setCreateNewTime] = useState<CreateNewTime>({
    description: "",
    amount: "",
  });

  const handleChange = (newInput: FormInput) => {
    setCreateNewTime({
      ...createNewTime,
      [newInput.name]: newInput.value,
    });
  };

  const clearState = () => {
    setCreateNewTime({
      description: "",
      amount: "",
    });
  };

  const CREATE_TIME = gql`
    mutation {
      createTime(timeInput: {description: "${createNewTime.description}", amount: "${createNewTime.amount}", projectId: "${projectId}" }) {
        id
        description
        amount
        projectId
      }
    }
  `;

  const [createTime] = useMutation(CREATE_TIME, {
    refetchQueries: [{ query: GET_TIMES }, { query: GET_PROJECTS }],
  });

  const saveNewTime = () => {
    createTime();
    close();
    clearState();
  };

  return (
    <>
      <TextFieldInput
        name="description"
        value={createNewTime.description}
        onChange={handleChange}
        placeholder="Description*"
        type="text"
      />
      <TextFieldInput
        name="amount"
        value={createNewTime.amount}
        onChange={handleChange}
        placeholder="Amount*"
        type="text"
      />
      <Box display="flex" justifyContent="flex-end">
        <Save
          variant="contained"
          onClick={saveNewTime}
          disabled={
            createNewTime.description === "" || createNewTime.amount === ""
          }
        >
          Save
        </Save>
      </Box>
    </>
  );
};

export default AddNewTimeForm;
