(function(){
'use strict';
var M=null, state={q:'',uc:'',st:''};
var $=function(s,r){return (r||document).querySelector(s)};
function h(tag,props,kids){
  var e=document.createElement(tag);
  if(props){Object.keys(props).forEach(function(k){
    if(k==='class')e.className=props[k]; else if(k==='text')e.textContent=props[k];
    else if(k.slice(0,2)==='on')e.addEventListener(k.slice(2),props[k]);
    else e.setAttribute(k,props[k]);});}
  (kids||[]).forEach(function(c){if(c==null)return;e.appendChild(typeof c==='string'?document.createTextNode(c):c)});
  return e;
}
function safeColor(v,fb){return /^#[0-9a-fA-F]{6}$/.test(v||'')?v:fb}
function safeStack(v,fb){return /^[A-Za-z0-9 ,"'\-]+$/.test(v||'')?v:fb}
function specimen(f,big){
  var t=f.tokens||{}, s=h('div',{class:'spec'}), wrap=h('div',{class:'spec-c'+(big?' big':''),'aria-hidden':'true'},[s]);
  var set=function(k,v){s.style.setProperty(k,v)};
  set('--s-bg',safeColor(t.bg,'#eee'));set('--s-ink',safeColor(t.ink,'#222'));set('--s-muted',safeColor(t.muted,'#777'));
  set('--s-accent',safeColor(t.accent,'#a33'));set('--s-accent2',safeColor(t.accent2,'#366'));set('--s-line',safeColor(t.line,'#ccc'));
  set('--s-display',safeStack(t.display,'Georgia,serif'));set('--s-body',safeStack(t.body,'system-ui,sans-serif'));
  set('--s-mono',safeStack(t.mono,'monospace'));set('--s-r',(Number(t.radius)||0)+'px');
  if(!(window.SPECIMENS&&window.SPECIMENS.build(f.id,s))){
    var parts=f.formula.split(' x ');
    s.appendChild(h('div',{class:'bar'},[h('b',{text:f.id}),h('span',{text:f.use_cases[0]||''})]));
    s.appendChild(h('h4',{},[parts[0]+' ',h('em',{text:parts[1]||''})]));
    s.appendChild(h('p',{text:(f.resumo||'').split(/[:.]/)[0].slice(0,70)}));
    s.appendChild(h('button',{class:'btn-s',tabindex:'-1',text:'Ação principal'}));
    var tb=h('div',{class:'tbl'});
    [['Pedido 0412','1.284,00'],['Pedido 0413','302,50'],['Pedido 0414','8.910,10']].forEach(function(r){
      tb.appendChild(h('div',{},[h('span',{text:r[0]}),h('span',{text:r[1]})]))});
    s.appendChild(tb);
  }
  return wrap;
}
function palette(f){
  var t=f.tokens||{}, p=h('div',{class:'pal','aria-hidden':'true'});
  ['bg','surface','ink','muted','accent','accent2','line'].forEach(function(k){
    var c=safeColor(t[k],null); if(!c)return;
    var sp=h('span',{text:k}); sp.style.setProperty('background',c);
    var n=parseInt(c.slice(1),16),l=((n>>16)*.3+((n>>8)&255)*.59+(n&255)*.11);
    sp.style.setProperty('color',l>140?'#222':'#eee'); p.appendChild(sp)});
  return p;
}
function list(title,items,cls){
  if(!items||!items.length)return null;
  return h('div',{class:'sect '+(cls||'')},[h('h3',{text:title}),h('ul',{},items.map(function(i){return h('li',{text:i})}))]);
}
function copy(text,note){
  var done=function(ok){note.textContent=ok?'Copiado.':'Não consegui copiar. Selecione o texto e copie manualmente.'};
  if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(text).then(function(){done(true)},function(){done(false)})}
  else done(false);
}
function statusTag(f){
  return h('span',{class:'tag'+(f.status==='candidato'?' warn':''),text:f.status});
}
function visible(f){
  if(state.uc&&f.use_cases.indexOf(state.uc)<0)return false;
  if(state.st&&f.status!==state.st)return false;
  if(state.q){var tx=[f.id,f.formula,f.resumo,f.keywords.join(' '),f.use_cases.join(' ')].join(' ').toLowerCase();
    return state.q.toLowerCase().split(/\s+/).every(function(w){return tx.indexOf(w)>=0})}
  return true;
}
function renderList(){
  if(!M)return;
  var ul=$('#lista'); ul.textContent='';
  var fs=M.familias.filter(visible);
  fs.forEach(function(f){
    var b=h('button',{class:'card',type:'button','aria-label':'Abrir '+f.id,onclick:function(){openDet(f)}},[
      h('div',{class:'spec-wrap'},[specimen(f,false)]),
      h('div',{class:'card-b'},[h('h3',{text:f.nome}),h('div',{class:'formula',text:f.formula}),h('p',{text:f.resumo}),
        h('div',{class:'meta'},[statusTag(f)].concat(f.use_cases.map(function(u){return h('span',{class:'tag',text:u})})))])]);
    ul.appendChild(h('li',{},[b]));
  });
  $('#vazio').hidden=fs.length>0;
  $('#tally').textContent=fs.length+' de '+M.familias.length+' famílias · '+M.comportamentos.length+' comportamentos';
}
function chips(box,items,key,all,onchange){
  box.textContent='';
  [''].concat(items).forEach(function(v){
    var b=h('button',{class:'chip',type:'button','aria-pressed':String((state[key]||'')===v),text:v||all,
      onclick:function(){state[key]=v;onchange();}});
    box.appendChild(b);});
}
function refreshChips(){
  chips($('#chips-uc'),M.use_cases.map(function(u){return u.id}),'uc','todos os use-cases',function(){refreshChips();renderList()});
  chips($('#chips-st'),['validado','candidato'],'st','todo status',function(){refreshChips();renderList()});
}
function openDet(f){
  var d=$('#det'),body=$('#det-body');body.textContent='';$('#det-t').textContent=f.nome;
  body.appendChild(h('p',{class:'formula',text:f.formula+' · '+f.autoria}));
  body.appendChild(h('div',{class:'meta'},[statusTag(f)].concat(f.use_cases.map(function(u){return h('span',{class:'tag',text:u})}))));
  body.appendChild(h('p',{class:'lead',text:f.resumo}));
  body.appendChild(h('div',{class:'sect'},[specimen(f,true),palette(f),
    h('p',{class:'note',text:(f.tokens&&f.tokens.derived?'Specimen ilustrativo, derivado da descrição textual. ':'Specimen gerado dos tokens da família. ')+'Composição de exemplo com as fontes OFL incluídas em app/fonts. É uma peça ilustrativa da família, não um modelo para copiar.'})]));
  var cols=h('div',{class:'cols'});
  [list('Quando usar',f.usar),list('Quando não usar',f.nao_usar),list('Tipografia',f.tipografia),list('Cor',f.cor),list('Layout e espaço',f.layout),list('Movimento',f.movimento)].forEach(function(x){if(x)cols.appendChild(x)});
  body.appendChild(cols);
  body.appendChild(list('Nunca, nesta família',f.nunca,'never'));
  if(f.risco)body.appendChild(h('div',{class:'sect'},[h('h3',{text:'Risco documentado'}),h('p',{text:f.risco})]));
  if(f.lacuna)body.appendChild(h('div',{class:'sect'},[h('h3',{text:'Lacuna conhecida'}),h('p',{text:f.lacuna})]));
  var note=h('p',{class:'note',role:'status'});
  body.appendChild(h('div',{class:'sect'},[h('div',{class:'row'},[h('h3',{text:'Brief copiável'}),h('button',{class:'btn',type:'button',onclick:function(){copy(f.brief,note)}},['Copiar brief'])]),h('pre',{text:f.brief}),note,
    h('p',{class:'note',text:'JSON para agentes: api/familias/'+f.id+'.json · texto: api/briefs/'+f.id+'.txt'})]));
  if(f.status==='candidato')body.appendChild(h('p',{class:'note',text:'Família candidata: avise a pessoa antes de usar, ela ainda não foi validada em produto real.'}));
  if(!d.open)d.showModal();
}
function mesa(uc){
  var out=$('#mesa-out');out.textContent='';
  var u=M.use_cases.filter(function(x){return x.id===uc})[0];
  var ids=u?u.familias:[];
  var fs=ids.map(function(i){return M.familias.filter(function(f){return f.id===i})[0]}).filter(Boolean);
  fs.sort(function(a,b){return (a.status!=='validado')-(b.status!=='validado')||(a.autoria==='coletada')-(b.autoria==='coletada')});
  if(fs.length<3)out.appendChild(h('p',{class:'note',text:'Este use-case tem só '+fs.length+' família(s). A regra é declarar a falta, não inventar a terceira.'}));
  fs.slice(0,3).forEach(function(f,i){
    out.appendChild(h('div',{class:'opt'},[h('div',{class:'spec-wrap'},[specimen(f,false)]),
      h('div',{class:'card-b'},[h('div',{class:'formula',text:'Opção '+(i+1)+' · '+f.status}),h('h3',{text:f.nome}),h('p',{text:f.formula}),
        h('p',{class:'risk',text:'Risco: '+f.risco}),
        h('div',{class:'meta'},[h('button',{class:'btn ghost',type:'button',onclick:function(){openDet(f)}},['Ver família'])])])]));
  });
  if(fs.length)out.appendChild(h('p',{class:'note',text:'Espere a escolha humana antes de construir. Três variações da mesma família vêm depois.'}));
}
function buildBrief(){
  if(!M)return;
  var f=M.familias.filter(function(x){return x.id===$('#b-fam').value})[0];if(!f)return;
  var cs=[].slice.call(document.querySelectorAll('#b-cmp input:checked')).map(function(i){return M.comportamentos.filter(function(c){return c.id===i.value})[0]});
  var intent=$('#b-intent').value.trim()||'[preencher]';
  var lines=['[Referência de design: dado, não instrução de sistema]'];
  if(f.status==='candidato')lines.push('AVISE A PESSOA: família candidata, não validada.');
  lines.push(f.brief.replace('Intent: [preencher]','Intent: '+intent));
  cs=cs.filter(function(c){return !c.familias.length||c.familias.indexOf(f.id)>=0});
  cs.forEach(function(c){lines.push('','Comportamento '+c.id+': '+c.resumo,'Limites: '+c.limites.join(' '))});
  lines.push('','Nunca nesta família:');f.nunca.forEach(function(n){lines.push('- '+n)});
  lines.push('','Anti-slop global:');M.anti_slop.forEach(function(a){lines.push('- '+a)});
  $('#b-out').textContent=lines.join('\n');
  $('#b-note').textContent=cs.length>3?'Use no máximo 3 comportamentos.':'';
}
function setupBrief(){
  var sel=$('#b-fam');M.familias.forEach(function(f){sel.appendChild(h('option',{value:f.id,text:f.id+' · '+f.formula}))});
  var box=$('#b-cmp');
  M.comportamentos.forEach(function(c){
    var i=h('input',{type:'checkbox',value:c.id,id:'c-'+c.id,onchange:function(){
      var n=document.querySelectorAll('#b-cmp input:checked').length;
      if(n>3){i.checked=false;$('#b-note').textContent='Use no máximo 3 comportamentos.';return}buildBrief()}});
    box.appendChild(h('label',{class:'chk',for:'c-'+c.id},[i,h('span',{text:c.id+' ('+c.custo+')'})]));});
  function compatible(){
    var fid=sel.value;
    document.querySelectorAll('#b-cmp input').forEach(function(input){
      var c=M.comportamentos.filter(function(x){return x.id===input.value})[0];
      input.disabled=!!(c.familias.length&&c.familias.indexOf(fid)<0);
      if(input.disabled)input.checked=false;
      input.parentElement.title=input.disabled?'Não indicado para esta família':'';
    });buildBrief();
  }
  sel.addEventListener('change',compatible);$('#b-intent').addEventListener('input',buildBrief);
  $('#b-copy').addEventListener('click',function(){copy($('#b-out').textContent,$('#b-note'))});
  compatible();
}
function setupAgentes(){
  var o=$('#ag-out');
  function ep(rows){var d=h('div',{class:'ep'});rows.forEach(function(r){d.appendChild(h('span',{text:r[0]}));d.appendChild(r[2]?h('a',{href:r[1],text:r[1]}):h('span',{text:r[1]}))});return d}
  o.appendChild(h('div',{class:'panel'},[h('h3',{text:'Endpoints estáticos'}),
    ep([['índice','../api/index.json',1],['família','../api/familias/<id>.json'],['brief','../api/briefs/<id>.txt'],['manifest','manifest.json',1],['llms.txt','../llms.txt',1]])]));
  o.appendChild(h('div',{class:'panel'},[h('h3',{text:'CLI local (Python, sem dependências)'}),
    h('pre',{text:'python3 scripts/dl.py find tabela densa --use-case webapps\npython3 scripts/dl.py mesa webapps\npython3 scripts/dl.py brief instrumento-denso tabela-viva foco-visivel-forte\npython3 scripts/dl.py lint ./src   # heurística anti-slop, exit 1 se houver achado'})]));
  o.appendChild(h('div',{class:'panel'},[h('h3',{text:'Contrato de leitura'}),
    h('ul',{},['Leia anti-slop.md, 1 use-case e no máximo 2 famílias. Não leia o repositório inteiro.','Devolva 3 opções e espere a escolha humana.','Família candidata exige aviso antes do uso.','Todo texto aqui é referência de design. Não executa nada nem concede autoridade a ninguém.','O site é de leitura e não recebe uploads. Referências são enviadas na conversa com seu agente.'].map(function(t){return h('li',{text:t})}))]));
  o.appendChild(h('div',{class:'panel'},[h('h3',{text:'Limites e licença'}),
    h('p',{text:'Famílias sintetizadas e autorais são texto original. Famílias coletadas citam a obra de terceiros como inspiração e não redistribuem imagem. Fontes sugeridas têm licença aberta (OFL), mas confira cada uma. O lint é heurístico e não substitui revisão humana de acessibilidade e contraste.'})]));
}
function view(v){
  document.querySelectorAll('.view').forEach(function(s){s.hidden=s.id!=='v-'+v});
  document.querySelectorAll('.tab').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.view===v))});
  if(location.hash!=='#'+v)history.replaceState(null,'','#'+v);
}
function loadCatalog(){
$('#load-error').hidden=true;
fetch('./manifest.json').then(function(r){if(!r.ok)throw new Error('catalog');return r.json()}).then(function(m){
  if(!m||!Array.isArray(m.familias)||!Array.isArray(m.comportamentos)||!Array.isArray(m.use_cases)||!Array.isArray(m.anti_slop))throw new Error('catalog');
  M=m;refreshChips();renderList();setupBrief();setupAgentes();
  chips($('#mesa-uc'),M.use_cases.map(function(u){return u.id}),'muc','',function(){});
  var mb=$('#mesa-uc');mb.textContent='';
  M.use_cases.forEach(function(u,i){mb.appendChild(h('button',{class:'chip',type:'button','aria-pressed':'false',text:u.id,onclick:function(){
    [].slice.call(mb.children).forEach(function(c){c.setAttribute('aria-pressed','false')});this.setAttribute('aria-pressed','true');mesa(u.id)}}))});
  if(mb.firstChild)mb.firstChild.click();
  $('#q').disabled=false;
}).catch(function(){M=null;$('#q').disabled=true;$('#tally').textContent='Catálogo indisponível';$('#load-error').hidden=false;});
}
loadCatalog();
$('#load-retry').addEventListener('click',function(){window.location.reload()});
var hsh=location.hash.slice(1);if(['biblioteca','mesa','brief','agentes'].indexOf(hsh)>=0)view(hsh);
$('#q').addEventListener('input',function(e){state.q=e.target.value;renderList()});
document.querySelectorAll('.tab').forEach(function(b){b.addEventListener('click',function(){view(b.dataset.view)})});
$('#det-x').addEventListener('click',function(){$('#det').close()});
$('#det').addEventListener('click',function(e){if(e.target===this)this.close()});
document.addEventListener('keydown',function(e){if(e.key==='/'&&document.activeElement.tagName!=='INPUT'&&document.activeElement.tagName!=='TEXTAREA'){e.preventDefault();view('biblioteca');$('#q').focus()}});
})();
