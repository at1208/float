import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import Routes from "./Router";

const App = ({ Router, routerProps, store, helmetContext = {} }) => (
  <Provider store={store}>
    <HelmetProvider context={helmetContext}>
      <Router {...routerProps}>
        <Routes />
      </Router>
    </HelmetProvider>
  </Provider>
);

export default App;
