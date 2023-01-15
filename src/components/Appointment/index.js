import React, {useEffect} from 'react'
import 'components/Appointment/styles.scss'
import Header from './Header';
import Empty from './Empty';
import Show from './Show';
import Form from './Form';
import Confirm from './Confirm';
import Error from './Error';
import Status from './Status';
import useVisualMode from 'hooks/useVisualMode'


export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  const DELETING = 'DELETING';
  const CONFIRM = 'CONFIRM';
  const EDIT = 'EDIT';
  const ERROR_SAVE = 'ERROR_SAVE';
  const ERROR_DELETE = 'ERROR_DELETE';

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {

    const interview = {
      student: name,
      interviewer
    }
    // console.log(interview)

    transition(SAVING)
    return props.bookInterview(props.id, interview)
    .then((res) => {
      transition(SHOW)
    })
    .catch((e) => {
      console.log(`The Error Message is: ${e.message}`);
      transition(ERROR_SAVE, true)
    })
  }

  function deleteInterview(id) {
    // transition(DELETING, true)
    transition(DELETING)
    return props.cancelInterview(id)
    .then((res) => {transition(EMPTY)})
    .catch((e) => {
      console.log(`The Error Message is: ${e.message}`);
      transition(ERROR_DELETE, true)
    })
  }

  // ----------------------------------------------
  // Websocket - listen & update when changes to interview
  useEffect(() => {
    if (props.interview && mode === EMPTY) {
    transition(SHOW);
    }
    if (props.interview === null && mode === SHOW) {
    transition(EMPTY);
    }
  }, [props.interview, transition, mode]);
  // ----------------------------------------------


  return (
    <article className="appointment">
      {props.time && <Header time={props.time} />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && props.interview &&( 
        <Show id={props.id} student={props.interview.student} interviewer={props.interview.interviewer} onDelete={() => transition(CONFIRM)} onEdit={()=> transition(EDIT)}/>
      )} 
      {mode === CREATE && <Form onSave={save} interviewers={props.interviewers} onCancel={() => back()} />}
      {mode === SAVING && <Status message={'Saving'} />}
      {mode === DELETING && <Status message={'Deleting'} />}
      {mode === CONFIRM && <Confirm onCancel={() => back()} onConfirm={() => (deleteInterview(props.id))} message={'Are you sure you would like to delete'}/>}
      {mode === EDIT && <Form student={props.interview.student} interviewer={props.interview.interviewer.id} onSave={save} interviewers={props.interviewers} onCancel={() => back()} />}
      {mode === ERROR_SAVE && <Error message={`There was an error adding your appointment. Try again later.`} onClose={() => back()} />}
      {mode === ERROR_DELETE && <Error message={`There was an error deleting your appointment. Try again later.`} onClose={() => {back(); back()}} />}
    </article>
  )
}