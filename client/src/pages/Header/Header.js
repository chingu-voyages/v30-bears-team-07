import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
/*@Jamie#5503  I don't know where GoogleAuth is right now because I cant see your directory
 - Nice :)
 */
import GoogleAuth from "../../components/GoogleAuth/GoogleAuth";

import "./Header.scss";

function Header(props) {
  const isAuth = useSelector((state) => state.auth.isSignedIn);

  return (
    <div className="header">
      <div className="logo">
        <Link to="/">Logo</Link>
      </div>
      <div className="user-nav">
        <Link className="user-nav__link user-nav__link--discover" to="/">
          Discover
        </Link>
        {!isAuth ? (
          <Link className="user-nav__link" to="/login">
            Log in
          </Link>
        ) : (
          ""
        )}
        {isAuth ? (
          <div className="user-nav__user">
            <Link className="user-nav__link" to="/dashboard">
              Dashboard
            </Link>
            <GoogleAuth className="user-nav__link user-nav__link--danger" />
            {/*
              <Link className="user-nav__link" to="/login">
                Sign out
              </Link>              
            */}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Header;
