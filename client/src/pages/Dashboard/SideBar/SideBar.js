import React from "react";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";

const SideBar = () => {
  const { url } = useRouteMatch();

  return (
    <div className="dashboard__sidebar">
      <ul>
        <li>
          <Link to={`${url}/settings`}>Settings</Link>
        </li>
        <li>
          <Link to={`${url}/fundraised`}>Fundraised</Link>
        </li>
        <li>
          <Link to={`${url}/donations`}>Donations</Link>
        </li>
        <li>
          <Link to={`${url}/payments-infos`}>Payments infos</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
