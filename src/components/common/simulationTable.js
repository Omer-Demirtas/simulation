import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const maxWidth = 12

const SimulationTable = ({ rows, columns }) => 
{

    return (
        <TableContainer sx={{ height: '100%' }}>
            <Table stickyHeader aria-label="sticky table">
            <TableHead>
                <TableRow>
                    <TableCell
                        rowSpan={2}
                        style={{ minWidth: `${maxWidth}%`}}
                    >
                        Benzetim Süresi
                    </TableCell>
                    <TableCell
                        rowSpan={2}
                        style={{ minWidth: `${maxWidth}%`}}
                    >
                        Gelen Kullanıcı
                    </TableCell>

                    <TableCell 
                        align="center"
                        colSpan={3}
                    >
                        Sirvistekiler
                    </TableCell>

                    <TableCell 
                        align="center"
                        colSpan={3}
                    >
                        Biten Servisler
                    </TableCell>

                    <TableCell
                        style={{ minWidth: `${maxWidth}%`}}
                        rowSpan={2}
                    >
                       Sırada Bekleyenler
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>3</TableCell>

                </TableRow>
                {
                    /*
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
                    */
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