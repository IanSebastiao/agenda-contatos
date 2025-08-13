import { supabase } from './supabase';

export const getContacts = async () => {
    const { data, error } = await supabase.from('contatos').select('*');
    if (error) throw error;
    return data;
};

export const addContact = async (contact) => {
    const { data, error } = await supabase.from('contatos').insert([contact]);
    if (error) throw error
    return data[0];
};

export const deleteContact = async (id) => {
    const { error } = await supabase.from('contatos').delete().eq('id', id);
    if (error) throw error;
};

export const updateContact = async (id, data) => {
    const { error } = await supabase.from('contatos').update(data).eq('id', id);
    if (error) throw error;

};