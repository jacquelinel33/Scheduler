import React from "react";
import 'components/InterviewerList.scss';
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from 'prop-types';

export default function InterviewerList (props) {
  InterviewerList.propTypes = {
    interviewers: PropTypes.array.isRequired
  }
  
  const interviewerList = props.interviewers.map(int => (
     <InterviewerListItem 
        key={int.id}
        name={int.name}
        avatar={int.avatar}
        selected={int.id === props.interviewer}
        setInterviewer={event=>props.setInterviewer(int.id)} 
      />
    )
  )

  return(
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerList}</ul>
    </section>
  )
};