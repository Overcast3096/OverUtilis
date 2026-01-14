import { NavLink, useLocation } from "react-router";

function Header() {
    const { pathname: path } = useLocation();

    const isCalcTab = path === "/" || path.startsWith("/calculator");

    return (
        <header className="util-header">
            <h1>Overcast's Utilities</h1>
            <nav className="navbar-row">
                <NavLink to="/converters" className={"navbar-reset"}>
                    {({ isActive }) => (
                        <button
                            className={
                                isActive ? "btn-primary" : "btn-inactive"
                            }
                        >
                            Converters
                        </button>
                    )}
                </NavLink>
                <NavLink to="/calculators" className={"navbar-reset"}>
                    {() => (
                        <button
                            className={
                                isCalcTab ? "btn-primary" : "btn-inactive"
                            }
                        >
                            Calculators
                        </button>
                    )}
                </NavLink>
                <NavLink to="/improvers" className={"navbar-reset"}>
                    {({ isActive }) => (
                        <button
                            className={
                                isActive ? "btn-primary" : "btn-inactive"
                            }
                        >
                            Improvers
                        </button>
                    )}
                </NavLink>
            </nav>
        </header>
    );
}

export default Header;
