# Migração MongoDB → Prisma + SQLite

## Resumo da Migração

A aplicação foi migrada com sucesso de **MongoDB + Mongoose** para **Prisma + SQLite**.

## Mudanças Realizadas

### 1. Instalação e Configuração
- ✅ Instalado `prisma` e `@prisma/client`
- ✅ Inicializado Prisma com SQLite como provider
- ✅ Criado schema Prisma com 3 models

### 2. Schema Prisma (prisma/schema.prisma)

Três models foram criados:

#### **Advertisement**
- Gerencia banners publicitários
- Campos: imageUrl, destinationLink, bannerType, datas, status, prioridade, estatísticas
- Configurações específicas para popups

#### **TaxiDriver**
- Cadastro de taxistas
- Campos: nome, email, telefone, WhatsApp, descrição, foto, status de aprovação

#### **Feedback**
- Sistema de feedback dos usuários
- Campos: rating (1-5), mensagem, dados de rastreamento

### 3. Biblioteca Prisma Client
Criado `src/lib/prisma.js` para gerenciar a conexão única do Prisma Client.

### 4. APIs Atualizadas

Todas as rotas de API foram migradas:

#### **Taxi Drivers**
- ✅ `GET/POST /api/taxi-drivers`
- ✅ `GET/PATCH/DELETE /api/taxi-drivers/[id]`

#### **Advertisements**
- ✅ `GET/POST /api/ads`
- ✅ `GET/PATCH/DELETE /api/ads/[id]`
- ✅ `POST /api/ads/[id]/view`
- ✅ `POST /api/ads/[id]/click`

#### **Feedback**
- Já estava usando arquivo local (não foi alterado)

### 5. Remoção de Arquivos Antigos
- ✅ Removido `mongoose` das dependências
- ✅ Deletados `src/models/*` (Advertisement.js, TaxiDriver.js, Feedback.js)
- ✅ Deletado `src/lib/mongodb.js`

### 6. Variáveis de Ambiente
Atualizado `.env.local`:
```env
# Antes
MONGODB_URI=mongodb://localhost:27017/rodocerrolargo

# Depois  
DATABASE_URL="file:./dev.db"
```

## Vantagens da Migração

1. **Sem dependência externa** - SQLite é um arquivo local, não precisa de servidor MongoDB
2. **Mais rápido** - Sem latência de rede
3. **Type-safe** - Prisma gera tipos TypeScript automaticamente
4. **Melhor DX** - Prisma Studio para visualizar dados
5. **Migrações** - Controle de versão do schema do banco

## Comandos Prisma Úteis

```bash
# Gerar Prisma Client
npx prisma generate

# Aplicar mudanças no schema ao banco
npx prisma db push

# Abrir Prisma Studio (GUI para o banco)
npx prisma studio

# Criar nova migration
npx prisma migrate dev --name nome_da_migration
```

## Localização do Banco de Dados

O arquivo SQLite está localizado em:
```
prisma/dev.db
```

Este arquivo está no `.gitignore` e não será commitado.

## Próximos Passos (Opcional)

1. Configurar PostgreSQL ou MySQL para produção
2. Criar migrations ao invés de usar `db push`
3. Adicionar validações com Zod
4. Implementar soft deletes
5. Adicionar relações entre models se necessário

## Notas Importantes

- O banco SQLite é ideal para desenvolvimento e pequenas aplicações
- Para produção com múltiplos usuários, considere PostgreSQL ou MySQL
- Todas as funcionalidades existentes foram preservadas
- Nenhuma quebra de compatibilidade com o frontend

---

**Status:** ✅ Migração Completa
**Data:** 15/11/2024
**Banco:** SQLite (dev.db)
