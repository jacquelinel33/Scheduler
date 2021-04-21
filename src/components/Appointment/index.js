import React, { Fragment, useEffect } from 'react'
import './styles.scss';
import Header from './Header'
import Show from './Show'
import Empty from './Empty'
import Form from './Form'
import Saving from './Saving'
import Deleting from  './Deleting'
import Confirm from './Confirm'
import Error from './Error'
import useVisualMode from '../../hooks/useVisualMode'


export default function Appointment (props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE"
  const ERROR_DELETE = "ERROR_DELETE"

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // console.log("props.interview",props.interview);

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then (() => {
                    transition(SHOW)})
      .catch(err=>{console.log("error", err.message)
        transition(ERROR_SAVE, true)});
  }

  const toDelete = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    }
    transition(DELETING, true)
    props
      .cancelInterview(props.id, interview)
      .then(() => transition(EMPTY))
      .catch(err => transition(ERROR_DELETE, true));
  }

  const edit = () => {
    transition(EDIT)
  }

  const confirm = () => {
    transition(CONFIRM)
  }


  return (
    <Fragment>
    <article className="appointment" data-testid="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && (
        <Empty onAdd={() => transition(CREATE)} />
        )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirm}
          onEdit={edit}/>
        )}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          onCancel={back}  
          onSave={save}
          />
        )}  
      {mode === SAVING && (
        <Saving
          message="Saving"/>
        )}
      {mode === DELETING && (
        <Deleting
          message="Deleting"/>
        )}

    {mode === CONFIRM && (
      <Confirm
      message="Are you sure you would like to delete?"
      onCancel={()=>transition(SHOW)}
      onConfirm={toDelete}/>
    )}
    {mode === EDIT && (
      <Form 
        name={props.interview.student}
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers}
        onCancel={back}
        onSave={save}
        />
    )}
    {mode === ERROR_SAVE && (
      <Error  
        message="Error Saving"
        onClose={()=>transition(SHOW)}/>
    )}
    {mode === ERROR_DELETE && (
      <Error  
        message="Error Deleting"
        onClose={()=>transition(SHOW)}/>
    )}
    </article>
    </Fragment>
  )
}