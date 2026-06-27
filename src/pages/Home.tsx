import React from 'react';
import { Table, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { InfoCard } from '../components/InfoCard';
import type { Livro } from '../types';

interface HomeProps {
  livros: Livro[];
  onExcluirLivro: (id: string) => void;
  loading: boolean;
}

export const Home: React.FC<HomeProps> = ({ livros, onExcluirLivro, loading }) => {
  const renderCorpoTabela = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan={5} className="text-center py-4">
            <Spinner animation="border" size="sm" className="me-2" />
            Buscando informações no JSON do servidor...
          </td>
        </tr>
      );
    }

    if (livros.length === 0) {
      return (
        <tr>
          <td colSpan={5} className="text-center text-muted py-4">
            Nenhum livro cadastrado até o momento.
          </td>
        </tr>
      );
    }

    return livros.map((livro) => (
      <tr key={livro.id} className="align-middle">
        <td><strong>{livro.titulo}</strong></td>
        <td>{livro.autor}</td>
        <td className="text-capitalize">{livro.tipo}</td>
        <td>{livro.lido ? '✅ Sim' : '❌ Não'}</td>
        <td className="text-center">
          <Link to={`/livro/${livro.id}`} className="btn btn-info btn-sm me-2 text-white">
            Visualizar
          </Link>
          <Button variant="danger" size="sm" onClick={() => onExcluirLivro(livro.id)}>
            Excluir
          </Button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <PageHeader title="Inventário de Livros" subtitle="Gerencie seus títulos cadastrados abaixo" />
      
      <InfoCard title="Livros Cadastrados">
        <div className="table-responsive">
          <Table striped bordered hover className="mb-0">
            <thead>
              <tr>
                <th>Título</th>
                <th>Autor</th>
                <th>Tipo</th>
                <th>Lido</th>
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {renderCorpoTabela()}
            </tbody>
          </Table>
        </div>
      </InfoCard>
    </>
  );
};