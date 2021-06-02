import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Field, reduxForm } from "redux-form";
import { useSelector, useDispatch } from "react-redux";
import history from "../../../../history";
import serverRest from "../../../../api/serverRest";

//note: I think this is deprecated so I'm going to leave it here for now (Tella)
// import StripeCheckout from "react-stripe-checkout";
import { donateToProject } from "../../../../redux/actions/projectsActions";

import ErrorNotifications from "../../../UIComponents/FormElements/ErrorNotifications/ErrorNotifications";
// import Modal from "../../../UIComponents/Modal/Modal";
import ReduxInput from "../../../../redux/FormComponents/ReduxInput/ReduxInput";

// import { actionShowLoader } from "../../../../redux/actions/loaderActions";
// import LoadingSpinner from "../../../loaders/LoadingSpinner";
import { loadStripe } from "@stripe/stripe-js";
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51IxJ2SIxV9qIAWAE0331WoGbLUtUd2dCTAM8mgZu4mhSs7euesdremY1D7olfsoqPx4gK1P7ChbIiRIXnxRRcrY300elzL1hA6"
);

const DonateForm = (props) => {
  // redux store variables
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();
  // state variables
  const [amount, setAmount] = useState(0);

  /*
  const onModalCloseHandler = () => {
    if (props.onModalClose) props.onModalClose();
  };
  */

  // submit handler
  const onSubmit = async (formValues) => {
    const donateToProjectSuccessCb = () => {
      // onModalCloseHandler();
    };
    console.log(formValues);
    // run an action
    // props.actionShowLoader("donateToProjectModalForm", true);
    await props.donateToProject(formValues, donateToProjectSuccessCb);
  };

  const renderErrorNotifications = () => {
    const errorMessage = error.msg;
    console.log(errorMessage);
    if (errorMessage) {
      return <ErrorNotifications message={errorMessage.msg || null} />;
    }
    return null;
  };

  // note: can be used later
  // const renderLoader = () => {
  //   return <LoadingSpinner showLoader={props.showLoader} />;
  // };

  const checkoutOnClickHandler = async (event) => {
    // Get Stripe.js instance
    const stripe = await stripePromise;

    // Call your backend to create the Checkout Session
    const response = await serverRest.post(
      `/projects/${props.project.id}/create-checkout-session`,
      { amount, projectId: props.project.id }
    );
    const session = await response.data;
    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.id && !result.error) {
      // handle success
      console.log("success");
      history.push(`/projects/${props.project.id}`);
      // show success notification
    }
    // handle error
    else if (result.error) {
      console.log("failure");
      history.push(`/projects/${props.project.id}`);
      // show failure notification
    }
  };

  const renderContent = () => {
    return (
      <div className="donate-form form__form-content modal-form-content">
        {renderErrorNotifications()}
        <input
          type="number"
          placeholder="Donation Amount"
          value={amount}
          name="amount"
          onChange={({ target }) => setAmount(target.value)}
        />

        <div className="form-button-container">
          <button role="link" onClick={checkoutOnClickHandler}>
            Checkout
          </button>
        </div>
      </div>
    );
  };

  return renderContent();

  /*
  // render
  return ReactDOM.createPortal(
    renderContent(),
    document.getElementById("modal")
  );
  */
};

const validate = (formValues) => {
  console.log(formValues);
  const errors = {};
  if (!formValues.amount) {
    errors.amount = "Please input an amount to be donated.";
  }
  return errors;
};

export default reduxForm({
  form: "donateFormModal",
  keepDirtyOnReinitialize: true,
  enableReinitialize: true,
  validate,
})(DonateForm);

/*previous render function

return (
  <Modal
    componentClass="donate-form"
    headingText="Create a Project"
    onModalClose={onModalCloseHandler}
  >
    <form id="donate-form-form" autoComplete="off">
      <div className="donate-form form__form-content modal-form-content">
        {renderErrorNotifications()}
        <Field
          name="amount"
          component={ReduxInput}
          type="number"
          props={{
            formName: "project",
            inputProps: {
              placeholder: "Project Name",
              className: "form__input",
              maxLength: "60",
              autoComplete: "off",
              id: "donate-form-amount-field",
              type: "text",
              autoFocus: true,
            },
            labelProps: {
              className: "form__label",
              text: "Project Name *",
              id: "donate-form-amount-label",
            },
          }}
        />

        <div className="form-button-container">
          <button role="link">Checkout</button>
        </div>
      </div>
    </form>
  </Modal>
);
*/

/*

<button
  id="donate-form-submit"
  className={"form-button submit mt-20"}
  type="submit"
  onClick={props.handleSubmit(onSubmit)}
>
  Create Project
</button>

*/

/*
// const stripe = window.Stripe(
//   "pk_test_51IxJ2SIxV9qIAWAE0331WoGbLUtUd2dCTAM8mgZu4mhSs7euesdremY1D7olfsoqPx4gK1P7ChbIiRIXnxRRcrY300elzL1hA6"
// );

const setup = () => {
  serverRest
    .post(
      `/projects/${props.project.id}/create-payment-intent`,
      { amount: formValues.amount }
    )
    .then(function (result) {
      return result.json();
    })
    .then(function (data) {
      var elements = stripe.elements();
      var style = {
        base: {
          color: "#32325d",
          fontFamily: "Arial, sans-serif",
          fontSmoothing: "antialiased",
          fontSize: "16px",
          "::placeholder": {
            color: "#32325d",
          },
        },
        invalid: {
          fontFamily: "Arial, sans-serif",
          color: "#fa755a",
          iconColor: "#fa755a",
        },
      };
      var card = elements.create("card", { style: style });
      // Stripe injects an iframe into the DOM
      card.mount("#card-element");
      card.on("change", function (event) {
        // Disable the Pay button if there are no card details in the Element
        document.querySelector("button").disabled = event.empty;
        document.querySelector("#card-error").textContent = event.error
          ? event.error.message
          : "";
      });
      var form = document.getElementById("payment-form");
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        // Complete payment when the submit button is clicked
        payWithCard(stripe, card, data.clientSecret);
      });
    });
};

//render
<form id="payment-form">
  <div id="card-element">
    </div>
  <button id="submit">
    <div class="spinner hidden" id="spinner"></div>
    <span id="button-text">Pay now</span>
  </button>
  <p id="card-error" role="alert"></p>
  <p class="result-message hidden">
    Payment succeeded, see the result in your
    <a href="" target="_blank">
      Stripe dashboard.
    </a>{" "}
    Refresh the page to pay again.
  </p>
</form>
*/
