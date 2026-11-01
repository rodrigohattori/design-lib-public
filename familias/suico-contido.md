---
familia: suico-contido
formula: grade modernista x vermelho único
status: candidato
autoria: sintetizada
criado: 2026-11-01
use_cases: [presentations, professionals-website]
keywords: [grade de 12 colunas visível, vermelho único, alinhamento à esquerda rígido, numeração de seção, fundo de papel off-white]
---

# Suico Contido

Ordem antes de enfeite: grade, alinhamento e um vermelho que significa alguma coisa.

## Quando usar
- Escritório de advocacia, arquitetura, consultoria, deck de estratégia.
- Conteúdo textual denso que precisa de estrutura.

## Quando NÃO usar
- Marca lúdica ou afetiva.
- Conteúdo sem hierarquia clara.

## Tipografia
- Titular: Schibsted Grotesk 700 (OFL), alinhado à esquerda, entrelinha 1.05.
- Corpo: mesma família, 16px, colunas de até 62 caracteres.
- Numeração em mono pequeno.

## Cor
- Off-white (#f5f4f0), tinta (#14151a), cinza de apoio (#6a6b70).
- Vermelho (#e03a1e) para um único elemento por tela: seta, número ou link ativo.

## Layout e espaço
- Grade de 12 colunas; texto sempre na coluna 1-7; espaço negativo à direita.
- Fio horizontal de 1px entre seções.
- Imagem em proporção fixa, sempre recortada, sem cantos arredondados.

## Movimento
- `botao-com-peso`. Em deck, nenhum movimento.

## Nunca, nesta família
- Centralizar texto longo.
- Mais de um vermelho por tela.
- Cantos arredondados.
- Sombra.

## Risco documentado desta família
Estilo suíço é o clichê de portfólio de design. Funciona quando a grade serve ao texto; se vira só estética, a família perde o motivo.

## Lacuna conhecida
Sem versão para formulário e conversão. Em professionals-website combinar com estrutura de contato discreta.

## Brief copiável
```
Aesthetic: suíço contido. Off-white #f5f4f0, tinta #14151a, vermelho #e03a1e em um único elemento por tela. Schibsted Grotesk, grade de 12 colunas, texto na esquerda, fio de 1px entre seções.
Intent: [preencher]
Guardrails: sem centralizar texto longo; um vermelho por tela; sem cantos arredondados; sem sombra.
```

## Tokens
```json
{
 "bg": "#f5f4f0",
 "surface": "#ffffff",
 "ink": "#14151a",
 "muted": "#6a6b70",
 "accent": "#e03a1e",
 "accent2": "#14151a",
 "line": "#d6d4cc",
 "display": "\"Schibsted Grotesk\",system-ui,sans-serif",
 "body": "\"Schibsted Grotesk\",system-ui,sans-serif",
 "mono": "\"IBM Plex Mono\",ui-monospace,monospace",
 "radius": 0,
 "base": 16,
 "mood": "light"
}
```

## Origem
Família sintetizada a partir de tradições gráficas públicas (tipografia modernista, impressão em duas tintas, livro-caixa, cartografia técnica). Nenhuma obra de terceiro foi copiada. As fontes sugeridas são todas de licença aberta (SIL OFL); confira a licença de cada uma antes de distribuir.
