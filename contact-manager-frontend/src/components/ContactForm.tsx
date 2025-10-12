"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ContactForm({ onAdd, initial, onEdit, onCancel }) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onEdit) {
      onEdit({ name, phone, email });
    } else {
      onAdd({ name, phone, email });
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
        <Button type="submit">{onEdit ? "Update" : "Add Contact"}</Button>
        {onEdit && <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>}
      </div>
    </form>
  );
}