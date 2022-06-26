import { Button, Chip, Stack } from '@mui/material';
import CumulativeChart from '../cumulative/cumulativeChart';
import React, { forwardRef, useImperativeHandle, useMemo } from 'react'
import CumulativeBar from './cumulativeBar';
import { useSelector } from 'react-redux';
import { selectCumulative } from '../../../features/distribution/distributionSlice';

const CumulativeTab = forwardRef(({ cumulative, setDistribution }, ref) =>
{
    const defaultCumulative = useSelector(selectCumulative);

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

    useImperativeHandle(ref, () => ({}));

    const distribution = useMemo(() => (cumulative || defaultCumulative), [cumulative] );

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
                <CumulativeChart cumulative={distribution} />
            </Stack>
            <CumulativeBar
                cumulative={distribution}
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
)

export default CumulativeTab;