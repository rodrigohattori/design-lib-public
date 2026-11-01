# design-lib

Direção estética legível por pessoas e por agentes: famílias visuais com tokens, regras do que nunca fazer e um brief pronto para colar em Claude Code, Codex, Cursor ou no chat. O objetivo é reduzir o visual genérico que sai por padrão.

14 famílias, 9 comportamentos, 4 use-cases (webapps, ecomms, presentations, professionals-website).

## Ver o app

O app é estático e somente leitura. Sirva a pasta com qualquer servidor local:

```
python3 -m http.server 8765
# abra http://localhost:8765/app/
```

Busca, filtros, specimen de cada família gerado dos tokens, "Mesa de 3" (devolve 3 opções por use-case), "Montar brief" e a aba "Para agentes".

## Usar com agentes

```
python3 scripts/dl.py find tabela densa --use-case webapps
python3 scripts/dl.py mesa webapps
python3 scripts/dl.py brief instrumento-denso tabela-viva foco-visivel-forte
python3 scripts/dl.py lint ./src
```

Ou leia os arquivos estáticos: `llms.txt`, `api/index.json`, `api/familias/<id>.json`, `api/briefs/<id>.txt`. Rode `python3 scripts/build.py` depois de editar qualquer markdown.

## Estrutura

```
SKILL.md / AGENTS.md   roteador para agentes
anti-slop.md           proibições globais
taxonomia.md           listas fechadas
familias/              aparência, com tokens e brief copiável
use-cases/             restrições por tipo de projeto
comportamentos/        movimento e interação
comandos/              construir, revisar, curar
app/ api/ llms.txt     saídas geradas pelo build
scripts/               build.py, dl.py (stdlib, sem rede)
```

## Origem e limites

- `propria` e `sintetizada` são texto original. `coletada` cita obra de terceiros como inspiração; as imagens não são redistribuídas.
- As fontes do app (`app/fonts`) são todas SIL OFL 1.1, com licença e avisos em `app/fonts/OFL.txt` e `LICENSES.md`. Fontes sugeridas nos briefs também são OFL; confira cada uma ao usar em produto.
- Famílias `candidato` não foram validadas em produto real.
- O lint é heurístico e não substitui revisão humana de acessibilidade e contraste.
- Licença do repositório: a definir pelo autor.

## Precedência

brand guide do cliente > use-case > anti-slop > família > comportamento
