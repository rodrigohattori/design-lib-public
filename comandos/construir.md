# Comando: construir

Invocação: "constrói <coisa> usando a design-lib".

## Os 4 elementos que todo prompt precisa

A biblioteca existe para preencher três dos quatro automaticamente:

| elemento | de onde vem |
|---|---|
| aesthetic | `familias/<familia>.md`, campo "Brief copiável", mais 2 ou 3 de `comportamentos/` |
| reference | `refs/<familia>/*.webp`, lidos do disco pelo Claude Code e Codex |
| intent | `projetos/<projeto>.md` e `use-cases/<use-case>.md`, mais o que o Hattori disser |
| guardrails | `anti-slop.md` mais a seção "Nunca, nesta família" |

Faltando qualquer um dos quatro, pergunte. Não invente intent.

## Fluxo

O método comum de "gerar 5 estilos às cegas e escolher" existe para quem não tem
biblioteca. Com biblioteca catalogada, o passo 1 muda de natureza: em vez de 5 tentativas
aleatórias, são 3 famílias já filtradas por use-case.

**Limite de opções na mesa.** Nunca apresente mais de 6 direções a um cliente, e prefira
3. Acima disso o tempo de decisão cresce e a pessoa escolhe por cansaço, não por
preferência. E jamais inclua uma opção que você não quer que seja escolhida: ela pode ser
escolhida.

1. **Filtrar.** Leia `projetos/<projeto>.md`. Se não existe, pergunte o use-case, o
   objetivo e o público. Devolva exatamente **3 opções** compatíveis, cada uma com a frase
   de definição, o risco documentado e por que ela serve a este objetivo. Espere a escolha.
   Se o use-case tem menos de 3 famílias, diga isso em vez de inventar a terceira.
2. **Uma família, três variações.** Construa 3 versões da mesma família, variando apenas
   estrutura de corpo, nunca paleta nem tipografia. Variar paleta nesta etapa desperdiça a
   escolha do passo 1.
3. **Herói depois.** Só depois da variação escolhida, resolva a imagem principal. Se
   houver MCP de geração de imagem disponível, gere 3 e compare. Se não houver, declare
   que a imagem é pendência e siga com placeholder marcado.
4. **Barra de tweaks.** Construa uma barra flutuante no servidor de desenvolvimento com
   controle ao vivo para: fonte de título, escala tipográfica, cor de acento, intensidade
   de movimento, distância de revelação, densidade de espaçamento. Vá agressivo na
   amplitude dos controles. Iterar com controle é mais rápido que pedir 10 versões, e a
   barra sai do código antes do build de produção.
5. **Revisar.** Rode `comandos/revisar.md` antes de entregar. Não pule.

## Regras duras

- Uma família por página. Duas famílias na mesma página produzem incoerência, não riqueza.
- Nenhuma decisão de cor ou fonte fora do que a família declara. Se a família não cobre um
  caso, pergunte, não decida.
- Onde o projeto tem design system de cliente (brand guide do cliente), o design system é lei
  e a família contribui apenas com estrutura, nunca com paleta ou tipografia.
- Família com `status: candidato` exige aviso explícito antes de usar.

