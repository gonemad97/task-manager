import TaskCard from '../TaskCards/TaskCard'
import classes from './TaskCardView.module.css'
import FadeIn from 'react-fade-in';


const TaskCardView = (props) => {
  let allTasks = props.tasks;

  return (
    <div className={classes.center__container}>
      {/* <div className='container__view'> */}
      <FadeIn delay={80} className={classes.container__view}>
            {allTasks.map((task,index) => {
            return <TaskCard key={task.id} task={task} tasks={props.tasks} setTasks={props.setTasks}/>
            })}
          </FadeIn>
      {/* </div> */}
    </div>
    
  )
}

export default TaskCardView