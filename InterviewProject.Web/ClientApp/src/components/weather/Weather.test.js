import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import Weather from "./Weather";
import * as apiServiceMock from "../../providers/api";
jest.mock("../../providers/api");

test("should render form correctly", () => {
  const { getByText, getByLabelText, debug } = render(<Weather />);
  const locationInput = getByLabelText(/Location Name/i);

  expect(locationInput).toBeInTheDocument();
});

test("should make an api call to get weather", async () => {
  apiServiceMock.getLocation.mockResolvedValueOnce([
    { id: "01", name: "testValue" },
  ]);
  apiServiceMock.getWeathers.mockResolvedValueOnce([
    { date: new Date(), temperatureC: 15, temperatureF: 10, summary: "Sunny" },
  ]);

  const { container, getByText } = render(<Weather />);

  const inputText = container.querySelector("#combo-box-demo");
  fireEvent.change(inputText, { target: { value: "lima" } });

  const resultOption = await waitFor(() => getByText(/Lima/i));
  expect(resultOption).toBeInTheDocument();
  fireEvent.click(resultOption);

  expect(apiServiceMock.getWeathers).toHaveBeenCalledTimes(1);
  expect(apiServiceMock.getWeathers).toHaveBeenCalledWith("01");

  const resultListItem = await waitFor(() => getByText(/Sunny/i));
  expect(resultListItem).toBeInTheDocument();
});
