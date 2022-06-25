import { Stack, Tabs, Tab, Button, Chip, Card } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAllDistribution } from "../../features/distribution/distributionSlice";
import BasicDialog from "../common/basicDialog";
import CumulativeTab from "./cumulative/cumulativeTab";
import UnifromTab from "./uniform/uniformTab";

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
          Content: ({distribution, setDistribution}) =>(<UnifromTab uniform={distribution} setDistribution={setDistribution} />)
      },
]

const DistributionDialog = ({ open, handleClose, distribution, distributionType, saveDistribution}) => 
{
    const [dist, setDist] = useState({});

    const [tabIndex, setTabIndex] = useState(0);

    const handleChangeTabIndex = (_, newValue) => 
    {
        setTabIndex(newValue);
        setDist(newValue === distributionType ? distribution : null);    
    };

    const handleSave = () => 
    {
        saveDistribution({distribution: dist, distributionType: tabIndex});
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