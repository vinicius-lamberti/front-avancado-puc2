import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { InfoCard } from '../components/InfoCard';
import type { Livro } from '../types';

interface CadastroProps {
  onAdicionarLivro: (livro: Omit<Livro, 'id'>) => void;
}

export const Cadastro: React.FC<CadastroProps> = ({ onAdicionarLivro }) => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState<Omit<Livro, 'id'>>({
    titulo: '', autor: '', editora: '', isbn: '', ano: 2019, tipo: '', idioma: '', lido: false
  });

  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
) => {
  const { name, value, type } = e.target;
  
  const checked = (e.target as HTMLInputElement).checked;

  setFormData((prev) => ({
    ...prev,
    [name]: type === 'checkbox' ? checked : value,
  }));
};

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    onAdicionarLivro(formData);
    setValidated(false);
    
    // Redireciona o usuário de volta para a Home após cadastrar com sucesso
    navigate('/');
  };

  return (
    <>
      <PageHeader title="Novo Registro" subtitle="Adicione mais um item à sua coleção" />
      <InfoCard title="Formulário de Cadastro">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="g-3">
            <Form.Group as={Col} md={6} controlId="titulo-input">
              <Form.Label>Título:</Form.Label>
              <Form.Control required type="text" name="titulo" value={formData.titulo} onChange={handleChange} placeholder="O Hobbit" />
            </Form.Group>
            <Form.Group as={Col} md={6} controlId="autor-input">
              <Form.Label>Autor:</Form.Label>
              <Form.Control required type="text" name="autor" value={formData.autor} onChange={handleChange} placeholder="J. R. R. Tolkien" />
            </Form.Group>
            <Form.Group as={Col} md={4} controlId="tipo-input">
              <Form.Label>Tipo:</Form.Label>
              <Form.Select required name="tipo" value={formData.tipo} onChange={handleChange}>
                <option value="" disabled hidden>Selecione...</option>
                <option value="livro">Livro</option>
                <option value="quadrinho">Quadrinho</option>
                <option value="rpg">RPG</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Button variant="primary" type="submit" className="mt-4">Cadastrar livro</Button>
        </Form>
      </InfoCard>
    </>
  );
};