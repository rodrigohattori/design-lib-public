---
familia: risograph-duplo
formula: impressão em duas tintas x serifada gorda
status: candidato
autoria: sintetizada
criado: 2026-11-01
use_cases: [presentations, ecomms]
keywords: [duas tintas sobrepostas, azul e laranja fluorescente, grão de papel, serifada gorda de exibição, sobreposição multiplicada]
---

# Risograph Duplo

Como um zine impresso em duas cores: a sobreposição cria a terceira.

## Quando usar
- Evento, comunidade, editorial, produto artesanal, deck de apresentação criativa.
- Marca com personalidade autoral.

## Quando NÃO usar
- Contexto institucional sóbrio.
- Texto longo de leitura contínua.

## Tipografia
- Titular: Young Serif ou Gloock (OFL), 40-96px.
- Corpo: Space Grotesk 15px.
- Etiqueta: mono pequeno.

## Cor
- Papel (#f3ead8), azul-tinta (#2f3f9e), laranja-fluo (#ff6a3d).
- A terceira cor nasce da sobreposição com `mix-blend-mode: multiply`.
- Tinta preta é o azul escurecido (#1c2670), nunca #000.

## Layout e espaço
- Blocos sobrepostos com desalinhamento de 4-8px de registro.
- Textura de grão por SVG de ruído, 4% de opacidade.
- Foto em duotone das duas tintas.

## Movimento
- Nenhum movimento obrigatório. `elevacao-no-hover` opcional.

## Nunca, nesta família
- Mais de 2 tintas.
- Gradiente.
- Grão pesado que reduza o contraste do texto.
- Texto de corpo sobre as duas tintas sobrepostas.

## Risco documentado desta família
Risograph virou tendência saturada. Só funciona com disciplina de duas tintas e registro desalinhado de verdade; efeito de filtro sobre cor livre é rejeitado.

## Lacuna conhecida
Acessibilidade: laranja sobre azul falha em contraste para texto. Texto só em tinta sobre papel.

## Brief copiável
```
Aesthetic: risograph duplo. Papel #f3ead8, azul-tinta #2f3f9e, laranja #ff6a3d, sobreposição com multiply, serifada gorda nos títulos, Space Grotesk no corpo.
Intent: [preencher]
Guardrails: apenas 2 tintas; sem gradiente; texto só em tinta sobre papel; grão a 4% no máximo.
```

## Tokens
```json
{
 "bg": "#f3ead8",
 "surface": "#faf3e4",
 "ink": "#1c2670",
 "muted": "#6b6a86",
 "accent": "#ff6a3d",
 "accent2": "#2f3f9e",
 "line": "#d8ccb2",
 "display": "\"Young Serif\",\"Gloock\",Georgia,serif",
 "body": "\"Space Grotesk\",system-ui,sans-serif",
 "mono": "\"Space Mono\",ui-monospace,monospace",
 "radius": 1,
 "base": 15,
 "mood": "light"
}
```

## Origem
Família sintetizada a partir de tradições gráficas públicas (tipografia modernista, impressão em duas tintas, livro-caixa, cartografia técnica). Nenhuma obra de terceiro foi copiada. As fontes sugeridas são todas de licença aberta (SIL OFL); confira a licença de cada uma antes de distribuir.
