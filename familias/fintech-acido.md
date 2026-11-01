---
familia: fintech-acido
formula: grotesca pesada x verde ácido
status: candidato
autoria: coletada
criado: 2026-07-29
use_cases: [webapps, presentations]
keywords: [grotesca condensada pesada em caps, verde ácido sobre quase preto, número real em escala grande, captura de painel como prova, alternância preto creme ácido, headline afirmativa curta]
---

# Fintech Ácido

Painel de tesouraria gritando: caixa alta pesada, verde ácido, número real na cara.

## Quando usar
- Produto digital com número que impressiona e pode ser mostrado de verdade.
- Público que valoriza objetividade e desconfia de tom institucional.

## Quando NÃO usar
- Saúde e cuidado. O ácido é agressivo e o contexto pede o contrário.
- Sem dado real. A família depende de número verdadeiro, senão soa vazia.

## Tipografia
- Titular: grotesca condensada pesada, caixa alta, no máximo 7 palavras.
- Corpo: sans neutra de peso médio, 14-15px. Densidade acima de conforto.
- Número em destaque: mesma grotesca, escala 3x a 5x o corpo, tabular.

## Cor
- Base quase preta com temperatura, nunca #000.
- Ácido como único acento, em área grande no máximo em uma seção.
- Creme como terceira faixa, para quebrar a sequência escura.
- Proporção: escuro 65%, creme 25%, ácido 10%.

## Layout e espaço
- Blocos chapados, alternando preto, creme e ácido. Transição por corte, não por degradê.
- Captura de painel do produto como prova em cada seção de argumento.
- Indicadores numéricos em fila no topo da seção, com fio fino separando.

## Movimento
- `elevacao-no-hover` na grade. `botao-com-peso` no CTA.
- Evitar `revelacao-por-scroll`: interface de trabalho não quer animação de entrada.

## Nunca, nesta família
- Gradiente. A família é chapada.
- Verde ácido em área grande em mais de uma seção.
- Headline com mais de 7 palavras.
- Número inventado ou ilustrativo sem rótulo de exemplo.

## Risco documentado desta família
Fundo quase preto com um único acento vivo é o segundo agrupamento mais comum de output de
IA hoje. O par de cores não diferencia nada. O que diferencia esta execução é a grotesca
condensada pesada em caixa alta, o dado real em escala grande e a alternância brusca entre
preto, creme e ácido. Entrega só com o par de cores é slop com outra roupa: rejeitar.

## Lacuna conhecida
A referência é landing page, então mostra a vitrine e não o produto. Para uso pleno em
`webapps` faltam estados (vazio, carregando, erro, sem permissão), densidade de tabela e
navegação de mais de 2 níveis. Ao curar a próxima referência para este use-case, buscar
captura do produto operando, não da página de venda.

## Brief copiável
```
Aesthetic: fintech ácido. Base quase preta com temperatura, verde ácido como único acento,
títulos em grotesca condensada pesada caixa alta com até 7 palavras, número real em escala
grande e tabular, captura de painel do produto como prova, seções alternando preto, creme
e ácido em blocos chapados com transição por corte.
Intent: [preencher]
Guardrails: nunca gradiente; ácido em área grande no máximo em uma seção; headline com até
7 palavras; todo número real ou rotulado como exemplo; sem revelação por scroll.
```

## Tokens
Ilustrativo: valores derivados da descrição textual da família, não extraídos da obra de referência.
```json
{
 "bg": "#121310",
 "surface": "#1a1c17",
 "ink": "#f3efe0",
 "muted": "#8d8f80",
 "accent": "#c8f23a",
 "accent2": "#f3efe0",
 "line": "#34372d",
 "display": "\"Archivo\",\"Archivo Black\",system-ui,sans-serif",
 "body": "\"Work Sans\",system-ui,sans-serif",
 "mono": "\"IBM Plex Mono\",monospace",
 "radius": 0,
 "base": 14,
 "mood": "dark",
 "derived": true
}
```

## Referências
- Plumline (tesouraria). Obra de terceiro, citada como inspiração. A imagem não é redistribuída neste repositório; procure o original na fonte.
