"use client";
import { useState } from "react";
import ContactForm from "@/components/ContactForm";
import { ContactCard } from "@/components/ContactCard";

export default function Home() {
  const [contacts, setContacts] = useState([
    { name: "Alice", phone: "1234567890", email: "alice@example.com" },
    { name: "Bob", phone: "9876543210", email: "bob@example.com" },
  ]);

  const addContact = (contact) => {
    setContacts([...contacts, contact]);
  };

  return (
    <div className="max-w-xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-6">Contacts</h1>
      <ContactForm onAdd={addContact} />
      <div className="mt-8">
        {contacts.map((contact, idx) => (
          <ContactCard key={idx} contact={contact} />
        ))}
      </div>
    </div>
  );
}