// ----------------------------------------------
// Import Files & Assisters
import DayList from "./DayList";
import React from "react";

import "components/Application.scss";
import Appointment from "components/Appointment";
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from '../helpers/selectors'
import useApplicationData from 'hooks/useApplicationData'
// ----------------------------------------------

// ----------------------------------------------
// Hard coded original data
// const appointments = {
//   "1": {
//     id: 1,
//     time: "12pm",
//   },
//   "2": {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer:{
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   "3": {
//     id: 3,
//     time: "2pm",
//   },
//   "4": {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer:{
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   "5": {
//     id: 5,
//     time: "4pm",
//   }
// };
// ----------------------------------------------

// ----------------------------------------------
// Function Application
export default function Application(props) {

  // ----------------------------------------------
  // Imported constants from useApplicaitonData
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
  // ----------------------------------------------

  // ----------------------------------------------
  // Hard coded original data
  // const days = [
  //   {
  //     id: 1,
  //     name: "Monday",
  //     spots: 2,
  //   },
  //   {
  //     id: 2,
  //     name: "Tuesday",
  //     spots: 5,
  //   },
  //   {
  //     id: 3,
  //     name: "Wednesday",
  //     spots: 0,
  //   },
  // ];
  // ----------------------------------------------

  // ----------------------------------------------
  // const [day, setDay] = useState('Monday');
  // const [days, setDays] = useState([]);
  // const [appointments, setAppointments] = useState({});

  // useEffect(() => {
  //   const daysURL = `http://localhost:8001/api/days`;
  //   axios.get(daysURL).then(response => {
  //     // console.log(response)
  //     // setState({...state, days: [...response.data]})
  //     // setDays([...response.data])
  //     setDays(response.data)
  //   });
  // }, [])

  // useEffect(() => {
  //   const appointmentsURL = `http://localhost:8001/api/appointments`;
  //   axios.get(appointmentsURL).then(response => {
  //     // console.log(response)
  //     // setState({...state, appointments: {...response.data}})
  //     // console.log(getAppointmentsForDay(days, day))
  //     setAppointments({...response.data})
  //   });
  // }, [])
  // ----------------------------------------------

  // ----------------------------------------------
  // Daily Appointment information creation
  const dailyAppointments = getAppointmentsForDay(state, state.day)
  const interviewers = getInterviewersForDay(state, state.day)
  // ----------------------------------------------

  // ----------------------------------------------
  // Each day appointment list 
  const appointmentList = Object.values(dailyAppointments).map((each) => {  
    const interviewer = getInterview(state, each.interview);

    return (
      <Appointment key={{...each}.id} id={each.id} time={each.time} interview={interviewer} interviewers={interviewers} bookInterview={bookInterview} cancelInterview={cancelInterview}  /> 
    )
  })
  // ----------------------------------------------
  
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
