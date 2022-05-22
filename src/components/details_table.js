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
} from "@mui/material";
import DistrubitionForm from "./distribution_form";


const distrubitionOptions = 
[
  "Kümülatif Dağılım",
  "Düzgün Dağılım",
  "Normal Dağılım"
]

function Row(props) {
  const { dist, handleChangeDistruvtionsType } = props;
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
          {dist.title}
        </TableCell>
        <TableCell>{dist.values.m}</TableCell>
        <TableCell>{dist.values.m}</TableCell>
        <TableCell>{dist.values.s}</TableCell>
        <TableCell>{dist.values.s}</TableCell>
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
                    value={dist.distribution}
                    name={dist.id}
                    label="Servis Türü"
                    onChange={handleChangeDistruvtionsType}
                  >
                    {
                      distrubitionOptions.map((k, i) => (
                        <MenuItem key={k} value={i}>
                          {k}
                        </MenuItem>
                      ))
                    }
                  </Select>
                  <FormHelperText>Service Type</FormHelperText>
                </FormControl>
                <DistrubitionForm
                  distribution={dist}
                />
              </Stack>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


export default function DetailsTable({distributions, handleChangeDistruvtionsType}) {

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
          {distributions.map((dist) => (
            <Row key={dist.id} dist={dist} handleChangeDistruvtionsType={handleChangeDistruvtionsType}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
