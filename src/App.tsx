import React from 'react';
import { Table, Row, Col, Button } from 'react-bootstrap';
import { PageHeader } from './components/PageHeader';
import { InfoCard } from './components/InfoCard';
import type { Livro } from './types';
import { AttributeBadge } from './components/AttributeBadge';


interface HomeProps {
  livros: Livro[];
  onExcluirLivro: (id: string) => void;
}

export const App: React.FC<HomeProps> = () => {
  const livro = {
    titulo: 'O Senhor dos Anéis',
    autor: 'J.R.R. Tolkien',
    editora: 'HarperCollins',
    isbn: '978-0261102385',
    ano: 1954,
    tipo: 'Fantasia',
    idioma: 'Inglês',
    lido: true,
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
                <tr>
                  <td colSpan={5} className="text-center text-muted py-4">
                    Nenhum livro cadastrado até o momento.
                  </td>
                </tr>
            </tbody>
          </Table>
        </div>
      </InfoCard>

      <InfoCard title="Ficha Técnica Completa">
        <Row className="gy-4">
          <Col xs={12} sm={6} md={3}>
            <AttributeBadge label="Editora" value={livro.editora} bg="info" />
          </Col>
          <Col xs={12} sm={6} md={3}>
            <AttributeBadge label="ISBN" value={livro.isbn} bg="dark" />
          </Col>
          <Col xs={12} sm={6} md={3}>
            <AttributeBadge label="Ano" value={livro.ano} bg="warning" />
          </Col>
          <Col xs={12} sm={6} md={3}>
            <AttributeBadge label="Tipo" value={livro.tipo} bg="primary" />
          </Col>
          <Col xs={12} sm={6} md={3}>
            <AttributeBadge label="Idioma" value={livro.idioma} bg="secondary" />
          </Col>
          <Col xs={12} sm={6} md={3}>
            <AttributeBadge label="Status de Leitura" value={livro.lido ? 'Já Lido' : 'Não Lido'} bg={livro.lido ? 'success' : 'danger'} />
          </Col>
        </Row>
        
        <div className="mt-5 pt-3 border-top">
          <Button variant="outline-secondary" onClick={() => window.history.back()}>
            ⬅ Voltar à Página Anterior
          </Button>
        </div>
      </InfoCard>
    </>
  );
};

export default App