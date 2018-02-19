import React from "react";
import { Provider } from "react-redux";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { getLoadableState } from "loadable-components/server";
import Context from "react-context-component";
import AppContainer from "../../client/AppContainer";
import { configureStore } from "../../client/store";
import renderer from "./renderer";

const reactApp = async (req, res, next) => {
  const store = configureStore();
  // fetch data serverside
  console.log(AppContainer.loadData);
  const context = {};
  const appWithRouter = (
    <Provider store={store}>
      <StaticRouter context={{}} location={req.url}>
        <AppContainer />
      </StaticRouter>
    </Provider>
  );
  if (context.url) {
    return res.redirect(context.url);
  }

  const loadableState = await getLoadableState(appWithRouter);
  const finalState = store.getState();
  const initialView = renderToString(appWithRouter);
  res
    .set("Content-Type", "text/html")
    .status(200)
    .end(renderer(initialView, finalState, loadableState));
};

export default reactApp;
