import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import classes from "./DeleteTaskModal.module.css";
import { IoTrashOutline } from "react-icons/io5";
import Modal from "react-bootstrap/Modal";

const DeleteTaskModal = (props) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);

  const removeCard = (id) => {
    props.setTasks(props.tasks.filter((task) => task.id !== id));
  };

  const handleDeleteTask = async () => {
    try {
      await fetch(
        "https://ns-task-manager-backend-1915b81e16e9.herokuapp.com/tasks/" +
          props.task.id,
        {
          method: "DELETE",
        }
      );

      removeCard(props.task.id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Button
        variant=""
        size=""
        className={classes.delete_task}
        onClick={handleShowDeleteModal}
      >
        <IoTrashOutline />
      </Button>

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>This will delete "{props.task.title}"</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Keep It!
          </Button>
          <Button variant="danger" onClick={handleDeleteTask}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteTaskModal;
