import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import router from "./router/Router";
import { RouterProvider } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.js"; // Import the Redux store
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Suspense>
          <RouterProvider router={router}>
            <App />
          </RouterProvider>
        </Suspense>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
