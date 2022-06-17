import React from 'react';
import { Button, Card, Grid, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
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


const ServiceSystemPage = () =>
{
    const [pageState, setPageState] = useState(
        {
            services: [
                {
                    id: 1,
                    name: 'Kasa-1',
                }
            ]
        }
    );

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
            
            <selectedTab.Content
            />
       </Stack>
    );
}

export default ServiceSystemPage;