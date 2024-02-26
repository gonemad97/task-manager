import React from "react";
import classes from "./Header.module.css";
import nsLogo from "../../assets/ns-logo.png";

const Header = () => {
  return (
    <nav>
      <div className={classes.flex__container}>
        <img className={classes.logo} src={nsLogo} alt="logo"></img>
        <h4 className={classes.title}>
          <b>Task Manager</b>
        </h4>
        <div></div>
      </div>
      <hr></hr>
    </nav>
  );
};

export default Header;
