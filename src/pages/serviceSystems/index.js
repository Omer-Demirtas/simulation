import React from 'react';
import { Grid, Stack, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import ServiceTab from './tabs/serviceTab';
import TableTab from './tabs/tableTab';
import StatisticsTab from './tabs/statisticsTab';

const pages = [
    {
      label: 'tab 1',
      isVisible: () => true,
      Content: ({ isMobile }) =>(
        <ServiceTab isMobile={isMobile} />
      )
    },
    {
        label: 'tab 2',
        isVisible: () => true,
        Content: ({isMobile}) =>(
          <TableTab isMobile={isMobile} />
        )
    },
    {
        label: 'tab 3',
        isVisible: () => true,
        Content: ({isMobile}) =>(
          <StatisticsTab isMobile={isMobile} />
        )
    },
]

/*
    Service Tyopes: service-1, service-2

    user can prefer: service-1 with %10 rate and service-2 %20 rate
*/

const ServiceSystemPage = () =>
{
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'), {
        defaultMatches: true
    });

    const [value, setValue] = React.useState(0);

    const handleChange = (_, newValue) => {
      setValue(newValue);
    };

    const selectedTab = pages[value];

    return(
       <Stack  direction="column">
            
          <Tabs value={value} onChange={handleChange}  centered>
              <Tab label="System" />
              <Tab label="Result" />
              <Tab label="Statistics" />
          </Tabs>
          
          <selectedTab.Content 
            isMobile={isMobile}
          />
       </Stack>
    );
}

export default ServiceSystemPage;