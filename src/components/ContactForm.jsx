import React, { useState } from "react";

const ContactForm = ({ contact = {}, onSubmit }) => {
    const [formData, setFormData] = useState({
        nome: contact.nome || '',
        email: contact.email || '',
        telefone: contact.telefone || '',
    });

    const [error, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {}
        if (!formData.nome) newErrors.nome = 'Nome é obrigatório';
        if (!formData.email) newErrors.email = 'Email é obrigatório';
        if (!formData.telefone) newErrors.telefone = 'Telefone é obrigatório';

        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            onSubmit(formData);
        }
    };


    return (
        <form role="form" onSubmit={handleSubmit}>
            <label>
                Nome
                <input type="text" name="nome" value={formData.nome} onChange={handleChange} />
                {error.nome && <span>{error.nome}</span>}
            </label>
            <label>
                Email
                <input type="text" name="email" value={formData.email} onChange={handleChange} />
                {error.email && <span>{error.email}</span>}
            </label>
            <label>
                Telefone
                <input type="tel" name="telefone" value={formData.telefone} onChange={handleChange} />
                {error.telefone && <span>{error.telefone}</span>}
            </label>
            <button type="default">Salvar</button>
        </form>
    )
}

export default ContactForm;
