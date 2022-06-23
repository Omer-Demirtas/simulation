import React, { useState } from 'react';
import { Card, Fab, Grid, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useSelector } from 'react-redux';
import ServiceDialog from './serviceDialog';
import ServiceButtonGroup from './serviceButtonGroup';
import UserDialog from './userDialog/userDialog';

const ServiceSimulationUI = () => 
{
    //dispatch(addService());
    const [open, setOpen] = useState(0);

    const services = useSelector((state) => state.service.services);

    const handleClose = () => setOpen(0);
    const handleOpenUserDialog = () => setOpen(1);

    return (
        <React.Fragment>
            <UserDialog 
                open={open === 1}
                handleClose={handleClose}
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
                                services.map(s => <Service key={s.title} serviceNo={s.title} /> )
                            }
                        </Stack>
                        <Stack sx={{height: '33.33%'}} direction="row" ></Stack>
                        <Stack
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="flex-end"
                            sx={{height: '33.33%'}}
                        >    
                            <Stack
                                sx={{height: '100%', width: 200}}
                                direction="column"
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <Fab
                                    color="primary"
                                    onClick={handleOpenUserDialog}
                                    sx={{width: 100, height: 100}}
                                >
                                    Customer
                                </Fab>
                                <EntranceDoor text="Giriş" />
                            </Stack>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
            <ServiceButtonGroup />
        </React.Fragment>
    );
}


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

export default ServiceSimulationUI;

