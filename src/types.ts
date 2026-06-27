export interface Livro {
  id: string;
  titulo: string;
  autor: string;
  editora: string;
  isbn: string;
  ano: number;
  tipo: 'Livro' | 'Quadrinho' | 'RPG' | '';
  idioma: 'Português' | 'Inglês' | 'Espanhol' | '';
  lido: boolean;
}