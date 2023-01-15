import React, { useState } from 'react';
import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';

export default function Form(props) {

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = () => {
    setStudent('');
    setInterviewer(null);
    return
  }

  const cancel = () => {
    reset();
    props.onCancel();
    return
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => {event.preventDefault(); props.onSave(student, interviewer)}}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            /*
              This must be a controlled component
              your code goes here
            */
          />
        </form>
        <InterviewerList 
          /* your code goes here */
          interviewers={props.interviewers} 
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => (props.onSave(student, interviewer))}>Save</Button>
        </section>
      </section>
    </main>
  )
}