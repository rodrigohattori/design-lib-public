---
familia: monumental-domestico
formula: tipo colossal x still doméstico quente
status: candidato
autoria: coletada
criado: 2026-07-29
use_cases: [ecomms]
keywords: [wordmark tipográfico full-bleed sem margem, legenda em pílula escura sobre a foto, still doméstico com luz quente, paleta terracota e verde-oliva de produto, bento assimétrico foto grande + foto/texto empilhado, botão pill preto com seta]
---

# Monumental Doméstico

Loja de mobília onde o nome da marca ocupa a largura inteira da tela, e a legenda do produto mora dentro da própria fotografia.

## Quando usar
- Produto físico de lifestyle/casa com fotografia própria consistente e de estúdio.
- Marca que quer ocupar espaço com confiança tipográfica, sem depender de ficha técnica densa.

## Quando NÃO usar
- Sem fotografia de produto consistente (mesma luz, mesmo enquadramento) em toda a linha.
- Produto técnico onde especificação é o argumento principal — aqui não há espaço de tabela.

## Nunca, nesta família
- Legenda sobre foto sem contraste suficiente para leitura (mínimo AA).
- Wordmark repetido mais de uma vez na mesma página — o efeito é de abertura única.
- Grid de 3+ cards idênticos abaixo do hero sem variar enquadramento.

## Nota sobre a referência
Risco de agrupamento adjacente: wordmark colossal full-bleed como herói é recorrente em site de DTC/SaaS 2024-2026. O que salva esta execução: a legenda embutida dentro da foto (pílula ancorada na imagem, não abaixo dela), o bento assimétrico de duas fotos em escalas desiguais, e a paleta real de still de produto (terracota/oliva genuínos, não decorativos). Referência é 100% estática — nenhum "momento" (interação, transição, objeto que reage) visível, o que falha a letra da eliminatória #3 do `comandos/curar.md`. Admitida mesmo assim por decisão do Hattori; registrado aqui como ressalva permanente, não resolvida.

## Brief copiável
```
Aesthetic: monumental doméstico. Wordmark em caixa alta ocupando a largura total do
herói, sem margem lateral. Fotografia de still doméstico com luz quente (terracota,
verde-oliva, madeira). Legenda do produto em pílula escura semi-opaca ancorada dentro
da própria foto. Bento assimétrico: uma foto grande + módulo foto/texto empilhado ao
lado. Botão pill preto com seta.
Intent: [preencher]
Guardrails: nunca wordmark duplicado na página; legenda sempre com contraste AA; nunca
grid de 3+ cards idênticos.
```

## Tokens
Ilustrativo: valores derivados da descrição textual da família, não extraídos da obra de referência.
```json
{
 "bg": "#e8dcc8",
 "surface": "#f1e8d6",
 "ink": "#2a211a",
 "muted": "#7a6c5a",
 "accent": "#b5542b",
 "accent2": "#6c7a52",
 "line": "#cdbfa6",
 "display": "\"Archivo\",\"Archivo Black\",system-ui,sans-serif",
 "body": "\"Work Sans\",system-ui,sans-serif",
 "mono": "\"IBM Plex Mono\",monospace",
 "radius": 0,
 "base": 16,
 "mood": "light",
 "derived": true
}
```

## Referências
- Sordjati (sofá e cadeira). Obra de terceiro, citada como inspiração. A imagem não é redistribuída neste repositório; procure o original na fonte.
