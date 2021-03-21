import { useState } from "react";
import { weatherApi } from "../../../providers/api";

export default function useWeather() {
  const [forecasts, setForecasts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onSearch = async (location) => {
    setIsLoading(true);
    const response = await weatherApi(location);
    setForecasts(response);
    setIsLoading(false);
  };

  return { onSearch, forecasts, isLoading };
}
