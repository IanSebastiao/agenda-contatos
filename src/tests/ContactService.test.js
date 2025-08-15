import { getContacts, addContact, updateContact, deleteContact } from "../services/contactService";
import { supabase } from "../services/supabase";

//Mock do supabase
jest.mock('../services/supabase', () => ({
    supabase: {
        from: jest.fn()
    }
}));

describe('lista contatos', () => {
    test('deve listar os contatos', async () => {
        const fakeContacts = [
            { nome: 'Maria', email: 'maria@email.com', telefone: '11999999999' },
            { nome: 'João', email: 'joao@email.com', telefone: '22999999999' },
        ];

        //Mock para simular chamada do supabase
        const mockSelect = jest.fn().mockResolvedValue({
            data: fakeContacts,
            error: null
        });

        supabase.from.mockReturnValue({ select: mockSelect });

        const result = await getContacts();

        expect(supabase.from).toHaveBeenCalledWith('contatos');
        expect(mockSelect).toHaveBeenCalledWith('*');
        expect(result).toEqual(fakeContacts);
    });

    test('deve lançar erro se o Supabase retornar erro', async () => {
        const mockSelect = jest.fn().mockResolvedValue({
            data: null,
            error: new Error('Erro ao listar')
        });

        supabase.from.mockReturnValue({ select: mockSelect });

        await expect(getContacts()).rejects.toThrow('Erro ao listar');
    });
});

describe('adiciona contato', () => {
    test('deve inserir o contato e retornar o contato salvo', async () => {
        const fakeContact = {
            nome: 'Ian',
            email: 'iansebastiao1234@gmail.com',
            telefone: '64999287353',
        };
        // Configura o retorno simulado do Supabase
        const mockInsert = jest.fn().mockResolvedValue({
            data: [fakeContact],
            error: null,
        });

        supabase.from.mockReturnValue({ insert: mockInsert });

        const result = await addContact(fakeContact);

        expect(supabase.from).toHaveBeenCalledWith('contatos');
        expect(mockInsert).toHaveBeenCalledWith([fakeContact]);
        expect(result).toEqual(fakeContact);
    });

    test('deve lancar erro quando Supabase retornar erro', async () => {
        const fakeContact = {
            nome: 'Ian',
            email: 'iansebastiao1234@gmail.com',
            telefone: '64999287353',
        };

        const mockInsert = jest.fn().mockResolvedValue({
            data: null,
            error: new Error('Erro ao inserir'),
        });

        supabase.from.mockReturnValue({ insert: mockInsert });

        await expect(addContact(fakeContact)).rejects.toThrow('Erro ao inserir');
    });

});

describe('updateContact', () => {
    test('deve atualizar o contato correctamente', async () => {
        const id = 1;
        const contact = {
            nome: 'Maria Silva',
            email: 'maria@email.com',
            telefone: '(11) 99999-9999'
        };

        const mockEq = jest.fn().mockResolvedValue({ error: null });
        const mockUpdate = jest.fn(() => ({ eq: mockEq }));
        supabase.from.mockReturnValue({ update: mockUpdate });

        await updateContact(id, contact);

        expect(supabase.from).toHaveBeenCalledWith('contatos');
        expect(mockUpdate).toHaveBeenCalledWith({
            ...contact,
            telefone: '11999999999'
        });
        expect(mockEq).toHaveBeenCalledWith('id', id);
    });

    test('deve lancar erro se Supabase retornar erro', async () => {
        const id = 1;
        const contact = {
            nome: 'Maria Silva',
            email: 'maria@email.com',
            telefone: '(11) 99999-9999'
        };

        const fakeError = new Error('Erro ao atualizar');
        const mockEq = jest.fn().mockResolvedValue({ error: fakeError });
        const mockUpdate = jest.fn(() => ({ eq: mockEq }));
        supabase.from.mockReturnValue({ update: mockUpdate });

        await expect(updateContact(id, contact)).rejects.toThrow('Erro ao atualizar');
    });
});

describe('deleteContact', () => {
    test('deve deletar o contato corretamente', async () => {
        const id = 1;

        const mockEq = jest.fn().mockResolvedValue({ error: null });
        const mockDelete = jest.fn(() => ({ eq: mockEq }));
        supabase.from.mockReturnValue({ delete: mockDelete });

        await deleteContact(id);

        expect(supabase.from).toHaveBeenCalledWith('contatos');
        expect(mockDelete).toHaveBeenCalled();
        expect(mockEq).toHaveBeenCalledWith('id', id);
    });

    test('deve lancar erro se o Supabase retornar erro', async () => {
        const fakeError = new Error('Erro ao deletar');

        const mockEq = jest.fn().mockResolvedValue({ error: fakeError });
        const mockDelete = jest.fn(() => ({ eq: mockEq }));
        supabase.from.mockReturnValue({ delete: mockDelete });

        await expect(deleteContact(1)).rejects.toThrow('Erro ao deletar');
    });
});