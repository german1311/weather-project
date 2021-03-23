import React from "react";
import { act, fireEvent, render, waitFor } from "@testing-library/react";

import * as apiServiceMock from "../../providers/api";
import WeatherSearBar from "./Weather.SearchBar";

jest.mock("../../providers/api");

describe("WeatherSearchBar component", () => {
  beforeEach(() => {
    apiServiceMock.getLocation.mockResolvedValueOnce([
      { id: "01", name: "Lima" },
    ]);
  });

  it("should make just one api call to get location", async () => {
    let promiseTime = new Promise((resolve, reject) => {
      setTimeout(() => resolve("done!"), 500)
    });

    await act(async () => {
      const { container } = render(<WeatherSearBar onSelect={() => {}} />);
      const inputText = container.querySelector("#combo-box-demo");
      fireEvent.change(inputText, { target: { value: "l" } });
      fireEvent.change(inputText, { target: { value: "li" } });
      fireEvent.change(inputText, { target: { value: "lim" } });
      await promiseTime;
      expect(apiServiceMock.getLocation).toHaveBeenCalledTimes(1);
      expect(apiServiceMock.getLocation).toHaveBeenCalledWith("lim");
    });
  });

  it("should show options properly", async () => {
    await act(async () => {
      const { container, getByText } = render(
        <WeatherSearBar onSelect={() => {}} />
      );
      const inputText = container.querySelector("#combo-box-demo");
      fireEvent.change(inputText, { target: { value: "lim" } });

      const resultOption = await waitFor(() => getByText(/Lima/i));
      expect(resultOption).toBeInTheDocument();
    });
  });
});
