import React, { useState } from 'react'

import Button from '../Button'
import InterviewerList from '../InterviewerList'

export default function Form (props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = () => {
    setName("")
    setInterviewer(null)
  }

  const cancel = () =>{
    reset()
    props.onCancel();
  }

  const save = () => {
    props.onSave(name, interviewer);
  }
  
// const handleChange = event => {
//   const value = event.target.value;
//   const name = event.target.name;
//   const newFormData = {..formData}
//   newFormData[name] = value;
//   setFormData(newFormData);

  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        name={props.name}
        type="text"
        placeholder="Enter Student Name"
        onChange={(event) => setName(event.target.value)}
        /*
          This must be a controlled component
        */
      />
    </form >
    <InterviewerList 
      interviewers={props.interviewers} 
      value={interviewer} 
      onChange={(event) => setInterviewer(event)}
      />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button onClick={cancel}danger>Cancel</Button>
      <Button onClick={save}confirm>Save</Button>
    </section>
  </section>
</main>
  )
}