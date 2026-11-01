---
comportamento: demonstracao-viva
custo: alto
familias: [arquitetonico-escuro]
criado: 2026-07-29
fonte: chaseai.io
---

# Demonstração viva

O bloco que apresenta um serviço não descreve o serviço, ele mostra o serviço
funcionando em miniatura. Em vez de ícone e parágrafo, uma simulação curta: mensagens
de agente aparecendo em sequência, nós de fluxo conectando, busca retornando trecho de
documento, barras de fase preenchendo.

## Por que funciona
Substitui a promessa pela evidência. É o oposto estrutural da grade de 3 cards com
ícone, que é o padrão que o `anti-slop.md` bane. Aqui cada bloco tem conteúdo próprio,
então a repetição desaparece sozinha.

## Quando usar
- Serviço ou produto difícil de explicar em uma frase.
- Quando existe interface real, mesmo que simplificada, para reproduzir.

## Quando NÃO usar
- Serviço abstrato sem saída visível. Simulação inventada mente e a pessoa sente.
- Mais de uma seção na mesma página. Custo alto, e o efeito se gasta.

## Implementação
- Cada demonstração é HTML e CSS, nunca vídeo nem GIF. Precisa ser leve e nítida.
- Sequência curta, 3 a 5 passos, 2 a 4 segundos no total.
- Roda uma vez ao entrar na viewport, via `IntersectionObserver`. Não fica em laço
  infinito, que consome bateria e vira ruído.
- Estado final legível parado. Quem chega depois do fim entende o mesmo.

## Limites
- `prefers-reduced-motion` mostra o estado final direto, sem sequência.
- Nenhum dado inventado que pareça real. Número em demonstração é rotulado como exemplo.

