# Taxonomia

Listas fechadas. Agente não cria termo novo. Termo novo entra só por decisão do Hattori,
editando este arquivo.

## Eixo A — famílias estéticas

Geradas pelo build a partir de `familias/*.md`. Veja `app/manifest.json` ou `api/index.json` para a lista atual.

`propria` é peça feita pelo curador. `coletada` é trabalho de terceiro, guardado pelo que ensina, sem endosso de execução e sem redistribuir a imagem. `sintetizada` é família escrita a partir de tradições gráficas públicas, sem copiar obra específica.

## Eixo B — use-cases

| id | o que é |
|---|---|
| professionals-website | profissional liberal: dentista, médico, terapeuta, advogado |
| presentations | deck, proposta, material de parceiro |
| ecomms | loja de produto físico, Shopify |
| webapps | produto digital, aplicativo, painel |

Quando um use-case tem menos de 3 famílias, o agente declara a falta em vez de inventar a terceira.

## Eixo C — comportamentos

Movimento e interação são ortogonais à aparência: o mesmo comportamento serve a famílias
diferentes, e a mesma família aceita comportamentos diferentes.

| id | custo | o que é |
|---|---|---|
| grade-reativa-ao-cursor | médio | grade técnica que ilumina em raio curto atrás do cursor |
| demonstracao-viva | alto | o bloco de serviço mostra o serviço funcionando em miniatura |
| elevacao-no-hover | baixo | card sobe 3px e ganha contraste de borda, nada além |
| botao-com-peso | baixo | botão escurece no hover, afunda 2% no clique, volta rápido |
| revelacao-por-scroll | baixo | entrada com 8 a 12px, uma vez, 3 ou 4 momentos por página |
| estado-vazio-com-voz | baixo | tela vazia com texto próprio do produto e uma ação |
| skeleton-honesto | baixo | carregamento com a forma real do conteúdo, sem brilho |
| foco-visivel-forte | baixo | anel de foco de 2px, contraste 3:1 |
| tabela-viva | médio | tabela com cabeçalho fixo, ordenação e teclado |

Todo comportamento declara alternativa para `prefers-reduced-motion` e para toque. Sem as
duas declarações, não entra. Não se aplica a `presentations`, onde não existe hover nem
scroll.

## Estruturas

Ordem de seções e conformidade, não aparência.

Nenhuma estrutura publicada nesta cópia.

## Regras de admissão e devolução

| regra | valor |
|---|---|
| diferenciação obrigatória | família nova difere de toda existente no mesmo use-case em pelo menos **2 de 4 eixos**: tipografia, cor, estrutura de página, comportamento |
| referências por família coletada | mínimo 3, máximo 6 |
| referências por família autoral | 1 a 6 |
| devolução ao pedir direção | sempre **3 opções**, filtradas por use-case, objetivo e público |
| opções na mesa do cliente | máximo 6, ideal 3 |
| aviso de excesso | acima de 6 famílias em um use-case, o build avisa. Não bloqueia |

Não existe teto rígido de famílias. O controle é a diferenciação: quantas famílias
realmente distintas você consegue defender.

## Status

- `candidato` — coletado, não validado. Agente avisa antes de usar.
- `validado` — Hattori confirmou. Uso livre nos use-cases que a listam.
- `morto` — testada e rejeitada, com motivo escrito. Fica como registro negativo.

