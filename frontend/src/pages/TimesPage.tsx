import React, { useState } from "react";

import { useQuery } from "@apollo/client";

import { Box, Button, styled, Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

import AddNewTimeForm from "./AddNewTimeForm";

import { GET_TIMES } from "../graphql/queries";

import CustomModal from "../components/CustomModal";
import CustomTable from "../components/CustomTable";

import { timeColumns } from "../data/tableColumns";

import { Time } from "../types/time";

const NoTimesContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "50vh",
  border: "1px solid #6500ea",
  borderRadius: "20px",
  textAlign: "center",
});

const AddNewTime = styled(Button)({
  backgroundColor: "#6500ea",
  color: "#ffffff",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#6500ea",
    opacity: "0.9",
  },
  marginTop: "16px",
});

type TimePageProps = {
  projectId: string;
};

const TimesPage = (props: TimePageProps) => {
  const { projectId } = props;
  const { loading, error, data } = useQuery(GET_TIMES);

  const [isAddNewTimeModalOpen, setIsAddNewTimeModalOpen] = useState(false);

  const filteredData = () => {
    let filteredData: Time[] = [];
    if (data && data.times.length > 0) {
      filteredData = data.times.filter(
        (time: { projectId: string }) => time.projectId === projectId
      );
    }
    return filteredData;
  };

  return (
    <Box marginTop="50px">
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
      {filteredData().length > 0 ? (
        <>
          <Typography variant="h6">Times</Typography>
          <CustomTable
            name="times"
            columns={timeColumns}
            data={filteredData()}
          />
          <AddNewTime
            variant="contained"
            onClick={() => setIsAddNewTimeModalOpen(true)}
          >
            Add new time
          </AddNewTime>
        </>
      ) : (
        <>
          <NoTimesContainer>
            <Typography variant="h6">
              Looks like there are no times for this project.
            </Typography>
            <AddNewTime
              variant="contained"
              onClick={() => setIsAddNewTimeModalOpen(true)}
            >
              Add new time
            </AddNewTime>
          </NoTimesContainer>
        </>
      )}
      <CustomModal
        isOpen={isAddNewTimeModalOpen}
        title="Add new time"
        close={() => setIsAddNewTimeModalOpen(false)}
      >
        <AddNewTimeForm
          close={() => setIsAddNewTimeModalOpen(false)}
          projectId={projectId}
        />
      </CustomModal>
    </Box>
  );
};

export default TimesPage;
