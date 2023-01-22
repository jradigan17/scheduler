import React from 'react';
import InterviewerListItem from './InterviewerListItem';
import 'components/InterviewerList.scss';
import PropTypes from 'prop-types'; 


export default function InterviewerList(props) {

  const interviewerList = props.interviewers.map((each) => {
    return (
      <InterviewerListItem key={each.id} name={each.name} avatar={each.avatar} selected={props.value === each.id && props.value} setInterviewer={() => props.onChange(each.id)} />
    )
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerList}</ul>
    </section>
  )
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

// export default InterviewerList;