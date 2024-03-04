import TaskCard from "../TaskCards/TaskCard";
import classes from "./TaskCardView.module.css";
import FadeIn from "react-fade-in";
import noTasksAvailableLogo from "../../assets/no_tasks.png";

const TaskCardView = (props) => {
  let allTasks = props.tasks;
  console.log(allTasks.length);

  let taskCardDisplay = null;
  if (allTasks.length > 0) {
    taskCardDisplay = (
      <>
        <div className={classes.center__container}>
          <FadeIn delay={150} className={classes.container__view}>
            {allTasks.map((task) => {
              return (
                <TaskCard
                  key={task.id}
                  task={task}
                  tasks={props.tasks}
                  setTasks={props.setTasks}
                />
              );
            })}
          </FadeIn>
        </div>
      </>
    );
  } else if (allTasks.length === 0) {
    taskCardDisplay = (
      <>
        <FadeIn>
          <div>
            <div className={classes.center_logo}>
              <div className={classes.no_tasks}>No tasks here yet!</div>
              <img
                className={classes.add_tasks_logo}
                src={noTasksAvailableLogo}
                alt="logo"
              ></img>
            </div>
          </div>
        </FadeIn>
      </>
    );
  }

  return <>{taskCardDisplay}</>;
};

export default TaskCardView;
