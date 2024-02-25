import React from 'react'
import { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';


const TaskFilter = (props) => {
  const [radioValue, setRadioValue] = useState('1');

  const radios = [
    { name: 'To Do', value: '1' },
    { name: 'Completed', value: '2' },
  ];

  const handleTaskFetch = (value) => {
    var url = null;
    setRadioValue(value);
    if (value === '1') {
      url = "http://127.0.0.1:5000/tasks?status=incomplete";
    }
    else {
      url = "http://127.0.0.1:5000/tasks?status=complete";
    }

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        props.setTasks(data)
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }

  return (
    <ButtonGroup>
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={idx % 2 ? 'outline-success' : 'outline-danger'}
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => handleTaskFetch(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
  )
}

export default TaskFilter