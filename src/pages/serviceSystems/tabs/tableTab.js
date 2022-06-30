import { Card, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const row = 
[
    1,2,3,4,,5,6,7,8,9,0,2,3,
//    4,5,6,1,2,3,4,5,6
]

const TableTab = () =>
{

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
                            <TableCell align="center" sx={{border:'none'}} colSpan={2}>In Service</TableCell>
                            <TableCell align="center" sx={{border:'none'}} colSpan={2}>Service Fnisih</TableCell>
                            <TableCell align="center" rowSpan={2}>Que</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">1</TableCell>
                            <TableCell align="center">2</TableCell>
                            <TableCell align="center">1</TableCell>
                            <TableCell align="center">2</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody> 
                            {
                                row.map( a => 
                                    <TableRow>
                                    <TableCell align="center">1</TableCell>
                                    <TableCell align="center">1</TableCell>
    
                                        <TableCell align="center">1</TableCell>
                                        <TableCell align="center">2</TableCell>
                                        <TableCell align="center">1</TableCell>
                                        <TableCell align="center">1</TableCell>
    
                                        <TableCell align="center">2</TableCell>
                                    </TableRow>
                                )
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