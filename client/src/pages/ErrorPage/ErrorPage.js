import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import history from "../../history";
import "./ErrorPage.scss";

class ErrorPage extends React.Component {
  state = {};
  componentDidMount() {}
  renderErrorMessage = () => {
    let errorHeader = "Error";
    let errorParagraph = "Sorry, something went wrong.";
    let errorType = this.props.errorType || null;
    let errorCodeMessage = errorType ? (
      <p className="error-page__code move-up-until-450w">
        Error code: {errorType}
      </p>
    ) : null;

    if (this.props.errorType === "404") {
      errorHeader = "Page not found";
      errorParagraph =
        "Sorry, we can't seem to find the page you're looking for.";
    }
    return (
      <>
        <div className="error-page__title-container">
          <h1 className="error-page__header">{errorHeader} </h1>
          <span className="error-page__image-container"></span>
        </div>

        <p className="error-page__paragraph move-up-until-450w">
          {errorParagraph}
        </p>
        {errorCodeMessage}
      </>
    );
  };
  render() {
    return (
      <div className="error-page__container">
        <div className="error-page__message-container">
          {this.renderErrorMessage()}
          <p className="error-page__paragraph move-up-until-450w">
            Try going back to the previous page or click one of the links below:
          </p>
          <div className="error-page two-buttons-container move-up-until-450w">
            <Link
              to="/home"
              className="error-page transparent-bg-button"
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
            <Link to="/login" className="error-page transparent-bg-button">
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // Note: not implemented yet (-tella)
  // return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, {})(ErrorPage);
