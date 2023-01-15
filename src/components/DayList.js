import React from 'react'
import DayListItem from './DayListItem';

export default function DayList(props) {

  const days = props.days.map((each) => {
    return (
      <DayListItem key={each.id} spots={each.spots} name={each.name} setDay={props.onChange} selected={props.value === each.name && props.value}/>
    )
  })
  
  return (
    <ul>
      {days}
    </ul>
  )
}