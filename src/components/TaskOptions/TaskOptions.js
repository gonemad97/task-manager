import React from "react";
import TaskFilter from "../TaskFilter/TaskFilter";
import AddNewTaskModal from "../AddNewTaskModal";
import classes from "./TaskOptions.module.css";

const TaskOptions = (props) => {
  return (
    <div className={classes.task_options__container}>
      <TaskFilter setTasks={props.setTasks} />
      <AddNewTaskModal tasks={props.tasks} setTasks={props.setTasks} />
    </div>
  );
};

export default TaskOptions;
