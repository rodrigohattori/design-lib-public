---
familia: vitrine-silenciosa
formula: galeria de objeto x tipografia contida
status: candidato
autoria: sintetizada
criado: 2026-11-01
use_cases: [ecomms]
keywords: [fundo de pedra clara, produto grande e isolado, serifada de exibição, terracota como único acento, muito respiro]
---

# Vitrine Silenciosa

Loja em que o produto é a obra e a interface se cala.

## Quando usar
- Objeto de design, cerâmica, mobiliário, joalheria, papelaria.
- Catálogo curto com fotografia própria.

## Quando NÃO usar
- Catálogo grande com filtro pesado.
- Oferta baseada em desconto e urgência.

## Tipografia
- Titular: Instrument Serif (OFL), 40-72px, peso normal.
- Corpo e preço: Work Sans 15px; preço em tabular.
- Eyebrow: caixa alta 11px com tracking largo.

## Cor
- Pedra (#f2f0ec), tinta (#191816), cinza quente para apoio (#7a756c).
- Terracota (#8a3b20) só no botão de compra e no estado selecionado.
- Sem fundo branco puro.

## Layout e espaço
- Uma imagem por tela de produto, 70% da altura; texto em coluna estreita.
- Grade de catálogo com 2 colunas, imagem sem moldura e legenda mínima.
- Carrinho como painel lateral, não página.

## Movimento
- `elevacao-no-hover` na imagem, `botao-com-peso` na compra, `revelacao-por-scroll` leve.

## Nunca, nesta família
- Selo de desconto ou contador regressivo.
- Fundo de produto com cor saturada.
- Grade de 4 colunas com cartões idênticos.

## Risco documentado desta família
Minimalismo de loja vira genérico sem fotografia boa. Sem imagem própria e consistente, a família não existe.

## Lacuna conhecida
Sem estrutura de página de carrinho e checkout. Definir antes de promover.

## Brief copiável
```
Aesthetic: vitrine silenciosa. Pedra #f2f0ec, tinta #191816, terracota #8a3b20 só na compra. Instrument Serif nos títulos, Work Sans no corpo, uma imagem grande por produto.
Intent: [preencher]
Guardrails: sem selo de desconto; sem contador regressivo; fotografia própria e consistente; sem fundo branco puro.
```

## Tokens
```json
{
 "bg": "#f2f0ec",
 "surface": "#faf9f6",
 "ink": "#191816",
 "muted": "#7a756c",
 "accent": "#8a3b20",
 "accent2": "#c9a24f",
 "line": "#dcd8d0",
 "display": "\"Instrument Serif\",Georgia,serif",
 "body": "\"Work Sans\",system-ui,sans-serif",
 "mono": "\"IBM Plex Mono\",ui-monospace,monospace",
 "radius": 0,
 "base": 15,
 "mood": "light"
}
```

## Origem
Família sintetizada a partir de tradições gráficas públicas (tipografia modernista, impressão em duas tintas, livro-caixa, cartografia técnica). Nenhuma obra de terceiro foi copiada. As fontes sugeridas são todas de licença aberta (SIL OFL); confira a licença de cada uma antes de distribuir.
