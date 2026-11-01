---
comportamento: estado-vazio-com-voz
custo: baixo
familias: [instrumento-denso, conversa-calma, papel-operacional]
criado: 2026-11-01
---

# Estado vazio com voz

Tela vazia explica o que vai aparecer ali, por que está vazia e qual é a próxima ação, com texto que só serviria a este produto.

## Por que funciona
Estado vazio é o primeiro contato real com o produto. Texto genérico ("Nada aqui ainda") desperdiça o momento.

## Implementação
- Uma frase que diz o que preenche a tela e uma ação primária.
- Opcional: exemplo real colapsado, rotulado como exemplo.
- Separar vazio por falta de dado, vazio por filtro e vazio por permissão: três textos diferentes.

## Nunca
- Ilustração genérica de pessoa com lupa.
- Mais de uma ação primária.
- Texto que serviria a outro produto.

## Limites
- Sem movimento. Nada a declarar para `prefers-reduced-motion` nem toque.
