import { Box, Button, Card, Fab, Grid, Stack, Typography, Zoom } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SettingsRow from '../../../components/common/settings/settingsRow';
import { createTable } from '../../../features/service/serviceSlice';
import ServiceActionsDialog from '../components/dialogs/serviceActionsDialog';
import ServiceDetailDialog from '../components/dialogs/serviceDetailDialog';
import ServiceTypeDialog from '../components/dialogs/serviceTypeDialog';
import UserDialog from '../components/dialogs/userDialog';

const ServiceTab = () =>
{
    const [open, setOpen] = useState({open: 0});

    const dispatch = useDispatch();

    const services = useSelector((state) => state.service.services);
    const serviceTypes = useSelector((state) => state.service.serviceTypes);

    const handleCloseDialog = () => setOpen({open: 0});
    const handleOpenUserDialog = () => setOpen({open: 1});
    const handleOpenServiceType = (id) => setOpen({open: 4, params: {serviceTypes, id}});
    const handleOpenServiceFirstType = () => setOpen({open: 4, params: {serviceTypes, id: serviceTypes[0].id}});
    const handleOpenServiceActions = () => setOpen({open: 3});
    const handleGenerateTable = () => dispatch(createTable());
    const handleOpenService = (id, serviceType) => setOpen({open: 2, params: {serviceNo: id, serviceType}});
    const handleOpenNewService = () => setOpen({open: 2, params: {serviceNo: services[services.length - 1].id + 1, serviceType: 0, isNew: true}});

    return (
        <Grid 
            sx={{height: '100%', mx: 2}}
            rowSpacing={2} 
            columnSpacing={2}
            container  
            xs={12}
            item
        >
            <UserDialog 
                open={open.open === 1}
                serviceTypes={serviceTypes}
                handleClose={handleCloseDialog}
            />
            <ServiceDetailDialog 
                params={open.open === 2 ? open.params : null}
                open={open.open === 2}
                serviceTypes={serviceTypes}
                handleClose={handleCloseDialog}
            />
            <ServiceActionsDialog 
                open={open.open === 3}
                handleClose={handleCloseDialog}
            />
            <ServiceTypeDialog
                params={open.open === 4 ? open.params : null}
                open={open.open === 4}
                serviceTypes={serviceTypes}
                handleClose={handleCloseDialog}
            />
            <SettingsCard
                title="Settings"
            >
                <SettingsRow>
                    <Button
                        onClick={handleOpenUserDialog}
                    >
                        <Typography variant='h6'>
                            User Settings
                        </Typography>
                    </Button>
                </SettingsRow>
            
                <SettingsRow>
                    <Button
                        onClick={handleOpenServiceActions}
                    >
                        <Typography variant='h6'>
                            Service Actions
                        </Typography>
                    </Button>
                </SettingsRow>

                <SettingsRow>
                    <Button
                        onClick={handleOpenNewService}
                    >
                        <Typography variant='h6'>
                            Add new Service
                        </Typography>
                    </Button>
                </SettingsRow>

                <SettingsRow>
                    <Button
                        onClick={handleOpenServiceFirstType}
                    >
                        <Typography variant='h6'>
                            Update Service Type Distribution
                        </Typography>
                    </Button>
                </SettingsRow>
            </SettingsCard>
            <Grid
                item
                xs={12}
                md={12}
                lg={6}
                sx={{mb: 2, height: '100%'}}
            >
                <Card
                    elevation={12}
                    sx={{p: 1, height: '100%', borderRadius: 5}}
                >
                    <Grid 
                        sx={{height: '100%'}}
                        container
                    >
                        <Grid item xs={12} sx={{height: '20%'}}>
                        </Grid>
                        <Grid container spacing={2} item xs={12} sx={{height: '20%'}}>
                            <Stack
                                direction="row"
                                sx={{width: '100%'}}
                                justifyContent="space-around"
                            >
                                {
                                    services.map(service => (
                                        <Service
                                            key={service.id}
                                            service={service}
                                            onClick={handleOpenService}
                                            openServiceType={handleOpenServiceType}
                                            serviceType={serviceTypes.find(t => t.id === service.serviceType).title}
                                        />
                                    ))
                                }
                            </Stack>
                        </Grid>
                        
                        <Grid item xs={12} sx={{height: '20%'}}>
                        </Grid>
                        <Grid item xs={12} sx={{height: '20%'}}>
                            <Stack
                                    direction="row"
                                    justifyContent="center"
                            >
                                <UserIconButton 
                                    title="Customer"
                                    onClick={handleOpenUserDialog}
                                    subTitle=""
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sx={{height: '20%'}}>
                            <Stack
                                direction="row"
                                justifyContent="center"
                            >
                                <Button  
                                    color="primary"
                                    variant="contained"
                                    onClick={(handleGenerateTable)}
                                    sx={{textTransform: 'none', fontSize: 24}}
                                >
                                    SIMULATE
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
            <SettingsCard
                title="Services"
            >
                {
                    services.map(s => (
                        <Card
                            sx={{mb: 2, p: 2}}
                            spacing={3}
                        >
                            <Stack
                                direction="column"
                            >
                                <Typography variant='h6'>
                                    service-{s.id}
                                </Typography>
                                <Typography variant='body1'>
                                    {serviceTypes.find(t => t.id === s.serviceType)?.title}
                                </Typography>
                            </Stack>
                        </Card>
                    ))
                }
            </SettingsCard>
            
        </Grid>
    );  
}


const SettingsCard = ({children, title}) =>
{

    return (
        <Grid
            item
            xs={12}
            md={12}
            lg={3}
            sx={{mb: 2}}
        >
            <Card
                elevation={12}
                sx={{p: 1,height: '100%', borderRadius: 5}}
            >
                <Stack
                    direction="column"
                    sx={{p: 1}}
                    spacing={2}
                >
                    <Typography variant='h4'>
                        {title}
                    </Typography>
                </Stack>
                {children}
            </Card>
        </Grid>
    );
}

/*
{
                                services.map(service => (
                                    <Service
                                        key={service.id}
                                        service={service}
                                        onClick={handleOpenService}
                                        openServiceType={handleOpenServiceType}
                                        serviceType={serviceTypes.find(t => t.id === service.serviceType).title}
                                    />
                                ))
                            }
*/

const UserIconButton = ({title, subTitle, onClick}) =>
{
    return (
        <Stack
            spacing={2}
            direction="column"
            alignItems="center"
            justifyContent="center"
        >
            <Typography>{title}</Typography>
            <Button
                onClick={onClick}
            >
                <img
                    width="96"
                    height="96"
                    src="/images/user.png" 
                />
            </Button>
            <Typography>{subTitle}</Typography>
        </Stack>
    );
}

const Service = ({ onClick, service, serviceType, openServiceType}) =>
{
    const handleClick = () => 
    {
        onClick(service.id, service.serviceType);
    }

    return (
        <Grid
            item
            xs={4}
            md={3}
            lg={2}
        >
            <Stack
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
                <Typography>{service.id}</Typography>
                <Button
                    onClick={handleClick}
                >
                    <img
                        width="96"
                        height="96"
                        src="/images/service.png" 
                    />
                </Button>
                <Button onClick={() => openServiceType(service.serviceType)}>{serviceType}</Button>
            </Stack>
        </Grid>
    );
}

export default ServiceTab;

/*
<Grid
                item
                xs={6} lg={6}
                sx={{p: 3, height: '100%'}}
                direction="column"
                alignItems="center"
                justifyContent="flex-start"
            >
                <Card
                    elevation={12}
                    sx={{height: '90%', borderRadius: 5}}
                >
                    <Stack
                        spacing={4}
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                        sx={{height: '50%'}}
                    >
                        {
                            services.map(service => (
                                <Service
                                    key={service.id}
                                    service={service}
                                    onClick={handleOpenService}
                                    openServiceType={handleOpenServiceType}
                                    serviceType={serviceTypes.find(t => t.id === service.serviceType).title}
                                />
                            ))
                        }
                        <Button
                            sx={{ml: 1}}
                            color="primary"
                            onClick={handleOpenNewService}
                        >
                            +
                        </Button>
                    </Stack>
                    <Stack
                        direction="column"
                        alignItems="center"
                        justifyContent="flex-end"
                        sx={{height: '50%', width: '100%'}}
                    >
                        <Stack 
                            sx={{height: '100%'}}
                            alignItems="center"
                            direction="row"
                        >
                            <UserIconButton 
                                title="Customer"
                                onClick={handleOpenUserDialog}
                                subTitle=""
                            />
                        </Stack>
                        <Stack
                            direction="row"
                            justifyContent="center"
                            sx={{m: 2, width: '100%'}}
                        >
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={(handleGenerateTable)}
                                sx={{textTransform: 'none', fontSize: 36}}
                            >
                                SIMULATE
                            </Button>

                        </Stack>
                    </Stack>
                </Card>
            </Grid>
*/