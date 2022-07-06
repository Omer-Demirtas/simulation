import { Stack, Tabs, Tab } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import BasicDialog from "../common/basicDialog";
import CumulativeTab from "./cumulative/cumulativeTab";
import UnifromTab from "./uniform/uniformTab";

const tabs = 
[
    {
        label: '1',
        isVisible: () => true,
        Content: ({distribution, setDistribution, cumulativeRef}) =>(<CumulativeTab ref={cumulativeRef} cumulative={distribution} setDistribution={setDistribution} />)
      },
      {
          label: '2',
          isVisible: () => true,
          Content: ({distribution, setDistribution, uniformRef}) =>(<UnifromTab ref={uniformRef} uniform={distribution} setDistribution={setDistribution} />)
      },
];

const DistributionDialog = ({ open, handleClose, distribution, distributionType, saveDistribution}) => 
{
    const uniformRef = useRef();
    const cumulativeRef = useRef();

    const [dist, setDist] = useState({});
    const [tabIndex, setTabIndex] = useState(0);

    const handleChangeTabIndex = (_, newValue) => 
    {
        setTabIndex(newValue);
        setDist(newValue === distributionType ? distribution : null);    
    };

    const handleSave = () => 
    {
        var data = {}

        if(tabIndex == 1) data = uniformRef.current.getDistribution();

        saveDistribution(data);
        
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
            widthCode="md"
            minHeight="70%"
            maxHeight="70%"
            title="Select Distributon"
            handleSave={handleSave}
            handleClose={handleClose}
        >
            <Stack direction="column" justifyContent="flex-end">
                <Stack direction="row">
                    <Tabs sx={{mb: 2}} value={tabIndex} onChange={handleChangeTabIndex} centered>
                        <Tab label="Cumulative" />
                        <Tab label="Uniform" />
                    </Tabs>
                </Stack>
                <Stack
                    justifyContent="center"
                    alignItems="flex-end" 
                    direction="row"
                    sx={{p: 1}}
                >
                    <selectedTab.Content
                        distribution={dist}
                        setDistribution={setDist}
                        uniformRef={uniformRef}
                        cumulativeRef={cumulativeRef}
                    />
                </Stack>
            </Stack>
        </BasicDialog>
    );
}

export default DistributionDialog;