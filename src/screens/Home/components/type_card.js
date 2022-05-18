import {
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import React from "react";

const TypeCard = ({type, handleChange}) => {

  return (
      <Stack direction="row" justifyContent="space-between" spacing={2}>
        <FormControl fullWidth>
          <InputLabel id="simulation-type-label">Simulation Type</InputLabel>
          <Select
            labelId="simulation-type-label"
            value={type}
            label="Simulation Type"
            onChange={handleChange}
          >
            <MenuItem value={1}>Servis Sistemleri Yönetimi</MenuItem>
            <MenuItem value={2}>Stok Yönetimi</MenuItem>
          </Select>
        </FormControl>
      </Stack>
  );
};

export default TypeCard;
