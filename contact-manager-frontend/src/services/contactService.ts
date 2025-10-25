// src/services/contactService.ts

const API_BASE_URL = 'http://localhost:8080/api/contacts';

// Define Contact interface
export interface Contact {
  id?: number;
  name: string;
  phone: string;
  email: string;
}

// CREATE - Add new contact
export const createContact = async (contact: Omit<Contact, 'id'>): Promise<Contact> => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to create contact');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating contact:', error);
    throw error;
  }
};

// READ - Get all contacts
export const getAllContacts = async (): Promise<Contact[]> => {
  try {
    const response = await fetch(API_BASE_URL);

    if (!response.ok) {
      throw new Error('Failed to fetch contacts');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
};

// UPDATE - Update existing contact
export const updateContact = async (id: number, contact: Omit<Contact, 'id'>): Promise<Contact> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to update contact');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating contact:', error);
    throw error;
  }
};

// DELETE - Delete contact
export const deleteContact = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to delete contact');
    }
  } catch (error) {
    console.error('Error deleting contact:', error);
    throw error;
  }
};