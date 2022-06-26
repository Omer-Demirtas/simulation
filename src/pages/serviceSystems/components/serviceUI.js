import React, { useState } from 'react';
import { ButtonBase, Card, CardContent, Fab, Grid, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useSelector } from 'react-redux';
import ServiceButtonGroup from './serviceButtonGroup';
import UserDialog from './dialogs/userDialog';
import ServiceDetailDialog from './dialogs/serviceDetailDialog';

const ServiceSimulationUI = () => 
{
    //dispatch(addService());
    const [open, setOpen] = useState({dialog: 0, params: {}});

    const services = useSelector((state) => state.service.services);

    const handleClose = () => setOpen({dialog: 0, params: {serviceNo: ""}});
    const handleOpenUserDialog = () => setOpen({dialog: 1, params: {}});
    const handleOpenServiceDialog = (service) => setOpen({dialog: 2, params: {serviceNo: service}});

    return (
        <React.Fragment>
            <UserDialog 
                open={open.dialog === 1}
                handleClose={handleClose}
            />
            <ServiceDetailDialog
                params={open.params}
                open={open.dialog === 2}
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
                                services.map(s => <Service event={handleOpenServiceDialog} key={s.title} serviceNo={s.title} /> )
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


const Service = ({serviceNo, event}) => 
{
    const handleClick = () => event(serviceNo);

    return (
        <Card
            sx={{bgcolor: 'red', color: 'white', width: 100, height: '50%', border: '1px solid black'}}
        >
            <ButtonBase
                sx={{width: '100%', height: '100%'}}
                onClick={handleClick}
            >
                <CardContent>
                    <Typography variant="h4">
                        {serviceNo}
                    </Typography>
                </CardContent>
            </ButtonBase>
        </Card>
        
    );
}

/*
<Stack 
            
            justifyContent="center"
            alignItems="center"
            sx={{bgcolor: 'red', color: 'white', width: 100, height: '50%', border: '1px solid black'}}
        >
            <Typography variant="h4">
                {serviceNo}
            </Typography>
        </Stack>
*/


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

