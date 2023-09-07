import React, { Component } from "react";

class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      firstname: "",
      lastname: "",
      category: "all",
      phoneNumber: "",
      searchQuery: "",
      editingContactId: null,
    };
  }

  componentDidMount() {
    const savedContacts = JSON.parse(localStorage.getItem("contacts")) || [];
    this.setState({ contacts: savedContacts });
  }

  componentDidUpdate() {
    localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addContact = () => {
    const { firstname, lastname, category, phoneNumber } = this.state;
    if (firstname && lastname && category && phoneNumber) {
      const newContact = {
        id: Date.now(),
        firstname,
        lastname,
        category,
        phoneNumber,
        isFavorite: false,
      };
      this.setState((prevState) => ({
        contacts: [...prevState.contacts, newContact],
        firstname: "",
        lastname: "",
        phoneNumber: "",
      }));
    }
  };

  editContact = (id) => {
    const { firstname, lastname, category, phoneNumber } = this.state;
    if (firstname && lastname && category && phoneNumber) {
      const updatedContacts = this.state.contacts.map((contact) =>
        contact.id === id
          ? {
              ...contact,
              firstname,
              lastname,
              category,
              phoneNumber,
            }
          : contact
      );
      this.setState({
        contacts: updatedContacts,
        firstname: "",
        lastname: "",
        phoneNumber: "",
        editingContactId: null,
      });
    }
  };

  deleteContact = (id) => {
    const updatedContacts = this.state.contacts.filter(
      (contact) => contact.id !== id
    );
    this.setState({ contacts: updatedContacts });
  };

  handleCategoryChange = (e) => {
    this.setState({ category: e.target.value });
  };

  handleSearch = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  toggleFavorite = (id) => {
    const updatedContacts = this.state.contacts.map((contact) =>
      contact.id === id
        ? { ...contact, isFavorite: !contact.isFavorite }
        : contact
    );
    this.setState({ contacts: updatedContacts });
  };

  startEditing = (id) => {
    const contactToEdit = this.state.contacts.find(
      (contact) => contact.id === id
    );
    if (contactToEdit) {
      this.setState({
        editingContactId: id,
        firstname: contactToEdit.firstname,
        lastname: contactToEdit.lastname,
        category: contactToEdit.category,
        phoneNumber: contactToEdit.phoneNumber,
      });
    }
  };

  render() {
    const {
      firstname,
      lastname,
      category,
      phoneNumber,
      contacts,
      searchQuery,
      editingContactId,
    } = this.state;

    const filteredContacts = contacts
      .filter(
        (contact) =>
          (category === "all" ||
            (category === "favorite" && contact.isFavorite)) &&
          (contact.firstname
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
            contact.lastname.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      .sort((a, b) => a.firstname.localeCompare(b.firstname));

    return (
      <div className="container">
        <center>
          <h1>Contacts App</h1>
        </center>
        <div className="line"></div>
        <div>
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            value={firstname}
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={lastname}
            onChange={this.handleInputChange}
          />

          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={this.handleInputChange}
          />
          {editingContactId === null ? (
            <button className="addBtn" onClick={this.addContact}>
              Add Contact
            </button>
          ) : (
            <button
              className="addBtn"
              onClick={() => this.editContact(editingContactId)}
            >
              Save Changes
            </button>
          )}
        </div>
        <div className="line"></div>
        <div>
          <div className="row">
            <input
              type="text"
              placeholder="Search Contacts"
              value={searchQuery}
              onChange={this.handleSearch}
            />
            <select
              name="category"
              value={category}
              onChange={this.handleCategoryChange}
            >
              <option value="all">All</option>
              <option value="favorite">Favorite</option>
            </select>
          </div>
        </div>
        <div className="line"></div>
        <ul>
          {filteredContacts.map((contact) => (
            <li key={contact.id}>
              <div className="row">
                <h3>
                  {contact.firstname} {contact.lastname}
                </h3>
                <h3>{contact.phoneNumber}</h3>
              </div>
              <div className="line"></div>
              <div className="row">
                <button
                  className="edit"
                  onClick={() => this.startEditing(contact.id)}
                >
                  Edit
                </button>
                <button
                  className="delete"
                  onClick={() => this.deleteContact(contact.id)}
                >
                  Delete
                </button>
                <button onClick={() => this.toggleFavorite(contact.id)}>
                  {contact.isFavorite
                    ? "Remove from Favorites"
                    : "Add to Favorites"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Contacts;
