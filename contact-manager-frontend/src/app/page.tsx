"use client";

import { useState } from "react";
import ContactForm from "@/components/ContactForm";
import { ContactCard } from "@/components/ContactCard";

export default function Home() {
  const [contacts, setContacts] = useState([
    { name: "Saman", phone: "0718042506", email: "saman@gmail.com" },
    { name: "Kasun", phone: "0776543210", email: "kasun@example.com" },
  ]);
  const [editingIdx, setEditingIdx] = useState(null);

  const addContact = (contact) => {
    setContacts([...contacts, contact]);
  };

  const deleteContact = (idx) => {
    setContacts(contacts.filter((_, i) => i !== idx));
  };

  const startEditContact = (idx) => {
    setEditingIdx(idx);
  };

  const updateContact = (updatedContact) => {
    setContacts(
      contacts.map((contact, idx) =>
        idx === editingIdx ? updatedContact : contact
      )
    );
    setEditingIdx(null);
  };

  return (
    <div className="max-w-xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-6">Contacts</h1>
      
      {editingIdx === null ? (
        <ContactForm onAdd={addContact} />
      ) : (
        <ContactForm
          initial={contacts[editingIdx]}
          onEdit={updateContact}
          onCancel={() => setEditingIdx(null)}
        />
      )}
      <div className="mt-8">
        {contacts.map((contact, idx) => (
          <ContactCard
            key={idx}
            contact={contact}
            onDelete={() => deleteContact(idx)}
            onEdit={() => startEditContact(idx)}
          />
        ))}
      </div>
    </div>
  );
}