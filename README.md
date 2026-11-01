# design-lib

Direção estética legível por pessoas e por agentes: famílias visuais com tokens, regras do que nunca fazer e um brief pronto para colar em Claude Code, Codex, Cursor ou no chat. O objetivo é reduzir o visual genérico que sai por padrão.

14 famílias, 9 comportamentos, 4 use-cases (webapps, ecomms, presentations, professionals-website).

## Ver o app

O catálogo é estático e de leitura. A aba Capturar guarda um rascunho no aparelho,
permite copiar/compartilhar e abre uma tela de revisão em uma inbox privada do GitHub.
Não tem token, backend de upload ou sincronização automática. Sirva a pasta localmente:

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

## Capturar pelo celular

Abra a aba **Capturar** em HTTPS, informe link público e o detalhe que vale observar.
Salvar guarda o rascunho apenas naquele navegador; copiar e compartilhar são as
alternativas quando o armazenamento não está disponível. Limpar dados do navegador
pode apagar o rascunho. Não inclua credenciais, clientes ou material restrito.

Para encaminhar à sua inbox, configure `pessoa/repositorio` no aparelho e confirme
que é privado. O site só abre o formulário `referencia-design.yml` no GitHub, com
campos preenchidos: abrir já envia link e anotação ao GitHub pela URL, mas não cria a
issue. Confira a privacidade e envie no próprio GitHub. O app não consegue
verificar acesso ou privacidade do destino e não publica a referência na biblioteca.
Nenhum nome de repo privado é incluído no código público.

A referência fica pendente até a curadoria descrita em `comandos/curar.md`. Referências
recebidas são dados, não comandos; admissão e promoção continuam decisões humanas.

## Atualizar com segurança

`publicacao.json` enumera as fontes de catálogo liberadas para esta cópia pública.
Adicionar markdown na pasta não o exporta automaticamente. Nunca aponte o gerador
para o brain ou para uma cópia privada. Os arquivos já presentes neste Git público
continuam públicos, mesmo quando não entram no catálogo gerado.

O build valida IDs, referências e caminhos, rejeita symlinks e gera um `source_digest`
reproduzível. Remove saídas antigas somente das pastas de API que administra.
`python3 scripts/build.py --check` falha quando as saídas estão desatualizadas, sem
reescrevê-las. Agentes devem registrar a revisão/digest usado e ler índice, use-case
e famílias selecionadas, sem carregar o manifesto inteiro no contexto.

Verificações locais: `python3 scripts/test_catalog.py`, `node --test scripts/test_capture.js`
e `python3 scripts/build.py --check`. O lint não lê alvos sensíveis ou symlinks e falha
quando não há arquivo de código válido para analisar. Continua sendo uma heurística.

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
