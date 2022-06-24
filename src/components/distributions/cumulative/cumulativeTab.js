import { Button, Chip, Stack } from '@mui/material';
import CumulativeChart from '../cumulative/cumulativeChart';
import React from 'react'
import CumulativeBar from './cumulativeBar';

const CumulativeTab = ({ cumulative, setDistribution }) =>
{
    const handleUpdate = () =>
    {
        setDistribution(
            {
                1: 50,
                2: 30,
                3: 20
            }
        )
    }

    return (
        <Stack 
            sx={{width: '100%'}}
            direction="column"
            spacing={3}
        >
            <Stack
                justifyContent="center"
                alignItems="flex-end" 
                direction="row"
            >
                <CumulativeChart cumulative={cumulative} />
            </Stack>
            <CumulativeBar
                cumulative={cumulative}
            />
            <Stack
                direction="row"
                justifyContent="center"
            >
                <Button
                    onClick={handleUpdate}
                >
                    update
                </Button>
            </Stack>
        </Stack>
    );
}

export default CumulativeTab;