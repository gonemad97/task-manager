import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import classes from "./TaskCard.module.css";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";
import Modal from "react-bootstrap/Modal";
import ConfettiExplosion from "react-confetti-explosion";

const TaskCard = (props) => {
  const [open, setOpen] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isSmallExploding, setIsSmallExploding] = React.useState(false);

  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);

  let title = props.task.title;
  let taskId = props.task.id;
  console.log(title, props.task.completed);

  function convertDate(date) {
    var d_arr = date.split("-");
    var newdate = d_arr[1] + "-" + d_arr[2] + "-" + d_arr[0];
    return newdate;
  }

  let expandButton = null;
  if (open) {
    expandButton = <MdExpandLess className={classes.expand_descr} />;
  } else {
    expandButton = <MdExpandMore className={classes.expand_descr} />;
  }

  let date = null;
  if (
    props.task.deadline !== null &&
    props.task.deadline !== "" &&
    props.task.deadline !== "None"
  ) {
    date = (
      <Card.Text className={classes.date}>
        {convertDate(props.task.deadline)}
      </Card.Text>
    );
  }

  let description = null;
  if (props.task.description !== null && props.task.description !== "") {
    description = (
      <>
        <Button
          onClick={() => setOpen(!open)}
          aria-controls="collapse-text"
          aria-expanded={open}
          variant=""
          size=""
        >
          {expandButton}
        </Button>
        <Collapse in={open}>
          <div id="collapse-text">{props.task.description}</div>
        </Collapse>
      </>
    );
  }

  const handleCompletedTasks = async (e) => {
    var completedStatus = e.currentTarget.checked;

    var url =
      "https://ns-task-manager-backend-1915b81e16e9.herokuapp.com/tasks/" +
      taskId;
    setCompleted(completedStatus);
    props.task.completed = completedStatus;
    console.log("new status", completedStatus);
    try {
      await fetch(url, {
        method: "PUT",
        body: JSON.stringify({ completed: completedStatus }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setTimeout(() => {
        removeCard(taskId);
        console.log("starting removal");
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  const handleConfetti = (value) => {
    if (value === false) {
      console.log("confetti", value);
      setIsSmallExploding(!isSmallExploding);
    }
  };

  const handleDeleteTask = async () => {
    try {
      await fetch(
        "https://ns-task-manager-backend-1915b81e16e9.herokuapp.com/tasks/" +
          taskId,
        {
          method: "DELETE",
        }
      );

      removeCard(taskId);
    } catch (err) {
      console.log(err);
    }
  };

  // to remove a card from the current view if deleted/moved from incomplete to complete or vice versa
  const removeCard = (id) => {
    props.setTasks(props.tasks.filter((task) => task.id !== id));
  };

  return (
    <Card className={classes.card}>
      <Card.Body className={classes.card_body}>
        <div className={classes.card_body_row_1}>
          <div className={classes.task_children_1}>
            <Button
              variant=""
              size=""
              className={classes.delete_task}
              onClick={handleShowDeleteModal}
            >
              <IoTrashOutline />
            </Button>
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
                className="checkbox"
                checked={props.task.completed}
                onChange={(e) => {
                  handleCompletedTasks(e);
                }}
                onClick={() => {
                  handleConfetti(props.task.completed);
                }}
              />
              {isSmallExploding && (
                <ConfettiExplosion
                  force={0.4}
                  duration={2200}
                  particleCount={30}
                  width={400}
                />
              )}
            </Form>
          </div>
        </div>

        <div className={classes.card_body_row_2}>
          <div className={classes.task_children_2}>{description}</div>
          <div className={classes.task_children_3}>{date}</div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default TaskCard;
