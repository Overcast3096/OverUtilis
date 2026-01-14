import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router";

import App from "./App.jsx";
import Calculator from "./components/catagories/Calculator.jsx";
import Converter from "./components/catagories/Converter.jsx";
import Improver from "./components/catagories/Improver.jsx";
import Splash from "./components/catagories/Splash.jsx";

import AlphaNumber from "./components/catagories/modules/AlphaNumber.jsx";
import Waterline from "./components/catagories/modules/Waterline.jsx";
import Overclock from "./components/catagories/modules/Overclock.jsx";

import "./styles/reset.css";
import "./index.css";

const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            { path: "converters", Component: Converter },
            {
                path: "calculators",
                Component: Calculator,
                children: [
                    { index: true, Component: Splash },
                    { path: "waterline", Component: Waterline },
                    { path: "overclock", Component: Overclock },
                ],
            },
            { index: true, Component: Calculator },
            {
                path: "improvers",
                Component: Improver,
                children: [{ path: "a1z26", Component: AlphaNumber }],
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
