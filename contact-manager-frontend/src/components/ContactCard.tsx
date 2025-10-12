import { Card } from "@/components/ui/card"

export function ContactCard({ contact }) {
  return (
    <Card className="mb-4 p-4">
      <div className="font-bold">{contact.name}</div>
      <div>{contact.phone}</div>
      <div>{contact.email}</div>
      {/* Add Edit/Delete buttons here */}
    </Card>
  )
}