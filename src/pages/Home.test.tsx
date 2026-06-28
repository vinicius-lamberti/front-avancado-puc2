import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { Home } from './Home';
import type { Livro } from '../types';

const mockLivros: Livro[] = [
  {
    id: '123',
    titulo: 'Livro Teste',
    autor: 'Autor Falso',
    editora: 'Editora X',
    isbn: '1234567890',
    ano: 2020,
    tipo: 'Livro',
    idioma: 'Português',
    lido: true
  }
];

describe('Página Home', () => {
  it('deve exibir a mensagem de carregamento quando loading for verdadeiro', () => {
    render(
      <MemoryRouter>
        <Home livros={[]} onExcluirLivro={vi.fn()} loading={true} />
      </MemoryRouter>
    );
    expect(screen.getByText(/Buscando informações no JSON/i)).toBeInTheDocument();
  });

  it('deve listar os livros enviados via propriedade na tabela', () => {
    render(
      <MemoryRouter>
        <Home livros={mockLivros} onExcluirLivro={vi.fn()} loading={false} />
      </MemoryRouter>
    );
    expect(screen.getByText('Livro Teste')).toBeInTheDocument();
    expect(screen.getByText('Autor Falso')).toBeInTheDocument();
  });

  it('deve disparar a função de exclusão ao clicar no botão de excluir', () => {
    const handleExcluir = vi.fn();
    render(
      <MemoryRouter>
        <Home livros={mockLivros} onExcluirLivro={handleExcluir} loading={false} />
      </MemoryRouter>
    );
    
    const botaoExcluir = screen.getByRole('button', { name: /Excluir/i });
    fireEvent.click(botaoExcluir);
    
    expect(handleExcluir).toHaveBeenCalledWith('123');
  });
});