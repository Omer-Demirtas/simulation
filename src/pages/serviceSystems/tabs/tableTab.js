import { Card, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectEventsAndServices } from "../../../features/service/serviceSlice";

const row = 
[
    1,2,3,4,,5,6,7,8,9,0,2,3,
//    4,5,6,1,2,3,4,5,6
]

const TableTab = () =>
{
    const [events, services] = useSelector(selectEventsAndServices);
    //const [columns, setColumns] = useState([]);

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
        <Stack
            sx={{p: 3, height: '100%'}}
            direction="column"
            alignItems="center"
            justifyContent="flex-start"
        >
            <Card
                elevation={12}
                sx={{height: '90%', maxHeight:'90%', width: '90%', borderRadius: 5}}
            >
                    <Table sx={{height: '100%'}} aria-label="simple table">
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
            </Card>
        </Stack>
    );
}

export default TableTab;

/*

*/