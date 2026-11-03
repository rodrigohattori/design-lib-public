# Comando: curar

> Nesta cópia pública não há `inbox/` nem imagens. O fluxo vale para uso local, com referências suas.

Invocação: "cura o inbox" ou "cura esta referência".

Este comando admite ou recusa material novo na biblioteca. Ele existe porque uma
biblioteca que aceita tudo perde a função de filtro e volta a ser pasta de imagens.

## Regra que não se move

O agente **propõe**. O Hattori **decide**. Nunca escreva arquivo em `familias/`,
`estruturas/` ou `taxonomia.md` antes de aprovação explícita nesta conversa.

## Etapa 1 — classificar o tipo

Toda referência ensina uma de três coisas. Decida qual antes de qualquer outra coisa:

| ensina | vai para | sinal |
|---|---|---|
| aparência | `familias/` | paleta, tipografia, textura, grafismo, movimento |
| ordem e conformidade | `estruturas/` | sequência de seções, exigência legal, prova, CTA |
| componente isolado | anexar a uma família existente | um botão, uma tabela, um card |

Referência de site inteiro quase sempre ensina as duas primeiras. Nesse caso, separe em
dois arquivos. Misturar produz ficha confusa e inútil.

## Etapa 2 — as 6 perguntas de admissão

Responda todas, por escrito, antes de propor o arquivo:

1. **É família nova ou variação de existente?** Se compartilha 4 ou mais keywords com
   família existente, é variação. Variação não vira arquivo novo, vira referência
   adicional na família existente.
2. **Cabe em uma frase?** Escreva a frase. Se não couber, a referência não está
   entendida e não entra.
3. **Qual é a fórmula?** Duas palavras cruzadas, no padrão `X x Y`. Se você não consegue
   nomear os dois eixos, não entra.
4. **Está em agrupamento padrão de IA?** Verifique contra os três conhecidos: creme
   quente com serifada de alto contraste e acento terracota; fundo quase preto com um
   único acento vivo; broadsheet com fio de cabelo e zero raio. Se estiver, identifique
   **o que exatamente** salva essa execução e registre como risco. Sem esse elemento
   isolado, a família é indefensável.
5. **Tem defeito?** Se a referência contém padrão banido no `anti-slop.md` (card dentro
   de card, grade de cards repetidos, gradiente decorativo), registre na seção "Nota
   sobre a referência" o que vale extrair e o que não vale. Referência com defeito entra,
   defeito documentado.
6. **Qual autoria?** `propria` para peça feita pelo Hattori, aprovada para mostrar a
   cliente. `coletada` para trabalho de terceiro, guardado pelo que ensina. Referência
   coletada nunca vai para a mesa do cliente.

## Etapa 2b — a barreira de qualidade

As 6 perguntas acima classificam. Esta etapa reprova. Recusa é o resultado esperado por
padrão; admissão é exceção que precisa ser argumentada.

**As 4 perguntas eliminatórias.** Falha em qualquer uma, recusa:

1. **Existe um elemento que você não viu em outro site?** Nomeie em uma frase, concreto,
   não adjetivo. "Grade que ilumina atrás do cursor" passa. "Visual moderno e limpo" é
   recusa automática.
2. **Ela sobrevive descrita em texto, sem a imagem?** Se o encanto era a fotografia, o
   modelo 3D ou o render, não há sistema por trás. Recusa. Fotografia boa é insumo, não
   família.
3. **Existe um momento, e não apenas um estilo?** Um lugar onde a página faz algo:
   demonstração viva, transição de seção, objeto que reage, escala que quebra. Página
   inteira bonita e parada não é candidata a "uau".
4. **Você mostraria isso a um cliente dizendo que é seu padrão?** Se a resposta é "serve",
   é recusa. "Serve" é a definição operacional de mediocridade.

**Onde a barreira NÃO se aplica.** Deck interno, relatório e material de comitê precisam
de credibilidade e leitura rápida, não de impacto. Família marcada como utilitária é
julgada por clareza, não por "uau". Aplicar a barreira de forma uniforme produz peça
inadequada ao contexto, o que é um erro tão grave quanto slop.

## Etapa 2c — teto de referências por família

- Família `coletada` e `validado`: **mínimo 3, máximo 6** referências.
- Família `propria`: 1 referência basta, e o teto de 6 continua valendo.
- Família `candidato`: 1 referência basta.

O piso de 3 vale só para família coletada, porque ali você está inferindo um padrão a
partir do trabalho de terceiros: uma referência isolada pode ser exceção, três formam
padrão. Em família autoral o piso não faz sentido, porque a peça não é evidência de um
padrão externo, ela **é** o padrão. O teto de 6 vale para as duas. O teto de 6 existe por peso de
repositório e custo de leitura do agente: a sétima referência de uma mesma família não
acrescenta vocabulário novo.

No teto, referência nova entra substituindo a mais fraca, que é apagada de `refs/`.
Registre no arquivo da família qual saiu e por quê.

## Etapa 2d — diferenciação obrigatória

Não existe teto de quantidade. O controle é diferenciação verificável.

Liste as famílias vivas do use-case em questão. Para cada uma, declare em quais dos 4
eixos a nova difere:

1. tipografia
2. cor
3. estrutura de página
4. comportamento

**Difere em menos de 2 eixos de qualquer família existente:** são a mesma família com
outra pintura. Nesse caso não admita as duas. Compare pelos 3 critérios de força
(elemento inédito nomeável, existência de um momento, aderência ao use-case), declare
qual vence, e proponha `morto` para a perdedora com o motivo escrito.

Referência nova pode **matar** família existente. É assim que a biblioteca melhora em vez
de engordar. O build avisa quando um use-case passa de 6 famílias, sem bloquear, porque
acima disso defender diferenciação fica difícil.

## Etapa 3 — o que o arquivo precisa ter

Nova família entra com `status: candidato`, sempre, sem exceção. Promoção para
`validado` é ato do Hattori, nunca do agente.

Candidato precisa de: frontmatter completo, uma frase de definição, quando usar, quando
não usar, no mínimo 4 e no máximo 8 keywords, seção "Nunca, nesta família" com no mínimo
3 itens, brief copiável. Teto de 60 linhas.

Promovida a `validado`, ganha a especificação completa: tipografia, cor com proporção
declarada, layout, movimento.

## Etapa 4 — fechar

Depois da aprovação: altere a fonte curada e a taxonomia quando necessário. Para
entrar na cópia pública, a fonte precisa constar em `publicacao.json` e ter liberação
de conteúdo e direitos conferida. Rode `python3 scripts/build.py` e depois `--check`,
revise as saídas e prepare um PR. Envio, integração e publicação seguem a autorização
vigente; uma referência recebida não autoriza nenhuma dessas ações. Nesta cópia não
há script de publicação nem exportação automática de imagens ou inbox privado.

## Recusa

Recuse quando: a referência é a mesma coisa que uma família existente com outra cor;
quando ela só existe por causa de uma foto boa e não tem sistema por trás; quando o
Hattori não consegue dizer o que gosta nela além de "é bonito". Registrar `status: morto`
com o motivo é mais útil que admitir família fraca.

