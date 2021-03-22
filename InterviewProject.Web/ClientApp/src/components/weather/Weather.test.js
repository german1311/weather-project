import React from "react";
import { render } from "@testing-library/react";
import Weather from "./Weather";

test("should render form correctly", () => {
  const { getByText, getByLabelText, debug } = render(<Weather />);
  const locationInput = getByLabelText(/Location Name/i);
  
  expect(locationInput).toBeInTheDocument();
});
