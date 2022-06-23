import { Button, Chip, Stack } from '@mui/material';
import CumulativeChart from '../cumulative/cumulativeChart';
import React from 'react'

const CumulativeTab = ({ cumulative }) =>
{
    return (
        <Stack 
            sx={{width: '100%'}}
            direction="column"
        >
            <Stack
                justifyContent="center"
                alignItems="flex-end" 
                direction="row"
            >
                <CumulativeChart cumulative={cumulative} />
            </Stack>
            <Stack
                sx={{my: 1}} 
                direction="row"
                justifyContent="center"
            >
                {
                    Object.keys(cumulative).map(k => (
                        <Chip
                            key={k}
                            sx={{ mr: 1 }}
                            label={`${k} : ${cumulative[k]}`}
                            variant="outlined"
                            onClick={() => {}}
                            onDelete={() => {}}
                        />
                    ))
                }
                <Button>
                    +
                </Button>
            </Stack>
        </Stack>
    );
}

export default CumulativeTab;