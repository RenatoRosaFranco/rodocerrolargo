# Sistema de Publicidade (Cotas de Anúncio)

## Visão Geral

Sistema completo de gerenciamento de publicidade para a plataforma da Estação Rodoviária de Cerro Largo. Permite que empresas locais contratem cotas de publicidade em diferentes posições da plataforma, aumentando sua visibilidade junto a turistas, visitantes e a comunidade.

## Funcionalidades Implementadas

### 1. Tipos de Banner (5 Posições Disponíveis)

#### Banner Topo
- **Posição**: Horizontal no topo da página, logo após o header
- **Dimensões Recomendadas**: 1200 x 120 pixels
- **Visualização**: Alta
- **Componente**: `BannerTopo.jsx`

#### Banner Lateral Esquerdo
- **Posição**: Vertical na lateral esquerda
- **Dimensões Recomendadas**: 300 x 600 pixels
- **Visualização**: Média-Alta
- **Componente**: `BannerLateral.jsx` (lado="esquerdo")

#### Banner Lateral Direito
- **Posição**: Vertical na lateral direita
- **Dimensões Recomendadas**: 300 x 600 pixels
- **Visualização**: Média-Alta
- **Componente**: `BannerLateral.jsx` (lado="direito")

#### Banner Rodapé
- **Posição**: Horizontal no rodapé, antes do footer
- **Dimensões Recomendadas**: 1200 x 100 pixels
- **Visualização**: Média
- **Componente**: `BannerRodape.jsx`

#### Banner Popup
- **Posição**: Modal centralizado na tela
- **Dimensões Recomendadas**: 800 x 600 pixels
- **Visualização**: Muito Alta
- **Componente**: `BannerPopup.jsx`
- **Configurações Especiais**:
  - Tempo de exibição após entrada na página
  - Frequência (sempre, uma vez por sessão, uma vez por dia)

### 2. Planos de Publicidade

#### Plano Básico - R$ 150/mês
- 1 posição de banner
- Rotação com outros anúncios
- Estatísticas básicas
- Suporte por email
- Relatório mensal

#### Plano Intermediário - R$ 250/mês ⭐ Mais Popular
- 2 posições de banner
- Prioridade na rotação
- Estatísticas detalhadas
- Suporte prioritário
- Relatório semanal
- Banner destacado

#### Plano Premium - R$ 400/mês
- 3 posições de banner
- Máxima prioridade
- Dashboard em tempo real
- Suporte VIP 24/7
- Relatório diário
- Banner exclusivo
- Popup garantido

### 3. Páginas Públicas

#### Página de Planos ([/publicidade](src/app/publicidade/page.js))
- Apresentação dos planos disponíveis
- Descrição das posições de banner
- Benefícios de anunciar
- CTA para solicitar cota
- Link direto para WhatsApp

#### Página de Solicitação ([/publicidade/solicitar](src/app/publicidade/solicitar/page.js))
- Formulário completo com validação
- Campos organizados por seções
- Preview das dimensões recomendadas
- Validação de CNPJ e URLs
- Status inicial: pendente

### 4. Painel Administrativo ([/admin/publicidade](src/app/admin/publicidade/page.js))
- Autenticação por senha
- Tabs organizadas por status:
  - Pendentes
  - Ativos
  - Pausados
  - Expirados
  - Rejeitados
- Ações disponíveis:
  - **Aprovar** publicidades pendentes
  - **Rejeitar** com motivo
  - **Pausar** publicidades ativas
  - **Retomar** publicidades pausadas
  - **Excluir** publicidades
  - **Ver detalhes** completos
- Estatísticas em tempo real (visualizações e cliques)

### 5. Sistema de Estatísticas

#### Métricas Rastreadas
- **Visualizações**: Contadas automaticamente ao carregar o banner
- **Cliques**: Registrados ao usuário clicar no banner

#### APIs de Rastreamento
- `POST /api/publicidades/[id]/view` - Registra visualização
- `POST /api/publicidades/[id]/click` - Registra clique

## Estrutura do Banco de Dados

### Modelo Publicidade

```javascript
{
  // Dados da empresa
  nomeEmpresa: String (obrigatório),
  cnpj: String (opcional),
  responsavel: String (obrigatório),
  email: String (obrigatório),
  telefone: String (obrigatório),

  // Tipo e posição
  tipoBanner: String (topo|lateral-esquerdo|lateral-direito|rodape|popup),

  // Informações do banner
  imagemUrl: String (obrigatório),
  linkDestino: String (opcional),
  textoAlternativo: String (opcional),

  // Período
  dataInicio: Date (obrigatório),
  dataFim: Date (obrigatório),

  // Status e controle
  status: String (pendente|ativo|pausado|expirado|rejeitado),
  prioridade: Number (0-10, maior = mais importante),

  // Estatísticas
  visualizacoes: Number,
  cliques: Number,

  // Plano
  plano: String (basico|intermediario|premium),
  valorPago: Number,

  // Aprovação
  aprovadoPor: String,
  dataAprovacao: Date,
  motivoRejeicao: String,

  // Config do Popup
  configPopup: {
    exibirApos: Number (segundos),
    frequencia: String (sempre|uma-vez-por-sessao|uma-vez-por-dia)
  }
}
```

## API Endpoints

### Publicidades

#### GET /api/publicidades
Lista publicidades com filtros
- Query params:
  - `tipo`: filtrar por tipo de banner
  - `status`: filtrar por status
  - `admin=true`: ver todos (requer autenticação)
  - `ativos=true`: apenas banners ativos e dentro do período

#### POST /api/publicidades
Cria nova solicitação de publicidade
- Body: Dados da publicidade
- Status inicial: pendente

#### GET /api/publicidades/[id]
Busca publicidade específica

#### PATCH /api/publicidades/[id]
Atualiza publicidade (aprovar/rejeitar/pausar/retomar)
- Requer `adminPassword` para mudanças de status

#### DELETE /api/publicidades/[id]
Remove publicidade
- Requer `adminPassword`

#### POST /api/publicidades/[id]/view
Registra visualização do banner

#### POST /api/publicidades/[id]/click
Registra clique no banner

## Sistema de Rotação de Anúncios

### Lógica de Seleção
1. Busca todos os banners ativos do tipo solicitado
2. Filtra por período (dataInicio <= hoje <= dataFim)
3. Ordena por prioridade (maior primeiro)
4. Seleciona aleatoriamente entre os de maior prioridade

### Prioridades
- **0-3**: Plano Básico
- **4-7**: Plano Intermediário
- **8-10**: Plano Premium

### Controle de Frequência (Popup)
- **Sempre**: Exibe em todas as visitas
- **Uma vez por sessão**: Usa `sessionStorage`
- **Uma vez por dia**: Usa `localStorage` com data

## Estrutura de Arquivos

```
src/
├── app/
│   ├── api/
│   │   └── publicidades/
│   │       ├── route.js                     # GET, POST
│   │       └── [id]/
│   │           ├── route.js                 # GET, PATCH, DELETE
│   │           ├── view/route.js            # POST visualização
│   │           └── click/route.js           # POST clique
│   ├── publicidade/
│   │   ├── page.js                          # Página de planos
│   │   └── solicitar/page.js                # Formulário
│   └── admin/
│       └── publicidade/page.js              # Painel admin
├── ui/
│   ├── components/
│   │   ├── banners/
│   │   │   ├── BannerBase.jsx               # Componente base
│   │   │   ├── BannerTopo.jsx               # Banner topo
│   │   │   ├── BannerLateral.jsx            # Banners laterais
│   │   │   ├── BannerRodape.jsx             # Banner rodapé
│   │   │   └── BannerPopup.jsx              # Banner popup
│   │   ├── PlanosPublicidade.jsx            # Página de planos
│   │   ├── PublicidadeForm.jsx              # Formulário
│   │   ├── AdminPublicidade.jsx             # Painel admin
│   │   └── PageWithBanners.jsx              # Wrapper com banners
│   └── shared/
│       └── Header.jsx                       # (com link Anuncie)
├── models/
│   └── Publicidade.js                       # Schema Mongoose
└── validations/
    └── publicidadeSchema.js                 # Validação Yup
```

## Como Usar

### Para Empresas Anunciantes

1. **Ver Planos Disponíveis**
   - Acesse `/publicidade`
   - Conheça as posições e planos

2. **Solicitar Cota**
   - Clique em "Solicitar Agora"
   - Preencha o formulário em `/publicidade/solicitar`
   - Aguarde aprovação (até 48h)

3. **Acompanhar Estatísticas**
   - Entre em contato para receber relatórios
   - Visualizações e cliques são rastreados automaticamente

### Para Administradores

1. **Acessar Painel**
   - Acesse `/admin/publicidade`
   - Faça login com senha de admin

2. **Aprovar Solicitações**
   - Aba "Pendentes"
   - Revisar dados da empresa e banner
   - Aprovar ou rejeitar (com motivo)

3. **Gerenciar Publicidades Ativas**
   - Pausar temporariamente
   - Ajustar prioridade
   - Ver estatísticas
   - Excluir se necessário

4. **Monitorar Performance**
   - Visualizar cliques e visualizações
   - Identificar banners mais efetivos

## Integração nas Páginas

### Página Principal ([/](src/app/page.js))
```jsx
import BannerTopo from '@/ui/components/banners/BannerTopo';
import BannerRodape from '@/ui/components/banners/BannerRodape';
import BannerPopup from '@/ui/components/banners/BannerPopup';

export default function Home() {
  return (
    <>
      <Header />
      <BannerTopo />
      {/* Conteúdo */}
      <BannerRodape />
      <BannerPopup />
    </>
  );
}
```

### Páginas com Laterais
```jsx
import PageWithBanners from '@/ui/components/PageWithBanners';

export default function MinhaPage() {
  return (
    <PageWithBanners>
      {/* Conteúdo - Laterais incluídas automaticamente */}
    </PageWithBanners>
  );
}
```

## Configurações Recomendadas

### Imagens de Banner

#### Formato
- JPG ou PNG
- Tamanho máximo: 500KB
- Hospedagem: Imgur, Cloudinary, ou servidor próprio

#### Dimensões Exatas
- **Topo**: 1200 x 120 px
- **Laterais**: 300 x 600 px
- **Rodapé**: 1200 x 100 px
- **Popup**: 800 x 600 px

### Práticas Recomendadas

1. **Design do Banner**
   - CTA claro e visível
   - Cores que contrastem
   - Texto legível
   - Logo da empresa

2. **Link de Destino**
   - Use URLs absolutas (https://)
   - Teste antes de enviar
   - Rastreie conversões com UTM

3. **Período de Veiculação**
   - Mínimo: 1 mês
   - Planeje campanhas sazonais
   - Renove antes do vencimento

## Melhorias Futuras Sugeridas

### Funcionalidades
- [ ] Upload direto de imagens
- [ ] Editor de banner integrado
- [ ] A/B Testing automático
- [ ] Relatórios exportáveis (PDF/CSV)
- [ ] Dashboard público para anunciantes
- [ ] Sistema de pagamento integrado
- [ ] Notificações por email (aprovação, vencimento)
- [ ] Renovação automática
- [ ] Cupons de desconto
- [ ] Programa de fidelidade

### Métricas Avançadas
- [ ] Taxa de cliques (CTR)
- [ ] Tempo de visualização
- [ ] Heatmap de cliques
- [ ] Conversões rastreadas
- [ ] ROI calculado

### Automações
- [ ] Aprovação automática com IA
- [ ] Detecção de conteúdo impróprio
- [ ] Sugestões de otimização
- [ ] Alertas de baixa performance

## Suporte e Contato

Para dúvidas sobre publicidade:
- Email: publicidade@rodocerrolargo.com.br
- WhatsApp: (55) 9999-9999
- Painel Admin: `/admin/publicidade`

## Preços e Valores

Os preços dos planos podem ser ajustados editando o componente `PlanosPublicidade.jsx`.

**Valores Atuais**:
- Básico: R$ 150/mês
- Intermediário: R$ 250/mês
- Premium: R$ 400/mês

## Segurança

- Autenticação de admin via senha
- Validação de dados no cliente e servidor
- URLs sanitizadas antes de redirecionar
- CNPJ validado (algoritmo oficial)
- Proteção contra XSS em banners

## Observações Importantes

⚠️ **Atenção**:
- Todos os banners passam por aprovação manual
- Conteúdo impróprio será rejeitado
- Banners expirados são automaticamente marcados
- Estatísticas não podem ser manipuladas
- A prioridade influencia na rotação

## Licença

Este sistema faz parte da plataforma da Estação Rodoviária de Cerro Largo.
