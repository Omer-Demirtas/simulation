import { Box, Button, Card, Divider, Stack, Typography } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { openDialog } from '../../../features/dialog/dialogSlice';

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

    const dispatch = useDispatch();

    console.log('service Tab')
    const handleOpen = () => {
        console.log('method ')
        dispatch(openDialog());
    }

    return (
        <Stack
            sx={{p: 3, height: '100%'}}
            direction="column"
            alignItems="center"
            justifyContent="flex-start"
        >
            <Card
                elevation={12}
                sx={{height: '90%', width: '100%', borderRadius: 5}}
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
                                <img
                                    width="96"
                                    height="96"
                                    src="/images/service.png" 
                                />
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
                                onClick={handleOpen}
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
                        sx={{mb: 2}}
                    >

                        <Button
                            color="error"
                            variant="contained"
                            sx={{textTransform: 'none', fontSize: 36, textAlign: 'center'}}
                        >
                            SIMULATE
                        </Button>
                    </Stack>
                </Stack>
            </Card>
        </Stack>
    );  
}

export default ServiceTab;