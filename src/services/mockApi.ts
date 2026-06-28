import type { Livro } from '../types';
import dadosIniciais from '../data/livros.json';

let bancoDados: Livro[] = [...dadosIniciais] as Livro[];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  getLivros: async (): Promise<Livro[]> => {
    await delay(50);
    return [...bancoDados];
  },

  adicionarLivro: async (novoLivro: Omit<Livro, 'id'>): Promise<Livro> => {
    await delay(50);
    const livroSalvo: Livro = {
      ...novoLivro,
      id: crypto.randomUUID()
    };
    bancoDados.push(livroSalvo);
    return livroSalvo;
  },

  excluirLivro: async (id: string): Promise<boolean> => {
    await delay(50);
    const tamanhoInicial = bancoDados.length;
    bancoDados = bancoDados.filter(livro => livro.id !== id);
    return bancoDados.length < tamanhoInicial;
  }
};