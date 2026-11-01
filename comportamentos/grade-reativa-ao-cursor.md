---
comportamento: grade-reativa-ao-cursor
custo: medio
familias: [arquitetonico-escuro, classico-noturno]
criado: 2026-07-29
fonte: chaseai.io
---

# Grade reativa ao cursor

Grade técnica de fundo, quase invisível, que ilumina em um raio curto atrás do cursor.
O fundo deixa de ser papel de parede e passa a responder à presença da pessoa.

## Por que funciona
Ele não anuncia nada, então não distrai. A pessoa percebe que a página reage antes de
entender o que reagiu. É o efeito mais barato de "uau" que existe, porque não depende
de imagem, vídeo ou biblioteca.

## Quando usar
- Fundo de hero ou de seção grande com pouco conteúdo.
- Produto técnico, onde a grade já faz sentido semântico (engenharia, dado, sistema).

## Quando NÃO usar
- Família de base orgânica ou papel. Grade cartesiana contradiz traço à mão.
- Página com muita imagem. A grade compete e polui.

## Implementação
- Grade em `repeating-linear-gradient` nos dois eixos, opacidade baixa (2% a 5%).
- Segunda camada idêntica, mais brilhante, com `mask-image: radial-gradient` centrada em
  duas variáveis CSS (`--mx`, `--my`).
- `pointermove` atualiza as variáveis dentro de `requestAnimationFrame`. Nunca atualize
  a cada evento sem throttle.
- Raio entre 180px e 280px. Acima disso vira mancha, abaixo vira lanterna.

## Limites
- Só em ponteiro fino. Em toque, a camada de brilho não existe.
- `prefers-reduced-motion: reduce` desliga a camada, e a grade estática permanece.
- Zero impacto no conteúdo: a grade nunca reduz contraste de texto.

