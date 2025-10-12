import { ContactCard } from "@/components/ContactCard"

const mockContacts = [
  { name: "Alice", phone: "1234567890", email: "alice@example.com" },
  { name: "Bob", phone: "9876543210", email: "bob@example.com" },
]

export default function Home() {
  return (
    <div className="max-w-xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-6">Contacts</h1>
      {mockContacts.map((contact, idx) => (
        <ContactCard key={idx} contact={contact} />
      ))}
    </div>
  )
}