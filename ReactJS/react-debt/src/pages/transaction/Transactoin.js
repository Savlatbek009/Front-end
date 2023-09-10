import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import Layout from "../../layout/Layout";

function TransactionManager() {
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    name: "",
    date: "",
    amount: "",
    descr: "",
  });
  const [editIndex, setEditIndex] = useState(-1);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    const storedTransactions =
      JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(storedTransactions);
  }, []);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const validateInput = () => {
    if (
      !modalData.name ||
      !modalData.date ||
      !modalData.amount ||
      !modalData.descr
    ) {
      setValidationError("All fields are required.");
      return false;
    }

    if (isNaN(parseFloat(modalData.amount))) {
      setValidationError("Amount must be a valid number.");
      return false;
    }

    setValidationError("");
    return true;
  };

  const handleAddTransaction = () => {
    if (validateInput()) {
      if (editIndex !== -1) {
        // Edit existing transaction
        const updatedTransactions = [...transactions];
        updatedTransactions[editIndex] = modalData;
        setTransactions(updatedTransactions);
        setEditIndex(-1);
      } else {
        // Add new transaction
        setTransactions([...transactions, modalData]);
      }
      setModalData({ name: "", date: "", amount: "", descr: "" });
      setShowModal(false);
    }
  };

  const handleDeleteTransaction = (index) => {
    const updatedTransactions = [...transactions];
    updatedTransactions.splice(index, 1);
    setTransactions(updatedTransactions);
  };

  const handleEditTransaction = (index) => {
    setEditIndex(index);
    setModalData(transactions[index]);
    setShowModal(true);
  };

  return (
    <Layout>
      <div>
        <div className="d-flex justify-content-between align-items-center my-2 mt-4">
          <h1>Transaction ({transactions.length})</h1>
          <Button
            variant="primary"
            className="fs-5 py-2 px-5"
            onClick={() => setShowModal(true)}
          >
            Add Transaction
          </Button>
        </div>

        <div>
          {transactions.length === 0 ? (
            <Alert variant="info">Transactions not found, add new</Alert>
          ) : (
            <ul>
              {transactions.map((transaction, index) => (
                <div className="transaction-card" key={index}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="card-width">
                      <h4 className="text-primary">For What:</h4>
                      <h3>{transaction.name}</h3>
                    </div>
                    <div className="card-width">
                      <h4 className="text-primary">Date:</h4>
                      <h3>{transaction.date}</h3>
                    </div>
                    <div className="card-width">
                      <h4 className="text-primary">Amount:</h4>
                      <h3>${transaction.amount}</h3>
                    </div>
                    <div className="card-width">
                      <h4 className="text-primary">Description:</h4>
                      <h5>{transaction.descr}</h5>
                    </div>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <Button
                      variant="outline-danger"
                      className="py-2 px-4 fs-5"
                      onClick={() => handleDeleteTransaction(index)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="outline-info"
                      className="py-2 px-4 fs-5"
                      onClick={() => handleEditTransaction(index)}
                    >
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </ul>
          )}
        </div>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>
              {editIndex !== -1 ? "Edit Transaction" : "Add Transaction"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {validationError && (
              <Alert variant="danger">{validationError}</Alert>
            )}
            <Form>
              <Form.Group controlId="name">
                <Form.Label>for What?</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter for What?"
                  value={modalData.name}
                  onChange={(e) =>
                    setModalData({ ...modalData, name: e.target.value })
                  }
                />
              </Form.Group>
              <div className="my-1"></div>
              <Form.Group controlId="date">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  value={modalData.date}
                  onChange={(e) =>
                    setModalData({ ...modalData, date: e.target.value })
                  }
                />
              </Form.Group>
              <div className="my-1"></div>
              <Form.Group controlId="amount">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter amount"
                  value={modalData.amount}
                  onChange={(e) =>
                    setModalData({ ...modalData, amount: e.target.value })
                  }
                />
              </Form.Group>
              <div className="my-1"></div>
              <Form.Group controlId="descr">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  type="text"
                  placeholder="Enter description"
                  value={modalData.descr}
                  onChange={(e) =>
                    setModalData({ ...modalData, descr: e.target.value })
                  }
                />
              </Form.Group>
              <div className="my-1"></div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              className="px-5 py-2 fs-5 w-100"
              onClick={handleAddTransaction}
            >
              {editIndex !== -1 ? "Save Changes" : "Add"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Layout>
  );
}

export default TransactionManager;
