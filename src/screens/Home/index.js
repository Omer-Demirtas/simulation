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

        }

        var events = [];

        var currentServiceFinishTime = 0;
        var atService = null;
        var waiting = "";

        time = 0;
        for (var j = 0; j < 10; j++)
        {
            const gas = getFromCumulative();
            const serviceTime = getFromUniformDistribution(10, 20);

            const event = {
                now: time,
                gas: gas,
                serviceTime: serviceTime
            };

            // if the service is empty.
            if(atService === null)
            {
                time+=gas;

                atService = (j+1);
                currentServiceFinishTime = (time + serviceTime);

                event.time = time;
                event.finishTime = currentServiceFinishTime;
                event.user = (j+1);
            }
            // new user come but service not finish
            else if(currentServiceFinishTime > (time + gas))
            {
                time+=gas;

                event.time = time;
                event.user = (j+1);

                waiting+=`${j+1}, `;
            }
            // finish service before new user come
            else if(currentServiceFinishTime < (time + gas))
            {
                const temp = waiting.split(', ');
                waiting=temp.slice(1).join("");
                
                events.push(
                    {
                        time: currentServiceFinishTime,
                        finishUser: atService
                    }
                );

                atService = null;

                time = time+gas;
                event.time = time;
                event.user = (j+1);
            }
            /*
            // Service process finish, before new user coming
            else if(currentServiceFinishTime < (time + gas))
            {
                events.push(
                    {
                        ...events[events.length - 1],
                        user: null,
                    }
                );
                atService = null;
            }
            // if service finish and new user come at the same time
            else if(currentServiceFinishTime = (time + gas))
            {
                event.finishUser = atService;
                atService = null;

            }
            else 
            {
                waiting+=`${j+1}, `;
            }
            */
            
            event.waiting = waiting;

            events.push(event);
        }

        console.log(events);

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
