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
