import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import classes from "./TaskCard.module.css";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import ConfettiExplosion from "react-confetti-explosion";
import DeleteTaskModal from "../DeleteTaskModal/DeleteTaskModal";

const TaskCard = (props) => {
  const [open, setOpen] = useState(false);
  const [isSmallExploding, setIsSmallExploding] = React.useState(false);

  let title = props.task.title;
  let taskId = props.task.id;

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
    props.task.completed = completedStatus;

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
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  const handleConfetti = (value) => {
    if (value === false) {
      setIsSmallExploding(!isSmallExploding);
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
            <DeleteTaskModal
              task={props.task}
              tasks={props.tasks}
              setTasks={props.setTasks}
            />
          </div>

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
