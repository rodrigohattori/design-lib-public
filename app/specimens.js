/* Composições de specimen: cada família ganha uma peça estruturalmente própria,
   montada só com DOM/SVG a partir dos tokens. Sem innerHTML, sem estilo inline em markup. */
(function(){
'use strict';
var SVGNS='http://www.w3.org/2000/svg';
function E(tag,cls,text,st,kids){
  var e=document.createElement(tag);if(cls)e.className=cls;if(text!=null)e.textContent=text;
  if(st)Object.keys(st).forEach(function(k){e.style.setProperty(k,st[k])});
  (kids||[]).forEach(function(c){if(c)e.appendChild(c)});return e;
}
function S(tag,attrs,kids){
  var e=document.createElementNS(SVGNS,tag);
  Object.keys(attrs||{}).forEach(function(k){e.setAttribute(k,attrs[k])});
  (kids||[]).forEach(function(c){e.appendChild(c)});return e;
}
function svg(vb,kids,cls){return S('svg',{viewBox:vb,class:cls||'sv',preserveAspectRatio:'xMidYMid meet','aria-hidden':'true'},kids)}
var B={};

B['instrumento-denso']=function(s){
  s.style.setProperty('padding','0');
  var side=E('div','sp-side',null,{'border-right':'1px solid var(--s-line)','background':'var(--s-surface)','padding':'3cqw 2.4cqw','width':'24cqw','flex':'none'},[
    E('div','',"ops/",{'font-family':'var(--s-mono)','font-size':'2.6cqw','color':'var(--s-accent)','margin-bottom':'3cqw'})]);
  ['Pedidos','Entregas','Clientes','Relatórios'].forEach(function(n,i){
    side.appendChild(E('div','',n,{'font-size':'2.7cqw','padding':'1.1cqw 1.4cqw','margin-bottom':'.6cqw','color':i?'var(--s-muted)':'var(--s-ink)','border-left':'2px solid '+(i?'transparent':'var(--s-accent)'),'background':i?'transparent':'var(--s-bg)'}))});
  var main=E('div','',null,{'flex':'1','padding':'3cqw','min-width':'0'});
  main.appendChild(E('div','',null,{'display':'flex','justify-content':'space-between','align-items':'baseline','margin-bottom':'2.4cqw'},[
    E('div','','Pedidos atrasados',{'font-family':'var(--s-display)','font-weight':'600','font-size':'4cqw'}),
    E('div','','/ buscar',{'font-family':'var(--s-mono)','font-size':'2.4cqw','color':'var(--s-muted)','border':'1px solid var(--s-line)','padding':'.4cqw 1.2cqw'})]));
  var k=E('div','',null,{'display':'flex','gap':'2.4cqw','margin-bottom':'2.4cqw'});
  [['38','atrasados'],['4,2h','atraso médio'],['91%','no prazo']].forEach(function(x){
    k.appendChild(E('div','',null,{'flex':'1','border':'1px solid var(--s-line)','padding':'1.6cqw 1.8cqw','background':'var(--s-surface)'},[
      E('div','',x[0],{'font-family':'var(--s-mono)','font-size':'4.6cqw','font-variant-numeric':'tabular-nums'}),
      E('div','',x[1],{'font-size':'2.3cqw','color':'var(--s-muted)'})]))});
  main.appendChild(k);
  [['#0412','Mercado Aurora','+6,5h','▲ Atrasado',1],['#0413','Casa Vento','+3,0h','▲ Atrasado',1],['#0419','Ótica Nova','+0,8h','● Em rota',0],['#0422','Padaria Sol','—','✓ Entregue',0]].forEach(function(r,i){
    var row=E('div','',null,{'display':'grid','grid-template-columns':'9cqw 1fr 8cqw 14cqw','gap':'1.5cqw','padding':'1.1cqw 0','border-bottom':'1px solid var(--s-line)','font-size':'2.6cqw','align-items':'center','background':i===1?'var(--s-surface)':'transparent','outline':i===1?'2px solid var(--s-accent)':'none','outline-offset':'-2px'});
    row.appendChild(E('span','',r[0],{'font-family':'var(--s-mono)','color':'var(--s-muted)'}));
    row.appendChild(E('span','',r[1]));
    row.appendChild(E('span','',r[2],{'font-family':'var(--s-mono)','text-align':'right','font-variant-numeric':'tabular-nums'}));
    row.appendChild(E('span','',r[3],{'color':r[4]?'var(--s-accent)':'var(--s-accent2)','font-weight':'600'}));
    main.appendChild(row)});
  s.style.setProperty('flex-direction','row');
  s.appendChild(side);s.appendChild(main);
};

B['papel-operacional']=function(s){
  s.appendChild(E('div','',null,{'display':'flex','justify-content':'space-between','align-items':'baseline','border-bottom':'3px double var(--s-ink)','padding-bottom':'2cqw'},[
    E('div','','Livro de contas',{'font-family':'var(--s-display)','font-size':'6cqw','font-weight':'500'}),
    E('div','','Outubro de 2026',{'font-size':'2.6cqw','color':'var(--s-muted)'})]));
  var t=E('div','',null,{'position':'relative','margin-top':'1cqw'});
  var rows=[['Data','Descrição','Valor','Saldo'],['03/10','Recebimento Clínica Aurora','4.800,00','4.800,00'],['08/10','Aluguel da sala','−2.100,00','2.700,00'],['15/10','Material de escritório','−312,40','2.387,60'],['21/10','Recebimento Studio Lume','1.950,00','4.337,60']];
  rows.forEach(function(r,i){
    var row=E('div','',null,{'display':'grid','grid-template-columns':'9cqw 1fr 15cqw 15cqw','gap':'2cqw','padding':'1.3cqw 0','border-bottom':'1px solid var(--s-line)','font-size':i?'2.8cqw':'2.3cqw','color':i?'var(--s-ink)':'var(--s-muted)','text-transform':i?'none':'uppercase','letter-spacing':i?'0':'.06em'});
    r.forEach(function(c,j){row.appendChild(E('span','',c,{'text-align':j>1?'right':'left','font-variant-numeric':'tabular-nums','color':(i&&c.charAt(0)==='−')?'var(--s-accent2)':''}))});
    t.appendChild(row)});
  s.appendChild(t);
  s.appendChild(E('div','',null,{'display':'flex','justify-content':'flex-end','align-items':'baseline','gap':'3cqw','border-top':'3px double var(--s-ink)','padding-top':'1.6cqw','margin-top':'.6cqw'},[
    E('span','','Saldo final',{'font-size':'2.6cqw','color':'var(--s-muted)'}),
    E('span','','R$ 4.337,60',{'font-family':'var(--s-display)','font-size':'5.4cqw','font-variant-numeric':'tabular-nums'})]));
  s.appendChild(E('div','','PAGO',{'position':'absolute','left':'6cqw','bottom':'5.5cqw','border':'2px solid var(--s-accent2)','color':'var(--s-accent2)','font-weight':'700','letter-spacing':'.2em','padding':'.6cqw 2cqw','font-size':'4cqw','transform':'rotate(-7deg)','opacity':'.85'}));
  s.style.setProperty('position','relative');
};

B['cartografia-de-dados']=function(s){
  s.appendChild(E('div','',null,{'display':'flex','justify-content':'space-between','align-items':'baseline'},[
    E('div','','Chuva acumulada por região',{'font-family':'var(--s-display)','font-weight':'600','font-size':'4.4cqw'}),
    E('div','','mm · 2026',{'font-family':'var(--s-mono)','font-size':'2.4cqw','color':'var(--s-muted)','text-transform':'uppercase','letter-spacing':'.08em'})]));
  var k=[];
  for(var i=0;i<5;i++)k.push(S('path',{d:'M0 '+(10+i*11)+' C 25 '+(2+i*11)+', 40 '+(24+i*9)+', 70 '+(14+i*10)+' S 95 '+(8+i*11)+', 100 '+(16+i*10),fill:'none',stroke:'var(--s-line)','stroke-width':'.35'}));
  [[48,'M4 42 L25 38 L45 40 L65 34 L96 33'],[52,'M4 46 L25 45 L45 41 L65 43 L96 40'],[56,'M4 50 L25 49 L45 48 L65 46 L96 47']].forEach(function(l){
    k.push(S('path',{d:l[1],fill:'none',stroke:'var(--s-muted)','stroke-width':'.7',opacity:'.55'}))});
  k.push(S('path',{d:'M4 38 L25 30 L45 24 L65 15 L96 9',fill:'none',stroke:'var(--s-accent)','stroke-width':'1.6','stroke-linejoin':'round'}));
  k.push(S('circle',{cx:'96',cy:'9',r:'2.2',fill:'var(--s-accent2)'}));
  var lab=function(x,y,t,c,w){var e=S('text',{x:x,y:y,'font-size':'3.1','font-family':'var(--s-mono)',fill:c,'font-weight':w||'400','text-anchor':'end'});e.textContent=t;return e};
  k.push(lab(92,5.6,'Sul +18%','var(--s-accent2)','700'));
  k.push(lab(96,38,'Norte','var(--s-muted)'));k.push(lab(96,53,'Oeste','var(--s-muted)'));
  [['jan',4],['mar',34],['mai',64],['jul',92]].forEach(function(x){var e=lab(x[1]+3,58,x[0],'var(--s-muted)');e.setAttribute('text-anchor','middle');k.push(e)});
  s.appendChild(E('div','',null,{'flex':'1','min-height':'0'},[svg('0 0 100 60',k,'sv')]));
  s.appendChild(E('div','','Um destaque por tela. Eixo em milímetros, rótulo direto na série.',{'font-size':'2.5cqw','color':'var(--s-muted)'}));
};

B['conversa-calma']=function(s){
  s.style.setProperty('gap','2.2cqw');
  s.appendChild(E('div','','Terça, 21h40',{'font-size':'2.4cqw','color':'var(--s-muted)','text-align':'center'}));
  var bub=function(t,me){return E('div','',t,{'align-self':me?'flex-end':'flex-start','max-width':'72%','padding':'2cqw 2.6cqw','font-size':'3cqw','line-height':'1.4','background':me?'var(--s-accent)':'var(--s-surface)','color':me?'var(--s-bg)':'var(--s-ink)','border':me?'0':'1px solid var(--s-line)','border-radius':me?'3cqw 3cqw .8cqw 3cqw':'3cqw 3cqw 3cqw .8cqw'})};
  s.appendChild(bub('Como foi o sono nesta semana?',0));
  s.appendChild(bub('Dormi mal na quinta. Acordei umas três vezes.',1));
  s.appendChild(bub('Obrigado por contar. Quer olhar o que mudou na quinta, ou prefere começar pelo que funcionou?',0));
  var sug=E('div','',null,{'display':'flex','flex-direction':'column','gap':'1cqw','margin-top':'auto'});
  ['O que mudou na quinta','O que funcionou'].forEach(function(t){sug.appendChild(E('div','',t,{'border':'1px solid var(--s-line)','padding':'1.4cqw 2.4cqw','font-size':'2.8cqw','border-radius':'var(--s-r)','background':'var(--s-surface)'}))});
  s.appendChild(sug);
  s.appendChild(E('div','',null,{'display':'flex','gap':'2cqw','align-items':'center','border':'1px solid var(--s-line)','border-radius':'var(--s-r)','padding':'1.6cqw 2.4cqw','background':'var(--s-surface)'},[
    E('span','','Escreva aqui…',{'flex':'1','font-size':'2.8cqw','color':'var(--s-muted)'}),
    E('span','','Enviar',{'background':'var(--s-accent2)','color':'var(--s-ink)','padding':'1cqw 2.4cqw','border-radius':'calc(var(--s-r) - 4px)','font-size':'2.6cqw','font-weight':'600'})]));
};

B['vitrine-silenciosa']=function(s){
  s.style.setProperty('flex-direction','row');s.style.setProperty('gap','5cqw');s.style.setProperty('align-items','stretch');
  var img=E('div','',null,{'flex':'1.15','background':'var(--s-surface)','position':'relative','display':'flex','align-items':'flex-end','justify-content':'center'});
  img.appendChild(E('div','',null,{'position':'absolute','bottom':'9cqw','width':'19cqw','height':'25cqw','background':'var(--s-accent)','border-radius':'50% 50% 46% 46% / 55% 55% 45% 45%'}));
  img.appendChild(E('div','',null,{'position':'absolute','bottom':'31cqw','width':'7.5cqw','height':'9cqw','background':'var(--s-accent)','border-radius':'1cqw 1cqw 0 0'}));
  img.appendChild(E('div','',null,{'position':'absolute','bottom':'38.5cqw','width':'10cqw','height':'1.6cqw','background':'var(--s-accent)','border-radius':'1cqw'}));
  img.appendChild(E('div','',null,{'position':'absolute','bottom':'8cqw','width':'30cqw','height':'1px','background':'var(--s-ink)','opacity':'.25'}));
  var tx=E('div','',null,{'flex':'.9','display':'flex','flex-direction':'column','justify-content':'center','gap':'2.4cqw'},[
    E('div','','Cerâmica · edição 12',{'font-size':'2.3cqw','letter-spacing':'.14em','text-transform':'uppercase','color':'var(--s-muted)'}),
    E('div','','Vaso Ravena',{'font-family':'var(--s-display)','font-size':'9.5cqw','line-height':'.95'}),
    E('div','','Torneado à mão, 24 cm, esmalte fosco. Cada peça varia.',{'font-size':'2.9cqw','color':'var(--s-muted)'}),
    E('div','','R$ 480',{'font-size':'4.4cqw','font-variant-numeric':'tabular-nums'}),
    E('div','','Comprar',{'background':'var(--s-accent)','color':'var(--s-bg)','padding':'2cqw 0','text-align':'center','font-size':'3cqw','font-weight':'600'}),
    E('div','','Frete e troca visíveis antes do carrinho',{'font-size':'2.2cqw','color':'var(--s-muted)'})]);
  s.appendChild(img);s.appendChild(tx);
};

B['feira-impressa']=function(s){
  s.style.setProperty('padding','0');s.style.setProperty('gap','0');
  s.appendChild(E('div','','OFERTA DA SEMANA · OFERTA DA SEMANA',{'background':'var(--s-ink)','color':'var(--s-bg)','font-family':'var(--s-display)','font-weight':'800','font-size':'3.4cqw','letter-spacing':'.18em','padding':'2cqw 4cqw','white-space':'nowrap','overflow':'hidden'}));
  var body=E('div','',null,{'padding':'4cqw 5cqw','display':'flex','flex-direction':'column','gap':'2.6cqw','flex':'1'});
  body.appendChild(E('div','',null,{'display':'flex','justify-content':'space-between','align-items':'center'},[
    E('div','','Feira do Zé',{'font-family':'var(--s-display)','font-weight':'800','font-size':'9cqw','line-height':'.95','text-transform':'uppercase','width':'55%'}),
    E('div','',null,{'background':'var(--s-accent)','color':'var(--s-bg)','padding':'2cqw 3.2cqw','transform':'rotate(-2deg)','text-align':'center','box-shadow':'.8cqw .8cqw 0 var(--s-ink)'},[
      E('div','','só hoje',{'font-size':'2.4cqw','text-transform':'uppercase','letter-spacing':'.12em'}),
      E('div','','R$ 9,90',{'font-family':'var(--s-display)','font-weight':'800','font-size':'8cqw','font-variant-numeric':'tabular-nums','line-height':'1'}),
      E('div','','o kg do tomate',{'font-size':'2.4cqw'})])]));
  [['Banana prata','5,50'],['Pão de fermentação natural','12,00'],['Queijo minas frescal','28,00']].forEach(function(r){
    body.appendChild(E('div','',null,{'display':'flex','align-items':'baseline','gap':'1.5cqw','font-size':'3.1cqw','font-weight':'600'},[
      E('span','',r[0]),E('span','',null,{'flex':'1','border-bottom':'2px dotted var(--s-ink)','opacity':'.4','transform':'translateY(-.6cqw)'}),
      E('span','','R$ '+r[1],{'font-variant-numeric':'tabular-nums'})]))});
  body.appendChild(E('div','','Pedir agora',{'margin-top':'auto','background':'var(--s-accent2)','color':'var(--s-surface)','text-align':'center','font-family':'var(--s-display)','font-weight':'800','font-size':'3.6cqw','padding':'2.2cqw','box-shadow':'.8cqw .8cqw 0 var(--s-ink)','text-transform':'uppercase','letter-spacing':'.06em'}));
  s.appendChild(body);
};

B['suico-contido']=function(s){
  var g=[];for(var i=0;i<=12;i++)g.push(S('line',{x1:i*8.33,y1:0,x2:i*8.33,y2:75,stroke:'var(--s-line)','stroke-width':'.2'}));
  s.style.setProperty('position','relative');
  s.appendChild(E('div','',null,{'position':'absolute','inset':'0','pointer-events':'none','padding':'0 6cqw'},[svg('0 0 100 75',g,'sv full')]));
  s.appendChild(E('div','',null,{'display':'flex','justify-content':'space-between','font-size':'2.4cqw','letter-spacing':'.1em','text-transform':'uppercase','border-bottom':'1px solid var(--s-ink)','padding-bottom':'1.6cqw','position':'relative'},[E('span','','Mendes & Ribeiro'),E('span','','Estratégia 2027')]));
  s.appendChild(E('div','','04',{'font-family':'var(--s-display)','font-weight':'700','font-size':'17cqw','line-height':'.85','color':'var(--s-accent)','position':'relative','letter-spacing':'-.03em'}));
  s.appendChild(E('div','','Uma estratégia em quatro movimentos',{'font-family':'var(--s-display)','font-weight':'700','font-size':'6.4cqw','line-height':'1.04','width':'70%','position':'relative','letter-spacing':'-.01em'}));
  s.appendChild(E('div','','Diagnóstico, escolha, execução e revisão. Cada etapa tem dono, prazo e uma pergunta que precisa de resposta.',{'font-size':'2.6cqw','width':'52%','position':'relative','color':'var(--s-muted)'}));
  s.appendChild(E('div','',null,{'margin-top':'auto','display':'flex','justify-content':'space-between','border-top':'1px solid var(--s-ink)','padding-top':'1.6cqw','font-size':'2.6cqw','position':'relative'},[E('span','','Ler o plano'),E('span','','→',{'color':'var(--s-accent)','font-weight':'700','font-size':'3.4cqw','line-height':'.8'})]));
};

B['risograph-duplo']=function(s){
  s.appendChild(E('div','',null,{'display':'flex','justify-content':'space-between','font-family':'var(--s-mono)','font-size':'2.4cqw','text-transform':'uppercase','letter-spacing':'.08em','color':'var(--s-accent2)'},[E('span','','Zine fest nº 7'),E('span','','Sáb 14 nov · 10h')]));
  var art=E('div','',null,{'position':'relative','height':'36cqw','flex':'none'});
  art.appendChild(E('div','',null,{'position':'absolute','left':'6cqw','top':'0','width':'34cqw','height':'34cqw','border-radius':'50%','background':'var(--s-accent)','mix-blend-mode':'multiply'}));
  art.appendChild(E('div','',null,{'position':'absolute','left':'24cqw','top':'3cqw','width':'34cqw','height':'34cqw','border-radius':'50%','background':'var(--s-accent2)','mix-blend-mode':'multiply','transform':'translate(.8cqw,.6cqw)'}));
  art.appendChild(E('div','','40 expositores',{'position':'absolute','right':'0','top':'4cqw','font-family':'var(--s-mono)','font-size':'2.6cqw','color':'var(--s-ink)','border':'1px solid var(--s-ink)','padding':'.8cqw 1.6cqw'}));
  s.appendChild(art);
  s.appendChild(E('div','','Feira de zines',{'font-family':'var(--s-display)','font-size':'10.5cqw','line-height':'.95','color':'var(--s-ink)'}));
  s.appendChild(E('div','','Impressão em duas tintas, 40 expositores, entrada franca.',{'font-size':'2.8cqw','color':'var(--s-ink)','border-top':'2px solid var(--s-ink)','padding-top':'1.6cqw'}));
};

B['organic-editorial']=function(s){
  s.appendChild(E('div','','Caderno de campo · nº 12',{'font-size':'2.4cqw','letter-spacing':'.14em','text-transform':'uppercase','color':'var(--s-muted)'}));
  var wrap=E('div','',null,{'display':'flex','gap':'4cqw','flex':'1','min-height':'0'});
  var left=E('div','',null,{'flex':'1.3','display':'flex','flex-direction':'column','gap':'2cqw'});
  left.appendChild(E('div','','Crescer é um desenho',{'font-family':'var(--s-display)','font-size':'8.6cqw','line-height':'1','font-weight':'400'}));
  left.appendChild(E('div','','feito aos poucos',{'font-family':'var(--s-display)','font-size':'8.6cqw','line-height':'1','color':'var(--s-accent)','font-weight':'400'}));
  left.appendChild(svg('0 0 100 10',[S('path',{d:'M0 5 C10 0, 15 10, 25 5 S40 0, 50 5 S65 10, 75 5 S90 0, 100 5',fill:'none',stroke:'var(--s-accent2)','stroke-width':'1.2'})],'sv wave'));
  left.appendChild(E('div','','Psicologia do desenvolvimento para quem cuida de quem cresce.',{'font-size':'3cqw','color':'var(--s-muted)','line-height':'1.5'}));
  var spokes=[];var cx=50,cy=50;
  ['Vínculo','Rotina','Brincar','Limites','Escuta'].forEach(function(n,i){var a=-Math.PI/2+i*2*Math.PI/5,x=cx+34*Math.cos(a),y=cy+34*Math.sin(a);
    spokes.push(S('line',{x1:cx,y1:cy,x2:x,y2:y,stroke:'var(--s-accent2)','stroke-width':'.7'}));spokes.push(S('circle',{cx:x,cy:y,r:'3',fill:'var(--s-bg)',stroke:'var(--s-accent)','stroke-width':'.9'}));
    var t=S('text',{x:x,y:y+(Math.sin(a)>0.3?9:-6),'font-size':'6.2','text-anchor':'middle',fill:'var(--s-ink)','font-style':'italic'});t.textContent=n;spokes.push(t)});
  spokes.push(S('circle',{cx:cx,cy:cy,r:'7',fill:'var(--s-accent)'}));
  wrap.appendChild(left);wrap.appendChild(E('div','',null,{'flex':'1','min-width':'0'},[svg('0 0 100 100',spokes,'sv')]));
  s.appendChild(wrap);
  s.appendChild(E('div','','anotado à margem: observar antes de intervir',{'font-style':'italic','font-size':'2.8cqw','color':'var(--s-accent)','transform':'rotate(-1.5deg)','align-self':'flex-start'}));
};

B['arquitetonico-escuro']=function(s){
  s.appendChild(E('div','',null,{'display':'flex','justify-content':'space-between','font-size':'2.3cqw','letter-spacing':'.18em','text-transform':'uppercase','color':'var(--s-muted)'},[E('span','','Ateliê Norte'),E('span','','Portfólio 2026')]));
  s.appendChild(E('div','','Casa do Penhasco',{'font-family':'var(--s-display)','font-weight':'800','font-size':'9cqw','line-height':'.95','text-transform':'uppercase','letter-spacing':'.02em'}));
  var slab=E('div','',null,{'flex':'1','background':'var(--s-surface)','border':'1px solid var(--s-line)','padding':'3cqw','display':'grid','grid-template-columns':'1fr 1fr','gap':'3cqw','min-height':'0'});
  var list=E('div','',null,{'display':'flex','flex-direction':'column'});
  [['01','Implantação'],['02','Estrutura'],['03','Envoltória'],['04','Paisagismo']].forEach(function(r){
    list.appendChild(E('div','',null,{'display':'flex','gap':'2cqw','border-bottom':'1px solid var(--s-line)','padding':'1.4cqw 0','font-size':'2.8cqw'},[E('span','',r[0],{'font-family':'var(--s-mono)','color':'var(--s-muted)'}),E('span','',r[1])]))});
  var dat=E('div','',null,{'display':'flex','flex-direction':'column','gap':'1.6cqw','font-family':'var(--s-mono)'});
  [['Área','1.240 m²'],['Pé-direito','4,8 m'],['Concreto','fck 40'],['Obra','2024–26']].forEach(function(r){
    dat.appendChild(E('div','',null,{'display':'flex','justify-content':'space-between','font-size':'2.5cqw','border-bottom':'1px solid var(--s-line)','padding-bottom':'1cqw'},[E('span','',r[0],{'color':'var(--s-muted)'}),E('span','',r[1],{'color':'var(--s-ink)'})]))});
  slab.appendChild(list);slab.appendChild(dat);s.appendChild(slab);
};

B['classico-noturno']=function(s){
  s.style.setProperty('align-items','center');s.style.setProperty('text-align','center');s.style.setProperty('justify-content','center');s.style.setProperty('gap','2.6cqw');
  s.appendChild(E('div','','Exposição permanente',{'font-size':'2.4cqw','letter-spacing':'.3em','text-transform':'uppercase','color':'var(--s-accent)'}));
  s.appendChild(E('div','','A Escola dos Estoicos',{'font-family':'var(--s-display)','font-size':'10cqw','line-height':'1','font-weight':'500','width':'80%'}));
  s.appendChild(svg('0 0 60 6',[S('line',{x1:'0',y1:'3',x2:'26',y2:'3',stroke:'var(--s-accent)','stroke-width':'.4'}),S('path',{d:'M30 0.6 L32.4 3 L30 5.4 L27.6 3 Z',fill:'var(--s-accent)'}),S('line',{x1:'34',y1:'3',x2:'60',y2:'3',stroke:'var(--s-accent)','stroke-width':'.4'})],'sv rule'));
  s.appendChild(E('div','',null,{'display':'flex','gap':'4cqw','align-items':'center','border':'1px solid var(--s-line)','padding':'3cqw 5cqw','background':'var(--s-surface)'},[
    E('div','','IV',{'font-family':'var(--s-display)','font-size':'11cqw','color':'var(--s-accent)','line-height':'1'}),
    E('div','',null,{'text-align':'left'},[E('div','','Sala 04',{'font-size':'3cqw'}),E('div','','Mármore, bronze e papiro',{'font-size':'2.5cqw','color':'var(--s-muted)'})])]));
  s.appendChild(E('div','','Terça a domingo · 10h às 18h',{'font-size':'2.5cqw','color':'var(--s-muted)'}));
};

B['editorial-cinematografico']=function(s){
  s.style.setProperty('padding','0');s.style.setProperty('position','relative');s.style.setProperty('gap','0');
  var m=[];
  m.push(S('rect',{x:'0',y:'0',width:'100',height:'75',fill:'#1b2226'}));
  m.push(S('circle',{cx:'30',cy:'17',r:'6',fill:'var(--s-accent)',opacity:'.9'}));
  m.push(S('polygon',{points:'0,48 18,26 30,38 48,18 66,40 80,28 100,46 100,75 0,75',fill:'#2a353b'}));
  m.push(S('polygon',{points:'0,58 22,40 40,52 58,36 78,54 100,44 100,75 0,75',fill:'#1f2a2f'}));
  m.push(S('polygon',{points:'0,68 30,54 55,64 80,52 100,62 100,75 0,75',fill:'#14191c'}));
  s.appendChild(E('div','',null,{'position':'absolute','inset':'0'},[svg('0 0 100 75',m,'sv full')]));
  s.appendChild(E('div','','03',{'position':'absolute','right':'4cqw','top':'4cqw','font-family':'var(--s-display)','font-weight':'700','font-size':'27cqw','line-height':'.8','margin-top':'3cqw','color':'var(--s-ink)','opacity':'.1'}));
  s.appendChild(E('div','',null,{'position':'absolute','left':'6cqw','right':'6cqw','bottom':'6cqw','display':'flex','flex-direction':'column','gap':'2cqw'},[
    E('div','','Guia de trilha · Serra Azul',{'font-size':'2.3cqw','letter-spacing':'.2em','text-transform':'uppercase','color':'var(--s-accent)'}),
    E('div','','Trilha do Pico Azul',{'font-family':'var(--s-display)','font-size':'10cqw','line-height':'.95','font-weight':'600'}),
    E('div','','12 km  ·  5 h  ·  1.100 m de ganho',{'font-family':'var(--s-mono)','font-size':'2.6cqw','color':'var(--s-muted)'})]));
};

B['monumental-domestico']=function(s){
  s.style.setProperty('padding','4cqw 5cqw');s.style.setProperty('gap','1cqw');s.style.setProperty('overflow','hidden');
  s.appendChild(E('div','',null,{'display':'flex','justify-content':'space-between','font-size':'2.4cqw','color':'var(--s-muted)','letter-spacing':'.1em','text-transform':'uppercase'},[E('span','','Casa Aldeia'),E('span','','Coleção 2026')]));
  s.appendChild(E('div','','SOFÁ',{'font-family':'var(--s-display)','font-weight':'800','font-size':'27cqw','line-height':'.8','margin-top':'3cqw','letter-spacing':'-.04em','color':'var(--s-ink)','margin-left':'-.8cqw'}));
  var still=E('div','',null,{'flex':'1','position':'relative','min-height':'0'});
  still.appendChild(E('div','',null,{'position':'absolute','left':'2cqw','bottom':'2.5cqw','width':'46cqw','height':'11cqw','background':'var(--s-accent)','border-radius':'3cqw 3cqw 1.4cqw 1.4cqw'}));
  still.appendChild(E('div','',null,{'position':'absolute','left':'2cqw','bottom':'11cqw','width':'46cqw','height':'7cqw','background':'var(--s-accent)','border-radius':'3cqw 3cqw 0 0','opacity':'.8'}));
  still.appendChild(E('div','',null,{'position':'absolute','left':'5cqw','bottom':'0','width':'1.4cqw','height':'3cqw','background':'var(--s-ink)'}));
  still.appendChild(E('div','',null,{'position':'absolute','left':'44cqw','bottom':'0','width':'1.4cqw','height':'3cqw','background':'var(--s-ink)'}));
  still.appendChild(E('div','',null,{'position':'absolute','left':'56cqw','bottom':'3cqw','width':'14cqw','height':'14cqw','border-radius':'50%','background':'var(--s-accent2)'}));
  still.appendChild(E('div','',null,{'position':'absolute','left':'62.4cqw','bottom':'0','width':'1.2cqw','height':'5cqw','background':'var(--s-ink)'}));
  still.appendChild(E('div','','R$ 6.900',{'position':'absolute','right':'0','bottom':'2cqw','font-size':'4cqw','font-variant-numeric':'tabular-nums'}));
  s.appendChild(still);
};

B['fintech-acido']=function(s){
  s.style.setProperty('padding','0');s.style.setProperty('gap','0');
  s.appendChild(E('div','',null,{'background':'var(--s-bg)','padding':'4cqw 5cqw 3.4cqw','border-bottom':'1px solid var(--s-line)'},[
    E('div','','Caixa projetado',{'font-family':'var(--s-mono)','font-size':'2.4cqw','letter-spacing':'.14em','text-transform':'uppercase','color':'var(--s-muted)'}),
    E('div','','R$ 2,4 MI',{'font-family':'var(--s-display)','font-weight':'800','font-size':'16cqw','line-height':'.9','color':'var(--s-accent)','text-transform':'uppercase','font-variant-numeric':'tabular-nums'})]));
  var bars=[];[22,28,24,36,41,52,60].forEach(function(v,i){bars.push(S('rect',{x:4+i*13.5,y:50-v*.75,width:'9',height:v*.75,fill:i===6?'#121310':'#8d8f80'}))});
  var sv=svg('0 0 100 52',bars,'sv');
  s.appendChild(E('div','',null,{'background':'#f3efe0','padding':'3cqw 5cqw','flex':'1','min-height':'0','color':'#121310','display':'flex','gap':'4cqw','align-items':'flex-end'},[
    E('div','',null,{'width':'48%','align-self':'stretch','display':'flex','align-items':'flex-end'},[sv]),
    E('div','',null,{'flex':'1','font-family':'var(--s-mono)','font-size':'2.6cqw','line-height':'1.5'},[E('div','','+38% em 6 meses'),E('div','','Dado real, janela de 180 dias',{'opacity':'.65'})])]));
  s.appendChild(E('div','','FECHE O MÊS EM 2 HORAS',{'background':'var(--s-accent)','color':'#121310','font-family':'var(--s-display)','font-weight':'800','font-size':'5.6cqw','padding':'3.2cqw 5cqw','text-transform':'uppercase','letter-spacing':'-.01em'}));
};

window.SPECIMENS={build:function(id,s){var f=B[id];if(!f)return false;f(s);return true}};
})();
