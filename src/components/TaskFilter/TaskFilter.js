import React from "react";
import { useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

const TaskFilter = (props) => {
  const [radioValue, setRadioValue] = useState("1");

  const radios = [
    { name: "To Do", value: "1" },
    { name: "Completed", value: "2" },
  ];

  const handleTaskFetch = (value) => {
    var url = null;
    setRadioValue(value);
    if (value === "1") {
      url =
        "https://ns-task-manager-backend-1915b81e16e9.herokuapp.com/tasks?status=incomplete";
    } else {
      url =
        "https://ns-task-manager-backend-1915b81e16e9.herokuapp.com/tasks?status=complete";
    }

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        props.setTasks(data);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  };

  return (
    <>
      {/* separate styling is required to update css of react-bootstrap buttons */}
      <style type="text/css">
        {`
          .btn-size {
            padding: 1rem 1.5rem;
            font-size: 1.1rem;
          }

          @media screen and (min-width: 320px) and (max-width: 480px) {
            .btn-size {
              padding: 0.5rem 0.8rem;
              font-size: 0.7rem;
            }
          }
          
          @media screen and (min-width: 481px) and (max-width: 767px) {
            .btn-size {
              padding: 1rem 1.3rem;
              font-size: 0.8rem;
            }
        `}
      </style>

      <ButtonGroup>
        <ToggleButton
          key={0}
          id={`radio-1`}
          type="radio"
          variant="outline-success"
          size="size"
          name="radio"
          value={radios[0].value}
          checked={radioValue === radios[0].value}
          onChange={(e) => handleTaskFetch(e.currentTarget.value)}
        >
          {radios[0].name}
        </ToggleButton>

        <ToggleButton
          key={1}
          id={`radio-2`}
          type="radio"
          variant="outline-danger"
          size="size"
          name="radio"
          value={radios[1].value}
          checked={radioValue === radios[1].value}
          onChange={(e) => handleTaskFetch(e.currentTarget.value)}
        >
          {radios[1].name}
        </ToggleButton>
      </ButtonGroup>
    </>
  );
};

export default TaskFilter;
