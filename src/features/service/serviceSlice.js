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
  },
  services: [
    {
      id: 1,
      title: 1,
    },
    {
      id: 2,
      title: 2,
    }
  ],
  serviceTypes: 
  [
    {
      title: 'Default Service'
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
  console.log({distribution})
  if(distribution.distributionType === 0)
  {
    return [getFromCumulative(distribution.value), getCumulativeValue];
  }
  else if(distribution.distributionType === 1)
  {
    return [distribution.value, getFromUniformDistribution]
  }
}

const createSystemUsers = (n, distribution) =>
{
  const [options, generator] = generateDistributionOption(distribution);

  const users = [];
  var time = 0;

  for (var i = 0; i < n; i++)
  {
      const gas = generator(options);
      const serviceTime = getFromUniformDistribution({a: 10, b: 20});
      time+=gas;

      users.push( 
        {
          id: i,
          gas: gas,
          no: (i+1),
          time: time,
          serviceTime: serviceTime
        }
      );
  }

  return users;
}

/* Helper methods for simulation logic */

//const finishServiceObject = (userId, service, time) => ({serviceFinihed: true, serviceFinishedUser: userId, service, time});

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
const generateTable = (services, user) =>
{
  // Definitios
  const que = [];
  const resultEvents = {};
  const emptyServices = new Array(services.length);
  emptyServices.fill(true);  

  const users = createSystemUsers(20, user.gas);
  const events = {}
  users.forEach(user => events[user.time] = {newUser: true, newUserId: user.id, serviceTime: user.serviceTime, finishedServices: {}, services: {}});

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
          que.push({id: event.newUserId, serviceTime: event.serviceTime});
        }

        // if a service finish
        if(event.serviceFinished)
        {
          //newEvent.finishedUser = event.serviceFinishedUser;
          
          const finishedServices = {};

          for (const [key, value] of Object.entries(event.finishedServices)) 
          {
            const i = Number(key);

            emptyServices[i] = true;
            services[i].userInServicce = null;
            services[i].serviceFinishTime = null;

            finishedServices[i] = value;
          }
          
          newEvent.finishedServices = finishedServices; 
        }

        // Servis Müsait ve kuyrukta bir kullanıcı var
        if(emptyServices.find(s => s) && que.length !== 0)
        {
          for (var i = 0; i < services.length; i++)
          {
            if(que.length === 0) break;
            if(!emptyServices[i]) continue;

            const user = que.shift();

            emptyServices[i] = false;

            const newServiceFinishTime = (time + user.serviceTime);

            // Fill service
            services[i].userInServicce = user.id ;
            services[i].serviceFinishTime = newServiceFinishTime;

            //TODO Change for multiple service
            newEvent.services = {...newEvent.services, [`${i}`]: user.id};

            events[newServiceFinishTime] = {
              ...events[newServiceFinishTime], 
              serviceFinished: true,
              finishedServices: {...events[newServiceFinishTime]?.finishedServices, [`${i}`]: user.id}
            } 
          }

          /*
          emptyServices[0] = false;
          const user = que.shift();
          
          const newServiceFinishTime = (time + user.serviceTime);

          services[0].userInServicce = user.id ;
          services[0].serviceFinishTime = newServiceFinishTime;

          newEvent.userInService = user.id;

          events[newServiceFinishTime] = {...events[newServiceFinishTime], ...finishServiceObject(user.id, [0], time)} 

          console.log({newServiceFinishTime});
          console.log({user});
          */
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

/*
  Event types 
  0 -> new user come to system.

*/

export const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    createTable: (state, action) => 
    {
      const services = state.services.map(s => ({...s, userInServicce: null, serviceFinishTime: null}));

      const user = JSON.parse(JSON.stringify(state.user));

      const resultObj = generateTable(services, user);

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
    }
  },
})


export const { createTable, addService, addServiceType, updateUserDistribution } = serviceSlice.actions

export const selectEventsAndServices = (state) => [ state.service.resultEvents, state.service.services]
export const selectUser = (state) => state.service.user;

export default serviceSlice.reducer

/*
export const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount))
  }, 1000)
}

export const selectAllUsers = (state) => state.users;

export const selectUserById = (state, userId) =>
    state.users.find(user => user.id === userId)
*/

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`