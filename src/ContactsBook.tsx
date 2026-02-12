import { useState } from "react";

interface Contact {
  id: number;
  name: string;
  phone: string;
}

export const ContactsBook = () => {
  const [contactsState, setContactsState] = useState<Contact[]>([]);
  const [nameState, setNameState] = useState<string>("");
  const [phoneState, setPhoneState] = useState<string>("");

  const addContactHandler = () => {
    if (!nameState.trim() || !phoneState.trim()) return;

    const newContact: Contact = {
      id: Date.now(),
      name: nameState,
      phone: phoneState,
    };

    setContactsState((prev) => [...prev, newContact]);
    setNameState("");
    setPhoneState("");
  };

  const deleteContactHandler = (id: number) => {
    setContactsState((prev) => prev.filter((contact) => contact.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      
      <header className="w-full max-w-md mb-6">
        <h1 className="text-2xl font-bold text-center">Контактная книга</h1>
      </header>

      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow flex flex-col gap-4">
        
        <input
          onChange={(e) => setNameState(e.target.value)}
          value={nameState}
          className="w-full p-3 border rounded"
          placeholder="Имя"
        />

        <input
          onChange={(e) => setPhoneState(e.target.value)}
          value={phoneState}
          className="w-full p-3 border rounded"
          placeholder="Телефон"
        />

        <button
          onClick={addContactHandler}
          className="bg-purple-600 hover:bg-purple-700 transition w-full h-11 rounded-xl text-white"
        >
          Добавить
        </button>

        
        <div className="flex flex-col gap-3 mt-4">
          {contactsState.map((contact) => (
            <ContactsBookItem
              key={contact.id}
              contactID={contact.id}
              contactName={contact.name}
              contactPhone={contact.phone}
              onDelete={deleteContactHandler}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface ContactsBookItemProps {
  contactName: string;
  contactPhone: string;
  contactID: number;
  onDelete: (id: number) => void;
}

export const ContactsBookItem = ({
  contactName,
  contactPhone,
  contactID,
  onDelete,
}: ContactsBookItemProps) => {
  return (
    <div className="w-full rounded-xl shadow p-3 flex justify-between items-center bg-gray-50">
      <div>
        <h3 className="font-semibold">{contactName}</h3>
        <p className="text-sm text-gray-600">{contactPhone}</p>
      </div>

      <button
        onClick={() => onDelete(contactID)}
        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
      >
        Удалить
      </button>
    </div>
  );
};
