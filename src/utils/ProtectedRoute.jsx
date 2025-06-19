import React from "react";
import {Navigate, Outlet} from "react-router-dom";

const ProtectedRoute = ({
    canActivate,
    redirectTo = '/',
}) => {
    if (!canActivate) {
        return <Navigate to={redirectTo} replace />;
    }
    return <Outlet />;
}

export default ProtectedRoute;