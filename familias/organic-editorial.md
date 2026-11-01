---
familia: organic-editorial
formula: editorial x botânico
status: validado
autoria: propria
criado: 2026-07-28
use_cases: [professionals-website]
keywords: [divisória em onda orgânica, ilustração botânica a lápis, anotação manuscrita, diagrama radial como conteúdo, numeração de seção grande, faixa de citação sangrada]
---

# Organic Editorial

Página que se lê como caderno de campo de alguém que estuda crescimento: papel, traço à mão, diagrama antes de foto.

## Quando usar
- Profissional de saúde cuja autoridade vem de conceito e trajetória, não de serviço.
- Conteúdo que precisa parecer estudado sem parecer acadêmico frio.

## Quando NÃO usar
- Oferta com preço, urgência ou conversão direta. A família recusa pressão comercial.
- Produto digital ou loja. Traço à mão em UI de app vira decoração falsa.

## Tipografia
- Titular: serifada de texto, contraste moderado, tamanho grande, peso normal.
  Segunda linha da headline em cor de acento, não em peso maior.
- Corpo: sans humanista, 16-17px, entrelinha 1.6.
- Terceira voz: manuscrito real para anotação lateral, 1 a 2 vezes por página.
- Eyebrow em caps, tracking largo, corpo pequeno, cor terrosa.

## Cor
- Base papel quente 70%, verdes musgo e oliva 20%, vinho 8%, ocre 2%.
- Vinho aparece em palavra-chave de headline, faixa de citação e CTA.

## Layout e espaço
- Seções numeradas à esquerda em escala grande. A numeração é informação: percurso com ordem obrigatória.
- Divisória entre seções em curva orgânica, nunca linha reta nem borda de card.
- Alternância obrigatória: texto+foto, texto+ilustração, diagrama cheio, faixa sangrada. Nunca duas seções consecutivas com a mesma estrutura.
- Foto com máscara de curva orgânica, nunca retângulo com raio.
- Seção de percurso ou de caminhos de exploração resolvida como **rota**: linha
  pontilhada com marcadores ao longo dela. Nunca grade de cards. Regra herdada da
  Cartografia Noturna, que foi descontinuada como família; a técnica sobrevive aqui porque
  é a única solução correta para essa seção.

## Movimento
- Revelação por scroll com deslocamento curto e opacidade. Nada mais.
- Diagrama pode entrar em camadas e precisa ser legível parado.

## Nunca, nesta família
- Botão pill preenchido. CTA é link tipográfico com seta.
- Grade de 3 ou mais cards iguais, em qualquer seção.
- Card na seção de caminhos. Ali é rota, sem exceção.
- Fonte manuscrita genérica imitando caligrafia.
- Terracota como acento principal.

## Risco documentado desta família
Fica a um passo do agrupamento mais comum de output de IA: fundo creme perto de #F4F1EA, serifada de alto contraste, acento terracota. O que a salva são 4 elementos: divisória em onda, ilustração a lápis, anotação manuscrita, diagrama como conteúdo. Removendo qualquer um, desaba no padrão médio. Entrega sem os 4: rejeitar.

## Brief copiável
```
Aesthetic: organic editorial. Papel quente, serifada de texto grande com palavra-chave
em vinho, verdes musgo estruturais, divisórias em onda orgânica entre seções,
ilustração botânica a lápis, uma anotação manuscrita por página, diagrama de relações
como conteúdo principal de seção, seções numeradas, seção de caminhos como rota em linha pontilhada com marcadores.
Intent: [preencher]
Guardrails: sempre alternar composição entre seções consecutivas; sempre CTA como
link com seta; nunca botão pill; nunca grade de cards; nunca acento terracota;
nunca fonte handwriting genérica.
```

## Tokens
Ilustrativo: valores derivados da descrição textual da família, não extraídos da obra de referência.
```json
{
 "bg": "#f3ecdc",
 "surface": "#faf5e8",
 "ink": "#2c2a22",
 "muted": "#7a755f",
 "accent": "#7a2a3a",
 "accent2": "#5f6b3a",
 "line": "#ddd2b6",
 "display": "\"Newsreader\",Georgia,serif",
 "body": "\"Source Sans 3\",system-ui,sans-serif",
 "mono": "\"IBM Plex Mono\",monospace",
 "radius": 2,
 "base": 16,
 "mood": "light",
 "derived": true
}
```

## Referências
- Modelo autoral do curador, não distribuído. A família é descrita aqui só por texto e pelo specimen.
