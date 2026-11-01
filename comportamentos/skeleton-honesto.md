---
comportamento: skeleton-honesto
custo: baixo
familias: [instrumento-denso, conversa-calma]
criado: 2026-11-01
---

# Skeleton honesto

Carregamento mostra a forma real do conteúdo que vem, sem brilho que finge progresso.

## Por que funciona
Esqueleto com a geometria certa reduz salto de layout e a sensação de espera.

## Implementação
- Mesmas alturas, larguras e número de linhas do conteúdo final.
- Pulso de opacidade de 1.2s entre 0.55 e 1, sem varredura de brilho.
- Depois de 8s, trocar por mensagem de atraso com ação de tentar de novo.

## Nunca
- Shimmer em gradiente atravessando a tela.
- Esqueleto de tamanho diferente do conteúdo final.
- Spinner infinito sem texto.

## Limites
- `prefers-reduced-motion`: opacidade fixa em 0.7, sem pulso. Toque: igual.
