import React from "react";
import { Provider } from "react-redux";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { getLoadableState } from "loadable-components/server";
import sagas from "../../client/sagas";
import Context from "react-context-component";
import AppContainer from "../../client/AppContainer";
import { configureStore } from "../../client/store";
import renderer from "./renderer";

const reactApp = async (req, res, next) => {
  const store = configureStore();
  const context = {};
  let loadableState = {};
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

  store.runSaga(sagas).done.then(() => {
    const initialView = renderToString(appWithRouter);
    const finalState = store.getState();
    res
      .set("Content-Type", "text/html")
      .status(200)
      .end(renderer(initialView, finalState, loadableState));
  });

  loadableState = await getLoadableState(appWithRouter);

  store.close();
};

export default reactApp;
