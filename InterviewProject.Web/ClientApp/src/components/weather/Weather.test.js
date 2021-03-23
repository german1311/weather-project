import React from "react";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import Weather from "./Weather";
import * as apiServiceMock from "../../providers/api";

jest.mock("../../providers/api");

describe("Weather component", () => {
  beforeEach(() => {
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
  });

  it("should render form correctly", () => {
    const { getByLabelText } = render(<Weather />);
    const locationInput = getByLabelText(/Location Name/i);

    expect(locationInput).toBeInTheDocument();
  });

  it("should make an api call to get weather", async () => {
    await act(async () => {
      const { container, getByText } = render(<Weather />);
      const inputText = container.querySelector("#combo-box-demo");
      fireEvent.change(inputText, { target: { value: "lim" } });
      const resultOption = await waitFor(() => getByText(/Lima/i));
      fireEvent.click(resultOption);

      expect(apiServiceMock.getWeathers).toHaveBeenCalledTimes(1);
      expect(apiServiceMock.getWeathers).toHaveBeenCalledWith("01");
    });
  });

  it("should show rows results properly", async () => {
    await act(async () => {
      const { container, getByText } = render(<Weather />);
      const inputText = container.querySelector("#combo-box-demo");
      fireEvent.change(inputText, { target: { value: "lim" } });
      const resultOption = await waitFor(() => getByText(/Lima/i));
      fireEvent.click(resultOption);

      const resultListTemperatureC = await waitFor(() => getByText(/15/i));
      const resultListTemperatuceF = getByText(/10/i);
      const resultListSummary = getByText(/Sunny/i);
      expect(resultListTemperatureC).toBeInTheDocument();
      expect(resultListTemperatuceF).toBeInTheDocument();
      expect(resultListSummary).toBeInTheDocument();
    });
  });
});
