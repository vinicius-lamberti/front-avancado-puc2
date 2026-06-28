import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Cadastro } from './pages/Cadastro';
import { Detalhes } from './pages/Detalhes';
import { NotFound } from './pages/NotFound';
import { mockApi } from './services/mockApi';
import type { Livro } from './types';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const carregarDadosDoServidor = async () => {
      try {
        setLoading(true);
        const dados = await mockApi.getLivros();
        setLivros(dados);
      } catch (error) {
        console.error("Erro ao simular requisição HTTP GET:", error);
      } finally {
        setLoading(false);
      }
    };

    carregarDadosDoServidor();
  }, []);

  const handleAdicionarLivro = async (novoLivro: Omit<Livro, 'id'>) => {
    try {
      const livroSalvo = await mockApi.adicionarLivro(novoLivro);
      setLivros((prev) => [...prev, livroSalvo]);
    } catch (error) {
      console.error("Erro ao simular requisição HTTP POST:", error);
    }
  };

  const handleExcluirLivro = async (id: string) => {
    try {
      const sucesso = await mockApi.excluirLivro(id);
      if (sucesso) {
        setLivros((prev) => prev.filter((livro) => livro.id !== id));
      }
    } catch (error) {
      console.error("Erro ao simular requisição HTTP DELETE:", error);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route 
            index 
            element={<Home livros={livros} onExcluirLivro={handleExcluirLivro} loading={loading} />} 
          />
          <Route 
            path="cadastro" 
            element={<Cadastro onAdicionarLivro={handleAdicionarLivro} />} 
          />
          <Route 
            path="livro/:id" 
            element={<Detalhes livros={livros} />} 
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;