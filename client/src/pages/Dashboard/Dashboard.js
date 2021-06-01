import React from "react";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import SideBar from "./SideBar/SideBar.js";
import "./Dashboard.scss";

const UserSettings = () => <h2>User settings</h2>;
const Fundraised = () => <h2>Fundraised</h2>;
const Donations = () => <h2>Donations</h2>;
const PaymentsInfos = () => <h2>Payments infos</h2>;

const Dashboard = () => {
  const { url, path } = useRouteMatch();

  return (
    <div className="dashboard">
      <SideBar />
      <div className="dashboard__main">
        <Switch>
          <Route path={`${path}/settings`}>
            <h2>User settings</h2>
          </Route>
          <Route path={`${path}/fundraised`}>
            <Fundraised />
          </Route>
          <Route path={`${path}/donations`}>
            <Donations />
          </Route>
          <Route path={`${path}/payments-infos`}>
            <PaymentsInfos />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Dashboard;
