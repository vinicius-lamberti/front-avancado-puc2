# Inventário de Livros

Uma aplicação web desenvolvida com **React** e **TypeScript** para gerenciar um inventário pessoal de livros. O projeto foi desenvolvido como MVP (Minimum Viable Product) para a disciplina de Desenvolvimento Front-End Avançado na PUC.

## Descrição do Projeto

O **Inventário de Livros** permite aos usuários:
- **Visualizar** uma lista de livros cadastrados
- **Cadastrar** novos livros com informações detalhadas
- **Consultar** os detalhes completos de um livro específico
- **Remover** livros do acervo
- **Rastrear** o status de leitura de cada título

A aplicação simula requisições a um servidor lendo dados de um arquivo JSON, implementando operações equivalentes a GET, POST e DELETE.

## Tecnologias
- **React 19** - Biblioteca JavaScript
- **TypeScript** - Tipagem estática
- **React Router v7** - Navegação entre páginas
- **Bootstrap 5** - Framework CSS responsivo
- **Vite** - Bundler rápido
- **Vitest** - Testes unitários

## Como Começar

### Pré-requisitos
Certifique-se de ter as seguintes ferramentas instaladas:
- **Node.js** (versão 16 ou superior) - [Download aqui](https://nodejs.org/)
- **npm** (gerenciador de pacotes, incluído com Node.js)

### Instalação

1. **Clone o repositório:**
```bash
git clone https://github.com/vinicius-lamberti/front-avancado-puc2.git
cd front-avancado-puc2
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Inicie o servidor de desenvolvimento:**
```bash
npm run dev
```

A aplicação abrirá automaticamente em `http://localhost:5173` (ou a porta indicada no terminal).

## Testes

O projeto inclui testes unitários para componentes e páginas:

```bash
# Executar todos os testes
npm test

# Executar testes com cobertura
npm run test:coverage
```
