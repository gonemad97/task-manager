import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const AddNewTaskModal = (props) => {
  const [show, setShow] = useState(false);
  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState(undefined);
  // const [date, setDate] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //setting minimum date (today) before which date picker should show grayed out dates
  const minDate = () => {
    const today = new Date().toISOString().split("T")[0];
    return today;
  };

  const validateForm = () => {
    if (form.title.length === 0) {
      alert("Title cannot be empty.");
      return;
    }
    if (form.title.length > 200) {
      alert("Too many characters, Title cannot be over 200 characters.");
      return;
    }
    if (form.description && form.description.length > 400) {
      alert("Too many characters, Description cannot be over 400 characters.");
      return;
    }

    //only if there are no more alerts, the form will modal will close after submission
    handleClose();
  };

  const handleFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    let body = {
      title: form.title,
    };
    if (form.description) {
      body.description = form.description;
    }
    if (form.date) {
      body.deadline = form.date;
    }

    try {
      let res = await fetch(
        "https://ns-task-manager-backend-1915b81e16e9.herokuapp.com/tasks",
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let taskRefreshResult = await fetch(
        "https://ns-task-manager-backend-1915b81e16e9.herokuapp.com/tasks?status=incomplete"
      );
      let tasksJson = await taskRefreshResult.json();
      props.setTasks(tasksJson);

      if (res.status === 200 || res.status === 201) {
        setForm({
          title: "",
          description: "",
          date: "",
        });
      } else {
        console.log(e.message);
      }
    } catch (err) {
      console.log(err);
    }
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
                padding: 1rem 1rem;
                font-size: 1rem;
              }
            }

          `}
      </style>
      <Button
        variant=""
        size="size"
        style={{ backgroundColor: "#4dc7fc" }}
        onClick={handleShow}
      >
        Add Task +
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="addTaskForm.ControlTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Buy groceries"
                value={form.title}
                name="title"
                required
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="addTaskForm.ControlDescription"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Don't forget tomatoes!"
                value={form.description}
                name="description"
                onChange={handleFormChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="addTaskForm.ControlDate">
              <Form.Label>Due By</Form.Label>
              <Form.Control
                type="date"
                value={form.date}
                name="date"
                min={minDate()}
                onChange={handleFormChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="success"
            type="submit"
            onClick={(e) => {
              handleSubmit(e);
              validateForm();
            }}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddNewTaskModal;
