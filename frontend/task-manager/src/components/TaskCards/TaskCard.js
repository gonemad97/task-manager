import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import classes from './TaskCard.module.css'
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";
import Modal from 'react-bootstrap/Modal';


const TaskCard = (props) => {
  const [open, setOpen] = useState(false);
  const [completed, setCompleted] = useState(false);
  // const [fade, setFade] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);

  let title = props.task.title;
  let taskId = props.task.id;
  console.log(title,props.task.completed)

  // console.log(taskId);

  function convertDate(date){
    var d_arr = date.split("-");
    var newdate = d_arr[1] + '-' + d_arr[0] + '-' + d_arr[2];
    return newdate;
    }

  let expandButton = null;
  if(open) {
    expandButton = <MdExpandLess className={classes.expand_descr}/>
  }
  else {
    expandButton = <MdExpandMore className={classes.expand_descr}/>

  }

  let date = null;
  if(props.task.deadline !== null && props.task.deadline !== "" && props.task.deadline !== "None") {
    date = <Card.Text className={classes.date}>{convertDate(props.task.deadline)}</Card.Text>
  }

  let description = null;
  if(props.task.description !== null && props.task.description !== "") {
    description = <>
      <Button onClick={() => setOpen(!open)}
    aria-controls="collapse-text"
    aria-expanded={open} variant='' size=''>
      {expandButton}
    </Button>
    <Collapse in={open}>
      <div id="collapse-text">
        {props.task.description}
      </div>
    </Collapse>
    </>
  }

  const handleCompletedTasks = async(e) => {
    var completedStatus = e.currentTarget.checked;
    var url = "http://127.0.0.1:5000/tasks/" + taskId;
    setCompleted(completedStatus);
    props.task.completed = completedStatus;
    console.log("new status",completedStatus)
    try {
      await fetch(url, {
        method: "PUT",
        body: JSON.stringify({completed:completedStatus}),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // removeCard(taskId);

      setTimeout(() => {
          removeCard(taskId);
        console.log("starting removal")
    }, 1000);
    } catch (err) {
      console.log(err);
    }
  }

  const handleDeleteTask = async() => {
    try {
      await fetch("http://127.0.0.1:5000/tasks/" + taskId, {
        method: "DELETE"
      });

      console.log("deleted")
      removeCard(taskId);

    } catch (err) {
      console.log(err);
    }

  }

  // to remove a card from the current view if deleted/moved from incomplete to complete or vice versa
  const removeCard = (id) => {
    props.setTasks(props.tasks.filter((task)=> task.id !== id))
  }

  return (
    // <Fade in={fade}>
    //   <div id="delete-fade-text">
      <Card className={classes.card}>
        <Card.Body className={classes.card_body}>

          <div className={classes.card_body_row_1}>
            <div className={classes.task_children_1}>
              <Button variant="" size="" className={classes.delete_task} onClick={handleShowDeleteModal}><IoTrashOutline/></Button>
            </div>

              <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
              <Modal.Header closeButton>
                <Modal.Title>Delete Task</Modal.Title>
              </Modal.Header>
              <Modal.Body>This will delete "{title}"</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDeleteModal}>
                  Keep It!
                </Button>
                {/* <Button variant="danger" aria-controls="delete-fade-text" 
                aria-expanded={fade} onClick={()=>{handleDeleteTask(); setFade(false)}}> */}
                <Button variant="danger" onClick={handleDeleteTask}>
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>


            <div className={classes.task_children_2}> 
              <Card.Title>{title}</Card.Title>
            </div>
            <div className={classes.task_children_3}>
              <Form>
                <Form.Check 
                  type="checkbox"
                  id="custom-checkbox"
                  className='checkbox'
                  checked = {props.task.completed}
                  onChange={(e) => {handleCompletedTasks(e)}}
                />
              </Form>
            </div>
          </div>

          <div className={classes.card_body_row_2}>
            <div className={classes.task_children_2}>
                {description}
            </div>
            <div className={classes.task_children_3}>
              {date}
            </div>
          </div>
        </Card.Body>
      </Card>
    //   </div>
    // </Fade>
  )
}

export default TaskCard