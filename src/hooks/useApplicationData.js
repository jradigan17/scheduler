import { useReducer, useEffect } from "react";
import axios from "axios";

import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";

export default function useApplicationData() {

  // ----------------------------------------------
  // Set State & API Call - using useState - vs useReducer
  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: {},
  //   interviewers: {}
  // });

  // const setDay = day => setState({ ...state, day })
  // const setDays = (days) => setState(prev => ({ ...prev, days }))
  // const setAppointments = (appointments) => setState(prev => ({...prev, appointments}))
  // const setInterviewers = (interviewers) => setState(prev => ({...prev, interviewers}))

  // Promise.all([
  //   axios.get('http://localhost:8001/api/days'),
  //   axios.get('http://localhost:8001/api/appointments'),
  //   axios.get('http://localhost:8001/api/interviewers')
  // ]).then((all) => {
  //   // console.log(all)
  //   // console.log(all[0]); // first
  //   // console.log(all[1]); // second
  //   // console.log(all[2]); // third
  //   setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
  // });
  // ----------------------------------------------




  // ----------------------------------------------
  // Reducer State & Dispatch
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  // ----------------------------------------------

  // ----------------------------------------------
  // Set Day
  const setDay = (day) => dispatch({ type: SET_DAY, day: day })
  // ----------------------------------------------

  // ----------------------------------------------
  // Gather data from API - initial load of page
  const initialLoad = () => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      // console.log(all)
      // console.log(all[0]); // first
      // console.log(all[1]); // second
      // console.log(all[2]); // third
      // setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      dispatch({type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data, interviewers: all[2].data});
      // dispatch({type: SET_APPLICATION_DATA, days: all[0].data});
    
    });
  }
  // ----------------------------------------------

  // ----------------------------------------------
  // Use effect for initial load and for Websocket 
  useEffect(() => {
    // Call API for initial load
    initialLoad()

    // Websocket connection
    const url = process.env.REACT_APP_WEBSOCKET_URL;
    const webSocket = new WebSocket(url);
    // console.log(url)    
    webSocket.onopen = (event) => {
      webSocket.send('ping');
    };

    // webSocket.onmessage = (event) => {
    //   console.log(JSON.parse(event.data));
    // }

    webSocket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      // console.log(msg);
      if(msg.type === 'SET_INTERVIEW') {
        dispatch({
          type: SET_INTERVIEW,
          id: msg.id,
          interview: msg.interview
        })
      }
    }   
    }, []);
  // ----------------------------------------------



  // ----------------------------------------------
  // Book Interview
  function bookInterview(id, interview) {
  
  // // Using Local Storage
  //   // console.log(id, interview);
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: { ...interview }
  //   };

  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment,
  //   };

  //   // setState({
  //   //   ...state,
  //   //   appointments
  //   // });
    // let date = state.days.filter(each => each.name === state.day)
    // date[0].spots -= 1
    // console.log(date[0].spots)

    return axios.put(`http://localhost:8001/api/appointments/${id}`,{interview})
    .then((res) => {
      console.log(res);
      dispatch({
        type: SET_INTERVIEW,
        id,
        interview
      })
    })
  }
  // ----------------------------------------------

  // ----------------------------------------------
  // Cancel Interview
  function cancelInterview(id, interview = null) {

    // // Using Local Storage
    // // console.log(id, interview);
    // const appointment = {
    //   ...state.appointments[id],
    //   interview: null
    // };

    // const appointments = {
    //   ...state.appointments,
    //   [id]: appointment,
    // };

    // // setState({
    // //   ...state,
    // //   appointments
    // // });

    // let date = state.days.filter(each => each.name === state.day)
    // date[0].spots += 1
    // // console.log(date[0].spots)

    return axios.delete(`http://localhost:8001/api/appointments/${id}`,{interview})
    .then((res) => {
      console.log(res);
      dispatch({
        type: SET_INTERVIEW,
        id,
        interview
      });

    // ----------------------------------------------
    // Attempt at updating spots - but it's already doing it    
      // const test = state.days.filter(each => each.name === state.day)
      // console.log(state.days[0].name);
      // console.log(state.day);
      // console.log(test);
      // return (
      // <DayList days={state.days} value={state.day} onChange={setDay} />)
  // ----------------------------------------------
    
    })
  }
  // ----------------------------------------------

  return {
    state,
    // setState,
    setDay,
    bookInterview,
    cancelInterview
  }
}