import { NavLink, Outlet } from "react-router";

import Sidebar from "../Sidebar";

function Calculator() {
    const splashText = {
        title: "Calculators",
        desc: "This tab is a collection of calculators for various games I play. Oftentimes, these are made because I encountered something and wanted a solution in a particular way. Hopefully these are as useful for me as it is for you!",
        detail: "Currently this tab only includes various calculations in GTNH.",
    };

    return (
        <div className="sidebar-content-layout">
            <Sidebar>
                <div className="sidebar-cata">
                    <em>GTNH</em>
                </div>
                <NavLink
                    to="/calculators/waterline"
                    className={"navbar-reset sidebar-indent"}
                >
                    {({ isActive }) => (
                        <button
                            className={
                                isActive
                                    ? "sidebar-primary"
                                    : "sidebar-inactive"
                            }
                        >
                            Waterline
                        </button>
                    )}
                </NavLink>
            </Sidebar>
            <Outlet context={{ splashText }} />
        </div>
    );
}

export default Calculator;
