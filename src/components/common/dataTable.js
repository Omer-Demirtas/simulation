import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/system';

const ServiceSystemDataTable = ({rows, columns, services}) =>
{
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box>
      <Paper sx={{p:1, width: '100%', height: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{p: 1}}>
          <Table aria-label="sticky table">
            <TableHead>
              <TableRow>
                  <TableCell align="center" rowSpan={2}>Simulation Time</TableCell>
                  <TableCell align="center" rowSpan={2}>Comming Customer</TableCell>
                  <TableCell align="center" sx={{border:'none'}} colSpan={services.length}>In Service</TableCell>
                  <TableCell align="center" sx={{border:'none'}} colSpan={services.length}>Service Fnisih</TableCell>
                  <TableCell align="center" rowSpan={2}>Que</TableCell>
              </TableRow>
              <TableRow>
                  {
                      services.map(s => (
                          <TableCell key={s.id} align="center">{s.id}</TableCell>
                      ))
                  }
                  {
                      services.map(s => (
                          <TableCell key={s.id} align="center">{s.id}</TableCell>
                      ))
                  }
              </TableRow>
            </TableHead>
            <TableBody>
              {
                rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                    <TableRow hover tabIndex={-1}  key={row.time}>
                        {
                            columns.map(c => (
                                <TableCell 
                                    key={c.id} 
                                    align="center"
                                >
                                    {c.render ? c.render(row) : row[c.id]}
                                </TableCell>
                            ))
                        }
                    </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

export default ServiceSystemDataTable;