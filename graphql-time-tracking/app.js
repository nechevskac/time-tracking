const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

let times = [];
let projects = [];

app.use('/graphql', graphqlHTTP({
  schema: buildSchema(`
    type Time {
      id: ID!
      description: String!
      amount: String!
      projectId: ID
    }

    type Project {
      id: ID!
      name: String!
      description: String!
      totalHours: Float
    }

    input TimeInput {
      description: String!
      amount: String!
      projectId: ID!
    }
    
    input ProjectInput  {
      name: String!
      description: String!
    }

    type RootQuery {
      times: [Time!]!
      projects: [Project!]!
    }

    type RootMutation {
      createTime(timeInput: TimeInput): Time
      createProject(projectInput: ProjectInput): Project
      deleteProject(projectId: ID!): [Project]
      deleteTime(timeId: ID!): [Time]
      updateProject(projectId: ID!, projectInput: ProjectInput): Project
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
  rootValue: {
    projects: () => {
      return projects;
    },    
    times: () => {
      return times;
    },
    createTime: (args) => {
      const time = {
        id: Math.floor(Math.random() * 100).toString(),
        description: args.timeInput.description,
        amount: args.timeInput.amount,
        projectId: args.timeInput.projectId
      };
      const projectById = projects.filter(project => project.id === time.projectId)[0];
      const indexOfProjectById = projects.indexOf(projectById);
      let sum = 0;
      if (projectById.totalHours) {
        sum += projectById.totalHours
      };
      projects[indexOfProjectById] = {
        id: projectById.id,
        name: projectById.name,
        description: projectById.description,
        totalHours: sum + Number(time.amount)
      };
      times.push(time);
      return time;
    },    
    createProject: (args) => {
      const project = {
        id: Math.floor(Math.random() * 100).toString(),
        name: args.projectInput.name,
        description: args.projectInput.description,
      };
      projects.push(project);
      return project;
    },
    deleteProject: (args) => {
      projects = projects.filter(project => project.id !== args.projectId);
      return projects;
    },
    deleteTime: (args) => {
      const timeById = times.filter(time => time.id === args.timeId)[0];
      const projectById = projects.filter(project => project.id === timeById.projectId)[0];
      const indexOfProjectById = projects.indexOf(projectById);
      projects[indexOfProjectById] = {
        id: projectById.id,
        name: projectById.name,
        description: projectById.description,
        totalHours: projectById.totalHours - Number(timeById.amount)
      };
      times = times.filter(time => time.id !== args.timeId);
      return times;
    },
    updateProject: (args) => {
      const projectById = projects.filter(project => project.id === args.projectId)[0];
      const indexOfProjectById = projects.indexOf(projectById);
      projects[indexOfProjectById] = {
        id: args.projectId,
        name: args.projectInput.name,
        description: args.projectInput.description,
      }
      return projects[indexOfProjectById];
    }
  },
  graphiql: true,
}));

app.listen(8000);

