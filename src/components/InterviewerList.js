import React from "react";
import 'components/InterviewerList.scss';
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList (props) {
  const interviewerList = props.interviewers.map(int => {
    return <InterviewerListItem 
      key={int.id}
      name={int.name}
      avatar={int.avatar}
      selected={int.id === props.interviewer}
      // setInterviewer={event => props.onChange(int.id)}
      setInterviewer={()=>props.setInterviewer(int.id)} 
      />
  })

  return(
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerList}</ul>
    </section>
  )
}