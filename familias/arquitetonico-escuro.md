---
familia: arquitetonico-escuro
formula: grotesca extendida x volume escuro
status: candidato
autoria: coletada
criado: 2026-07-29
use_cases: [professionals-website, ecomms]
keywords: [grotesca extendida em caps, ardósia escura, fotografia arquitetônica noturna, numeração 01-04, tabela de dados com fio fino, planta técnica como imagem]
---

# Arquitetônico Escuro

Portfólio de arquiteto: tipo largo em caixa alta, volume escuro, foto noturna, dado técnico exposto.

## Quando usar
- Produto ou serviço onde especificação técnica é argumento de venda.
- Existe fotografia noturna ou de produto com iluminação controlada.

## Quando NÃO usar
- Conteúdo emocional ou de cuidado. O tipo extendido em caps soa institucional e frio.
- Sem dado técnico real para expor. A tabela vazia denuncia.

## Nunca, nesta família
- Card dentro de card. A referência original faz isso e é o ponto fraco dela.
- Grotesca extendida em texto de corpo. Só em título.
- Mais de um nível de raio de canto na mesma página.

## Nota sobre a referência
Esta é referência com defeito. A tela original aninha blocos escuros dentro de blocos escuros, que é padrão banido no `anti-slop.md`. O que vale extrair é a tipografia extendida em caps, a tabela de dados com fio fino e a planta técnica usada como imagem de conteúdo. O empilhamento de cards não vale.

## Brief copiável
```
Aesthetic: arquitetônico escuro. Base ardósia escura, títulos em grotesca extendida
caixa alta, fotografia arquitetônica noturna, numeração 01-04 em seção de serviços,
tabela de dados técnicos com fio fino e valores alinhados à direita, planta ou
diagrama técnico como imagem de conteúdo.
Intent: [preencher]
Guardrails: nunca card dentro de card; grotesca extendida só em título; um único raio
de canto na página; tabela só com dado real.
```

## Tokens
Ilustrativo: valores derivados da descrição textual da família, não extraídos da obra de referência.
```json
{
 "bg": "#15181b",
 "surface": "#1d2125",
 "ink": "#e4e6e3",
 "muted": "#858c92",
 "accent": "#c9d1d6",
 "accent2": "#8aa0ad",
 "line": "#2e343a",
 "display": "\"Archivo\",\"Archivo Black\",system-ui,sans-serif",
 "body": "\"Work Sans\",system-ui,sans-serif",
 "mono": "\"IBM Plex Mono\",monospace",
 "radius": 0,
 "base": 15,
 "mood": "dark",
 "derived": true
}
```

## Referências
- Glasshaven (imobiliário). Obra de terceiro, citada como inspiração. A imagem não é redistribuída neste repositório; procure o original na fonte.
