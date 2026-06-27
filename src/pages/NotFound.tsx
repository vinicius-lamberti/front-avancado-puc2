import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column align-items-center justify-content-center text-center py-5 my-5">
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <h2 className="mb-3">Página Não Encontrada</h2>
      <p className="text-muted mb-4 max-width-500">
        Desculpe, a página que você está tentando acessar não existe ou foi movida para outro endereço.
      </p>
      <Button variant="primary" onClick={() => navigate('/')}>
        Voltar para a Página Inicial
      </Button>
    </div>
  );
};