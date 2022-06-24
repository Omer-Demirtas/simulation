import { Stack, Tabs, Tab, Button, Chip, Card } from "@mui/material";
import { useEffect, useState } from "react";
import BasicDialog from "../common/basicDialog";
import CumulativeTab from "./cumulative/cumulativeTab";

const tabs = 
[
    {
        label: '1',
        isVisible: () => true,
        Content: ({cumulative, setDistribution}) =>(<CumulativeTab cumulative={cumulative} setDistribution={setDistribution} />)
      },
      {
          label: '2',
          isVisible: () => true,
          Content: () =>(<h1>2</h1>)
      },
]

const DistributionDialog = ({ open, handleClose, cumulative, uniform, saveDistribution}) => 
{
    const [distribution, setDistribution] = useState({});

    const [tabIndex, setTabIndex] = useState(0);

    const handleChangeTabIndex = (_, newValue) => {
      setTabIndex(newValue);
    };

    const handleSave = () => 
    {
        console.log('save');

        saveDistribution(distribution);
        handleClose();
    }

    const selectedTab = tabs[tabIndex];

    useEffect(() => {
        if(uniform) setTabIndex(1);
        //else if(uniform) setTabIndex(1);
        console.log('Distribution Dialog');
    },[]);

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
                        uniform={uniform}
                        cumulative={cumulative}
                        setDistribution={setDistribution}
                    />
                </Stack>
            </Stack>
        </BasicDialog>
    );
}

export default DistributionDialog;