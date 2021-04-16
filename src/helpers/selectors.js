//return array of appointments for a particular day
export function getAppointmentsForDay(state, day) {
  const foundData = state.days.find(obj => obj.name === day)
  if (foundData) {
    const matchingAppointments = foundData.appointments.map(id => state.appointments[id])
    return matchingAppointments
  } else {
    return [];
  }
}

export function getInterview(state, interview) {
  if(!interview) {
    return null
  } else {
    const newInterview = {
      ...interview,
      interviewer: {...state.interviewers[interview.interviewer] }
    }
    return newInterview;
  }
}

export function getInterviewersForDay(state, day) {
  const foundData = state.days.find(obj => obj.name === day)
  console.log(foundData);
  if (foundData) {
    const matchingInterviews = foundData.appointments.map(id => state.interviewers[id])
    return matchingInterviews
  } else {
    return [];
  }
}