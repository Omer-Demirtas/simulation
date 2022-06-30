import { Button, Card, Divider, Fab, Stack, Typography } from '@mui/material';
import { type } from '@testing-library/user-event/dist/type';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ServiceDetailDialog from '../components/dialogs/serviceDetailDialog';
import UserDialog from '../components/dialogs/userDialog';

const ServiceTab = () =>
{
    const [open, setOpen] = useState({open: 0});

    const services = useSelector((state) => state.service.services);
    const serviceTypes = useSelector((state) => state.service.serviceTypes);

    const handleOpenService = (id, serviceType) => setOpen({open: 2, params: {serviceNo: id, serviceType}});
    const handleCloseDialog = () => setOpen({open: 0});
    const handleOpenUserDialog = () => setOpen({open: 1});

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
                                color="error"
                                variant="contained"
                                sx={{textTransform: 'none', fontSize: 36}}
                            >
                                SIMULATE
                            </Button>

                        </Stack>
                    </Stack>
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