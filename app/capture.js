(function(){
'use strict';
var $=function(s){return document.querySelector(s)}, C=window.DesignCapture;
var key='design-lib.capture.v1', repoKey='design-lib.inbox.v1', status=$('#capture-status');
function say(text){status.textContent=text;}
function raw(){return {title:$('#r-title').value,url:$('#r-url').value,note:$('#r-note').value,kind:$('#r-kind').value};}
function item(){try{return C.reference(raw())}catch(e){say(e.message);return null;}}
function put(data){$('#r-title').value=data.title||'';$('#r-url').value=data.url||'';$('#r-note').value=data.note||'';$('#r-kind').value=['design','motion','web','componente'].includes(data.kind)?data.kind:'design';}
try{
  var saved=localStorage.getItem(key);
  if(saved){put(C.reference(JSON.parse(saved)));say('Rascunho recuperado deste aparelho.');}
  $('#r-repo').value=localStorage.getItem(repoKey)||'';
}catch(e){say('Armazenamento indisponível ou rascunho inválido. Copiar e compartilhar continuam disponíveis.');}
$('#r-save').addEventListener('click',function(){
  var r=item();if(!r)return;
  try{localStorage.setItem(key,JSON.stringify(r));say('Rascunho salvo neste aparelho. Ainda não está na biblioteca.');}
  catch(e){say('Não foi possível guardar neste aparelho. Use Copiar ou Compartilhar.');}
});
$('#r-copy').addEventListener('click',function(){
  var r=item();if(!r)return;
  var output=$('#r-output');output.value=C.markdown(r);output.hidden=false;
  if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(output.value).then(function(){say('Referência copiada.');},function(){output.focus();output.select();say('Selecione o texto abaixo e copie.');});
  else{output.focus();output.select();say('Selecione o texto abaixo e copie.');}
});
$('#r-share').hidden=!navigator.share;
$('#r-share').addEventListener('click',function(){
  var r=item();if(!r)return;
  navigator.share({title:r.title,text:C.markdown(r)}).then(function(){say('Compartilhamento encaminhado ao aparelho.');}).catch(function(e){if(e.name!=='AbortError')say('Compartilhamento indisponível. Use Copiar.');});
});
$('#r-github').addEventListener('click',function(){
  var r=item();if(!r)return;
  if(!$('#r-private').checked){say('Confirme que escolheu uma inbox privada antes de encaminhar.');return;}
  var repo=$('#r-repo').value.trim(), url;
  try{url=C.issueURL(repo,r);}catch(e){say(e.message);return;}
  try{localStorage.setItem(repoKey,repo);}catch(e){}
  // Opens a draft only. GitHub owns login, visibility and final submission.
  window.location.assign(url);
});
$('#r-clear').addEventListener('click',function(){
  if(!window.confirm('Apagar o rascunho deste aparelho?'))return;
  var removed=false;try{removed=C.clearStored(localStorage,[key,repoKey]);}catch(e){}
  put({});$('#r-repo').value='';$('#r-private').checked=false;$('#r-output').value='';$('#r-output').hidden=true;
  say(removed?'Rascunho e destino removidos deste aparelho.':'Campos limpos. Não consegui confirmar a remoção do armazenamento; confira os dados do site nas configurações do navegador.');
});
})();
