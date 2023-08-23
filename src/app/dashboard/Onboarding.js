import React from "react";
import Header from "./Components/Header";
import DashboardStyle from "./Styles/Dashboard.module.css";
import Onboarding from "./Pages/Onboarding";

function Dashboard() {
  return (
    <div className={DashboardStyle.dashboard_main_remodel}>
      <Header className={DashboardStyle.dashboard_header} />
      <Onboarding />
      <h1>Hello</h1>
    </div>
  );
}

export default Dashboard;
