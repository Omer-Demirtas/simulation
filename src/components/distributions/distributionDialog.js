import { Stack, Tabs, Tab, Button, Chip, Card } from "@mui/material";
import { useEffect, useState } from "react";
import BasicDialog from "../common/basicDialog";
import CumulativeTab from "./cumulative/cumulativeTab";

const tabs = 
[
    {
        label: '1',
        isVisible: () => true,
        Content: ({distribution, setDistribution}) =>(<CumulativeTab cumulative={distribution} setDistribution={setDistribution} />)
      },
      {
          label: '2',
          isVisible: () => true,
          Content: () =>(<h1>2</h1>)
      },
]

const DistributionDialog = ({ open, handleClose, distribution, distributionType, saveDistribution}) => 
{
    const [dist, setDist] = useState({});

    const [tabIndex, setTabIndex] = useState(0);

    const handleChangeTabIndex = (_, newValue) => {
      setTabIndex(newValue);
    };

    const handleSave = () => 
    {
        saveDistribution(dist);
        handleClose();
    }

    const selectedTab = tabs[tabIndex];

    useEffect(() => {
        setDist(distribution);
        if(distributionType === 1) setTabIndex(1);
    },[distribution]);

    return (
        <BasicDialog
            open={open}
            handleSave={handleSave}
            handleClose={handleClose}
        >
            <Stack direction="column" justifyContent="flex-end">
                <Stack direction="row">
                    <Tabs value={tabIndex} onChange={handleChangeTabIndex} centered>
                        <Tab label="Cumulative" />
                        <Tab label="Uniform" />
                    </Tabs>
                </Stack>
                <Stack
                    justifyContent="center"
                    alignItems="flex-end" 
                    direction="row"
                >
                    <selectedTab.Content 
                        distribution={dist}
                        setDistribution={setDist}
                    />
                </Stack>
            </Stack>
        </BasicDialog>
    );
}

export default DistributionDialog;