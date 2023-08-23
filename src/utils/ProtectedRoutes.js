import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { URL } from "./routes";
import { GetLocalStorage } from "./functions/GetLocalStorage";

const useAuth = () => {
  const data = GetLocalStorage?.();

  if (data?.userToken !== null) {
    return data?.userToken;
  }
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return !isAuth ? <Navigate to={URL.Home} /> : <Outlet />;
  // return <Outlet />;
};

const LoggedInRoute = () => {
  const isAuth = useAuth();
  return !isAuth ? <Outlet /> : <Navigate to={URL.Dashboard} />;
  // return <Outlet />;
};

export { ProtectedRoutes, useAuth, LoggedInRoute };
