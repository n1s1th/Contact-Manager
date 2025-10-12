"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ContactCard({ contact, onDelete, onEdit }) {
  return (
    <Card className="mb-4 p-4 flex items-center justify-between">
      <div>
        <div className="font-bold">{contact.name}</div>
        <div>{contact.phone}</div>
        <div>{contact.email}</div>
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