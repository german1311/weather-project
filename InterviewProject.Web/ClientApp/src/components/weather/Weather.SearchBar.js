import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React from "react";
import useLocation from "./hooks/useLocation";
import _lodash from "lodash";

export default function WeatherSearBar({ onSelect }) {
  const { onSearch, locations, isLoading } = useLocation();

  const handleSelect = (event, newValue) => {
    if (!newValue) {
      onSelect("");
      return;
    }

    onSelect(newValue.id);
  };

  const debuncedHandleSearch = _lodash.debounce(onSearch, 300);

  return (
    <Autocomplete
      id="combo-box-demo"
      // value={selectedKey}
      onChange={handleSelect}
      onClose={handleSelect}
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
          onChange={(e) => debuncedHandleSearch(e.target.value)}
        />
      )}
    />
  );
}
