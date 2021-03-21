import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useState } from "react";
import useLocation from "./hooks/useLocation";

export default function WeatherSearBar({ onSelect }) {
  const [selectedKey, setSelectedKey] = useState("");

  const { onSearch, locations, isLoading } = useLocation();

  const handleSearch = (newValue) => {
    setSelectedKey(newValue.id);
    onSelect(newValue.id);
  };

  return (
    <Autocomplete
      id="combo-box-demo"
      value={selectedKey}
      onChange={(event, newValue) => {
        handleSearch(newValue);
      }}
      options={locations}
      getOptionLabel={(option) => option.name}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Combo box"
          variant="outlined"
          onChange={(e) => onSearch(e.target.value)}
        />
      )}
    />
  );
}
