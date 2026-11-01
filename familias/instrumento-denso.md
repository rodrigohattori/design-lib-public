---
familia: instrumento-denso
formula: console de operação x grafite quente
status: candidato
autoria: sintetizada
criado: 2026-11-01
use_cases: [webapps]
keywords: [tabela densa com números tabulares, grafite quente com âmbar, corpo 13px, barra lateral de 2 níveis, estados vazio carregando erro, atalho de teclado visível]
---

# Instrumento Denso

Painel de quem opera o dia inteiro: denso, legível a 13px, sem enfeite que atrase o olho.

## Quando usar
- Ferramenta interna, painel de operação, back-office, ferramenta de analista.
- Usuário diário que valoriza velocidade de leitura e atalho de teclado.

## Quando NÃO usar
- Página de venda ou onboarding emotivo. A densidade assusta quem chega.
- Público ocasional ou idoso sem treinamento.

## Tipografia
- Titular: grotesca neutra de peso 600, 15-18px, sem caixa alta (Schibsted Grotesk ou IBM Plex Sans, ambas OFL).
- Corpo: IBM Plex Sans 13px, entrelinha 1.45.
- Número: IBM Plex Mono ou fonte com `font-variant-numeric: tabular-nums`, sempre alinhado à direita em coluna.

## Cor
- Base grafite com temperatura quente (#1b1a18), superfície um degrau acima (#232220). Nunca #000.
- Âmbar (#e8a33d) como único acento de ação. Verde-azulado (#6fb7a0) só para estado de sucesso.
- Contraste de texto principal acima de 7:1; texto secundário acima de 4.5:1.

## Layout e espaço
- Barra lateral de 220px com até 2 níveis; breadcrumb para o terceiro.
- Tabela como protagonista: cabeçalho fixo, linha de 32px, zebra só por borda inferior fina.
- Estados obrigatórios por tela: vazio, carregando, erro, sem permissão, sucesso.

## Movimento
- `elevacao-no-hover` só em card clicável. `foco-visivel-forte` em tudo. `skeleton-honesto` no carregamento.
- Nada de `revelacao-por-scroll`: ferramenta de trabalho não anima entrada.

## Nunca, nesta família
- Gradiente decorativo.
- Corpo acima de 15px em tabela.
- Ícone sem rótulo em ação destrutiva.
- Cor como única marca de estado (sempre ícone ou texto junto).

## Risco documentado desta família
Fundo escuro com acento âmbar é comum em dashboard de 2024-2026. O que diferencia aqui é a densidade real, o número tabular e o estado vazio com voz. Sem isso é só skin.

## Lacuna conhecida
Não cobre formulário longo multi-passo nem edição inline de célula. Curar uma referência de produto operando antes de promover a validado.

## Brief copiável
```
Aesthetic: instrumento denso. Grafite quente (#1b1a18), âmbar (#e8a33d) como único acento, corpo 13px, números tabulares em mono, tabela protagonista com cabeçalho fixo.
Intent: [preencher]
Guardrails: sem gradiente; cor nunca é o único sinal de estado; todo estado (vazio, carregando, erro, sem permissão) desenhado; foco visível de 2px.
```

## Tokens
```json
{
 "bg": "#1b1a18",
 "surface": "#232220",
 "ink": "#ece8df",
 "muted": "#8e887c",
 "accent": "#e8a33d",
 "accent2": "#6fb7a0",
 "line": "#3a3833",
 "display": "\"Schibsted Grotesk\",\"IBM Plex Sans\",system-ui,sans-serif",
 "body": "\"IBM Plex Sans\",system-ui,sans-serif",
 "mono": "\"IBM Plex Mono\",ui-monospace,monospace",
 "radius": 3,
 "base": 13,
 "mood": "dark"
}
```

## Origem
Família sintetizada a partir de tradições gráficas públicas (tipografia modernista, impressão em duas tintas, livro-caixa, cartografia técnica). Nenhuma obra de terceiro foi copiada. As fontes sugeridas são todas de licença aberta (SIL OFL); confira a licença de cada uma antes de distribuir.
