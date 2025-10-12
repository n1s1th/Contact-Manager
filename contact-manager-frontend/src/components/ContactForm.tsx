"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ContactForm({ onAdd }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ name, phone, email });
    setName("");
    setPhone("");
    setEmail("");
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
      <Button type="submit">Add Contact</Button>
    </form>
  );
}