export const getAppointmentsForDay = (state, day) => {

  const appointmentsArray = []
  const filteredAppointments = state.days.filter(match => match.name === day)

  if (filteredAppointments.length === 0) {
    return []
  }

  const listAppointments = filteredAppointments[0].appointments;

  for (let appointment of listAppointments) {
    appointmentsArray.push(state.appointments[appointment]);
  }

  // for (let each in appointmentsArray) {
  //   // console.log(appointmentsArray[each].interview)

  //   if (!appointmentsArray[each].interview) {
  //     // console.log('No Item')
  //     // break
  //   } else {
  //     // console.log(appointmentsArray[each].interview.interviewer)
  //     let id = appointmentsArray[each].interview.interviewer
  //     let tmp = state.interviewers[id];
  //     appointmentsArray[each].interview.interviewer = tmp;
  //   }
  // }
  // filteredAppointments = {...filteredAppointments[0]}.appointments

  // if (!filteredAppointments) {
  //   return [];
  // } else {
  //   listAppointments = filteredAppointments[0].appointments
  // }


  
  // const APIAppointmentArray = Object.values(state.appointments);
  // for (let x = 0; x<filteredAppointments.length; x++) {
  //   for (let y = 0; y<APIAppointmentArray.length; y++) {
  //     if (filteredAppointments[x] === APIAppointmentArray[y].id)
  //     appointments.push(APIAppointmentArray[y])
  //   }  
  // }

  // console.log(appointmentsArray)
  return appointmentsArray
}

// export function getAppointmentsForDay(state, day) {
//   // TODO refactor into something cleaner
//   let appointmentArray = [];

//   // if (global.config.debug)
//   //   console.log("selectors - appointmentsforday:state", state);
//   // if (global.config.debug)
//   //   console.log("selectors - appointmentsforday:day", day);

//   // extract items only for matching day
//   const filterStateDays = state.days.filter((theDay) => theDay.name === day);

//   // // no data, let's return before needless work
//   // if (
//   //   global.config.isFalsey(filterStateDays.length) ||
//   //   global.config.isFalsey(state.days.length)
//   // )
//   //   return [];

//   if(filterStateDays.length === 0) {
//     return [];
//   }
//   // if (global.config.debug)
//   //   console.log("selectors - filterStateDays:", filterStateDays);

//   // assemble just hte appointmnet array
//   const appointments = filterStateDays[0].appointments;
//   for (let appointment of appointments) {
//     appointmentArray.push(state.appointments[appointment]);
//   }

//   // if (global.config.debug)
//   //   console.log(
//   //     "selectors - appointmentArray (RETURN data) (for day)",
//   //     appointmentArray
//   //   );
//   return appointmentArray;
// }


export function getInterview (state, interview) {

  if (!interview) {
    return null;
  }

  const filterInterview = {}
  filterInterview.student = interview.student;
  filterInterview.interviewer = state.interviewers[interview.interviewer];

  return filterInterview
}

export const getInterviewersForDay = (state, day) => {

  const interviewersArray = []
  const filteredInterviewers = state.days.filter(match => match.name === day)

  if (filteredInterviewers.length === 0) {
    return []
  }

  const listInterviewers = filteredInterviewers[0].interviewers;

  for (let interviewer of listInterviewers) {
    interviewersArray.push(state.interviewers[interviewer]);
  }

  return interviewersArray
}