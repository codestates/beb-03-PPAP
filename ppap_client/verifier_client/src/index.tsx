import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { Provider } from "react-redux";

import configureStore from "./redux/configureStore";
import { PersistGate } from "redux-persist/lib/integration/react";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root")!);
const { store, persistor } = configureStore();

root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <React.StrictMode>
          <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>
);
