import React, { useEffect, useState } from "react";
import "./App.css"
import AddEditContact from "./components/AddEditContact";
import { useContacts } from "./context/ContactContext";
import { v4 as uuidv4 } from "uuid";


function App() {
  const contactslist = useContacts();
  // console.log(contactslist);

  const [contacts, setContacts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editContact, setEditContact] = useState(null); // برای ویرایش
  const [showCheckboxes, setShowCheckboxes] = useState(false); // مدیریت نمایش checkboxها
  const [selectedContacts, setSelectedContacts] = useState([]); // نگهداری IDهای انتخاب شده

  useEffect(() => {
    setContacts(contactslist);
  }, [contactslist]);
  const openModal = (contact = null) => {
    setEditContact(contact);
    setModalOpen(true);
    //console.log(contact)
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditContact(null);
  };
  const addContact = (contact) => {
    setContacts((contacts) => [...contacts, { ...contact, id: uuidv4() }]);
    setModalOpen(false);
  };

  const updateContact = (updatedContact) => {
    setContacts(
      contacts.map((contact) =>
        contact.email === updatedContact.email ? updatedContact : contact
      )
      // setContacts((prevContacts) =>
      //   prevContacts.map((contact) =>
      //     contact.id === updatedContact.id ? updatedContact : contact
      //   )
    );
    closeModal();
  };
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteContact = (id) => {
    const newContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(newContacts);
  };
  const deleteSelectedContacts = () => {
    const newContacts = contacts.filter(
      (contact) => !selectedContacts.includes(contact.id)
    );
    setContacts(newContacts);
    setSelectedContacts([]); // Reset selected contacts
    setShowCheckboxes(false); // Hide checkboxes after deletion
  };

  const toggleCheckbox = (id) => {
    if (selectedContacts.includes(id)) {
      setSelectedContacts(
        selectedContacts.filter((contactId) => contactId !== id)
      );
    } else {
      setSelectedContacts([...selectedContacts, id]);
    }
  };

  return (
    <div className="container">
      <div className="form">
        <label htmlFor="#name">جستجو در مخاطبین : </label>
        <input
          id="name"
          type="text"
          placeholder="جستجوی مخاطب"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={() => {
            setModalOpen(true);
            setEditContact(null);
          }}
        >
          افزودن مخاطب
        </button>
        <button onClick={() => setShowCheckboxes(!showCheckboxes)}>
          {showCheckboxes ? "پنهان کردن حذف گروهی" : "حذف گروهی"}
        </button>
        {showCheckboxes && (
          <button onClick={deleteSelectedContacts}>
            حذف مخاطبین انتخاب شده
          </button>
        )}
      </div>

      <div className="containerList">
        <h3>لیست مخاطبین</h3>

        <ul className="contacts">
          {filteredContacts.map((contact) => (
            <li className="item" key={contact.id}>
              {showCheckboxes && (
                <input
                  type="checkbox"
                  checked={selectedContacts.includes(contact.id)}
                  onChange={() => toggleCheckbox(contact.id)}
                />
              )}
              {contact.name} {contact.surname} - {contact.email} -
              {contact.phone}
              <button
                onClick={() => {
                  openModal(contact);
                }}
              >
                ویرایش
              </button>
              <button onClick={() => deleteContact(contact.id)}>حذف</button>
            </li>
          ))}
        </ul>
      </div>

      {modalOpen && (
        <AddEditContact
          closeModal={closeModal}
          addContact={addContact}
          updateContact={updateContact}
          editContact={editContact}
        />
      )}
    </div>
  );
};



export default App;
