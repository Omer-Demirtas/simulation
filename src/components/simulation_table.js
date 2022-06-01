import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const columns = [
    { id: 'time', label: 'Benzetim Süresi', minWidth: 170 },
    { id: 'user', label: 'Gelen kullanıcı', minWidth: 170 },
    { id: 'finishedUser', label: 'Servisi Biten', minWidth: 100 },
    { id: 'atService', label: 'Serviste olan', minWidth: 100 },
    { id: 'waitings', label: 'Bekleyenler', minWidth: 100 },
  ];



const SimulationTable = ({rows}) => 
{


    return (
        <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .map((row) => {
                return (
                  <TableRow key={row.time} hover role="checkbox" tabIndex={-1}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    );
}

export default SimulationTable;