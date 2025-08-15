import { fireEvent, render, screen} from '@testing-library/react'
import ContactForm from '../components/ContactForm';


test('renderiza inputs de nome, email, e telefone', () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/telefone/i)).toBeInTheDocument();
});

test('chama onSubmit com dados corretos', () => {
    const handleSubmit = jest.fn(); //simula envio do formulario (MOCKAR)
    render(<ContactForm onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: 'Ian'} });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'iansebastiao1234@gmail.com'} });
    fireEvent.change(screen.getByLabelText(/telefone/i), { target: { value: '64999287353'} });

    fireEvent.submit(screen.getByRole('form')); //envia o formulario preenchido


    expect(handleSubmit).toHaveBeenCalledWith({
        nome: 'Ian',
        email: 'iansebastiao1234@gmail.com',
        telefone: '64999287353'
    }); //Verifica se tem os dados
});

test('atualiza contato existente', () => {
    const handleSubmit = jest.fn();
    const contatoExistente = {
        nome: 'Ian',
        email: 'iansebastiao1234@gmail.com',
        telefone: '4999287353',
    };

    render(<ContactForm contact={contatoExistente} onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: 'Ian Sebastião' } });
    fireEvent.submit(screen.getByRole('form'));

    expect(handleSubmit).toHaveBeenCalledWith({
        nome: 'Ian Sebastião',
        email: 'iansebastiao1234@gmail.com',
        telefone: '4999287353',
    });
});

test('valida que os campos obrigatórios foram preenchidos', () => {
    const handleSubmit = jest.fn();
    render(<ContactForm onSubmit={handleSubmit} />);

    fireEvent.submit(screen.getByRole('form'));

    expect(screen.getByText(/nome é obrigatório/i)).toBeInTheDocument();
    expect(screen.getByText(/email é obrigatório/i)).toBeInTheDocument();
    expect(screen.getByText(/telefone é obrigatório/i)).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
});