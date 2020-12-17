import React from "react";

import { Box, IconButton, Tooltip } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import { useMutation } from "@apollo/client";
import { DELETE_TIME, GET_PROJECTS, GET_TIMES } from "../graphql/queries";

type TimeActionProps = {
  timeId: number;
};

const TimeAction = (props: TimeActionProps) => {
  const { timeId } = props;

  const [deleteTime] = useMutation(DELETE_TIME, {
    refetchQueries: [{ query: GET_TIMES }, { query: GET_PROJECTS }],
  });

  const removeTime = (id: number) => {
    deleteTime({ variables: { timeId: id } });
  };

  return (
    <Box display="flex" width="30%" justifyContent="space-between">
      <Tooltip title="Delete Time" placement="top">
        <IconButton onClick={() => removeTime(timeId)}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default TimeAction;
