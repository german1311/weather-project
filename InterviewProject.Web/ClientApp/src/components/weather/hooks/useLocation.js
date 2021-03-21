import { useState } from "react";
import { locationApi } from "../../../providers/api";

export default function useLocation() {
    
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onSearch = async (location) => {
    setIsLoading(true);
    const response = await locationApi(location);
    setLocations(response);
    setIsLoading(false);
  };

  return { onSearch, locations, isLoading };
}
