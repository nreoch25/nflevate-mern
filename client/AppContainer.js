import React from "react";
import { Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";

import Header from "./components/partials/Header";
import Footer from "./components/partials/Footer";
import * as Routes from "./Routes";
import { fetchGroups } from "./actions/groups";
import { currentUser } from "./actions/authentication";

const App = () => (
  <div>
    <div id="background" />
    <Helmet>
      <title>MERN Boilerplate</title>
      <meta property="og:title" content="MERN Boilerplate" />
    </Helmet>
    <Header />
    <Route
      path="/"
      component={({ match }) => (
        <div>
          <Switch>
            <Route exact path="/" component={Routes.Index} />
            <Route exact path="/home" component={Routes.Home} />
            <Route exact path="/signup" component={Routes.Signup} />
            <Route exact path="/admin" component={Routes.Admin} />
            <Route exact path="/group/:name" component={Routes.Group} />
            <Route component={Routes.PageNotFound} />
          </Switch>
        </div>
      )}
    />
  </div>
);

App.loadData = [
  ({ dispatch }) => dispatch(fetchGroups()),
  ({ dispatch }) => dispatch(currentUser())
];

export default App;
