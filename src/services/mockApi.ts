import type { Livro } from '../types';
import dadosIniciais from '../data/livros.json';

let bancoDados: Livro[] = [...dadosIniciais] as Livro[];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  // GET /livros
  getLivros: async (): Promise<Livro[]> => {
    await delay(500);
    return [...bancoDados];
  },

  // POST /livros
  adicionarLivro: async (novoLivro: Omit<Livro, 'id'>): Promise<Livro> => {
    await delay(600);
    const livroSalvo: Livro = {
      ...novoLivro,
      id: crypto.randomUUID()
    };
    bancoDados.push(livroSalvo);
    return livroSalvo;
  },

  // DELETE /livros/:id
  excluirLivro: async (id: string): Promise<boolean> => {
    await delay(400);
    const tamanhoInicial = bancoDados.length;
    bancoDados = bancoDados.filter(livro => livro.id !== id);
    return bancoDados.length < tamanhoInicial;
  }
};