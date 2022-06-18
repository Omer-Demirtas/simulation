import React, { useState } from 'react';
import { Button, Card, Grid, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { addService } from '../../../features/service/serviceSlice';
import ServiceDialog from './serviceDialog';


const Service = ({serviceNo}) => 
{

    return (
        <Stack 
            justifyContent="center"
            alignItems="center"
            sx={{bgcolor: 'red', color: 'white', width: 100, height: '50%', border: '1px solid black'}}
        >
            <Typography variant="h4">
                {serviceNo}
            </Typography>
        </Stack>
    );
}

const EntranceDoor = ({ text }) => 
{
    return (
        <Stack 
            justifyContent="center"
            alignItems="center"
            sx={{bgcolor: 'red', color: 'white',  width: 200, height: '30%', border: '1px solid black'}}
        >
            <Typography variant="h4">
                {text}
            </Typography>
        </Stack>
    );
}


const ServiceSimulationUI = () => 
{
    //dispatch(addService());

    const [open, setOpen] = useState(false);

    const serviceSimulation = useSelector((state) => state.service);
    const dispatch = useDispatch();

    const handleClose = () => setOpen(false);
    const handleClickOpen = () => setOpen(true);

    const handleNewService = (service) => dispatch(addService(service));

    return (
        <React.Fragment>
            <ServiceDialog 
                open={open}
                handleClose={handleClose}
                handleNewService={handleNewService}
                serviceTypes={serviceSimulation.serviceTypes}
            />
            <Grid 
                sx={{paddingTop: '2rem'}}
                direction="row"
                justifyContent="center"
                alignItems="center"
                container
            >
            <Grid sx={{height: '700px'}} item xs={9}>
                <Card elevation={12} sx={{height: '100%', paddingLeft: '0.5rem', paddingTop: '0.5rem', paddingRight: '0.5rem'}}>
                    <Stack 
                        alignItems="flex-start"
                        justifyContent="flex-start"
                        sx={{height: '33.33%'}} 
                        direction="row" 
                    >
                        {
                            serviceSimulation.services.map(s => <Service key={s.title} serviceNo={s.title} /> )
                        }
                    </Stack>
                    <Stack sx={{height: '33.33%'}} direction="row" >
                    </Stack>
                    <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-end"
                        sx={{height: '33.33%'}}
                    >    
                        <EntranceDoor text="Giriş" />
                    </Stack>
                </Card>
            </Grid>
            </Grid>

            <Grid
                sx={{paddingTop: '2rem'}}
                direction="row"
                justifyContent="center"
                alignItems="center"
                container
            >
                <Grid item xs={9}>
                    <Button 
                        onClick={handleClickOpen}
                        variant="contained" color="success"
                    >
                        Add New Service
                    </Button>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default ServiceSimulationUI;

