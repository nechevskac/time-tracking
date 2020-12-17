import React from "react";

import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";

import ProjectActions from "../pages/ProjectsActions";
import TimeAction from "../pages/TimeAction";

import { TableColumn } from "../types/tableColumn";
import { Project } from "../types/project";
import { Time } from "../types/time";

type CustomTableProps = {
  name: string;
  columns: TableColumn[];
  data: any;
};

const CustomTable = (props: CustomTableProps) => {
  const { name, columns, data } = props;

  const getTableBody = () => {
    if (name === "projects") {
      return data.map((project: Project, index: number) => (
        <TableRow key={project.id}>
          <TableCell component="th" scope="row">
            {index + 1}
          </TableCell>
          <TableCell>{project.name}</TableCell>
          <TableCell>{project.description}</TableCell>
          <TableCell>
            <ProjectActions projectId={project.id} />
          </TableCell>
        </TableRow>
      ));
    } else {
      return data.map((time: Time, index: number) => (
        <TableRow key={time.id}>
          <TableCell component="th" scope="row">
            {index + 1}
          </TableCell>
          <TableCell>{time.description}</TableCell>
          <TableCell>{time.amount}</TableCell>
          <TableCell>
            <TimeAction timeId={time.id} />
          </TableCell>
        </TableRow>
      ));
    }
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col: TableColumn) => (
              <TableCell key={col.id}>{col.name}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{getTableBody()}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
