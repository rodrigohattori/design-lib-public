---
comportamento: tabela-viva
custo: médio
familias: [instrumento-denso, papel-operacional, cartografia-de-dados]
criado: 2026-11-01
---

# Tabela viva

Tabela com cabeçalho fixo, ordenação por clique, filtro por texto e navegação por setas.

## Por que funciona
Em ferramenta de trabalho, a tabela é o produto. O que importa é velocidade de varredura.

## Implementação
- Cabeçalho `position: sticky`; `aria-sort` na coluna ordenada.
- Linha ativa com `aria-selected`; setas sobem e descem; Enter abre.
- Número com `font-variant-numeric: tabular-nums` e alinhado à direita.

## Nunca
- Zebra de cor forte.
- Rolagem horizontal sem coluna fixa.
- Ordenação sem indicador de direção.

## Limites
- Sem animação além de 120ms na linha ativa. `prefers-reduced-motion`: troca instantânea. Toque: linha vira cartão empilhado abaixo de 640px.
