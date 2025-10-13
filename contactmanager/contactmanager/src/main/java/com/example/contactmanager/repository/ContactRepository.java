package com.example.contactmanager.repository;

import com.example.contactmanager.model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<Contact, Long> {
    
}