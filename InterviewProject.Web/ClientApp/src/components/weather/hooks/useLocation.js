import { useState } from "react";
import { getLocation } from "../../../providers/api";

export default function useLocation() {
    
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onSearch = async (location) => {
    setIsLoading(true);
    const response = await getLocation(location);
    setLocations(response);
    setIsLoading(false);
  };

  return { onSearch, locations, isLoading };
}
