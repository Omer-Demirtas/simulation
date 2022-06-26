import { unstable_composeClasses } from '@mui/material';
import { createSlice } from '@reduxjs/toolkit'

/*
value: 
      {
        1: 10,
        2: 20,
        3: 10,
        4: 30,
        5: 15,
        6: 15
      }
*/

const initialState = 
{
  user: {
    gas: {
      distributionType: 1,
      value: {
        a: 10,
        b: 15
      }
    },
    service: 
    {
      value: 
      {
        0: 20,
        1: 80,
      },
      distributionType: 0
    }
  },
  services: [
    {
      id: 1,
      title: 1,
      serviceType: 0
    },
    {
      id: 2,
      title: 2,
      serviceType: 1
    }
  ],
  serviceTypes: 
  [
    {
      id: 0,
      title: 'Default Service',
      value: {a: 10, b: 15},
      distributionType: 1
    },
    {
      id: 1,
      title: 'Özel Gişe İşlemleri',
      value: {a: 5, b: 8},
      distributionType: 1
    }
  ],
  resultEvents: []
}

const getRandomNumber = () => Math.random().toFixed(2);

const getCumulativeValue = (cu) =>
{
    const rand = getRandomNumber() * 100;

    return cu.findIndex(c => rand < c);
}

const getFromCumulative = (cumulative) => 
    {
        const values = Object.values(cumulative);

        const c = values.map((sum => value => sum += value)(0))

        return c;
    }

const getFromUniformDistribution = ({a, b}) => 
{
  const rand = getRandomNumber();

  return Math.floor((a + (b - a) * rand))
}

const generateDistributionOption = (distribution) =>
{
  if(distribution.distributionType === 0)
  {
    return () => getCumulativeValue(getFromCumulative(distribution.value));
  }
  else if(distribution.distributionType === 1)
  {
    return () => getFromUniformDistribution(distribution.value);
  }
}

const createSystemUsers = (n, user, serviceTypes) =>
{
  const generator = 
  {
    gas: generateDistributionOption(user.gas),
    service: serviceTypes.map(s => generateDistributionOption(s)),
    serviceType: generateDistributionOption(user.service)
  };

  const users = [];
  var time = 0;

  for (var i = 0; i < n; i++)
  {
      const gas = generator.gas();
      const serviceType = generator.serviceType();
      const serviceTime = generator.service[serviceType]();
      
      time+=gas;

      users.push( 
        {
          id: i,
          gas: gas,
          no: (i+1),
          time: time,
          serviceTime: serviceTime,
          serviceType: serviceType
        }
      );
  }

  return users;
}

/* Helper methods for simulation logic */

const queToString = (que) => que.map(q => q.id).join(',');

const servicesToList = (services) => 
{
  if(!services) return null;

  var result = [];
  for (const [key, value] of Object.entries(services)) {
    result[Number(key)] = value;
  }
  return result;
}

const checkForAvaliableServiceForType = (services, que) =>
{
  if(que.length === 0) return false;
  for (const service of services)
  {
    if(service.isEmpty) return true;
  }

  return false;
}

const getFirstUserByServiceType = (que, serviceType) =>
{
  console.log('getFirstUserByServiceType');

  var result = null;

  var index = 0;
  for (const u of que)
  {
    console.log({u});

    if(u.serviceType === serviceType) 
    {
      result = que[index];
      que.splice(index, 1); // 2nd parameter means remove one item only
    }
    index++;
  }

  console.log({result, que, serviceType})
  return result;
}

/*
  Genarate Table Method
  * event based approach

  Expected structure for Event
  time: 
  {
    time: ,
    commingUser: ,
    services: {

    },
    finishedService: {
      0: 1,
      1: 2,
    },
    que: [],  
  }

*/
const generateTable = (services, user, serviceTypes) =>
{
  // Definitios
  const que = [];
  const events = {}
  const resultEvents = {};

  const users = createSystemUsers(20, user, serviceTypes);

  users.forEach(user => 
    events[user.time] = 
    {
      newUser: true, 
      newUserId: user.id, 
      serviceTime: user.serviceTime, 
      serviceType: user.serviceType,
      finishedServices: {},
      services: {}
    }
  );

  try
  {
  while(Object.keys(events).length !== 0)
      {
        const newEvent = {};
        const time = Number(Object.keys(events)[0]);
        const event = Object.values(events)[0];
        
        delete events[Object.keys(events)[0]];

        // if new user come to the systems
        if(event.newUser)
        {
          newEvent.commingUser = event.newUserId;
          que.push({id: event.newUserId, serviceTime: event.serviceTime, serviceType: event.serviceType});
        }

        // if a service finish
        if(event.serviceFinished)
        {
          //newEvent.finishedUser = event.serviceFinishedUser;
          
          const finishedServices = {};

          for (const [key, value] of Object.entries(event.finishedServices)) 
          {
            const i = Number(key);

            services[i].isEmpty = true;
            services[i].userInServicce = null;
            services[i].serviceFinishTime = null;

            finishedServices[i] = value;
          }
          
          newEvent.finishedServices = finishedServices; 
        }

        // Servis Müsait ve kuyrukta bir kullanıcı var
        if(checkForAvaliableServiceForType(services, que))
        {
          for (var i = 0; i < services.length; i++)
          {
            if(que.length === 0) break;
            if(!services[i].isEmpty) continue;
            
            const service = services[i];

            const user = getFirstUserByServiceType(que, service.serviceType);

            if(user)
            {
              service.isEmpty = false;

              const newServiceFinishTime = (time + user.serviceTime);

              // Fill service
              service.userInServicce = user.id ;
              service.serviceFinishTime = newServiceFinishTime;

              newEvent.services = {...newEvent.services, [`${i}`]: user.id};

              events[newServiceFinishTime] = {
                ...events[newServiceFinishTime], 
                serviceFinished: true,
                finishedServices: {...events[newServiceFinishTime]?.finishedServices, [`${i}`]: user.id}
              } 
            }
          }
        }

        newEvent.que = queToString(que);
        newEvent.services = servicesToList(newEvent.services);
        newEvent.finishedServices = servicesToList(newEvent.finishedServices);
        resultEvents[time] = newEvent;
    }

  } catch(e) 
  {
    console.error(e)
  }
  
  console.log({ users, events , services, que, resultEvents});

  return resultEvents;
} 


export const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    createTable: (state, action) => 
    {
      const services = state.services.map(s => ({...s, userInServicce: null, serviceFinishTime: null, isEmpty: true}));

      const user = JSON.parse(JSON.stringify(state.user));

      const serviceTypes = JSON.parse(JSON.stringify(state.serviceTypes));

      const resultObj = generateTable(services, user, serviceTypes);

      const resultEvents = [];

      Object.entries(resultObj).map(item => {
        resultEvents.push({time: item[0],...item[1]})
      })

      state.resultEvents = resultEvents;
    },
    addService: (state, action) => 
    {
      state.services.push(
        {
          ...action.payload
        }
      );
    },
    addServiceType: (state, action) => 
    {
      state.serviceTypes.push(action.payload)
    },
    updateUserDistribution: (state, action) => 
    {
      const {distribution, distributionType} = action.payload;

      console.log({distribution, distributionType})

      state.user.gas = { distributionType, value: distribution };
    },
    updateServiceType: (state, action) => 
    {
      const {serviceNo, serviceType} = action.payload;

      const index = state.services.findIndex(s => s.id === serviceNo);

      state.services[index].serviceType = serviceType;
    }
  },
})


export const { createTable, addService, addServiceType, updateUserDistribution, updateServiceType } = serviceSlice.actions

export const selectServiceTypes = (state) => state.service.serviceTypes;
export const selectEventsAndServices = (state) => [ state.service.resultEvents, state.service.services]
export const selectUser = (state) => state.service.user;

export default serviceSlice.reducer