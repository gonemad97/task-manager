import TaskCard from '../TaskCards/TaskCard'
import classes from './TaskCardView.module.css'
import FadeIn from 'react-fade-in';
import noTasksAvailableLogo from '../../assets/no_tasks.png'



const TaskCardView = (props) => {
  let allTasks = props.tasks;
  console.log(allTasks.length)

  let taskCardDisplay = null;
  if(allTasks.length > 0) {
    taskCardDisplay = 
    <>
    <div className={classes.center__container}>
      {/* <div className='container__view'> */}
      <FadeIn delay={80} className={classes.container__view}>
            {allTasks.map((task,index) => {
            return <TaskCard key={task.id} task={task} tasks={props.tasks} setTasks={props.setTasks}/>
            })}
          </FadeIn>
      {/* </div> */}
    </div>
    </>
  }
  else if(allTasks.length === 0){
    taskCardDisplay = <>
    <FadeIn>
      <div>
        {/* <div className={classes.no_tasks}>
          No tasks here yet!
        </div> */}
        <div className={classes.center_logo}>
          <div className={classes.no_tasks}>
            No tasks here yet!
          </div>
          <img className={classes.add_tasks_logo} src={noTasksAvailableLogo} alt="logo"></img>
        </div>
    </div>
    </FadeIn>
    </>
  }

  return (
    <>
        {taskCardDisplay}
    </>
    // <div className={classes.center__container}>
    //   {/* <div className='container__view'> */}
    //   <FadeIn delay={80} className={classes.container__view}>
    //         {allTasks.map((task,index) => {
    //         return <TaskCard key={task.id} task={task} tasks={props.tasks} setTasks={props.setTasks}/>
    //         })}
    //       </FadeIn>
    //   {/* </div> */}
    // </div>
    
  )
}

export default TaskCardView