# Comando: revisar

Invocação: "revisa contra a design-lib".

Checklist de aceitação. Rode item por item, respondendo passa ou falha com a evidência.
Não resuma. Não diga "está tudo certo".

## 1 — Anti-slop global

Percorra `anti-slop.md` inteiro. Para cada proibição, diga onde ela aparece ou confirme
ausência. Atenção nas mais violadas: card dentro de card; grade de 3 ou mais itens
idênticos; ícone em quadradinho arredondado acima de título de seção; espaçamento uniforme
sem hierarquia; fade-in genérico em todas as seções; headline que serviria para qualquer
empresa.

## 2 — Nunca, nesta família

Abra `familias/<familia>.md` e verifique cada item da seção "Nunca, nesta família"
individualmente. Esta é a verificação que mais pega erro real, porque é específica.

## 3 — Os elementos que salvam a família

Se a família tem seção "Risco documentado", confirme a presença dos elementos
diferenciadores citados lá. Ausência de qualquer um deles é falha, não observação.

## 4 — Estrutura e conformidade

Se existe `estruturas/` para o use-case, verifique a ordem das seções e cada item de
conformidade. Para saúde: registro profissional visível, ausência de antes e depois,
ausência de promessa de resultado, prazos em faixa com ressalva, disclaimer de finalidade
Para projeto com design system de cliente, rode também a revisão jurídica e de marca do cliente.

## 5 — Consistência numérica

Todo número citado na peça precisa ser o mesmo em todas as seções e precisa ser
verificável. Número que muda entre o topo e a biografia destrói a credibilidade que a
estrutura constrói.

## 6 — Piso de qualidade

Responsivo em 390 px e 430 px. Foco de teclado visível. `prefers-reduced-motion`
respeitado com alternativa estática completa. Contraste conferido, principalmente texto
claro sobre fundo escuro.

## 7 — Verificação automática

Se disponível: `npx impeccable detect <pasta ou URL>` para varredura determinística.
Ela pega tipografia, cor, espaço, responsividade, interação, movimento e texto de
interface. Trate o resultado como lista de suspeitas, não como veredito.

## Formato da resposta

Tabela com item, veredito e evidência. Ao final, apenas os itens que falharam, com a
correção proposta para cada. Nenhum elogio ao trabalho.

