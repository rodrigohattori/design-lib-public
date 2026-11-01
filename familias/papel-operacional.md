---
familia: papel-operacional
formula: ferramenta de escritório x livro-caixa
status: candidato
autoria: sintetizada
criado: 2026-11-01
use_cases: [webapps]
keywords: [papel quente com tinta azul, títulos serifados em ferramenta, tabela de livro-caixa, carimbo de estado, corpo 14px, anotação à margem]
---

# Papel Operacional

Software que parece um caderno de contas bem mantido: papel, tinta, carimbo, nada gritando.

## Quando usar
- Financeiro, jurídico, contábil, saúde administrativa, logística leve.
- Usuário que lê muito e precisa confiar no número.

## Quando NÃO usar
- Produto de entretenimento ou social.
- Onde a marca exige aparência de tecnologia de ponta.

## Tipografia
- Titular: serifada de texto (Newsreader ou Source Serif 4, OFL), 20-28px, peso 500.
- Corpo: Public Sans 14px, entrelinha 1.5.
- Número: tabular, mesma sans, alinhado à direita; total em serifada.

## Cor
- Papel quente (#f4efe4), superfície (#fbf8f1), tinta azul-escura (#1f2a37) para texto.
- Azul-tinta (#23428f) para ação; terracota (#b4452f) para erro e estorno.
- Linhas finas cor de papel velho (#d9d1bd). Sem sombra.

## Layout e espaço
- Colunas de livro-caixa: data, descrição, valor, saldo. Linha de total com fio duplo.
- Estado como carimbo textual (PAGO, PENDENTE), não pílula colorida.
- Barra superior em vez de lateral quando a árvore tem 1 nível.

## Movimento
- `botao-com-peso`, `elevacao-no-hover` e `foco-visivel-forte`. Transição de 150ms.

## Nunca, nesta família
- Sombra suave de card.
- Pílula colorida como estado.
- Fonte serifada no corpo da tabela.
- Branco puro (#fff) como fundo.

## Risco documentado desta família
Papel creme virou clichê de site editorial. Em webapp o que diferencia é o livro-caixa real, com saldo corrente e total em fio duplo. Sem a estrutura de livro, é estética sem função.

## Lacuna conhecida
Sem gráfico definido. Gráfico deve ser em traço fino, uma cor, sem preenchimento.

## Brief copiável
```
Aesthetic: papel operacional. Papel quente #f4efe4, tinta #1f2a37, azul-tinta #23428f para ação, terracota #b4452f para erro. Títulos serifados, corpo Public Sans 14px, tabela em colunas de livro-caixa com total em fio duplo, estado em carimbo textual.
Intent: [preencher]
Guardrails: sem sombra; sem pílula colorida; sem fundo branco puro; número tabular alinhado à direita.
```

## Tokens
```json
{
 "bg": "#f4efe4",
 "surface": "#fbf8f1",
 "ink": "#1f2a37",
 "muted": "#6b6f76",
 "accent": "#23428f",
 "accent2": "#b4452f",
 "line": "#d9d1bd",
 "display": "\"Newsreader\",\"Source Serif 4\",Georgia,serif",
 "body": "\"Public Sans\",system-ui,sans-serif",
 "mono": "\"IBM Plex Mono\",ui-monospace,monospace",
 "radius": 2,
 "base": 14,
 "mood": "light"
}
```

## Origem
Família sintetizada a partir de tradições gráficas públicas (tipografia modernista, impressão em duas tintas, livro-caixa, cartografia técnica). Nenhuma obra de terceiro foi copiada. As fontes sugeridas são todas de licença aberta (SIL OFL); confira a licença de cada uma antes de distribuir.
