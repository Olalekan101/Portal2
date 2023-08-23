import React from "react";
import RouteLayout from "../../Components/Layout/RouteLayout";
import DashboardHome from "./Dashboard_Home";

function Dashboard() {
  return (
    <RouteLayout title="Dashboard Home">
      <DashboardHome />
    </RouteLayout>
  );
}

export default Dashboard;
