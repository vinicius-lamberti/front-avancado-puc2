# 📚 Inventário de Livros

Uma aplicação web desenvolvida com **React** e **TypeScript** para gerenciar um inventário pessoal de livros. O projeto foi desenvolvido como MVP (Minimum Viable Product) para a disciplina de Desenvolvimento Front-End Avançado na PUC.

## 📋 Descrição do Projeto

O **Inventário de Livros** permite aos usuários:
- 📖 **Visualizar** uma lista de livros cadastrados
- ➕ **Cadastrar** novos livros com informações detalhadas
- 👁️ **Consultar** os detalhes completos de um livro específico
- 🗑️ **Remover** livros do acervo
- ✅ **Rastrear** o status de leitura de cada título

A aplicação simula requisições a um servidor lendo dados de um arquivo JSON, implementando operações equivalentes a GET, POST e DELETE.

## 🎯 Características Principais

### Componentização
- **Layout** - Navbar e footer reutilizáveis
- **PageHeader** - Cabeçalho padronizado para todas as páginas
- **InfoCard** - Container versátil para conteúdo
- **AttributeBadge** - Badge para exibição de atributos

### Funcionalidades
- ✨ Validação avançada de ISBN (10 ou 13 dígitos)
- 🔄 Indicadores de carregamento com Spinner
- 📱 Layout responsivo para desktop, tablet e mobile
- 🚫 Página 404 customizada para rotas inválidas
- 💾 Simulação completa de API REST (GET, POST, DELETE)

### Tecnologias
- **React 19** - Biblioteca JavaScript
- **TypeScript** - Tipagem estática
- **React Router v7** - Navegação entre páginas
- **Bootstrap 5** - Framework CSS responsivo
- **Vite** - Bundler rápido
- **Vitest** - Testes unitários

## 🚀 Como Começar

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

### Construir para Produção

Para gerar a versão otimizada para produção:
```bash
npm run build
```

Os arquivos compilados estarão na pasta `dist/`.

### Visualizar a Build de Produção

Para testar a versão compilada localmente:
```bash
npm run preview
```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Layout.tsx      # Layout principal com Navbar e Footer
│   ├── PageHeader.tsx  # Cabeçalho padronizado
│   ├── InfoCard.tsx    # Container de conteúdo
│   └── AttributeBadge.tsx  # Badge para atributos
├── pages/              # Páginas da aplicação
│   ├── Home.tsx        # Página inicial - lista de livros
│   ├── Cadastro.tsx    # Página de cadastro
│   ├── Detalhes.tsx    # Página de detalhes do livro
│   └── NotFound.tsx    # Página 404
├── services/           # Serviços e APIs
│   └── mockApi.ts      # Simulação de requisições HTTP
├── data/               # Dados estáticos
│   └── livros.json     # Base de dados inicial
├── types.ts            # Definições TypeScript
├── App.tsx             # Componente raiz com rotas
└── main.tsx            # Ponto de entrada
```

## 📝 Comandos Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento com HMR |
| `npm run build` | Compila o projeto para produção |
| `npm run preview` | Visualiza a build de produção localmente |
| `npm run lint` | Verifica problemas de código com ESLint |
| `npm test` | Executa os testes unitários |
| `npm run test:coverage` | Executa testes com relatório de cobertura |

## 🧪 Testes

O projeto inclui testes unitários para componentes e páginas:

```bash
# Executar todos os testes
npm test

# Executar testes com cobertura
npm run test:coverage
```

## 📖 Como Usar a Aplicação

### Página Inicial (Home)
- Exibe uma tabela com todos os livros cadastrados
- Mostra: Título, Autor, Tipo, Status de Leitura
- Botões de ação: **Visualizar** (detalhes) e **Excluir**
- Indicador de carregamento enquanto busca os dados

### Página de Cadastro
- Formulário completo para adicionar novo livro
- Campos: Título, Autor, Editora, ISBN, Ano, Tipo, Idioma, Status de Leitura
- Validação avançada de ISBN (aceita 10 ou 13 dígitos)
- Feedback visual de erros em tempo real
- Redirecionamento automático para Home após cadastro

### Página de Detalhes
- Ficha técnica completa do livro
- Exibe todos os atributos de forma organizada
- Acesso via URL: `/livro/:id`
- Botão para retornar à página inicial

### Navegação
- Menu principal na barra de navegação (Navbar)
- Botão "Voltar ao topo" no rodapé
- Links de navegação contextuais em cada página

## 🎨 Design e Responsividade

A aplicação foi desenvolvida com foco em usabilidade:
- ✅ Layout 100% responsivo (mobile-first)
- ✅ Cores contrastantes para melhor acessibilidade
- ✅ Indicadores visuais para ações (loading, sucesso, erro)
- ✅ Feedback imediato ao usuário
- ✅ Grid do Bootstrap para alinhamento consistente

## 📦 Dados Iniciais

A aplicação inicia com 2 livros de exemplo no arquivo `src/data/livros.json`:
- **O Hobbit** - J. R. R. Tolkien
- **Watchmen** - Alan Moore

Estes dados são carregados via mock API ao iniciar a aplicação.

## 🔗 Hooks do React Router Utilizados

- **useNavigate** - Redirecionamento após ações (ex: após cadastro)
- **useParams** - Captura o ID do livro da URL na página de detalhes
- **Link** - Navegação entre páginas sem recarregar

## 💡 Validações Implementadas

- ✅ **ISBN** - Valida 10 ou 13 dígitos com regex específica
- ✅ **Campos obrigatórios** - Formulário não permite envio vazio
- ✅ **Ano** - Aceita apenas números entre 1 e 2200
- ✅ **Formatação** - Capitaliza automaticamente títulos, autores e editoras

## 🛠️ Stack Tecnológico

| Tecnologia | Versão | Descrição |
|-----------|--------|-----------|
| React | 19.2.7 | Biblioteca para UI |
| TypeScript | 6.0.2 | Linguagem tipada |
| React Router | 7.18.0 | Roteamento SPA |
| Bootstrap | 5.3.8 | Framework CSS |
| Vite | 8.1.0 | Bundler |
| Vitest | 4.1.9 | Framework de testes |

## 👨‍💻 Desenvolvedor

**Vinicius Lamberti** - MVP Desenvolvimento Front-End Avançado

## 📄 Licença

Este projeto é de código aberto e foi desenvolvido para fins educacionais.

---

**Última atualização:** Junho de 2026
