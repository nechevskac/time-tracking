import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query {
    projects {
      id
      name
      description
      totalHours
    }
  }
`;

export const DELETE_PROJECT = gql`
mutation DeleteProject($projectId: ID!) {
  deleteProject(projectId: $projectId) {
    id
  }
}
`;

export const GET_TIMES = gql`
  query {
    times {
      id
      description
      amount
      projectId
    }
  }
`;

export const DELETE_TIME = gql`
mutation DeleteTime($timeId: ID!) {
  deleteTime(timeId: $timeId) {
    id
  }
}
`;
