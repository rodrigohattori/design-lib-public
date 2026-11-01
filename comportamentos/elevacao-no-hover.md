---
comportamento: elevacao-no-hover
custo: baixo
familias: [arquitetonico-escuro, editorial-cinematografico, classico-noturno]
criado: 2026-07-29
---

# Elevação no hover

Card e bloco clicável sobem de 2px a 4px e ganham contraste de borda. Nada além disso.

## Por que funciona
Comunica clicabilidade sem enfeite. A ausência de sombra crescendo e de escala é o que
separa isto de efeito de template.

## Implementação
- `transform: translateY(-3px)` e mudança de `border-color`.
- `transition` de 150ms a 200ms, `ease-out`. Nunca `ease-in-out` longo.
- Elemento clicável inteiro é o alvo, não só o título.

## Nunca
- Sombra que cresce ou desfoca no hover.
- `scale` maior que 1. Card que cresce empurra o layout e parece brinquedo.
- Rotação, inclinação ou efeito 3D de qualquer tipo.
- Hover em elemento que não é clicável.

## Limites
- Só em ponteiro fino. Em toque, o estado `:active` substitui.
- `prefers-reduced-motion` mantém a mudança de borda e remove o deslocamento.

