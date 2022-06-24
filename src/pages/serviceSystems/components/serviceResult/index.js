import { Card, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SimulationTable from "../../../../components/common/simulationTable";
import { selectEventsAndServices } from "../../../../features/service/serviceSlice";

const ServiceResultPage = () => 
{
    const [events, services] = useSelector(state => selectEventsAndServices(state));
    const [columns, setColumns] = useState([]);


    useEffect(() => {
        setColumns(
            [
                { id: 'time', align: "center", label: 'Benzetim Süresi', minWidth: 170 },
                { id: 'commingUser', align: "center", label: 'Gelen kullanıcı', minWidth: 170 },
                ...services.map((s, i) => ({ id: `s-${s.id}`, label: `${s.title}`, minWidth: 100, render: (row) => row.services && row.services[i]})),
                ...services.map((s, i) => ({ id: `f-${s.id}`, label: `${s.title}`, minWidth: 100, render: (row) => row.finishedServices && row.finishedServices[i]})),
                { id: 'que', align: "center", label: 'Bekleyenler', minWidth: 100 },
            ]
        );
    }, []);

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
                        rows={events}
                        services={services}
                        columns={columns}
                    />
                </Card>
            </Grid>        
        </Grid>
    );
}

export default ServiceResultPage;