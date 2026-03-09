# TODO - BEWEAR E-Commerce

## 🔴 CRÍTICO - Segurança e Estabilidade

### 1. Middleware de Autenticação
- [ ] Criar `src/middleware.ts` para proteção de rotas
- [ ] Proteger rotas: `/cart/*`, `/my-orders/*`, `/checkout/*`
- [ ] Redirecionar usuários não autenticados para `/authentication`

### 2. Validação de Estoque
- [ ] Adicionar campo `stock` na tabela `productVariantTable` (schema.ts)
- [ ] Implementar verificação de estoque em `add-cart-product/index.ts`
- [ ] Exibir mensagem de "ESGOTADO" quando estoque = 0
- [ ] Impedir compra quando estoque insuficiente

### 3. Correção do Fluxo de Checkout
- [ ] Revisar `finish-order-button.tsx` - criar pedido APÓS pagamento Stripe
- [ ] Implementar Webhook handler completo para `checkout.session.completed`
- [ ] Adicionar status "pending" ao criar pedido

### 4. Header na Página de Autenticação
- [ ] Descomentar e integrar Header em `src/app/authentication/page.tsx`

### 5. Error Handling Global
- [ ] Criar `src/app/error.tsx` com UI de erro amigável
- [ ] Adicionar tratamento de erros nas Server Actions

---

## 🟠 ALTO - Funcionalidades Essenciais

### 6. Loading States
- [ ] Melhorar `src/app/loading.tsx` com skeleton loader
- [ ] Adicionar loading states em todas as páginas

### 7. SEO e Metadata
- [ ] Configurar `metadataBase` em `layout.tsx`
- [ ] Adicionar Open Graph tags
- [ ] Gerar sitemap.xml automaticamente
- [ ] Criar robots.txt

### 8. Busca de Produtos
- [ ] Implementar search em `page.tsx` com query `?q=`
- [ ] Criar Server Action para busca
- [ ] Adicionar debounce no input de busca

### 9. Filtros e Ordenação
- [ ] Adicionar filtros por preço em `category/[slug]/page.tsx`
- [ ] Implementar ordenação (menor/maior preço, mais vendidos)
- [ ] Adicionar paginação

### 10. Otimização de Imagens
- [ ] Configurar `placeholder="blur"` nas imagens
- [ ] Adicionar priority nas imagens above-the-fold

---

## 🟡 MÉDIO - UX/UI

### 11. Melhorias no Carrinho
- [ ] Exibir quantidade total de itens no header (badge)
- [ ] Mostrar mensagem de carrinho vazio
- [ ] Calcular corretamente total com quantities

### 12. Footer Expandido
- [ ] Adicionar links: Sobre nós, Políticas, FAQ
- [ ] Adicionar redes sociais
- [ ] Adicionar newsletter

### 13. Validação de CPF
- [ ] Implementar validação real de dígitos do CPF
- [ ] Exibir erro mais detalhado

### 14. Feedback de Loading
- [ ] Adicionar spinners em todos os botões de ação
- [ ] Desabilitar botões durante loading

---

## 🟢 BAIXO - Refinamentos

### 15. React Query Otimização
- [ ] Adicionar `staleTime` às queries
- [ ] Configurar `refetchOnWindowFocus: false`

### 16. Limpeza de Código
- [ ] Remover componente `quantity-selector.tsx` duplicado
- [ ] Consolidar lógica de formatação de moeda
- [ ] Adicionar comentários JSDoc

### 17. Animações
- [ ] Adicionar transições suaves com CSS
- [ ] Implementar skeleton loaders

---

## Funcionalidades Faltantes para E-commerce Real

### Essenciais
- [ ] Lista de favoritos/wishlist
- [ ] Sistema de avaliações de produtos
- [ ] Cálculo de frete por CEP (API)
- [ ] Cupons de desconto
- [ ] Política de privacidade e termos
- [ ] Recuperação de senha

### Importantes
- [ ] Rastreamento de pedidos
- [ ] Cancelamento e reembolso
- [ ] Chat de suporte
- [ ] Newsletter

---

## Roadmap de Implementação

### Fase 1: Estabilidade (Semana 1)
- [ ] 1.1 Middleware de autenticação
- [ ] 1.2 Error boundaries
- [ ] 1.3 Loading states
- [ ] 1.4 Validação de estoque

### Fase 2: Busca e Filtros (Semana 2)
- [ ] 2.1 Sistema de busca
- [ ] 2.2 Filtros por categoria/preço
- [ ] 2.3 Ordenação
- [ ] 2.4 Paginação

### Fase 3: SEO e Performance (Semana 3)
- [ ] 3.1 Metadata completa
- [ ] 3.2 Sitemap e robots
- [ ] 3.3 Otimização de imagens
- [ ] 3.4 Cache strategies

### Fase 4: Funcionalidades E-commerce (Semana 4+)
- [ ] 4.1 Lista de favoritos
- [ ] 4.2 Avaliações
- [ ] 4.3 Cupons
- [ ] 4.4 Cálculo de frete

---

## Problemas de Arquitetura Identificados

### Server vs Client Components
- ⚠️ `Header` é client mas poderia usar Suspense
- ⚠️ `ProductList` marcado como client desnecessariamente

### Banco de Dados
- ⚠️ Queries N+1 em algumas relações
- ⚠️ Sem índices em colunas usadas para filtro

---

## Referência: Estrutura de Arquivos

```
src/
├── actions/           # Server Actions
├── app/              # Next.js App Router
│   ├── api/          # API Routes
│   ├── authentication/
│   ├── cart/
│   ├── category/
│   ├── checkout/
│   └── my-orders/
├── components/
│   ├── common/       # Componentes compartilhados
│   └── ui/          # shadcn/ui components
├── db/              # Drizzle ORM
├── hooks/           # React Query hooks
├── lib/              # Utilitários
└── providers/       # Context providers
```

---

## Comandos Úteis

```bash
# Development
npm run dev

# Build
npm run build

# Lint
npm run lint

# Database
npx drizzle-kit push
npx drizzle-kit studio
```
</parameter>
</create_file>
