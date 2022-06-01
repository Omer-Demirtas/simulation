import { Button, Card, Typography } from "@mui/material";
import React, { useState } from "react";
import DetailsTable from "../../components/details_table";
import SimulationTable from "../../components/simulation_table";
import ServiceSimulationDetails from "./components/service_simulation_details";
import TempForm from "./components/temp_form";


const TYPE_BY_DISTRUBTION = 
{
    0: {cumulative: ""},
    1: {a: 0, b: 0},
    2: {m: 0, s: 0}
}

const HomeScreen = () => 
{
    const [state, setState] = useState({
        type: "",
        rows: []
    });
    
    const [distributions, setDistributions] = useState(
        [
            {
                id: '1',
                title: 'Gelişler Arası Süre (GAS)',
                distribution: 0,
                values: TYPE_BY_DISTRUBTION[0],
            },
            {
                id: '2',
                title: 'Servis Süresi',
                distribution: 1,
                values: TYPE_BY_DISTRUBTION[1],
            }
        ]
    );

    const [input, setInput] = useState({a: 5, b: 10});

    const handleChangeDistruvtionsType = (e) => 
    {
        const id = `${e.target.name}`;
        const newType = e.target.value;
        

        const newDsit = 
        
        setDistributions(
            distributions.map(dist => 
                (dist.id === id) ? 
                {
                    ...dist, 
                    distribution: newType,
                    values: TYPE_BY_DISTRUBTION[newType]
                } : dist 
            )
        )
    }

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

    const atServiceToString = (no, serviceFinishTime) => 
    {
        return `${no}[${serviceFinishTime}]`
    }

    const waitingsToString = (waitings) => waitings.map(w => w.no).toString(); 

    const generateUsers = () => 
    {
        const users = [];
        const events = {};
        var time = 0;

        for (var i = 0; i < 11; i++)
        {
            const gas = getFromCumulative();
            const serviceTime = getFromUniformDistribution(input.a, input.b);
            time+=gas;

            users.push( 
            {
                id: i,
                time: time,
                no: (i+1),
                gas: gas,
                serviceTime: serviceTime
            });

            events[time] = 
            {
                user: i,
            } 
        }

        return [users, events];
    }

    const generateTable1 = () => 
    {
        var users = [];
        var events = [];

        let time = 0;

        for (var i = 0; i < 10; i++)
        {
            const gas = getFromCumulative();
            const serviceTime = getFromUniformDistribution(input.a, input.b);
            time+=gas;
        

            users.push( 
            {
                id: i,
                time: time,
                no: (i+1),
                gas: gas,
                serviceTime: serviceTime
            });
        }

        // constants 
        time = users[0].time

        var totalWaitins = [];
        var waitings = [];

        users[0].finishTime = users[0].time + users[0].serviceTime;

        var atService = users[0].no;
        var serviceCompleteTime = users[0].finishTime;

        events.push(
            {
                time: users[0].time,
                user: atService,
                finishTime: serviceCompleteTime
            }
        )
        
        users.slice(1).forEach(user => 
            {
                var event = {};

                // user come before service finish
                if(user.time < serviceCompleteTime)
                {
                    event =
                    {
                        ...event,
                        user: user.no,
                        time: user.time,
                    }

                    waitings.push(user.no);
                }
                else if(user.time > serviceCompleteTime)
                {
                    const newServiceUser = waitings[0];
                    waitings = waitings.slice(1);

                    // To calculate standby time for user that is in service
                    totalWaitins[(atService-1)] = serviceCompleteTime - users[(atService-1)].time

                    atService = newServiceUser;
                    serviceCompleteTime = serviceCompleteTime + users[(newServiceUser-1)].serviceTime      

                    // Service finish event pushed
                    events.push
                    (
                        {
                            ...event,
                            time: serviceCompleteTime,
                            atService: atServiceToString(newServiceUser, serviceCompleteTime),
                            waitings: waitings.toString(),
                            user: null
                        }
                    );

                    event = 
                    {
                        ...event,
                        user: user.no,
                        time: user.time,
                    };
                }
                else if(user.time === serviceCompleteTime)
                {
                    const newServiceUser = waitings[0];
                    waitings = waitings.slice(1);

                    // To calculate standby time for user that is in service
                    totalWaitins[(atService-1)] = serviceCompleteTime - users[(atService-1)].time

                    atService = newServiceUser;
                    serviceCompleteTime = serviceCompleteTime + users[(newServiceUser-1)].serviceTime

                    event = 
                    {
                        ...event,
                        time: serviceCompleteTime,
                        atService: atServiceToString(newServiceUser, serviceCompleteTime),
                        waitings: waitings.toString(),
                        user: user.no                        
                    };
                }
                
                events.push
                (
                    {
                        ...event, 
                        atService: atServiceToString(atService, serviceCompleteTime),
                        waitings: waitings.toString()
                    }
                );
            }    
        );

        if(waitings.length !== 0)
        {
            waitings.forEach(id => 
                {
                    var event = {};
                
                    const newServiceUser = waitings[0];
                    waitings = waitings.slice(1);

                    // To calculate standby time for user that is in service
                    totalWaitins[(newServiceUser-1)] = serviceCompleteTime - users[(newServiceUser-1)].time

                    events.push
                    (
                        {
                            ...event,
                            time: serviceCompleteTime,
                            atService: atServiceToString(newServiceUser, serviceCompleteTime),
                            waitings: waitings.toString(),
                            user: null
                        }
                    );

                    atService = newServiceUser;
                    serviceCompleteTime = serviceCompleteTime + users[(newServiceUser-1)].serviceTime
                }      
            )
        }
        
        console.log({totalWaitins, users});

        setState({...state, rows: events})
    }

    const newUserService = (time, user, finishTime) => 
    {
        return (
            {
                time,
                user: user,
                atService: atServiceToString(user, finishTime)
            }
        )
    }

    const serviceFinish = (oldUser, time, user, finishTime, waitings) => 
    ({
        finishedUser: oldUser,
        time,
        atService: atServiceToString(user, finishTime),
        waitings: waitingsToString(waitings)
    })

    const generateTable = () => 
    {
        const [users, _] = generateUsers();
        const events = [];

        var waitings = [];

        var atService = users[0].no;
        var serviceCompleteTime = (users[0].time + users[0].serviceTime);

        events.push(newUserService(users[0].time, users[0].no, (users[0].time + users[0].serviceTime)))

        users.slice(1).forEach(user => 
            {
                const event = {time: user.time, user: user.no};

                // Service henüz bitmediyse
                if(user.time <  serviceCompleteTime)
                {
                    waitings.push({id: user.id, no: user.no});
                }
                else if(user.time === serviceCompleteTime)
                {
                    const oldFinishTime = serviceCompleteTime;
                    const oldServiceUser = atService;

                    event['finishedUser'] = oldServiceUser;

                    // Bekleyen Müşteri var ise
                    if(waitings.length !== 0)
                    {   
                        atService = waitings[0].no;
                        serviceCompleteTime+= users[waitings[0].id].serviceTime;
                        waitings = waitings.slice(1);

                        waitings.push({id: user.id, no: user.no});
                    }
                    // Hali hazırda bekleyen kullanıcı yok ise
                    else 
                    {
                        atService = user.no;
                        serviceCompleteTime+=user.serviceTie;
                    }
                }
                // Yeni user geldiğinde service bitmiş.
                else if(user.time > serviceCompleteTime)
                {
                    // Bekleyen Müşteri var ise
                    if(waitings.length !== 0)
                    {   
                        const oldFinishTime = serviceCompleteTime;
                        const oldServiceUser = atService;

                        atService = waitings[0].no;
                        serviceCompleteTime+= users[waitings[0].id].serviceTime;
                        waitings = waitings.slice(1);

                        waitings.push({id: user.id, no: user.no});

                        events.push(serviceFinish(oldServiceUser, oldFinishTime, atService, serviceCompleteTime, waitings));
                    }
                    // Hali hazırda bekleyen kullanıcı yok ise
                    // Servis yeni kullanıcı gelne kadar boşta kaldı ise
                    else 
                    {
                    }
                }
                
                events.push(
                    {
                        ...event,
                        atService: atServiceToString(atService, serviceCompleteTime),
                        waitings: waitingsToString(waitings)
                    }
                );
            }
        );

        //const rows = Object.entries(events).map(event => ({time: event[0], ...event[1]}));
        setState({...state, rows: events});
        console.log({users, events})
    }
    
    const hanldeInput = (e) => setInput({...input, [e.target.name]: e.target.value})

    return (
        <>
        <Card sx={{ p: 3, mt: 5}} variant="outlined">

            {
                /*
                <DetailsTable 
                    distributions={distributions}
                    handleChangeDistruvtionsType={handleChangeDistruvtionsType}
                />
                */
            }
            
            <Button
                sx={{mt: 5}}
                onClick={generateTable}
            >
                Generate Table
            </Button>

            <TempForm
                input={input}
                handleInput={hanldeInput}
            />
            
            <SimulationTable 
                rows={state.rows}
            />
        </Card>
        </>
  );
};

export default HomeScreen;
