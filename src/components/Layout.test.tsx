import { describe, it, expect, vi, beforeEach } from 'vitest';

const scrollToSpy = vi.hoisted(() => vi.fn());

Object.defineProperty(globalThis, 'scrollTo', {
  value: scrollToSpy,
  writable: false,
  configurable: true
});

import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Layout } from './Layout';

const renderWithRouter = (initialEntries = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Layout />
    </MemoryRouter>
  );
};

describe('Componente Layout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar a estrutura base e links de navegação', () => {
    renderWithRouter();
    
    expect(screen.getByText('📚 Inventário')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Início/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Cadastrar Livro/i })).toBeInTheDocument();
  });

  

  it('deve acionar o scroll da tela para o topo de forma suave ao clicar em voltar ao topo', () => {
    renderWithRouter();

    const botaoVoltarAoTopo = screen.getByRole('button', { name: /Voltar ao topo/i });
    fireEvent.click(botaoVoltarAoTopo);

    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});