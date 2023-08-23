import React from "react";
import Layout from "./Layout.module.css";
import { sidebar } from "../Sidebar/sidebarUrls";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";

function RouteLayout({ children, title }) {
  const l = useLocation()?.pathname;
  const parent = l?.split("/")?.[2];
  const sub = l?.split("/")?.[3];
  const yp = sidebar?.find((x) => x?.iconLink === parent);
  const mp = yp?.subLinks?.find((x) => x?.subUrl?.split("/")[1] === sub);
  return (
    <div className={Layout.Route_Layout}>
      <div className={Layout.Route_Layout_Nav}>
        Dashboard{" "}
        {yp?.iconTag && <NavLink to={yp?.iconLink}>/ {yp?.iconTag}</NavLink>}
        {mp?.sublink && <NavLink to={mp?.subUrl}>/ {mp?.sublink}</NavLink>}
      </div>
      <div className={Layout.Route_Layout_Body}>{children}</div>
    </div>
  );
}

export default RouteLayout;
