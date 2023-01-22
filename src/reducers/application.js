import { getAppointmentsForDay } from "helpers/selectors";

// ----------------------------------------------
  // Use Reducer - Actions & Reducer Function
  export const SET_DAY = "SET_DAY";
  export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  export const SET_INTERVIEW = "SET_INTERVIEW";

  export default function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        // console.log(`The date is: ${action.day}`)
        return { ...state, day: action.day}
      case SET_APPLICATION_DATA:
        return {...state,
          days: action.days,
          appointments: action.appointments,
          interviewers: action.interviewers}
      case SET_INTERVIEW:{ 
        const newState = {
          ...state,
          appointments: {
            ...state.appointments,
            [action.id]: {
              ...state.appointments[action.id],
              interview: action.interview
            }
          }
        };
        const appointment = {
          ...state.appointments[action.id],
          interview: action.interview
        };
        const appointments = {
          ...state.appointments,
          [action.id]: appointment,
        };
        
        return {...state,
          appointments: appointments,
          days: spotsRemaining(newState, action.id)
        }
      };
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }
  // ----------------------------------------------

  // ----------------------------------------------
  // Spots Remaining
  function spotsRemaining(state, id) {
    let currentDay = state.days.find(day => day.appointments.includes(id))
    let count = 0;
    const existingAppointments = getAppointmentsForDay(state, currentDay.name)
    for (let existingAppointment of existingAppointments) {
      if(!existingAppointment.interview) count ++ 
    }

    currentDay.spots = count
    return state.days
  }
  // ----------------------------------------------