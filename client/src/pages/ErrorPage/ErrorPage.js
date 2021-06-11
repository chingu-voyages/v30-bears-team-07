import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import history from "../../history";
import "./ErrorPage.scss";

class ErrorPage extends React.Component {
  state = {};
  componentDidMount() {}
  renderErrorMessage = () => {
    return (
      <>
        <h1 className="error-page__heading">
          {this.props.errorHeading || "Error"}
        </h1>
        {this.props.errorCode ? (
          <h2 className="error-page__heading">
            Error code: {this.props.errorCode}
          </h2>
        ) : null}

        <p className="error-page__p">
          {this.props.errorText || "Sorry, something went wrong."}
        </p>
      </>
    );
  };
  render() {
    return (
      <main className="error-page page-container">
        <div className="error-page__message-container">
          {this.renderErrorMessage()}
          <br />
          <p className="error-page__p">
            Try going back to the previous page or click one of the links below:
          </p>
          <div className="error-page two-buttons-container">
            <Link
              to="/home"
              className="error-page__link"
              onClick={() => {
                // force redirect if user is not logged in yet
                if (!this.props.isSignedIn) {
                  setTimeout(() => {
                    history.push("/login");
                  }, 1);
                }
              }}
            >
              Home
            </Link>
            <Link to="/login" className="error-page__link">
              Login
            </Link>
          </div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, {})(ErrorPage);
