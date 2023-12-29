import React from "react";
import { Outlet } from "react-router-dom";

const NavBar = React.lazy(() => import("./NavBar"));
const CircleMain = React.lazy(() => import("../pages/CircleMain"));

const Layout = () => {
    return (
        <>
            <CircleMain />
            <div className="d-flex">
                <NavBar/>
                <div className="result_box">
                    <Outlet/>
                </div>
            </div>
        </>
    );
};

export default Layout;
