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

const getEmptyService = (services) => services.find((s) => s.userInServicce === null)?.id || false;

const finishServiceObject = (userId) => ({serviceFinihed: true, serviceFinishedUser: userId});
const commingNewUser = () => ({})


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
      const que = [];
      const resultEvents = {};
      const users = createSystemUsers(20);
      const events = users.map(user => ({time: user.time, newUser: true, newUserId: user.id, serviceTime: user.serviceTime}));
      const services = state.services.map(s => ({...s, userInServicce: null, serviceFinishTime: null}));

      console.log({ users, events , services, que, resultEvents});

      console.log("*******************")
      
      while(events.length !== 0)
      {
        const event = events.shift();

        console.log({events, event});

        // fi new user come to the systems
        if(event.newUser)
        {
          resultEvents[event.time] = {...resultEvents[event.time], commingUser: event.newUserId};
          que.push({id: event.newUserId, serviceTime: event.serviceTime});
        }

        // service finish
        if(event.serviceFinihed)
        {
          console.log('finish server');
          resultEvents[event.time] = {...resultEvents[event.time], finishedUser: event.serviceFinishedUser};
          //TODO empty the service
        }

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
      }

      console.log({ users, events , services, que, resultEvents});
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