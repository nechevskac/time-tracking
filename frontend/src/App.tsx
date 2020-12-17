import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import ProjectsPage from "./pages/ProjectsPage";
import ProjectPage from "./pages/ProjectPage";

import RootWrapper from "./components/RootWrapper";

export const Routes = {
  DEFAULT: "/",
  PROJECT: "/project/:projectId",
};
const BaseURL = "http://localhost:8000/graphql";

const App = () => {
  const client = new ApolloClient({
    uri: BaseURL,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <RootWrapper>
          <Switch>
            <Route path={Routes.DEFAULT} exact component={ProjectsPage} />
            <Route path={Routes.PROJECT} exact component={ProjectPage} />
          </Switch>
        </RootWrapper>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
