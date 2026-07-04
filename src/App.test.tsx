import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { MockInstance } from 'vitest';
import App from './App';
import { mockApi } from './services/mockApi';
import type { Livro } from './types';

let consoleSpy: MockInstance;

const preencherFormulario = (titulo: string) => {
  fireEvent.change(screen.getByLabelText(/Título:/i), { target: { value: titulo } });
  fireEvent.change(screen.getByLabelText(/Autor:/i), { target: { value: 'J. R. R. Tolkien' } });
  fireEvent.change(screen.getByLabelText(/Editora:/i), { target: { value: 'Martins Fontes' } });
  fireEvent.change(screen.getByLabelText(/ISBN/i), { target: { value: '9788533611658' } });
  fireEvent.change(screen.getByLabelText(/Ano de publicação:/i), { target: { value: '2024' } });
  fireEvent.change(screen.getByLabelText(/Tipo:/i), { target: { value: 'livro' } });
  fireEvent.change(screen.getByLabelText(/Idioma:/i), { target: { value: 'portugues' } });
  fireEvent.click(screen.getByRole('button', { name: /Cadastrar livro/i }));
};

describe('Fluxo Integrado da Aplicação de Inventário', () => {

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(globalThis, 'alert').mockImplementation(() => {});
    consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    globalThis.history.pushState({}, 'Home', '/');
  });
  
  it('deve navegar até a página de cadastro, preencher o formulário e enviar com sucesso', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.queryByText(/Buscando informações no JSON/i)).not.toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('link', { name: /Cadastrar Livro/i }));
    expect(screen.getByRole('heading', { name: /Novo Registro/i })).toBeInTheDocument();

    preencherFormulario('O Silmarillion');

    await waitFor(() => {
      expect(globalThis.alert).toHaveBeenCalledWith('Livro cadastrado com sucesso!');
    });

    await waitFor(() => {
      expect(screen.getByText('O Silmarillion')).toBeInTheDocument();
    });
  });

  it('deve exibir a página 404 caso a URL não exista', () => {
    globalThis.history.pushState({}, 'Página Inexistente', '/rota-que-nao-existe');
    render(<App />);
    expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument();
  });

  it('deve remover o livro da lista ao executar o fluxo de exclusão com sucesso', async () => {
    const livroMock: Livro = { id: '123', titulo: 'Livro para Deletar', autor: 'A', editora: 'E', isbn: '1', tipo: 'Livro', idioma: 'Português', ano: 2020, lido: false };
    
    vi.spyOn(mockApi, 'getLivros').mockResolvedValue([livroMock]);
    const excluirSpy = vi.spyOn(mockApi, 'excluirLivro').mockResolvedValue(true);

    render(<App />);

    fireEvent.click(await screen.findByRole('button', { name: /excluir/i }));

    expect(excluirSpy).toHaveBeenCalledWith('123');
    await waitFor(() => {
      expect(screen.queryByText('Livro para Deletar')).not.toBeInTheDocument();
    });
  });

  it('deve capturar e logar o erro caso carregarDadosDoServidor falhe', async () => {
    const erroSimulado = new Error('Erro de conexão');
    vi.spyOn(mockApi, 'getLivros').mockRejectedValue(erroSimulado);

    render(<App />);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Erro ao simular requisição HTTP GET:', erroSimulado);
    });
  });

  it('deve capturar e logar o erro caso handleAdicionarLivro falhe', async () => {
    vi.spyOn(mockApi, 'getLivros').mockResolvedValue([]);
    const erroSimulado = new Error('Falha interna ao salvar');
    vi.spyOn(mockApi, 'adicionarLivro').mockRejectedValue(erroSimulado);

    render(<App />);

    fireEvent.click(screen.getByRole('link', { name: /Cadastrar Livro/i }));
    preencherFormulario('Livro Errado');

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Erro ao simular requisição HTTP POST:', erroSimulado);
    });
  });

  it('deve capturar e logar o erro caso handleExcluirLivro falhe', async () => {
    const livroMock: Livro = { id: '999', titulo: 'Livro Intocável', autor: 'A', editora: 'E', isbn: '0', tipo: 'Livro', idioma: 'Português', ano: 2020, lido: false };
    vi.spyOn(mockApi, 'getLivros').mockResolvedValue([livroMock]);
    
    const erroSimulado = new Error('Não foi possível deletar');
    vi.spyOn(mockApi, 'excluirLivro').mockRejectedValue(erroSimulado);

    render(<App />);

    fireEvent.click(await screen.findByRole('button', { name: /excluir/i }));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Erro ao simular requisição HTTP DELETE:', erroSimulado);
    });
    expect(screen.getByText('Livro Intocável')).toBeInTheDocument();
  });

  it('deve manter o livro na lista se a exclusão retornar falso', async () => {
    const livroMock: Livro = { id: '123', titulo: 'Livro para Deletar', autor: 'Autor X', editora: 'Ed Y', isbn: '111', tipo: 'Livro', idioma: 'Português', ano: 2020, lido: false };
    vi.spyOn(mockApi, 'getLivros').mockResolvedValue([livroMock]);
    const excluirSpy = vi.spyOn(mockApi, 'excluirLivro').mockResolvedValue(false);

    render(<App />);

    fireEvent.click(await screen.findByRole('button', { name: /excluir/i }));

    expect(excluirSpy).toHaveBeenCalledWith('123');
    expect(screen.getByText('Livro para Deletar')).toBeInTheDocument();
  });
});