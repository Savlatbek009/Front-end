import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import Layout from "../../layout/Layout";
import "react-toastify/dist/ReactToastify.css";

const Debts = () => {
  const [debts, setDebts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    const storedDebts = JSON.parse(localStorage.getItem("debts")) || [];
    setDebts(storedDebts);
  }, []);

  useEffect(() => {
    localStorage.setItem("debts", JSON.stringify(debts));
  }, [debts]);

  const openModal = (index) => {
    setShowModal(true);
    setEditingIndex(index);
    if (index !== null) {
      const debt = debts[index];
      setName(debt.name);
      setAmount(debt.amount);
      setDescription(debt.description);
    } else {
      setName("");
      setAmount("");
      setDescription("");
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingIndex(null);
    setName("");
    setAmount("");
    setDescription("");
  };

  const validateInputs = () => {
    if (!name.trim() || !amount.trim() || !description.trim()) {
      setValidationError("All fields are required");
      return false;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setValidationError("Amount must be a positive number");
      return false;
    }

    setValidationError("");
    return true;
  };

  const addDebt = () => {
    if (validateInputs()) {
      const newDebt = { name, amount, description };
      setDebts([...debts, newDebt]);
      closeModal();
    } else {
    }
  };

  const editDebt = () => {
    if (validateInputs()) {
      if (editingIndex !== null) {
        const updatedDebts = [...debts];
        updatedDebts[editingIndex] = { name, amount, description };
        setDebts(updatedDebts);
        closeModal();
      }
    }
  };

  const deleteDebt = (index) => {
    const updatedDebts = debts.filter((_, i) => i !== index);
    setDebts(updatedDebts);
  };

  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="mt-4">Debts ({debts.length})</h1>
        <Button
          variant="outline-success"
          className="fs-5 py-2 px-5"
          onClick={() => openModal(null)}
        >
          Add Debt
        </Button>
      </div>

      <div className="debt-cards">
        {debts.length === 0 ? (
          <Alert variant="danger">Debts not found, Add new!</Alert>
        ) : (
          ""
        )}
        {debts.map((debt, index) => (
          <div key={index} className="debt-card">
            <div className="card-width">
              <h4 className="text-success">Name:</h4>
              <h3>{debt.name}</h3>
            </div>
            <div className="card-width">
              <h4 className="text-success">Amount:</h4>
              <h3>${debt.amount}</h3>
            </div>
            <div className="debt-description card-width">
              <h4 className="text-success">Descr:</h4>
              <h5>{debt.description}</h5>
            </div>
            <div className="debt-actions card-width">
              <Button
                variant="outline-danger"
                onClick={() => deleteDebt(index)}
                className=" fs-5 py-2 px-4"
              >
                Delete
              </Button>
              <Button
                className="fs-5 py-2 px-4"
                variant="outline-warning"
                onClick={() => openModal(index)}
              >
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingIndex !== null ? "Edit Debt" : "Add Debt"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {validationError && (
              <Alert variant="danger">{validationError}</Alert>
            )}
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <div className="my-2"></div>
            <Form.Group>
              <Form.Label>Amount ($)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Form.Group>
            <div className="my-2"></div>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            className="px-5 py-2 fs-5 w-100"
            onClick={editingIndex !== null ? editDebt : addDebt}
          >
            {editingIndex !== null ? "Save" : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};

export default Debts;
