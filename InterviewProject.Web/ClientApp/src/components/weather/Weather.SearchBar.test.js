import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";

import * as apiServiceMock from "../../providers/api";
import WeatherSearBar from "./Weather.SearchBar";

jest.mock("../../providers/api");

test("should make an api call with proper value", async () => {
  apiServiceMock.getLocation.mockResolvedValueOnce([
    { id: "01", name: "testValue" },
  ]);

  let returnedValue = "";
  const onSearch = (selectedValue) => {
    returnedValue = selectedValue;
  };

  const { container, getByText } = render(
    <WeatherSearBar onSearch={onSearch} />
  );

  const inputText = container.querySelector("#combo-box-demo");
  fireEvent.change(inputText, { target: { value: "lima" } });
  expect(apiServiceMock.getLocation).toHaveBeenCalledTimes(1);
  expect(apiServiceMock.getLocation).toHaveBeenCalledWith("lima");

  //   const resultOption = await waitFor(() => getByText(/Lima/i));
  //   expect(resultOption).toBeInTheDocument();

  //   fireEvent.click(resultOption);
  //   expect(returnedValue).toBe("01");
});
