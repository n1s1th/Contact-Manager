package com.contactmanager.backend.controller;

import com.contactmanager.backend.entity.Contact;
import com.contactmanager.backend.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/contacts")
@CrossOrigin(origins = "http://localhost:3000")
public class ContactController {

    @Autowired
    private ContactService contactService;

    // New Contact Adding
    @PostMapping
    public ResponseEntity<?> createContact(@RequestBody Contact contact) {
        try {
            // Check if email already exists
            if (contactService.emailExists(contact.getEmail())) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body("Email already exists!");
            }

            Contact savedContact = contactService.saveContact(contact);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(savedContact);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error creating contact: " + e.getMessage());
        }
    }

    // READ - Get all contacts
    @GetMapping
    public ResponseEntity<List<Contact>> getAllContacts() {
        try {
            List<Contact> contacts = contactService.getAllContacts();
            return ResponseEntity.ok(contacts);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .build();
        }
    }

    // READ - Get contact by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getContactById(@PathVariable Long id) {
        try {
            Optional<Contact> contact = contactService.getContactById(id);

            if (contact.isPresent()) {
                return ResponseEntity.ok(contact.get());
            } else {
                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body("Contact not found with id: " + id);
            }
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching contact: " + e.getMessage());
        }
    }

    // UPDATE - Update existing contact
    @PutMapping("/{id}")
    public ResponseEntity<?> updateContact(@PathVariable Long id, @RequestBody Contact contactDetails) {
        try {
            Contact updatedContact = contactService.updateContact(id, contactDetails);
            return ResponseEntity.ok(updatedContact);
        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating contact: " + e.getMessage());
        }
    }

    // DELETE - Delete contact
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteContact(@PathVariable Long id) {
        try {
            Optional<Contact> contact = contactService.getContactById(id);

            if (contact.isPresent()) {
                contactService.deleteContact(id);
                return ResponseEntity.ok("Contact deleted successfully");
            } else {
                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body("Contact not found with id: " + id);
            }
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error deleting contact: " + e.getMessage());
        }
    }

    // BONUS - Get contact by email
    @GetMapping("/email/{email}")
    public ResponseEntity<?> getContactByEmail(@PathVariable String email) {
        try {
            Optional<Contact> contact = contactService.getContactByEmail(email);

            if (contact.isPresent()) {
                return ResponseEntity.ok(contact.get());
            } else {
                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body("Contact not found with email: " + email);
            }
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error fetching contact: " + e.getMessage());
        }
    }
}