import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearErrors } from "../../redux/actions/errorActions";
import LoginForm from "../../components/forms/auth/LoginForm/LoginForm";
import GoogleAuth from "../../components/GoogleAuth/GoogleAuth";

const Login = ({}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearErrors());
    };
  }, []);

  return (
    <main className="auth page-container">
      <section className="auth__form-container">
        <h1 className="auth__heading-title">Login</h1>

        <LoginForm />
        <div className="form-button-container">
          <GoogleAuth />
        </div>
        <Link className="form__link" to={`/register`}>
          Don't have an account? Register here.
        </Link>
      </section>
    </main>
  );
};

export default Login;
