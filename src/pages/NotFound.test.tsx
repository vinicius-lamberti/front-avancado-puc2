import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { NotFound } from './NotFound';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Página NotFound (Erro 404)', () => {
  it('deve renderizar os textos e códigos de erro de rota inexistente', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument();
    expect(screen.getByText('Página Não Encontrada')).toBeInTheDocument();
    expect(screen.getByText(/Desculpe, a página que você está tentando acessar não existe/i)).toBeInTheDocument();
  });

  it('deve redirecionar o usuário para a página inicial ao clicar no botão', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    const botaoVoltar = screen.getByRole('button', { name: /Voltar para a Página Inicial/i });
    fireEvent.click(botaoVoltar);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});