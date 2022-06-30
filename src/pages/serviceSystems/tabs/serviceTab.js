import { Button, Card, Divider, Fab, Stack, Typography, Zoom } from '@mui/material';
import { type } from '@testing-library/user-event/dist/type';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addService, createTable } from '../../../features/service/serviceSlice';
import ServiceActionsDialog from '../components/dialogs/serviceActionsDialog';
import ServiceDetailDialog from '../components/dialogs/serviceDetailDialog';
import UserDialog from '../components/dialogs/userDialog';

const ServiceTab = () =>
{
    const [open, setOpen] = useState({open: 0});

    const dispatch = useDispatch();

    const services = useSelector((state) => state.service.services);
    const serviceTypes = useSelector((state) => state.service.serviceTypes);

    const handleOpenService = (id, serviceType) => setOpen({open: 2, params: {serviceNo: id, serviceType}});
    const handleCloseDialog = () => setOpen({open: 0});
    const handleOpenUserDialog = () => setOpen({open: 1});
    const handleOpenServiceActions = () => setOpen({open: 3});
    const handleOpenNewService = () => setOpen({open: 2, params: {serviceNo: services[services.length - 1].id + 1, serviceType: 0, isNew: true}});

    const handleGenerateTable = () => dispatch(createTable());

    return (
        <React.Fragment>
            <UserDialog 
                open={open.open === 1}
                handleClose={handleCloseDialog}
            />
            <ServiceDetailDialog 
                params={open.params}
                open={open.open === 2}
                serviceTypes={serviceTypes}
                handleClose={handleCloseDialog}
            />
            <ServiceActionsDialog 
                open={open.open === 3}
                handleClose={handleCloseDialog}
            />
            <Stack
                sx={{p: 3, height: '100%'}}
                direction="column"
                alignItems="center"
                justifyContent="flex-start"
            >
                <Card
                    elevation={12}
                    sx={{height: '90%', width: '90%', borderRadius: 5}}
                >
                    <Stack
                        spacing={4}
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                        sx={{height: '50%', width: '100%'}}
                    >
                        {
                            services.map(service => (
                                <Service
                                    key={service.id}
                                    service={service}
                                    onClick={handleOpenService}
                                    serviceType={serviceTypes.find(t => t.id === service.serviceType).title}
                                />
                            ))
                        }
                        <Fab
                            sx={{ml: 1}}
                            color="primary"
                            onClick={handleOpenNewService}
                        >
                            +
                        </Fab>
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
                    <Fab
                        onClick={handleOpenServiceActions}
                        sx={{
                            position: "fixed",
                            bottom: (theme) => theme.spacing(2),
                            right: (theme) => theme.spacing(2)
                        }}
                        color="primary"
                    >
                        Actions
                </Fab>
                </Card>
            </Stack>
        </React.Fragment>
    );  
}

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

const Service = ({ onClick, service, serviceType }) =>
{
    const handleClick = () => onClick(service.id, service.serviceType);

    return (
        <Stack
            spacing={2}
            direction="column"
            alignItems="center"
            justifyContent="center"
        >
            <Typography>{service.id}</Typography>
            <Button
                onClick={() => onClick(service.id, service.serviceType)}
            >
                <img
                    width="96"
                    height="96"
                    src="/images/service.png" 
                />
            </Button>
            <Typography>{serviceType}</Typography>
        </Stack>
    );
}

export default ServiceTab;