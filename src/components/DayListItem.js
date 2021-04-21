import React from 'react';
import 'components/DayListItem.scss';
import classNames from "classnames";

export default function DayListItem(props) {

const DayListItemClass = classNames (
  'day-list__item', {'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0
  }
)

const formatSpots = (spot) => {
  if (!spot) {
    return 'no spots remaining';
  } else if (spot === 1) {
    return '1 spot remaining';
  } else {
    return `${spot} spots remaining`;
  }
}
  return (
    <li 
      className={DayListItemClass} data-testid="day" 
      onClick={() => props.setDay(props.name)}>
      <h2 >{props.name}</h2>
      <h3>{formatSpots(props.spots)}</h3>
    </li>
  )
};
