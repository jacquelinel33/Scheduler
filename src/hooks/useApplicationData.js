import React, { useState, useEffect } from "react";
import axios from "axios";
 
export default function useApplicationData() {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers:{}
  });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then(([days, appointments, interviewers]) => {

      setState(prev => ({
        ...prev, 
        days: days.data, 
        appointments: appointments.data,
        interviewers: interviewers.data,
      }))
    })
  }, [])

  const setDay = day => setState(prev => ({ ...prev, day }));

  function bookInterview(id, interview) {
   
    const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };

    const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  return axios
  .put(`/api/appointments/${id}`, {interview})
  .then(response => {
    let numSpots = updateSpots(appointments);
    const days = state.days.map(day => {
      if(day.name === state.day){ 
        day.spots = numSpots
    }
      return day;
  })
    setState({
      ...state,
      days,
      appointments
    })
  })
  .catch(err=> console.log("in book interview", err.message))
}

  function cancelInterview (id) {

  const nullAppointment = {
...state.appointments[id], interview: null
  }

  const appointments = {
    ...state.appointments,
    [id]: nullAppointment
  };
  
  return axios
  .delete(`/api/appointments/${id}`)
  .then(() => {
    let numSpots = updateSpots(appointments);
    console.log("numSpots",numSpots)
    const days = state.days.map(day => {
      if(day.name === state.day){ 
        day.spots = numSpots
    }
      return day;
  })
    setState({
      ...state,
      days,
      appointments
    })
  })
  .catch(err=> console.log("in cancel interview", err.message))
};

const updateSpots = (appointments) => {
  // const newState = {...state}

  const currentDay = state.days.find(day => day.name === state.day);
  console.log("current day", currentDay);
  const listOfAppointmentsForADay = currentDay.appointments;
  const emptyAppointments = listOfAppointmentsForADay.filter(appointmentId => appointments[appointmentId].interview === null);

  return emptyAppointments.length;
}

  return { state, setDay, bookInterview, cancelInterview, updateSpots };
}



