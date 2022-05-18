import { Button, Card } from "@mui/material";
import React, { useState } from "react";
import DetailsTable from "../../components/details_table";
import ServiceSimulationDetails from "./components/service_simulation_details";

const HomeScreen = () => 
{
    const [state, setState] = useState({
        type: "",
      });
    
    const handleTypeChange = (e) => setState({ ...state, type: e.target.value });
 
    const renderDetailsPage = () => 
    {
        const details = {
            1: <ServiceSimulationDetails />,
        };
        
        return details[state.type] ?? <></>;
    }

    const getRandomNumber = () => Math.random().toFixed(2);
    
    const cumulativeDistribution = 
    [
        {
            value: 2,
            percent: 20
        },
        {
            value: 3,
            percent: 30
        },
        {
            value: 4,
            percent: 25
        },
        {
            value: 5,
            percent: 15
        },
        {
            value: 6,
            percent: 10
        },
    ]

    const getFromCumulative = () => 
    {
        const values = cumulativeDistribution.map(c => c.percent);
        let cumulative = [];  
        values.reduce( (prev, curr,i) =>  cumulative[i] = prev + curr , 0 )
        
        const rand = getRandomNumber();
        
        var i = 0
        for(var c of cumulative)
        {
            if(c >= (rand * 100)) break;
            i++;
        }

        return cumulativeDistribution[i].value;
    }

    const generateTable = () => 
    {
        var customers = [];

        for (var i = 0; i < 10; i++)
        {
            customers[i] = getFromCumulative();
        }

        console.log(customers);
    }
    
    return (
        <>
        <Card sx={{ p: 3, mt: 5}} variant="outlined">

            <DetailsTable />

            <Button
                onClick={generateTable}
            >
                Generate Table
            </Button>


        </Card>
        </>
  );
};

export default HomeScreen;
