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
      // value={selectedKey}
      onChange={(event, newValue) => {
        //todo: add debounce, lodash maybe?
        handleSearch(newValue);
      }}
      loading={isLoading}
      options={locations}
      getOptionLabel={(option) => {
        if (typeof option === "string") return option;

        return option.name;
      }}      
      style={{ width: 300, paddingBottom: 10 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Location Name"
          variant="outlined"
          onChange={(e) => onSearch(e.target.value)}
        />
      )}
    />
  );
}
