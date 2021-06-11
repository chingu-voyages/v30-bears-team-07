import React from "react";
import { Link } from "react-router-dom";
import RegisterForm from "../../components/forms/auth/RegisterForm/RegisterForm";

const Register = ({}) => {
  return (
    <main className="auth page-container">
      <section className="auth__form-container">
        <h1 className="auth__heading-title">Register for an Account</h1>

        <RegisterForm />
        <Link className="form__link" to={`/login`}>
          Click here to login instead.
        </Link>
      </section>
    </main>
  );
};

export default Register;
