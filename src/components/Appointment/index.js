import React, { Fragment } from 'react'
import './styles.scss';
import Header from './Header'
import Show from './Show'
import Empty from './Empty'
import Form from './Form'
import Saving from './Saving'
import Deleting from  './Deleting'
import Confirm from './Confirm'
import useVisualMode from '../../hooks/useVisualMode'

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR = "ERROR";


export default function Appointment (props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then (() => transition(SHOW))
      .catch(err=>transition(ERROR));
  }

  //show confirm form, if cancel, go back, if confirm, show delete. when its been deleted from api, transition to empty
  function toDelete(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }
    transition(DELETING)
    props.cancelInterview(props.id, interview)
      .then(()=>transition(EMPTY))
      .catch(err=>console.log(err));
  }

  const edit = () => {
    transition(EDIT)
  }

  return (
    <Fragment>
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={()=> transition(CONFIRM)}
          onEdit={edit}/>
        )}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          onCancel={()=> back(EMPTY)}  
          onSave={save}
          />
        )}  
      {mode === SAVING && (
        <Saving
          message="saving"/>
        )}
      {mode === DELETING && (
        <Deleting
          message="deleting"/>
        )}

    {mode === CONFIRM && (
      <Confirm
      message="Are you sure you would like to delete?"
      onCancel={()=>transition(SHOW)}
      onConfirm={toDelete}/>
    )}
    {mode === EDIT && (
      <Form 
        
        />
    )}
    </article>
    </Fragment>
  )
}