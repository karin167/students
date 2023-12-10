import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import useStudents from "./useStudents";

function AddStudentModal({ onAddComplete }) {
  const [show, setShow] = useState(false);

  // Collect form values
  const [values, setValues] = useState({ firstName: "", lastName: "" });
  const [errors, setErrors] = useState({ firstName: "", lastName: "" });

  const { addStudent, resetStudents, insertStudentLoading } = useStudents();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setErrors({ ...errors, [name]: "" });

    setValues({ ...values, [name]: value });
  };

  const handleSubmit = () => {
    console.log("Values to submit", values);

    if (!values.firstName) {
      return setErrors({ ...errors, firstName: "First name is required" });
    }

    if (!values.lastName) {
      return setErrors({
        ...errors,
        lastName: "Last name is required",
      });
    }

    addStudent(values).then((response) => {
      console.log(response);
      resetStudents();

      console.log("Add stufent complete. Refetch updated students");
      onAddComplete();
      handleClose();
    });
  };

  return (
    <div>
      <div className="pt-3 d-flex  align-items-end justify-content-end">
        <Button variant="primary" onClick={handleShow}>
          Add a new user
        </Button>{" "}
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Add Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Type your First Name"
                name="firstName"
                onChange={onChange}
                isValid={values.firstName}
                isInvalid={errors.firstName}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Type your Last Name"
                name="lastName"
                onChange={onChange}
                isValid={values.lastName}
                isInvalid={errors.lastName}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={insertStudentLoading}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddStudentModal;
