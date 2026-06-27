export interface Livro {
  id: string;
  titulo: string;
  autor: string;
  editora: string;
  isbn: string;
  ano: number;
  tipo: 'livro' | 'quadrinho' | 'rpg' | '';
  idioma: 'portugues' | 'ingles' | 'espanhol' | '';
  lido: boolean;
}