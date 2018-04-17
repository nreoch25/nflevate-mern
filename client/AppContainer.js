import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { Helmet } from "react-helmet";

import Header from "./components/partials/Header";
import Footer from "./components/partials/Footer";
import * as Routes from "./Routes";

class App extends Component {
  render() {
    return (
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
                <Route exact path="/logout" component={Routes.Logout} />
                <Route exact path="/admin" component={Routes.Admin} />
                <Route exact path="/group/:name" component={Routes.Group} />
                <Route exact path="/profile/:user" component={Routes.Profile} />
                <Route
                  exact
                  path="/requests/:user"
                  component={Routes.FriendRequests}
                />
                <Route
                  exact
                  path="/private/:sender/:receiver"
                  component={Routes.PrivateChat}
                />
                <Route exact path="/players" component={Routes.PlayerNews} />
                <Route exact path="/articles" component={Routes.Articles} />
                <Route component={Routes.PageNotFound} />
              </Switch>
            </div>
          )}
        />
      </div>
    );
  }
}

export default withRouter(App);
