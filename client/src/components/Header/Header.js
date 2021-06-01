import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import GoogleAuth from "../../components/GoogleAuth/GoogleAuth";

import "./Header.scss";

function Header(props) {
  const isAuth = useSelector((state) => state.auth.isSignedIn);

  return (
    <div className="header">
      <section>
        <Link
          className="user-nav__link user-nav__link--discover"
          to="/allprojects"
        >
          Discover
        </Link>
      </section>

      <section>
        {!isAuth ? (
          <Link className="user-nav__link" to="/login">
            Log in
          </Link>
        ) : (
          ""
        )}

        {isAuth ? (
          <Link className="user-nav__link" to="/dashboard">
            Dashboard
          </Link>
        ) : (
          ""
        )}
      </section>

      <section>
        <GoogleAuth className="user-nav__link user-nav__link--danger" />{" "}
      </section>
    </div>
  );
}

export default Header;
