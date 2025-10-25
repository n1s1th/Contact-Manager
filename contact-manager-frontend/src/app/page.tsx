"use client";

import { useState, useEffect } from "react";
import ContactForm from "@/components/ContactForm";
import { ContactCard } from "@/components/ContactCard";
import { 
  getAllContacts, 
  createContact, 
  updateContact, 
  deleteContact,
  Contact 
} from "@/services/contactService";

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch contacts on component mount
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllContacts();
      setContacts(data);
    } catch (err) {
      setError('Failed to load contacts. Make sure backend is running on port 8080.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addContact = async (contact: Omit<Contact, 'id'>) => {
    try {
      const newContact = await createContact(contact);
      setContacts([...contacts, newContact]);
    } catch (err: any) {
      alert(err.message || 'Failed to add contact');
    }
  };

  const handleDeleteContact = async (id: number) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      try {
        await deleteContact(id);
        setContacts(contacts.filter(c => c.id !== id));
      } catch (err) {
        alert('Failed to delete contact');
      }
    }
  };

  const startEditContact = (contact: Contact) => {
    setEditingContact(contact);
  };

  const handleUpdateContact = async (updatedContact: Omit<Contact, 'id'>) => {
    if (!editingContact?.id) return;

    try {
      const updated = await updateContact(editingContact.id, updatedContact);
      setContacts(contacts.map(c => c.id === updated.id ? updated : c));
      setEditingContact(null);
    } catch (err: any) {
      alert(err.message || 'Failed to update contact');
    }
  };

  if (loading) {
    return (
      <div className="max-w-xl mx-auto mt-8">
        <div className="text-center py-12">
          <div className="text-lg">Loading contacts...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto mt-8">
        <div className="text-center py-12">
          <div className="text-red-500 mb-4">{error}</div>
          <button 
            onClick={fetchContacts}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Contact Manager</h1>
      
      {editingContact === null ? (
        <ContactForm onAdd={addContact} />
      ) : (
        <ContactForm
          initial={editingContact}
          onEdit={handleUpdateContact}
          onCancel={() => setEditingContact(null)}
        />
      )}

      <div className="mt-8">
        {contacts.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No contacts yet. Add your first contact above!
          </div>
        ) : (
          contacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onDelete={() => handleDeleteContact(contact.id!)}
              onEdit={() => startEditContact(contact)}
            />
          ))
        )}
      </div>
    </div>
  );
}