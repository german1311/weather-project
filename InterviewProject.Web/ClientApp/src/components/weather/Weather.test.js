import React from "react";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import Weather from "./Weather";
import * as apiServiceMock from "../../providers/api";

jest.mock("../../providers/api");

describe("Weather component", () => {
  it("should render form correctly", () => {
    const { getByLabelText } = render(<Weather />);
    const locationInput = getByLabelText(/Location Name/i);

    expect(locationInput).toBeInTheDocument();
  });

  it("should make an api call to get weather", async () => {
    apiServiceMock.getLocation.mockResolvedValueOnce([
      { id: "01", name: "Lima" },
    ]);
    apiServiceMock.getWeathers.mockResolvedValueOnce([
      {
        date: new Date(),
        temperatureC: 15,
        temperatureF: 10,
        summary: "Sunny",
      },
    ]);

    await act(async () => {
      const { container, getByText } = render(<Weather />);
      const inputText = container.querySelector("#combo-box-demo");
      fireEvent.change(inputText, { target: { value: "lim" } });

      const resultOption = await waitFor(() => getByText(/Lima/i));
      fireEvent.click(resultOption);

      const resultListItem = await waitFor(() => getByText(/Sunny/i));
      expect(resultListItem).toBeInTheDocument();
    });
  });
});
