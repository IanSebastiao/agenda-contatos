import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteContact, getContacts } from '../../../services/contactService';
import { formatPhone } from '../../../utils/formatPhone';

const ContactList = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleDelete = async (id) => {
        try {
            await deleteContact(id);
            setContacts((prev) => prev.filter((c) => c.id != id));
        } catch (err) {
            setError('Error as excluir contato');
            console.error(err);
        }
    };

    useEffect(() => {
        const loadContacts = async () => {
            try {
                const data = await getContacts();
                setContacts(data);
            } catch (err) {
                setError('Error as carregar contatos');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadContacts();
    }, [1]);


    if (loading) {
        return (
            <div className="text-center my-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Carregando...</span>
                </div>
                <p className="mt-2">Carregando contatos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger my-4" role="alert">
                {error}
            </div>
        );
    }

    if (contacts.length == 0) {
        return (
            <div className="alert alert-info my-4" role="alert">
                Nenhum contato cadastrado.
                <Link to="/novo" className="btn btn-sm btn-info ms-3">
                    Adicionar Contato
                </Link>
            </div>
        );
    }


    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Lista de Contatos</h2>
                <div>
                    <span className="badge rounded-pill bg-secondary me-2">
                        {contacts.length} {contacts.length === 1 ? 'contato' : 'contatos'}
                    </span>
                    <Link to="/novo" className="btn btn-primary btn-sm">
                        <i className="bi bi-plus-lg"></i> Novo
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ContactList 