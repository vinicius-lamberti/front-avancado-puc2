import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Detalhes } from './Detalhes';
import type { Livro } from '../types';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockLivros: Livro[] = [
  {
    id: '1',
    titulo: 'Enigma de Teste',
    autor: 'Mestre dos Testes',
    editora: 'Tech Books',
    isbn: '9781234567890',
    ano: 2026,
    tipo: 'RPG',
    idioma: 'Inglês',
    lido: false
  }
];

const renderDetalhesComParametro = (idUrl: string) => {
  return render(
    <MemoryRouter initialEntries={[`/livro/${idUrl}`]}>
      <Routes>
        <Route path="/livro/:id" element={<Detalhes livros={mockLivros} />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('Página de Detalhes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve extrair o ID da URL via useParams e renderizar a ficha técnica do livro correspondente', () => {
    renderDetalhesComParametro('1');
    
    expect(screen.getByRole('heading', { name: 'Enigma de Teste' })).toBeInTheDocument();
    expect(screen.getByText('Tech Books')).toBeInTheDocument();
    expect(screen.getByText('9781234567890')).toBeInTheDocument();
  });

  it('deve exibir mensagem de erro amigável caso o ID buscado não conste no array do sistema', () => {
    renderDetalhesComParametro('id-inexistente');
    
    expect(screen.getByRole('heading', { name: /Livro não encontrado!/i })).toBeInTheDocument();
    expect(screen.getByText(/O identificador fornecido não consta na base de dados/i)).toBeInTheDocument();
  });

  it('deve chamar o navigate com -1 ao clicar no botão de voltar', () => {
    renderDetalhesComParametro('1');

    const botaoVoltar = screen.getByRole('button', { name: /voltar/i });
    fireEvent.click(botaoVoltar);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});