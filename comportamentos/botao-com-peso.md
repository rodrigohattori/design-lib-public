---
comportamento: botao-com-peso
custo: baixo
familias: []
criado: 2026-07-29
---

# Botão com peso

O botão responde como objeto físico leve: escurece no hover, afunda no clique, volta
rápido. Vale para qualquer família, incluindo as que usam link com seta em vez de botão.

## Implementação
- Hover: mudança de tinta do fundo em 6% a 10%. Sem mudança de tamanho.
- Active: `scale(0.98)`, duração 100ms a 120ms.
- Foco de teclado: contorno visível de 2px com deslocamento, sempre. Não negociável.
- Link com seta: a seta avança 3px a 4px no hover, o texto fica parado.

## Nunca
- Easing com bounce, elástico ou overshoot.
- Brilho deslizando pelo botão.
- Botão que muda de largura ao trocar de estado, porque desloca o layout.

## Limites
- `prefers-reduced-motion` mantém a mudança de tinta e remove deslocamento e escala.

