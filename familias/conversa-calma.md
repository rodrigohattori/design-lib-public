---
familia: conversa-calma
formula: assistente conversacional x papelaria suave
status: candidato
autoria: sintetizada
criado: 2026-11-01
use_cases: [webapps]
keywords: [verde-sálvia sobre creme, cantos de 14px, bolha de mensagem assimétrica, amarelo-mel como destaque, respiro generoso]
---

# Conversa Calma

Produto em que o usuário conversa: calmo, redondo, sem a estética de laboratório.

## Quando usar
- Assistente, coaching, saúde mental, educação, produto de consumo com conversa.
- Primeira experiência de produto para público leigo.

## Quando NÃO usar
- Ferramenta densa de operação.
- Contexto de risco financeiro ou jurídico alto, que pede tom mais sóbrio.

## Tipografia
- Titular: Bricolage Grotesque 600 (OFL), 22-34px.
- Corpo: DM Sans 16px, entrelinha 1.55.
- Mono só para código e identificador.

## Cor
- Creme (#f6f3ec), superfície (#fffdf8), tinta (#25302a).
- Sálvia (#3d6b57) para ação; mel (#e7b24a) para destaque pontual.
- Bolha do usuário em sálvia; bolha do sistema em superfície com borda.

## Layout e espaço
- Coluna central de 680px; entrada de mensagem fixa na base.
- Sugestões iniciais em lista vertical de 3, não em grade.
- Estado de erro com texto humano e ação de tentar de novo.

## Movimento
- `botao-com-peso`, `estado-vazio-com-voz`, `skeleton-honesto`. Indicador de digitação em 3 pontos lentos, com alternativa estática em `prefers-reduced-motion`.

## Nunca, nesta família
- Gradiente roxo-azul.
- Avatar de robô com brilho.
- Frase de boas-vindas genérica.
- Bolha idêntica para os dois lados.

## Risco documentado desta família
Interface de chat com cantos redondos e tom pastel é o padrão de produto de IA. O que diferencia é a voz do texto de estado e a assimetria das bolhas.

## Lacuna conhecida
Sem definição de anexo, voz e histórico longo. Curar produto operando.

## Brief copiável
```
Aesthetic: conversa calma. Creme #f6f3ec, sálvia #3d6b57, mel #e7b24a, cantos de 14px, Bricolage Grotesque nos títulos e DM Sans 16px no corpo, coluna central de 680px.
Intent: [preencher]
Guardrails: sem gradiente roxo-azul; sem avatar de robô brilhante; texto de estado com voz própria; bolhas assimétricas.
```

## Tokens
```json
{
 "bg": "#f6f3ec",
 "surface": "#fffdf8",
 "ink": "#25302a",
 "muted": "#6d776f",
 "accent": "#3d6b57",
 "accent2": "#e7b24a",
 "line": "#e1dccf",
 "display": "\"Bricolage Grotesque\",\"DM Sans\",system-ui,sans-serif",
 "body": "\"DM Sans\",system-ui,sans-serif",
 "mono": "\"IBM Plex Mono\",ui-monospace,monospace",
 "radius": 14,
 "base": 16,
 "mood": "light"
}
```

## Origem
Família sintetizada a partir de tradições gráficas públicas (tipografia modernista, impressão em duas tintas, livro-caixa, cartografia técnica). Nenhuma obra de terceiro foi copiada. As fontes sugeridas são todas de licença aberta (SIL OFL); confira a licença de cada uma antes de distribuir.
