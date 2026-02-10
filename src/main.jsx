import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import { store } from "./store/index.js";
import { Provider } from "react-redux";
import MessageToast from "./component/MessageToast";

import "./App.scss";
// router
import { createHashRouter, RouterProvider } from "react-router";
import routes from "./routes/index.jsx";
const router = createHashRouter(routes);

// libs
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <MessageToast />
        <RouterProvider router={router} />
    </Provider>,
    //   <StrictMode>
    //     <App />
    //   </StrictMode>,
);
