import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('mockApi', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('deve criar ids em sequência ao adicionar novos livros', async () => {
    const { mockApi } = await import('./mockApi');

    const primeiroLivro = await mockApi.adicionarLivro({
      titulo: 'Primeiro',
      autor: 'Autor',
      editora: 'Editora',
      isbn: '1',
      ano: 2024,
      tipo: 'Livro',
      idioma: 'Português',
      lido: false,
    });

    const segundoLivro = await mockApi.adicionarLivro({
      titulo: 'Segundo',
      autor: 'Autor',
      editora: 'Editora',
      isbn: '2',
      ano: 2024,
      tipo: 'Livro',
      idioma: 'Português',
      lido: false,
    });

    expect(primeiroLivro.id).toBe('3');
    expect(segundoLivro.id).toBe('4');
  });

  it('deve remover um livro existente e retornar true', async () => {
    const { mockApi } = await import('./mockApi');

    const livrosAntes = await mockApi.getLivros();
    const livroParaExcluir = livrosAntes[0];

    const removido = await mockApi.excluirLivro(livroParaExcluir.id);
    const livrosDepois = await mockApi.getLivros();

    expect(removido).toBe(true);
    expect(livrosDepois.some(livro => livro.id === livroParaExcluir.id)).toBe(false);
  });

  it('deve retornar false e não alterar a lista quando o livro não existe', async () => {
    const { mockApi } = await import('./mockApi');

    const livrosAntes = await mockApi.getLivros();
    const removido = await mockApi.excluirLivro('id-inexistente');
    const livrosDepois = await mockApi.getLivros();

    expect(removido).toBe(false);
    expect(livrosDepois).toHaveLength(livrosAntes.length);
  });
});
