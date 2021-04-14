import React from "react";
import 'components/InterviewListItem.scss';
import classNames from "classnames";


export default function InterviewerListItem(props) {

  // const handleSetInterviewer = () => {
  //   props.setInterviewer(props.name)
  // }
  const InterviewListItemClass = classNames(
    'interviewers__item', {
    'interviewers__item--selected': props.selected
    }
  )

  return (
  <li 
    className={InterviewListItemClass}
    onClick={props.setInterviewer}>
    <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
    />
    {props.selected && props.name}
  </li>
  )
}