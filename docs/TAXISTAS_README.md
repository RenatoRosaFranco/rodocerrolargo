# Sistema de Cadastro de Taxistas

## Visão Geral

Este documento descreve a funcionalidade de cadastro de taxistas implementada na plataforma da Estação Rodoviária de Cerro Largo. O sistema permite que taxistas se cadastrem, passem por uma aprovação administrativa, e sejam listados publicamente para turistas, visitantes e a comunidade.

## Funcionalidades Implementadas

### 1. Cadastro de Taxistas (Pré-cadastro)
- **Rota**: `/taxistas/cadastro`
- **Componente**: `TaxistaForm.jsx`
- Formulário completo com validação em tempo real usando Formik e Yup
- Campos inclusos:
  - Dados Pessoais: Nome, CPF, Telefone, WhatsApp, Email
  - Dados Profissionais: Número do Alvará, Placa, Modelo, Ano e Cor do Veículo
  - Informações Adicionais: Descrição (opcional)
- Máscaras de input para CPF, telefone e placa
- Validação de CPF e placa de veículo (formato antigo e Mercosul)
- Status inicial: **pendente**

### 2. Listagem Pública de Taxistas
- **Rota**: `/taxistas`
- **Componente**: `TaxistaList.jsx`
- Exibe apenas taxistas com status **aprovado**
- Funcionalidade de busca por nome, modelo ou placa
- Cards informativos com:
  - Dados do taxista
  - Informações do veículo
  - Contatos (telefone, WhatsApp, email) com links diretos
  - Número do alvará
- Design responsivo com hover effects

### 3. Painel Administrativo
- **Rota**: `/admin/taxistas`
- **Componente**: `AdminPanel.jsx`
- Autenticação simples por senha
- Abas separadas para: Pendentes, Aprovados e Rejeitados
- Ações disponíveis:
  - **Aprovar** cadastros pendentes
  - **Rejeitar** cadastros (com motivo obrigatório)
  - **Excluir** cadastros de qualquer status
  - **Visualizar** detalhes completos
- Atualização em tempo real após cada ação

## Estrutura do Banco de Dados

### Modelo Taxista
```javascript
{
  // Dados pessoais
  nomeCompleto: String (obrigatório),
  cpf: String (obrigatório, único),
  telefone: String (obrigatório),
  whatsapp: String (opcional),
  email: String (obrigatório),

  // Dados profissionais
  numeroAlvara: String (obrigatório, único),
  placaVeiculo: String (obrigatório),
  modeloVeiculo: String (obrigatório),
  anoVeiculo: Number (obrigatório),
  corVeiculo: String (obrigatório),

  // Informações adicionais
  foto: String (URL, opcional),
  descricao: String (opcional, max 500 caracteres),

  // Status e aprovação
  status: String (pendente|aprovado|rejeitado),
  motivoRejeicao: String (opcional),
  dataCadastro: Date (automático),
  dataAprovacao: Date (automático ao aprovar),
  aprovadoPor: String (automático),
}
```

## API Endpoints

### GET /api/taxistas
Lista taxistas com filtros opcionais
- Query params:
  - `status`: filtra por status (pendente/aprovado/rejeitado)
  - `admin=true`: retorna todos os status (necessário para admin)
- Resposta: Array de taxistas

### POST /api/taxistas
Cria novo cadastro de taxista
- Body: Dados do taxista
- Status inicial: pendente
- Resposta: Taxista criado

### GET /api/taxistas/[id]
Busca um taxista específico por ID
- Resposta: Objeto do taxista

### PATCH /api/taxistas/[id]
Atualiza status do taxista (aprovar/rejeitar)
- Body:
  - `status`: novo status
  - `motivoRejeicao`: motivo (obrigatório para rejeição)
  - `adminPassword`: senha do admin
- Resposta: Taxista atualizado

### DELETE /api/taxistas/[id]
Remove um taxista
- Query param: `adminPassword`
- Resposta: Confirmação de exclusão

## Configuração

### Variáveis de Ambiente (.env.local)

```env
# MongoDB Connection String
MONGODB_URI=mongodb://localhost:27017/rodocerrolargo

# Senha do Admin
ADMIN_PASSWORD=admin123
```

⚠️ **IMPORTANTE**: Altere a senha do admin antes de colocar em produção!

### Instalação de Dependências

As seguintes dependências foram adicionadas:
- `mongoose`: ODM para MongoDB
- Dependências já existentes utilizadas:
  - `formik`: Gerenciamento de formulários
  - `yup`: Validação de schemas
  - `@tanstack/react-query`: Gerenciamento de estado servidor
  - `react-toastify`: Notificações toast
  - `react-bootstrap`: Componentes UI
  - `react-icons`: Ícones

Para instalar todas as dependências:
```bash
npm install
```

### Configuração do MongoDB

Você pode usar MongoDB local ou MongoDB Atlas (cloud):

#### Opção 1: MongoDB Local
```bash
# Instale o MongoDB em sua máquina
# Ubuntu/Debian:
sudo apt-get install mongodb

# macOS (via Homebrew):
brew install mongodb-community

# Inicie o serviço
mongod
```

#### Opção 2: MongoDB Atlas (Cloud - Recomendado)
1. Acesse [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crie uma conta gratuita
3. Crie um novo cluster
4. Configure acesso (IP e usuário)
5. Copie a connection string
6. Cole no `.env.local` substituindo `MONGODB_URI`

Exemplo de connection string do Atlas:
```
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/rodocerrolargo?retryWrites=true&w=majority
```

## Como Usar

### 1. Cadastro de Taxista
1. Acesse `/taxistas/cadastro`
2. Preencha todos os campos obrigatórios
3. Clique em "Enviar Cadastro"
4. Aguarde aprovação (status: pendente)

### 2. Aprovação (Admin)
1. Acesse `/admin/taxistas`
2. Faça login com a senha configurada
3. Na aba "Pendentes", visualize os cadastros
4. Clique em "Aprovar" ou "Rejeitar"
5. Para rejeitar, informe o motivo

### 3. Visualização Pública
1. Acesse `/taxistas`
2. Veja a lista de taxistas aprovados
3. Use a busca para filtrar
4. Clique nos links para contato direto

## Navegação

Links adicionados no Header:
- **Taxistas**: Acessa a listagem pública
- **Cadastrar Taxista**: Acessa o formulário de cadastro
- **Admin** (manual): `/admin/taxistas` para gerenciamento

## Segurança

### Implementações de Segurança:
- Validação de dados no cliente (Yup) e servidor (Mongoose)
- Sanitização de inputs
- Senha de admin para ações críticas
- Campos sensíveis não podem ser enviados pelo usuário
- Índices únicos para CPF e Alvará (evita duplicação)

### Melhorias Futuras Recomendadas:
- Implementar autenticação completa (NextAuth.js, Clerk, etc.)
- Hash de senha do admin (bcrypt)
- Rate limiting nas APIs
- Upload de fotos dos taxistas
- Validação de documentos (CPF, Alvará)
- Email de notificação ao aprovar/rejeitar
- Sistema de logs de auditoria
- Permissões baseadas em roles
- Captcha no formulário de cadastro

## Tecnologias Utilizadas

- **Next.js 15.4.4**: Framework React
- **MongoDB + Mongoose**: Banco de dados NoSQL
- **Formik + Yup**: Formulários e validação
- **React Query**: Gerenciamento de estado
- **React Bootstrap**: Interface UI
- **React Toastify**: Notificações
- **React Icons**: Ícones

## Estrutura de Arquivos

```
src/
├── app/
│   ├── api/
│   │   └── taxistas/
│   │       ├── route.js              # GET, POST
│   │       └── [id]/route.js         # GET, PATCH, DELETE
│   ├── taxistas/
│   │   ├── page.js                   # Listagem pública
│   │   └── cadastro/page.js          # Formulário de cadastro
│   └── admin/
│       └── taxistas/page.js          # Painel admin
├── ui/
│   ├── components/
│   │   ├── TaxistaForm.jsx           # Formulário de cadastro
│   │   ├── TaxistaList.jsx           # Listagem pública
│   │   └── AdminPanel.jsx            # Painel de aprovação
│   └── shared/
│       └── Header.jsx                # (atualizado com links)
├── lib/
│   └── mongodb.js                    # Conexão MongoDB
├── models/
│   └── Taxista.js                    # Schema Mongoose
├── providers/
│   └── QueryProvider.jsx             # React Query Provider
└── validations/
    └── taxistaSchema.js              # Validação Yup
```

## Fluxo de Trabalho

```mermaid
graph TD
    A[Taxista acessa /taxistas/cadastro] --> B[Preenche formulário]
    B --> C[Validação Yup]
    C --> D[POST /api/taxistas]
    D --> E[Salvo no MongoDB - status: pendente]
    E --> F[Admin acessa /admin/taxistas]
    F --> G{Admin decide}
    G -->|Aprovar| H[PATCH - status: aprovado]
    G -->|Rejeitar| I[PATCH - status: rejeitado]
    H --> J[Aparece em /taxistas]
    I --> K[Não aparece publicamente]
```

## Suporte

Para dúvidas ou problemas:
1. Verifique se o MongoDB está rodando
2. Confirme se as variáveis de ambiente estão configuradas
3. Verifique os logs do servidor Next.js
4. Teste as APIs diretamente (Postman, Insomnia)

## Licença

Este projeto faz parte da plataforma da Estação Rodoviária de Cerro Largo.
