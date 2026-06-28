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
  const [erroIsbn, setErroIsbn] = useState('');

  const [formData, setFormData] = useState<Omit<Livro, 'id'>>({
    titulo: '',
    autor: '',
    editora: '',
    isbn: '',
    ano: 2019,
    tipo: '',
    idioma: '',
    lido: false,
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


    if (name === 'isbn') {
      setErroIsbn('');
    }
  };

  const validarISBNOnBlur = () => {
    const valorLimpo = formData.isbn.replaceAll('-', '').replaceAll(' ', '').toUpperCase();
    const tamanho = valorLimpo.length;

    const regex10 = /^\d{9}[\dX]$/;
    const regex13 = /^\d{13}$/;

    if (!formData.isbn) {
      setErroIsbn('O ISBN é obrigatório');
      return false;
    } else if (tamanho !== 10 && tamanho !== 13) {
      setErroIsbn('ISBN deve ter 10 ou 13 dígitos');
      return false;
    } else if (tamanho === 10 && !regex10.test(valorLimpo)) {
      setErroIsbn('ISBN-10 inválido');
      return false;
    } else if (tamanho === 13 && !regex13.test(valorLimpo)) {
      setErroIsbn('ISBN-13 inválido');
      return false;
    }

    setErroIsbn(''); // Válido!
    return true;
  };

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();

    const isbnValido = validarISBNOnBlur();
    if (form.checkValidity() === false || !isbnValido) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    const formatarPrimeiraLetra = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

    const tituloFormatado = formatarPrimeiraLetra(formData.titulo);
    const autorFormatado = formatarPrimeiraLetra(formData.autor);
    const editoraFormatado = formatarPrimeiraLetra(formData.editora);

    let tipoFormatado: Livro['tipo'] = '';
    const tipoBruto = formatarPrimeiraLetra(formData.tipo);
    if (tipoBruto === 'Rpg') {
      tipoFormatado = 'RPG';
    } else if (tipoBruto === 'Livro' || tipoBruto === 'Quadrinho') {
      tipoFormatado = tipoBruto;
    }

    let idiomaFormatado: Livro['idioma'] = '';
    const idiomaBruto = String(formData.idioma); 

    if (idiomaBruto === 'portugues') {
      idiomaFormatado = 'Português';
    } else if (idiomaBruto === 'ingles') {
      idiomaFormatado = 'Inglês';
    } else if (idiomaBruto === 'espanhol') {
      idiomaFormatado = 'Espanhol';
    }

    onAdicionarLivro({
      titulo: tituloFormatado,
      autor: autorFormatado,
      editora: editoraFormatado,
      isbn: formData.isbn,
      ano: Number(formData.ano),
      tipo: tipoFormatado,
      idioma: idiomaFormatado,
      lido: formData.lido,
    });

    alert('Livro cadastrado com sucesso!');
    setValidated(false);
    navigate('/');
  };

  return (
    <>
      <PageHeader title="Novo Registro" subtitle="Adicione mais um item à sua coleção" />
      <InfoCard title="Formulário de Cadastro">
        <Form data-testid="cadastro-form" noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="g-3">
            
            {/* Campo: Título */}
            <Form.Group as={Col} md={6} controlId="titulo-input">
              <Form.Label>Título:</Form.Label>
              <Form.Control
                required
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                placeholder="O Hobbit"
                maxLength={200}
              />
              <Form.Control.Feedback type="invalid">Preencha o título</Form.Control.Feedback>
            </Form.Group>

            {/* Campo: Autor */}
            <Form.Group as={Col} md={6} controlId="autor-input">
              <Form.Label>Autor:</Form.Label>
              <Form.Control
                required
                type="text"
                name="autor"
                value={formData.autor}
                onChange={handleChange}
                placeholder="J. R. R. Tolkien"
                maxLength={200}
              />
              <Form.Control.Feedback type="invalid">Preencha o autor</Form.Control.Feedback>
            </Form.Group>

            {/* Campo: Editora */}
            <Form.Group as={Col} md={6} controlId="editora-input">
              <Form.Label>Editora:</Form.Label>
              <Form.Control
                required
                type="text"
                name="editora"
                value={formData.editora}
                onChange={handleChange}
                placeholder="Harper Collins"
                maxLength={100}
              />
              <Form.Control.Feedback type="invalid">Preencha a editora</Form.Control.Feedback>
            </Form.Group>

            {/* Campo: ISBN com Validação customizada */}
            <Form.Group as={Col} md={6} controlId="isbn-input">
              <Form.Label>ISBN (10 ou 13 dígitos):</Form.Label>
              <Form.Control
                required
                type="text"
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
                onBlur={validarISBNOnBlur}
                placeholder="978-85-9508-474-2"
                maxLength={17}
                isInvalid={!!erroIsbn}
              />
              <Form.Control.Feedback type="invalid">
                {erroIsbn || 'O ISBN é obrigatório'}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Campo: Ano de Publicação */}
            <Form.Group as={Col} md={4} controlId="ano-input">
              <Form.Label>Ano de publicação:</Form.Label>
              <Form.Control
                required
                type="number"
                name="ano"
                min={1}
                max={2200}
                value={formData.ano}
                onChange={handleChange}
                placeholder="2019"
              />
              <Form.Control.Feedback type="invalid">Preencha o ano de publicação</Form.Control.Feedback>
            </Form.Group>

            {/* Campo: Tipo de Mídia */}
            <Form.Group as={Col} md={4} controlId="tipo-input">
              <Form.Label>Tipo:</Form.Label>
              <Form.Select required name="tipo" value={formData.tipo} onChange={handleChange}>
                <option value="" disabled hidden>Selecione uma opção</option>
                <option value="livro">Livro</option>
                <option value="quadrinho">Quadrinho</option>
                <option value="rpg">RPG</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">Selecione um tipo</Form.Control.Feedback>
            </Form.Group>

            {/* Campo: Idioma */}
            <Form.Group as={Col} md={4} controlId="idioma-input">
              <Form.Label>Idioma:</Form.Label>
              <Form.Select required name="idioma" value={formData.idioma} onChange={handleChange}>
                <option value="" disabled hidden>Selecione uma opção</option>
                <option value="portugues">Português</option>
                <option value="ingles">Inglês</option>
                <option value="espanhol">Espanhol</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">Selecione um idioma</Form.Control.Feedback>
            </Form.Group>

            {/* Campo: Status de Leitura (Checkbox) */}
            <Form.Group as={Col} xs={12} controlId="lido-input" className="mt-2">
              <Form.Check
                type="checkbox"
                name="lido"
                label="Marque se o livro já foi lido por você"
                checked={formData.lido}
                onChange={handleChange}
              />
            </Form.Group>

          </Row>

          <Button variant="primary" type="submit" className="mt-4 px-4 py-2">
            Cadastrar livro
          </Button>
        </Form>
      </InfoCard>
    </>
  );
};