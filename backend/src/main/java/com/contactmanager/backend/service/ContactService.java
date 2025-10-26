package com.contactmanager.backend.service;

import com.contactmanager.backend.entity.Contact;
import com.contactmanager.backend.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContactService {

    @Autowired
    private ContactRepository contactRepository;

    // Create or Update contact
    public Contact saveContact(Contact contact) {
        return contactRepository.save(contact);
    }

    // Get all contacts
    public List<Contact> getAllContacts() {
        return contactRepository.findAll();
    }

    // Get contact by ID
    public Optional<Contact> getContactById(Long id) {
        return contactRepository.findById(id);
    }

    // Get contact by email
    public Optional<Contact> getContactByEmail(String email) {
        return contactRepository.findByEmail(email);
    }

    // Delete contact by ID
    public void deleteContact(Long id) {
        contactRepository.deleteById(id);
    }

    // Update contact
    public Contact updateContact(Long id, Contact contactDetails) {
        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact not found with id: " + id));

        contact.setName(contactDetails.getName());
        contact.setPhone(contactDetails.getPhone());
        contact.setEmail(contactDetails.getEmail());

        return contactRepository.save(contact);
    }

    // Check if email already exists
    public boolean emailExists(String email) {
        return contactRepository.findByEmail(email).isPresent();
    }
}