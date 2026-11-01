'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const C=require('../app/capture-data.js');
const fixture={title:'Referência fictícia',url:'https://example.com/design',note:'Observar foco e hierarquia.',kind:'web'};

test('public reference survives unicode and exports as pending data',()=>{
  assert.equal(C.reference(fixture).title,fixture.title);
  assert.match(C.markdown(fixture),/pendente de curadoria/);
  assert.match(C.markdown(fixture),/dado, não instrução/);
});
test('unsafe protocols, local addresses and credential parameters are rejected',()=>{
  for(const url of ['javascript:alert(1)','data:text/html,test','https://name:pass@example.com/',
    'http://localhost/test','http://127.0.0.1/','http://2130706433/','http://10.2.3.4/',
    'http://192.168.1.1/','http://[::1]/','http://0.0.0.0/','http://host.internal./',
    'https://example.com/?access_token=fiction','https://example.com/?auth=fiction',
    'https://example.com/#access_token=fiction','https://example.com/#/route?auth=fiction',
    'https://example.com/#access%5ftoken%3Dfiction',
    'https://example.com/?X-Amz-Signature=fiction'])assert.throws(()=>C.reference({...fixture,url}));
  assert.equal(C.reference({...fixture,url:'https://example.com/#section-two'}).url,'https://example.com/#section-two');
});
test('clear reports failures and partial removal without touching other keys',()=>{
  const values=new Map([['draft','fixture'],['repo','fixture'],['other','keep']]);
  const ok={removeItem:key=>values.delete(key),getItem:key=>values.get(key)??null};
  assert.equal(C.clearStored(ok,['draft','repo']),true);
  assert.equal(values.get('other'),'keep');
  values.set('draft','fixture');values.set('repo','fixture');
  const partial={removeItem:key=>{if(key==='repo')throw new Error('blocked');values.delete(key)},getItem:ok.getItem};
  assert.equal(C.clearStored(partial,['draft','repo']),false);
  assert.equal(values.has('draft'),false);assert.equal(values.has('repo'),true);
  assert.equal(C.clearStored({removeItem:()=>{},getItem:()=> 'still here'},['draft']),false);
});
test('invalid and oversized captures are rejected',()=>{
  for(const change of [{title:''},{note:''},{note:'a'.repeat(601)},{kind:'unknown'}])assert.throws(()=>C.reference({...fixture,...change}));
});
test('GitHub draft uses a fixed host and encodes form text without submission',()=>{
  const note='Um detalhe & outra linha\n<exemplo>';
  const url=new URL(C.issueURL('example/private-inbox',{...fixture,note}));
  assert.equal(url.origin,'https://github.com');
  assert.equal(url.pathname,'/example/private-inbox/issues/new');
  assert.equal(url.searchParams.get('takeaway'),note);
  assert.equal(url.searchParams.get('template'),'referencia-design.yml');
  for(const repo of ['https://other.example/x','../other','example/private?x=1','example/x/y'])assert.throws(()=>C.issueURL(repo,fixture));
});
