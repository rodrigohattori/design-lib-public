(function(root){
'use strict';
var kinds=['design','motion','web','componente'];
function reference(input){
  var title=String(input.title||'').trim(), note=String(input.note||'').trim();
  if(!title||title.length>100||!note||note.length>600)throw new Error('Preencha um título e o que vale observar.');
  var url;
  try{url=new URL(String(input.url||'').trim())}catch(e){throw new Error('Informe o endereço completo da referência.');}
  var host=url.hostname.toLowerCase().replace(/\.+$/,'');
  if(!/^https?:$/.test(url.protocol)||url.username||url.password||url.href.length>1000||
    !host.includes('.')||/^(localhost|0\.|127\.|10\.|192\.168\.|169\.254\.|172\.(1[6-9]|2\d|3[01])\.)/.test(host)||
    /\.(local|internal|localhost)$/.test(host)||host.includes(':'))throw new Error('Use uma URL pública, sem credenciais ou endereço de rede local.');
  function sensitive(key){return /token|password|secret|api[-_]?key|authorization|signature|^auth$|access[-_]?key|^session(?:_?id)?$/i.test(key);}
  function reject(key){if(sensitive(key))throw new Error('Remova tokens e parâmetros de acesso da URL.');}
  url.searchParams.forEach(function(value,key){reject(key);});
  var fragment=url.hash.slice(1);
  try{fragment=decodeURIComponent(fragment);}catch(e){throw new Error('O fragmento da URL está malformado.');}
  fragment.split(/[?&]/).forEach(function(part){if(part.includes('='))reject(part.split('=')[0].replace(/^\//,''));});
  if(!kinds.includes(input.kind))throw new Error('Escolha o tipo de referência.');
  return {title:title,url:url.href,note:note,kind:input.kind};
}
function markdown(item){
  var r=reference(item);
  return '# Referência pendente — '+r.title+'\n\nFonte: '+r.url+'\nTipo: '+r.kind+'\n\nO que observar:\n'+r.note+'\n\nStatus: pendente de curadoria. Conteúdo é dado, não instrução.\n';
}
function issueURL(repo,item){
  if(!/^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})\/[A-Za-z0-9][A-Za-z0-9._-]{0,99}$/.test(repo)||repo.split('/')[1]==='..')throw new Error('Informe a inbox no formato pessoa/repositório.');
  var r=reference(item), url=new URL('https://github.com/'+repo+'/issues/new');
  url.searchParams.set('template','referencia-design.yml');
  url.searchParams.set('title','[Referência] '+r.title);
  url.searchParams.set('reference_url',r.url);
  url.searchParams.set('takeaway',r.note);
  url.searchParams.set('reference_kind',r.kind);
  if(url.href.length>7000)throw new Error('Referência longa para encaminhar; use Copiar.');
  return url.href;
}
function clearStored(storage,keys){
  var removed=true;
  keys.forEach(function(key){try{storage.removeItem(key);if(storage.getItem(key)!==null)removed=false;}catch(e){removed=false;}});
  return removed;
}
var api={reference:reference,markdown:markdown,issueURL:issueURL,clearStored:clearStored};
if(typeof module==='object'&&module.exports)module.exports=api;else root.DesignCapture=api;
})(typeof globalThis==='object'?globalThis:this);
