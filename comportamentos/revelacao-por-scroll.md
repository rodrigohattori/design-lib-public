---
comportamento: revelacao-por-scroll
custo: baixo
familias: [organic-editorial, caderno-vivo, cartografia-noturna, editorial-cinematografico, classico-noturno]
criado: 2026-07-29
---

# Revelação por scroll

Bloco entra com deslocamento curto e opacidade, uma vez. É o comportamento mais banal
que existe, e por isso mesmo o mais fácil de fazer parecer genérico.

## O que separa de fade-in de template
- Deslocamento de 8px a 12px, nunca 40px. Movimento longo denuncia o efeito.
- `ease-out`, 400ms a 600ms.
- Escalonamento entre itens irmãos de no máximo 60ms. Acima disso a página parece lenta.
- Aplica em bloco de seção, nunca em cada parágrafo e cada linha.

## Implementação
- `IntersectionObserver` com threshold em torno de 0.15, desconectando após disparar.
- Estado inicial nunca esconde conteúdo de quem tem JavaScript desligado. Sem JS, tudo
  visível.

## Nunca
- Revelar em toda seção da página. Escolha 3 ou 4 momentos.
- Revelar o hero. O hero já está visível quando a página abre.
- Combinar com parallax na mesma seção.

## Limites
- `prefers-reduced-motion` entrega tudo visível, sem transição.

