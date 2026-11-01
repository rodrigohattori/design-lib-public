---
familia: feira-impressa
formula: cartaz de feira x etiqueta de preço
status: candidato
autoria: sintetizada
criado: 2026-11-01
use_cases: [ecomms]
keywords: [amarelo-manteiga com vermelho, etiqueta de preço inclinada, grotesca expandida pesada, faixa de carimbo, preço como protagonista]
---

# Feira Impressa

Loja que grita com carinho: preço, etiqueta e cartaz, sem fingir sofisticação.

## Quando usar
- Alimento, bebida, utilidade, moda popular, kit e assinatura.
- Marca de tom caloroso e preço acessível.

## Quando NÃO usar
- Luxo ou serviço profissional.
- Marca de tom clínico.

## Tipografia
- Titular: Archivo expandido peso 800 (OFL), caixa alta, 32-64px.
- Corpo: Archivo 15px.
- Preço: Archivo 800, 28-40px, tabular.

## Cor
- Manteiga (#f7e9c8), tinta (#1d1a16), vermelho-feira (#d7261e), verde-folha (#1b5e4b).
- Vermelho só em preço e etiqueta. Verde só em confirmação.

## Layout e espaço
- Etiqueta de preço inclinada em -2 graus, estática.
- Faixas horizontais alternando manteiga e tinta.
- Botão de compra largo, com sombra dura de 3px (sem desfoque).

## Movimento
- `botao-com-peso` obrigatório. `elevacao-no-hover` nos cartões.

## Nunca, nesta família
- Sombra com desfoque.
- Rotação animada.
- Mais de 2 etiquetas por tela.
- Vermelho em texto longo.

## Risco documentado desta família
Vermelho e amarelo remetem a varejo barato se mal executados. A diferença está na tipografia expandida bem espaçada e na disciplina de usar vermelho só em preço.

## Lacuna conhecida
Sem versão para assinatura recorrente e carrinho. Definir.

## Brief copiável
```
Aesthetic: feira impressa. Manteiga #f7e9c8, tinta #1d1a16, vermelho #d7261e só em preço e etiqueta. Archivo expandido 800 em caixa alta, etiqueta inclinada estática, sombra dura de 3px.
Intent: [preencher]
Guardrails: sem sombra com desfoque; sem rotação animada; vermelho só em preço; no máximo 2 etiquetas por tela.
```

## Tokens
```json
{
 "bg": "#f7e9c8",
 "surface": "#fff6de",
 "ink": "#1d1a16",
 "muted": "#6f6553",
 "accent": "#d7261e",
 "accent2": "#1b5e4b",
 "line": "#d9c796",
 "display": "\"Archivo\",\"Archivo Black\",system-ui,sans-serif",
 "body": "\"Archivo\",system-ui,sans-serif",
 "mono": "\"IBM Plex Mono\",ui-monospace,monospace",
 "radius": 2,
 "base": 15,
 "mood": "light"
}
```

## Origem
Família sintetizada a partir de tradições gráficas públicas (tipografia modernista, impressão em duas tintas, livro-caixa, cartografia técnica). Nenhuma obra de terceiro foi copiada. As fontes sugeridas são todas de licença aberta (SIL OFL); confira a licença de cada uma antes de distribuir.
