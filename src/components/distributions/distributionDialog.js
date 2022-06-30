import { Stack, Tabs, Tab, Button, Chip, Card } from "@mui/material";
import { useEffect, useRef, useState } from "react";
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

        console.log({data})

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
            height="60%"
            widthCode="md"
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