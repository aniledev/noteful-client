import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import AddFolder from "./AddFolder";

describe(`AddFolder component`, () => {
  const props = {
    className: "test-class-name",
    children: <p>test children</p>,
    "data-other": "test-other-prop"
  };

  it("renders a form.AddFolder by default", () => {
    const wrapper = shallow(<AddFolder />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("renders the AddFolder given props", () => {
    const wrapper = shallow(<AddFolder {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
