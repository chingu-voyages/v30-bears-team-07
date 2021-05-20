import React from "react";
import { shallow } from "enzyme";

import { findByTestAttributes, storeFactory } from "../../../../test/testUtils";

import Button from "./Button";

const defaultProps = {};

/**
 * factory function to create a ShallowWrapper for the component
 *@function setup
 *@params {object} props - component props specific to this setup
 *@params {object} initialState - initial state for the setup
 *@returns {ShallowWrapper}
 */
const setup = (props, initialState = {}) => {
  const store = storeFactory(initialState);
  const setupProps = { ...defaultProps, ...props };
  const wrapper = shallow(<Button store={store} {...setupProps} />);
  return wrapper;
};

test("component renders without error", () => {
  const wrapper = setup();
  const component = findByTestAttributes(wrapper, "component-button");
  expect(component.length).toBe(1);
});
// .comment
