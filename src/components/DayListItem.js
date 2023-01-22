import React from 'react';
import classNames from "classnames";
import 'components/DayListItem.scss';

export default function DayListItem(props) {

  const listClass = classNames( 
    'day-list__item', 
    {'day-list__item--full':props.spots === 0, 'day-list__item--selected':props.selected}
  );

  const formatSpots = () => {
    return props.spots === 0 ? 'no spots remaining': props.spots === 1 ? props.spots + ' spot remaining' : props.spots + ' spots remaining' 
  }

  return (
    <li className={listClass} data-testid='day' onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      {/* {props.spots > 1 && <h3 className="text--light">{props.spots} spots remaining</h3>}
      {props.spots === 0 && <h3 className="text--light">no spots remaining</h3>}
      {props.spots === 1 && <h3 className="text--light">{props.spots} spot remaining</h3>} */}
      <h3 className='text--light'>{formatSpots()}</h3>
    </li>
  )
}