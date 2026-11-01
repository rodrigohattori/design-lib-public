---
use_case: webapps
familias_permitidas: [fintech-acido, instrumento-denso, papel-operacional, cartografia-de-dados, conversa-calma]
estruturas: []
criado: 2026-07-29
---

# Webapps

Produto digital, aplicativo, ferramenta interna, painel.

## Estado atual: 5 famílias, 4 delas candidatas sintetizadas

`fintech-acido` serve a página de venda. As quatro famílias sintetizadas (`instrumento-denso`, `papel-operacional`, `cartografia-de-dados`, `conversa-calma`) foram escritas para a interface de trabalho. Todas são `candidato`: ainda não foram validadas em produto real, e o agente deve avisar antes de usar.

A devolução de 3 opções agora é possível. Uma referência de produto operando continua sendo a melhor curadoria futura.

## O que uma família de webapp precisa cobrir, e que família de site não cobre
- Estados: vazio, carregando, erro, sucesso, sem permissão.
- Densidade de dado: tabela, lista longa, filtro, paginação.
- Navegação persistente: barra lateral, breadcrumb, hierarquia de mais de 2 níveis.
- Formulário longo com validação e recuperação de erro.
- Escala tipográfica que funciona em 13px, não em 17px.

Referência de landing page de SaaS não serve, porque mostra a vitrine e não o produto.
Ao curar para este use-case, busque captura de tela do produto operando.

## Comportamentos recomendados
`elevacao-no-hover`, `botao-com-peso`, `foco-visivel-forte`, `tabela-viva`, `estado-vazio-com-voz`, `skeleton-honesto`. Evitar `revelacao-por-scroll` em interface de
trabalho: quem usa ferramenta todo dia não quer animação de entrada.

