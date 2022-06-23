import { Stack, Tabs, Tab, Button, Chip } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import BasicDialog from "../common/basicDialog";
import CumulativeChart from "./cumulative/cumulativeChart";

const createTabs = (cumulative) => 
{
    return (
        [
            {
                label: '1',
                isVisible: () => true,
                Content: () =>(<CumulativeChart cumulative={cumulative} />)
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
        Content: (cumulative) =>(<CumulativeChart cumulative={cumulative} />)
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
            <Stack direction="column" justifyContent="flex-end" sx={{ p: 1}}>
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
                    />
                </Stack>
                <Stack sx={{mt: 1}} direction="row">
                    {
                        Object.keys(cumulative).map(k => (
                            <Chip
                                label={`${k} : ${cumulative[k]}`}
                                variant="outlined"
                                onClick={() => {}}
                                onDelete={() => {}}
                            />
                        ))
                    }
                </Stack>
                <Stack 
                    sx={{height: '100%'}}
                    alignItems="flex-end" 
                    justifyContent="flex-end" 
                    direction="row"
                >
                    <Button>ASD</Button>
                </Stack>
            </Stack>
        </BasicDialog>
    );
}

export default DistributionDialog;