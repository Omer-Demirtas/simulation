import { Button, Card } from "@mui/material";
import React, { useState } from "react";
import DetailsTable from "../../components/details_table";
import SimulationTable from "../../components/simulation_table";
import ServiceSimulationDetails from "./components/service_simulation_details";

const HomeScreen = () => 
{
    const [state, setState] = useState({
        type: "",
        rows: []
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

    const getFromUniformDistribution = (a, b) => 
    {
        const rand = getRandomNumber();

        return Math.floor((a + (b - a) * rand))
    }

    const getFromNormalDistribution = (s, m) => 
    {
        const rand = getRandomNumber();
    }

    const generateTable = () => 
    {
        var customers = [];
        
        var events = {};

        let time = 0;

        for (var i = 0; i < 10; i++)
        {
            const gas = getFromCumulative();
            const serviceTime = getFromUniformDistribution(10, 20);
            time+=gas;

            customers[i] = 
            {
                time: time,
                customer: (i+1),
                gas: gas,
                serviceTime: getFromUniformDistribution(10, 20)
            };
            
            events[time] = 
            {
                customer: (i+1),
                serviceTime: serviceTime,
                finishTime: (i === 0) ? (time + serviceTime) : null
            }
        }

        setState({...state, rows: customers})
    }
    
    return (
        <>
        <Card sx={{ p: 3, mt: 5}} variant="outlined">

            <DetailsTable />

            <Button
                sx={{mt: 5}}
                onClick={generateTable}
            >
                Generate Table
            </Button>

            
            <SimulationTable 
                rows={state.rows}
            />
        </Card>
        </>
  );
};

export default HomeScreen;
