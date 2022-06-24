import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const maxWidth = 12

const ServiceCell = (services) => 
{
    return (
        services.map(service => (
            <TableCell
                key={service.id}
                align="center"
            >
                {service.title}
            </TableCell>
        ))
    );
}

const SimulationTable = ({ rows, columns, services }) => 
{

    return (
        <TableContainer sx={{ height: '100%' }}>
            <Table stickyHeader aria-label="sticky table">
            <TableHead>
                <TableRow>
                    <TableCell
                        rowSpan={2}
                        align="center"
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
                        colSpan={services.length}
                    >
                        Sirvistekiler
                    </TableCell>

                    <TableCell 
                        align="center"
                        colSpan={services.length}
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
                    {ServiceCell(services)}
                    {ServiceCell(services)}
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
                        const value = column.render ? column.render(row) : row[column.id];
                        return (
                            <TableCell 
                                key={column.id} 
                                align="center"
                            >
                                {value}
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