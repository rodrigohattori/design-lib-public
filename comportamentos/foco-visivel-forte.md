---
comportamento: foco-visivel-forte
custo: baixo
familias: []
criado: 2026-11-01
---

# Foco visivel forte

Anel de foco de 2px com offset de 2px em toda peça interativa, com contraste mínimo de 3:1 contra o fundo.

## Por que funciona
Navegação por teclado é o teste mais rápido de acabamento e de acessibilidade.

## Implementação
- `:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }`.
- Cor do anel escolhida por contraste contra o fundo da família, não copiada do acento.
- Ordem de tabulação igual à ordem visual.

## Nunca
- `outline: none` sem substituto.
- Foco que só muda a cor do texto.
- Anel cortado por `overflow: hidden`.

## Limites
- Sem animação no foco. Em toque, o anel só aparece com teclado externo.
