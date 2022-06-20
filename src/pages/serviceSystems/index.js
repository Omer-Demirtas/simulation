import React from 'react';
import { Grid, Stack, Tab, Tabs } from "@mui/material";
import ServiceSimulationUI from './components/serviceUI'

const pages = [
    {
      label: 'tab 1',
      isVisible: () => true,
      Content: () =>(
        <ServiceSimulationUI />
      )
    },
    {
        label: 'tab 2',
        isVisible: () => true,
        Content: () =>(
          <h1>Tab 2</h1>
        )
    },
    {
        label: 'tab 3',
        isVisible: () => true,
        Content: () =>(
          <h1>Tab 3</h1>
        )
    },
]

/*
    Service Tyopes: service-1, service-2

    user can prefer: service-1 with %10 rate and service-2 %20 rate
*/

const ServiceSystemPage = () =>
{
    const [value, setValue] = React.useState(0);

    const handleChange = (_, newValue) => {
      setValue(newValue);
    };

    const selectedTab = pages[value];

    return(
       <Stack direction="column">
            <Tabs value={value} onChange={handleChange} centered>
                <Tab label="System" />
                <Tab label="Result" />
            </Tabs>
            
            <selectedTab.Content />
       </Stack>
    );
}

export default ServiceSystemPage;