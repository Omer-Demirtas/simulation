import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const SimulationTable = ({ rows, columns }) => 
{

    return (
        <TableContainer sx={{ height: '100%' }}>
            <Table stickyHeader aria-label="sticky table">
            <TableHead>
                {
                    columns.map(col => (
                        <TableCell
                            key={col.id}
                            align={col.align}
                            style={{ minWidth: col.minWidth }}
                        >
                            {
                                col.label
                            }
                        </TableCell>
                    ))
                }
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