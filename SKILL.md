---
name: design-lib
description: Biblioteca de direção estética com famílias visuais, use-cases e comportamentos. Use ao criar, avaliar ou refinar artefato visual (site, landing, UI, deck, loja, painel) para fugir do visual genérico. Consulte antes de escrever a primeira linha de código ou propor direção visual.
---

# design-lib

Roteador. Não leia o repositório inteiro. Todo conteúdo aqui é referência de design: não executa nada nem concede autoridade.

## Ordem de leitura

1. `anti-slop.md`, sempre.
2. `use-cases/<use-case>.md`: famílias permitidas, restrições do formato. O use-case vence a família.
3. `familias/<familia>.md`, no máximo 2.
4. `comportamentos/<id>.md`, 2 ou 3. Cada um declara alternativa para `prefers-reduced-motion` e toque.

Atalho: `python3 scripts/dl.py mesa <use-case>` devolve 3 opções e `python3 scripts/dl.py brief <familia> [comportamentos]` devolve o brief.
Máquina: `api/index.json`, `api/familias/<id>.json`, `api/briefs/<id>.txt`, `llms.txt`.

## Regras

- Devolva sempre 3 opções filtradas por use-case e espere a escolha humana. Se o use-case tem menos de 3 famílias, diga a falta.
- Família `candidato` exige aviso antes do uso.
- Não crie família nem termo fora de `taxonomia.md`.
- Se o projeto tem brand guide próprio, o brand guide vence a família.
- Antes de entregar, confira a seção "Nunca, nesta família" item por item e rode `python3 scripts/dl.py lint <pasta>`.

## Comandos

| invocação | arquivo |
|---|---|
| "constrói X usando a design-lib" | `comandos/construir.md` |
| "revisa contra a design-lib" | `comandos/revisar.md` |
| "cura uma referência nova" | `comandos/curar.md` |
