import type { Livro } from '../types';
import dadosIniciais from '../data/livros.json';

let bancoDados: Livro[] = [...dadosIniciais] as Livro[];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const gerarProximoId = (): string => {
  const idsNumericos = bancoDados
    .map(livro => Number.parseInt(livro.id, 10))
    .filter(id => Number.isInteger(id));

  const maiorId = idsNumericos.length > 0 ? Math.max(...idsNumericos) : 0;
  return String(maiorId + 1);
};

export const mockApi = {
  getLivros: async (): Promise<Livro[]> => {
    await delay(50);
    return [...bancoDados];
  },

  adicionarLivro: async (novoLivro: Omit<Livro, 'id'>): Promise<Livro> => {
    await delay(50);
    const livroSalvo: Livro = {
      ...novoLivro,
      id: gerarProximoId()
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