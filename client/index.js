import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { AppContainer } from "react-hot-loader";
import { loadComponents } from "loadable-components";
import { Provider } from "react-redux";
import io from "socket.io-client";
import App from "./AppContainer";
import { configureStore } from "./store";

// Base stylesheet
require("./styles/main.css");

// Initialize store
const store = configureStore(window.__INITIAL_STATE__);

const socket = io();

const mountApp = document.getElementById("root");

loadComponents().then(() => {
  hydrate(
    <AppContainer>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    mountApp
  );
});

// For hot reloading of react components
if (module.hot) {
  module.hot.accept("./AppContainer", () => {
    const NextApp = require("./AppContainer").default; // eslint-disable-line global-require
    hydrate(
      <AppContainer>
        <Provider store={store}>
          <BrowserRouter>
            <NextApp />
          </BrowserRouter>
        </Provider>
      </AppContainer>,
      mountApp
    );
  });
}
