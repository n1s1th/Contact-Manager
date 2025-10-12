package com.example.contactmanager.controller;

import com.example.contactmanager.model.Contact;
import com.example.contactmanager.repository.ContactRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contacts")
public class ContactController {
    private final ContactRepository repository;

    public ContactController(ContactRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Contact> getAllContacts() {
        return repository.findAll();
    }

    @PostMapping
    public Contact createContact(@RequestBody Contact contact) {
        return repository.save(contact);
    }

    @PutMapping("/{id}")
    public Contact updateContact(@PathVariable Long id, @RequestBody Contact contact) {
        Contact existing = repository.findById(id).orElseThrow();
        existing.setName(contact.getName());
        existing.setPhone(contact.getPhone());
        existing.setEmail(contact.getEmail());
        return repository.save(existing);
    }

    @DeleteMapping("/{id}")
    public void deleteContact(@PathVariable Long id) {
        repository.deleteById(id);
    }
}