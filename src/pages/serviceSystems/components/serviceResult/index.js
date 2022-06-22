import { Card, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import SimulationTable from "../../../../components/common/simulationTable";

const columns = [
    { id: 'time', label: 'Benzetim Süresi', minWidth: 170 },
    { id: 'commingUser', label: 'Gelen kullanıcı', minWidth: 170 },
    { id: 'services', label: 'Service Giren', minWidth: 100 },
    { id: 'finishedServices', label: 'Servisi Biten', minWidth: 100 },
    { id: 'que', label: 'Bekleyenler', minWidth: 100 },
];


const ServiceResultPage = () => 
{
    const resultEvents = useSelector(state => state.service.resultEvents);

    console.log({resultEvents});
        
    return (
        <Grid
            sx={{paddingTop: '2rem'}}
            direction="row"
            justifyContent="center"
            alignItems="center"
            container
        >
            <Grid sx={{height: '900px'}} item xs={9}>
                <Card elevation={12} sx={{height: '100%'}}>
                    <SimulationTable 
                        columns={columns}
                        rows={resultEvents}
                    />
                </Card>
            </Grid>        
        </Grid>
    );
}

export default ServiceResultPage;