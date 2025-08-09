import { useEffect, useState } from "react"
import { getContacts, deleteContact } from "../services/contactService";

const ContactList = () => {
    const [contacts, setContacts] = useState([]);
    const handleDelete = async (id) => {
        await deleteContact(id);
        setContacts((prev) => prev.filter((c) => c.id !== id));
    };

    useEffect(() => {
        getContacts().then(setContacts);
    }, []);

    if (contacts.length === 0) {
        return <p>Nenhum contato cadastrado</p>;
    }



    return (
        <ul>
            {contacts.map((c) => (
                <li key={c.id}>
                    <strong>{c.nome}</strong> - {c.email} - {c.telefone}
                    <button onClick={() => handleDelete(c.id)}>Remover</button>
                </li>
            ))}
        </ul>
    );
}
    export default ContactList