# Arquitetura do sistema

## Problema que este repositório resolve

Injetar direção estética específica em qualquer agente de IA, em 4 ferramentas
diferentes, sem que o custo de manutenção cresça com o tamanho da biblioteca.

## Os dois eixos

Uma biblioteca de eixo único (só família estética) não serve, porque o mesmo
repositório atende consultório odontológico, clínica médica, webapp, loja Shopify
e material corporativo. Então:

- **Eixo A — família estética** (`familias/`): como aquilo se parece e por quê.
- **Eixo B — use-case** (`use-cases/`): 5 tipos de projeto, com famílias permitidas,
  restrições regulatórias e de formato. O use-case vence a família em conflito.
- **Eixo C — comportamento** (`comportamentos/`): movimento e interação, ortogonal aos
  outros dois.
- **Estruturas** (`estruturas/`): ordem de seções e conformidade, separado de aparência.

Referência entra com 1 família e N use-cases compatíveis. Projeto aponta para 1 use-case.
Assim um projeto com brand guide e `professionals-website` compartilham o anti-slop e nunca
compartilham direção estética por acidente.

## Restrição de custo de contexto (regra de projeto)

A biblioteca vai crescer. Nenhum agente pode ler o repositório inteiro.

- `SKILL.md` é roteador, máximo 40 linhas.
- Um agente lê 1 use-case, no máximo 2 famílias e 2 ou 3 comportamentos. Nada além.
- Um agente lê: `anti-slop.md` + 1 use-case + no máximo 2 famílias. Nada além.
- Arquivo de família: máximo 60 linhas. Se não cabe, a família está confusa.
- `taxonomia.md` é lista fechada. Agente não inventa termo novo.

## Ingestão versus julgamento

| Etapa | Quem faz | Por quê |
|---|---|---|
| Print chega no repositório | automatizável (Fase 3) | trabalho mecânico, zero decisão |
| Extração de vocabulário do print | agente **propõe** | o agente vê rápido, mas vê a média |
| Aceitar, editar, matar | Hattori, sempre | é aqui que o taste existe |
| Compilar saídas | script | determinístico |

Automatizar o julgamento destrói o ativo. Esta linha não se move.

## Saídas

| Consumidor | Rota |
|---|---|
| Claude Code, Codex, Cursor | clone + `SKILL.md` / `AGENTS.md`, ou `python3 scripts/dl.py` |
| Qualquer agente com leitura web | `llms.txt`, `api/index.json`, `api/briefs/<id>.txt` |
| Pessoa | `app/index.html` servido localmente ou em hospedagem estática |

O build (`scripts/build.py`) gera `app/manifest.json`, `api/` e `llms.txt` só com a biblioteca padrão do Python. Tudo é estático e somente leitura: sem upload, sem conta, sem rede.

## Segurança

- O app renderiza dados com `textContent`, nunca `innerHTML`, e usa CSP (`default-src 'none'`, script, estilo, fonte e imagem só de `self`) sem script ou estilo inline.
- Os briefs começam com uma linha que marca o conteúdo como referência de design, não instrução de sistema.
- O lint (`dl.py lint`) lê arquivos locais e não executa nada.

## O que este sistema deliberadamente não faz

- Não gera imagem. Se precisar de hero, o caminho é MCP de geração no Claude Code.
- Não substitui design system de cliente. Onde existe design system, ele é lei.
- Não guarda pin do Pinterest por link. Pinterest bloqueia leitura automática;
  print é a única entrada confiável.

