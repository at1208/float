import React from "react";
import { hydrateRoot } from "react-dom/client";
import App from "../App";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "@utils/redux";

const createApp = () => (
  <App Router={BrowserRouter} store={createStore(window.__PRELOADED_STATE__)} />
);

const root = hydrateRoot(document.getElementById("root"), createApp());

if (module.hot) {
  module.hot.accept("../App", () => {
    root.render(createApp());
  });
}
