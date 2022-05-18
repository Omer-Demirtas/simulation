import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import DistrubitionForm from "./distribution_form";

function createData(id, title, distribution, values, m, s) {
  return {
    id,
    title,
    distribution,
    values,
    m,
    s,
  };
}

const distributions = {
  1: {
    name: "Normal Dağılım",
    variables: ["M", "S"],
  },
  2: {
    name: "Düzgün Dağılım",
    variables: ["a", "b"],
  },
};

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? "<" : ">"}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.title}
        </TableCell>
        <TableCell>{row.m}</TableCell>
        <TableCell>{row.s}</TableCell>
        <TableCell>{row.s}</TableCell>
        <TableCell>{row.s}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Stack direction="row">
                <FormControl sx={{ m: 1, minWidth: 360 }}>
                  <InputLabel id="service-type-label">Servis Türü</InputLabel>
                  <Select
                    labelId="service-type-label"
                    id="service-type"
                    value={row.distribution}
                    label="Servis Türü"
                    //onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {Object.entries(distributions).map(([k, v]) => (
                      <MenuItem key={k} value={k}>
                        {v.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>Service Type</FormHelperText>
                </FormControl>
                <DistrubitionForm
                  distribution={distributions[row.distribution]}
                />
              </Stack>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData(1, "Gelişler Arası Süre (GAS)", 1, [{ 1: 10, 2: 90 }], 0, 0),
  createData(2, "Servis Süresi", 2, [{ 1: 10, 2: 90 }], 0, 0),
  createData(3, "Yemek yeme süresi", 1, [{ 1: 10, 2: 90 }], 0, 0),
];

export default function DetailsTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell component="th" scope="row"></TableCell>
            <TableCell>σ</TableCell>
            <TableCell>μ</TableCell>
            <TableCell>a</TableCell>
            <TableCell>b</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
