"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Contact } from "@/services/contactService";

interface ContactCardProps {
  contact: Contact;
  onDelete: () => void;
  onEdit: () => void;
}

export function ContactCard({ contact, onDelete, onEdit }: ContactCardProps) {
  return (
    <Card className="mb-4 p-4 flex items-center justify-between">
      <div>
        <div className="font-bold text-lg">{contact.name}</div>
        <div className="text-gray-600">📞 {contact.phone}</div>
        <div className="text-gray-600">📧 {contact.email}</div>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={onEdit}>
          Edit
        </Button>
        <Button variant="destructive" onClick={onDelete}>
          Delete
        </Button>
      </div>
    </Card>
  );
}