import { useState } from "react";
import { Outlet } from "react-router";
import Header from "./components/Header";

import "./styles/layout.css";
import "./styles/button.css";

function App() {
    return (
        <div className="util-layout">
            <Header />

            <Outlet />
        </div>
    );
}

export default App;
