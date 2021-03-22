import React from "react";
import useWeather from "./hooks/useWeather";
import WeatherContent from "./Weather.Content";
import WeatherSearBar from "./Weather.SearchBar";

export default function Weather() {
  const { onSearch, forecasts, isLoading } = useWeather();

  let contents = isLoading ? (
    <p>
      <em>Loading...</em>
    </p>
  ) : (
    <WeatherContent forecasts={forecasts} />
  );

  return (
    <div>
      <h1 id="tabelLabel">Weather forecast</h1>
      <p>This component demonstrates fetching data from the server.</p>
      <WeatherSearBar onSelect={onSearch} />
      {contents}
    </div>
  );
}
