import { Card, Grid, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import ServiceSystemDataTable from "../../../components/common/dataTable";
import { selectEventsAndServices } from "../../../features/service/serviceSlice";

const TableTab = ({isMobile}) =>
{
    const [events, services] = useSelector(selectEventsAndServices);

    const columns = useMemo(() => (
        [
            { id: 'time', align: "center", label: 'Benzetim Süresi', minWidth: 170 },
            { id: 'commingUser', align: "center", label: 'Gelen kullanıcı', minWidth: 170 },
            ...services.map((s, i) => ({ id: `s-${s.id}`, label: `${s.title}`, minWidth: 100, render: (row) => row.services && row.services[i]})),
            ...services.map((s, i) => ({ id: `f-${s.id}`, label: `${s.title}`, minWidth: 100, render: (row) => row.finishedServices && row.finishedServices[i]})),
            { id: 'que', align: "center", label: 'Bekleyenler', minWidth: 100 },
        ]
    ), [services]);

    return (
        <React.Fragment>
            <Grid
                container
                sx={{width: '100%', px: isMobile ? 1 : 5}}
            >
                    <Card
                        elevation={12}
                        sx={{width: '100%', height: 600}}
                    >
                        <ServiceSystemDataTable 
                            rows={events}
                            columns={columns}
                            services={services}
                        />
                    </Card>
            </Grid>
        </React.Fragment>
    );
}

export default TableTab;

/*
<Grid
            item
            sx={{height: '100%', mx: 2}}
            spacing={2} 
            container  
            xs={12}
        >
            <Grid
                item
                xs={12}
            >
                <TableContainer sx={{maxHeight: '100%'}}>
                    <Table >
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
                                events.map((row) => (
                                    <TableRow key={row.time}>
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
            </Grid>
        </Grid>
*/