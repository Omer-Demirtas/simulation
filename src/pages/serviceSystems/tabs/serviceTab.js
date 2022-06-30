import { Box, Button, Card, Divider, Fab, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import ServiceDetailDialog from '../components/dialogs/serviceDetailDialog';
import UserDialog from '../components/dialogs/userDialog';

const services = [
    {
        id: 1,
        title: 'Özel Gişe İşlemleri'
    },
    {
        id: 2,
        title: 'Genel Gişe İşlemleri'
    },
    {
        id: 3,
        title: 'Özel Gişe İşlemleri'
    },
    {
        id: 5,
        title: 'Genel Gişe İşlemleri'
    }
]

const ServiceTab = () =>
{
    const [open, setOpen] = useState({open: 0});

    const handleOpenService = (id) => setOpen({open: 2, params: {serviceNo: id, serviceType: 1}});
    const handleCloseDialog = () => setOpen({open: 0});
    const handleOpenUserDialog = () => setOpen({open: 1});

    return (
        <React.Fragment>
            <UserDialog 
                open={open.open === 1}
                handleClose={handleCloseDialog}
            />
            <ServiceDetailDialog 
                open={open.open === 2}
                params={open.params}
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
                            services.map(s => (
                                <Stack
                                    key={s.id}
                                    spacing={2}
                                    direction="column"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Typography>{s.id}</Typography>
                                    <Button
                                        onClick={() => handleOpenService(s.id)}
                                    >
                                        <img
                                            width="96"
                                            height="96"
                                            src="/images/service.png" 
                                        />
                                    </Button>
                                    <Typography>{s.title}</Typography>
                                </Stack>
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
                            <Stack
                                spacing={2}
                                direction="column"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Typography>Customer</Typography>
                                <Button
                                    onClick={handleOpenUserDialog}
                                >
                                    <img
                                        width="96"
                                        height="96"
                                        src="/images/user.png" 
                                    />
                                </Button>
                            </Stack>
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
                            <div></div>

                        </Stack>
                    </Stack>
                </Card>
            </Stack>
        </React.Fragment>
    );  
}

export default ServiceTab;