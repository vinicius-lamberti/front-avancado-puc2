import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import { PageHeader } from '../components/PageHeader';
import { InfoCard } from '../components/InfoCard';
import { AttributeBadge } from '../components/AttributeBadge';
import type { Livro } from '../types';

interface DetalhesProps {
  livros: Livro[];
}

export const Detalhes: React.FC<DetalhesProps> = ({ livros }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const livro = livros.find((l) => l.id === id);

  // Tratativa caso o ID inserido manualmente na barra de endereços não exista
  if (!livro) {
    return (
      <div className="text-center py-5">
        <h2>Livro não encontrado!</h2>
        <p className="text-muted">O identificador fornecido não consta na base de dados.</p>
        <Link to="/" className="btn btn-primary">
          Voltar ao Início
        </Link>
      </div>
    );
  }

  return (
    <>
      <PageHeader title={livro.titulo} subtitle={`Por ${livro.autor}`} />
      
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
          <Button variant="outline-secondary" onClick={() => navigate(-1)}>
            ⬅ Voltar à Página Anterior
          </Button>
        </div>
      </InfoCard>
    </>
  );
};