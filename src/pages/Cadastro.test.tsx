import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Cadastro } from './Cadastro';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.spyOn(globalThis, 'alert').mockImplementation(() => {});

describe('Página de Cadastro', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve exibir mensagens de erro nativas se tentar submeter o formulário vazio', async () => {
    render(
      <MemoryRouter>
        <Cadastro onAdicionarLivro={vi.fn()} />
      </MemoryRouter>
    );

    const botaoCadastrar = screen.getByRole('button', { name: /Cadastrar livro/i });
    fireEvent.click(botaoCadastrar);

    const formulario = screen.getByTestId('cadastro-form');
    expect(formulario).toHaveClass('was-validated');
  });

  it('deve formatar as strings e redirecionar para a Home após um cadastro válido', async () => {
    const handleAdicionarLivro = vi.fn();
    
    render(
      <MemoryRouter>
        <Cadastro onAdicionarLivro={handleAdicionarLivro} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Título:/i), { target: { value: 'o hobbit' } });
    fireEvent.change(screen.getByLabelText(/Autor:/i), { target: { value: 'tolkien' } });
    fireEvent.change(screen.getByLabelText(/Editora:/i), { target: { value: 'harper' } });
    fireEvent.change(screen.getByLabelText(/ISBN/i), { target: { value: '9788595084742' } });
    fireEvent.change(screen.getByLabelText(/Ano de publicação:/i), { target: { value: '2019' } });
    fireEvent.change(screen.getByLabelText(/Tipo:/i), { target: { value: 'rpg' } });
    fireEvent.change(screen.getByLabelText(/Idioma:/i), { target: { value: 'portugues' } });

    const botaoCadastrar = screen.getByRole('button', { name: /Cadastrar livro/i });
    fireEvent.click(botaoCadastrar);

    expect(handleAdicionarLivro).toHaveBeenCalledWith({
      titulo: 'O hobbit',
      autor: 'Tolkien',
      editora: 'Harper',
      isbn: '9788595084742',
      ano: 2019,
      tipo: 'RPG',
      idioma: 'Português',
      lido: false,
    });

    expect(globalThis.alert).toHaveBeenCalledWith('Livro cadastrado com sucesso!');
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('deve interromper o envio e impedir a navegação se a validação do ISBN falhar', async () => {
    const handleAdicionarLivro = vi.fn();

    render(
      <MemoryRouter>
        <Cadastro onAdicionarLivro={handleAdicionarLivro} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Título:/i), { target: { value: 'Livro Teste' } });
    fireEvent.change(screen.getByLabelText(/Autor:/i), { target: { value: 'Autor Teste' } });
    fireEvent.change(screen.getByLabelText(/Editora:/i), { target: { value: 'Editora Teste' } });
    fireEvent.change(screen.getByLabelText(/ISBN/i), { target: { value: '123-ISBN-INVALIDO' } });
    fireEvent.change(screen.getByLabelText(/Ano de publicação:/i), { target: { value: '2025' } });
    fireEvent.change(screen.getByLabelText(/Tipo:/i), { target: { value: 'livro' } });
    fireEvent.change(screen.getByLabelText(/Idioma:/i), { target: { value: 'portugues' } });

    const botaoCadastrar = screen.getByRole('button', { name: /Cadastrar livro/i });
    fireEvent.click(botaoCadastrar);

    expect(handleAdicionarLivro).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
    
    const formulario = screen.getByTestId('cadastro-form');
    expect(formulario).toHaveClass('was-validated');
  });

  it('deve validar todas as ramificações de erro da função de validação do ISBN no evento Blur', async () => {
    render(
      <MemoryRouter>
        <Cadastro onAdicionarLivro={vi.fn()} />
      </MemoryRouter>
    );

    const inputIsbn = screen.getByLabelText(/ISBN/i);

    fireEvent.change(inputIsbn, { target: { value: '123' } });
    fireEvent.blur(inputIsbn);
    expect(screen.getByText('ISBN deve ter 10 ou 13 dígitos')).toBeInTheDocument();

    fireEvent.change(inputIsbn, { target: { value: '123456789A' } });
    fireEvent.blur(inputIsbn);
    expect(screen.getByText('ISBN-10 inválido')).toBeInTheDocument();

    fireEvent.change(inputIsbn, { target: { value: '123456789012A' } });
    fireEvent.blur(inputIsbn);
    expect(screen.getByText('ISBN-13 inválido')).toBeInTheDocument();

    fireEvent.change(inputIsbn, { target: { value: '' } });
    fireEvent.blur(inputIsbn);
    expect(screen.getByText('O ISBN é obrigatório')).toBeInTheDocument();
  });

  it('deve formatar corretamente as variações de Tipo (Livro, Quadrinho) e de Idioma (Inglês, Espanhol)', async () => {
    const handleAdicionarLivro = vi.fn();
    
    const { rerender } = render(
      <MemoryRouter>
        <Cadastro onAdicionarLivro={handleAdicionarLivro} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Título:/i), { target: { value: 'teste' } });
    fireEvent.change(screen.getByLabelText(/Autor:/i), { target: { value: 'teste' } });
    fireEvent.change(screen.getByLabelText(/Editora:/i), { target: { value: 'teste' } });
    fireEvent.change(screen.getByLabelText(/ISBN/i), { target: { value: '0123456789' } });
    fireEvent.change(screen.getByLabelText(/Ano de publicação:/i), { target: { value: '2020' } });
    fireEvent.change(screen.getByLabelText(/Tipo:/i), { target: { value: 'quadrinho' } });
    fireEvent.change(screen.getByLabelText(/Idioma:/i), { target: { value: 'ingles' } });

    fireEvent.click(screen.getByRole('button', { name: /Cadastrar livro/i }));

    expect(handleAdicionarLivro).toHaveBeenLastCalledWith(expect.objectContaining({
      tipo: 'Quadrinho',
      idioma: 'Inglês'
    }));

    rerender(
      <MemoryRouter>
        <Cadastro onAdicionarLivro={handleAdicionarLivro} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Título:/i), { target: { value: 'teste' } });
    fireEvent.change(screen.getByLabelText(/Autor:/i), { target: { value: 'teste' } });
    fireEvent.change(screen.getByLabelText(/Editora:/i), { target: { value: 'teste' } });
    fireEvent.change(screen.getByLabelText(/ISBN/i), { target: { value: '1234567890123' } });
    fireEvent.change(screen.getByLabelText(/Ano de publicação:/i), { target: { value: '2020' } });
    fireEvent.change(screen.getByLabelText(/Tipo:/i), { target: { value: 'livro' } });
    fireEvent.change(screen.getByLabelText(/Idioma:/i), { target: { value: 'espanhol' } });

    fireEvent.click(screen.getByRole('button', { name: /Cadastrar livro/i }));

    expect(handleAdicionarLivro).toHaveBeenLastCalledWith(expect.objectContaining({
      tipo: 'Livro',
      idioma: 'Espanhol'
    }));
  });
});