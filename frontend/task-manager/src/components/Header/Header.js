import React from 'react'
import classes from './Header.module.css'
import ns from '../../assets/ns-logo.png'


const Header = () => {
  return (
    <nav>
        <div className={classes.flex__container}>
          <img className={classes.logo} src={ns} alt="logo"></img>
          <a className={classes.logout} href="/"><b>Log Out</b></a>
        </div>

        <h5 className={classes.title}><b>Task Manager</b></h5>

        <hr></hr>      
    </nav>
  )
}

export default Header