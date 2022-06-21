import { areArraysEqual } from '@mui/base';
import { createSlice } from '@reduxjs/toolkit'


const initialState = 
{
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
  ]
};

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

const createSystemUsers = (n) =>
{
  const users = [];
  var time = 0;

  for (var i = 0; i < n; i++)
  {
      const gas = getFromCumulative();
      const serviceTime = getFromUniformDistribution(10, 20);
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
const insert = (arr, index, newItem) => [...arr.slice(0, index),newItem,...arr.slice(index)];

const getEmptyService = (services) => services.find((s) => s.userInServicce === null)?.id || false;

const finishServiceObject = (userId, service, time) => ({serviceFinihed: true, serviceFinishedUser: userId, service, time});
const commingNewUser = () => ({})

const pushAfterTime = (arr, obj) => 
{
  for (var i = 0; i < arr.length; i++)
  {
    const e = arr[i];

    if(e.time < obj.time)
    {
      insert(arr, i, obj);
      console.log({arr1: arr, obj});
      break;
    }
    else if(e.time === obj.time)
    {
      arr[i] = {...arr[i], ...obj}
      console.log({arr2: arr});
      break;
    }
    console.log(i);
  }
} 

/*
  Genarate Table Method
  * event based approach
*/
const generateTable = (services) =>
{
  // Definitios 
  const que = [];
  const resultEvents = {};
  const emptyServices = new Array(services.length);
  emptyServices.fill(true);  

  const users = createSystemUsers(20);
  const events = {}
  users.forEach(user => events[user.time] = {newUser: true, newUserId: user.id, serviceTime: user.serviceTime});

  console.log({ users, events , services, que, resultEvents});
  console.log("*******************")

  try
  {
  while(Object.keys(events).length !== 0)
      {
        const newEvent = {};
        const time = Number(Object.keys(events)[0]);
        const event = Object.values(events)[0];
        
        delete events[Object.keys(events)[0]];

        console.log('----------');
        console.log(time, event);

        // if new user come to the systems
        if(event.newUser)
        {
          newEvent.commingUser = event.newUserId;
          que.push({id: event.newUserId, serviceTime: event.serviceTime});
        }

        // if a service finish
        if(event.serviceFinihed)
        {
          console.log('service finish');
          newEvent.finishedUser = event.serviceFinishedUser;
          
          event.service.forEach(i => 
            {
              emptyServices[i] = true;
              services[i].userInServicce = null;
              services[i].serviceFinishTime = null;
            }
          );

        }

        // Servis Müsait ve kuyrukta bir kullanıcı var
        if(emptyServices[0] && que.length !== 0)
        {
          console.log('service');
          emptyServices[0] = false;
          const user = que.shift();
          
          const newServiceFinishTime = (time + user.serviceTime);

          services[0].userInServicce = user.id ;
          services[0].serviceFinishTime = newServiceFinishTime;

          newEvent.userInService = user.id;

          events[newServiceFinishTime] = {...events[newServiceFinishTime], ...finishServiceObject(user.id, [0], time)} 

          console.log({newServiceFinishTime});
          console.log({user});
        }

        resultEvents[time] = newEvent;
        /*
        

        // Aynı anda birden fazla user sisteme girer ise?
        // veya aynı anda birden fazla user beklerken sistemlerde birden fazlası boş ise
        const emptyServiceId = getEmptyService(services);
        
        //Is there a empty service 
        if(emptyServiceId  && que.length !== 0)
        {
          const user = que.shift();
          
          const newServiceFinishTime = (event.time + user.serviceTime);

          console.log({newServiceFinishTime, que});
          // fill the service with first element in que
          const index = services.findIndex(s => s.id === emptyServiceId);
          services[index] = {...services[index], userInServicce: user.id, serviceFinishTime: newServiceFinishTime}
          
          events[newServiceFinishTime] = {...events[newServiceFinishTime], ...finishServiceObject(user.id)} 
        }

        */
    }

  } catch(e) 
  {
    console.error(e)
  }
  
      console.log({ users, events , services, que, resultEvents});
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

      const result = generateTable(services);
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
    }
  },
})


export const { createTable, addService, addServiceType } = serviceSlice.actions

//export const selectCount = (state) => state.counter.value

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