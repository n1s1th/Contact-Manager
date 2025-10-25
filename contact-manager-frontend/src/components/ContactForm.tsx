"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Contact } from "@/services/contactService";

interface ContactFormProps {
  onAdd?: (contact: Omit<Contact, 'id'>) => void;
  initial?: Contact;
  onEdit?: (contact: Omit<Contact, 'id'>) => void;
  onCancel?: () => void;
}

export default function ContactForm({ onAdd, initial, onEdit, onCancel }: ContactFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (initial) {
      setName(initial.name);
      setPhone(initial.phone);
      setEmail(initial.email);
    } else {
      setName("");
      setPhone("");
      setEmail("");
    }
  }, [initial]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const contact = { name, phone, email };
    
    if (onEdit) {
      onEdit(contact);
    } else if (onAdd) {
      onAdd(contact);
      setName("");
      setPhone("");
      setEmail("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <Input
        placeholder="Phone"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        required
      />
      <Input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        type="email"
      />
      <div className="flex gap-2">
        <Button type="submit">{onEdit ? "Update Contact" : "Add Contact"}</Button>
        {onEdit && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}