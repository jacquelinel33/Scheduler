import React, { useState, useEffect } from "react";
import Appointment from "components/Appointment/index"
import "components/Application.scss";
import DayList from "components/DayList";
import axios from 'axios';

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "6pm",
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Jacqueline Lee",
      interviewer: {
        id: 2,
        name: "Tori Malcom",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      }
    }
  },
  {
    id: 5,
    time: "9am",
    student: "Jane Doe",
    interviewer: { 
      id: 5, 
      name: "Sven Jones", 
      avatar: "https://i.imgur.com/twYrpay.jpg" 
    }
  }
];


export default function Application(props) {
  const [days, setDays] = useState([]);

  useEffect(() => {
    axios
    .get("/api/days")
    .then(response => console.log(response.data.results))
}, [])

  const AppointmentList = appointments.map(appointment => {
   return <Appointment 
    key={appointment.id} 
    {...appointment} />
    })
  

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
  days={days}
  day={days}
  setDay={setDays}
/>
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {AppointmentList}
      </section>
    </main>
  );
}

