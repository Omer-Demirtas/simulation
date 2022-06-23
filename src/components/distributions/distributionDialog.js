import { Stack, Tabs, Tab, Button, Chip, Card } from "@mui/material";
import { useEffect, useState } from "react";
import BasicDialog from "../common/basicDialog";
import CumulativeTab from "./cumulative/cumulativeTab";

const createTabs = (cumulative) => 
{
    return (
        [
            {
                label: '1',
                isVisible: () => true,
                Content: () =>(<h1>ASD</h1>)
              },
              {
                  label: '2',
                  isVisible: () => true,
                  Content: () =>(<h1>2</h1>)
              },
        ]
    )
}

const tabs = 
[
    {
        label: '1',
        isVisible: () => true,
        Content: ({cumulative}) =>(<CumulativeTab cumulative={cumulative} />)
      },
      {
          label: '2',
          isVisible: () => true,
          Content: () =>(<h1>2</h1>)
      },
]

const DistributionDialog = ({ open, handleClose, cumulative, uniform}) => 
{
    const [tabIndex, setTabIndex] = useState(0);

    //const tabs = useMemo(() => createTabs(cumulative), []);

    const handleChangeTabIndex = (_, newValue) => {
      setTabIndex(newValue);
    };

    const selectedTab = tabs[tabIndex];

    useEffect(() => {
        if(uniform) setTabIndex(1);
        //else if(uniform) setTabIndex(1);
        console.log('Distribution Dialog');
    },[]);

    return (
        <BasicDialog
            open={open}
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
                        cumulative={cumulative}
                        uniform={uniform}
                    />
                </Stack>
            </Stack>
        </BasicDialog>
    );
}

export default DistributionDialog;