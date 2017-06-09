/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define('sap/ui/test/TestUtils',['jquery.sap.global','sap/ui/core/Core'],function(q){"use strict";var r=/\/\$batch($|\?)/,j="application/json;charset=UTF-8;IEEE754Compatible=true",m={},M="\r\nContent-Type: application/http\r\n"+"Content-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 ",R=q.sap.getUriParameters().get("realOData"),a=/^(GET|DELETE|POST) (\S+) HTTP\/1\.1$/,p=R==="true"||R==="proxy",b=p||R==="direct",T;function d(A,e,P){var s=QUnit.objectType(A),E=QUnit.objectType(e),n;if(s!==E){throw new Error(P+": actual type "+s+" does not match expected type "+E);}if(s==="array"){if(A.length<e.length){throw new Error(P+": array length: "+A.length+" < "+e.length);}}if(s==="array"||s==="object"){for(n in e){d(A[n],e[n],P==="/"?P+n:P+"/"+n);}}else if(A!==e){throw new Error(P+": actual value "+A+" does not match expected value "+e);}}function c(A,e,s,E){try{d(A,e,"/");QUnit.push(E,A,e,s);}catch(f){QUnit.push(!E,A,e,(s||"")+" failed because of "+f.message);}}T={deepContains:function(A,e,s){c(A,e,s,true);},notDeepContains:function(A,e,s){c(A,e,s,false);},useFakeServer:function(s,B,f){function g(S,U,w){var x=w.requestBody,y,z=[""];y=l(x);x.split(y).slice(1,-1).forEach(function(A){var C,D,E,F;A=A.slice(A.indexOf("\r\n\r\n")+4);D=l(A);C=a.exec(D);if(!C){F=t(D);}else if(C[1]==="DELETE"){F="204 No Data\r\n\r\n\r\n";}else if(C[1]==="POST"){F="200 OK\r\nContent-Type: "+j+"\r\n\r\n"+n(A);}else{E=U[S+C[2]];if(E){try{F="200 OK\r\nContent-Type: "+j+"\r\n"+"ODataVersion: 4.0\r\n\r\n"+JSON.stringify(JSON.parse(E[2]))+"\r\n";q.sap.log.info(D,null,"sap.ui.test.TestUtils");}catch(e){F=h(D,500,"Internal Error","Invalid JSON");}}else{F=t(D);}}z.push(M+F);});z.push("--\r\n");w.respond(200,{"Content-Type":"multipart/mixed;boundary="+y.slice(2)},z.join(y));}function h(e,C,S,w){q.sap.log.error(e,w,"sap.ui.test.TestUtils");return C+" "+S+"\r\nContent-Type: text/plain\r\n\r\n"+w+"\r\n";}function i(){var H,e,w,U,x={};for(U in f){w=f[U];H=w.headers||{};if(w.source){e=u(B+w.source);H["Content-Type"]=H["Content-Type"]||k(w.source);}else{e=w.message||"";}x[U]=[w.code||200,H,e];}return x;}function k(N){if(/\.xml$/.test(N)){return"application/xml";}if(/\.json$/.test(N)){return j;}return"application/x-octet-stream";}function l(e){return e.slice(0,e.indexOf("\r\n"));}function n(e){return e.slice(e.indexOf("\n\r\n")+3);}function o(U,e){var w=e.url;if(r.test(w)){g(w.slice(0,w.indexOf("/$batch")+1),U,e);}else{e.respond(200,{"Content-Type":j},e.requestBody);}}function t(e){return h(e,404,"Not Found","No mock data found");}function u(P){var e=m[P],w;if(!e){w=q.sap.sjax({url:P,dataType:"text"});if(!w.success){throw new Error(P+": resource not found");}m[P]=e=w.data;}return e;}function v(){var e,S,U=i(),w;S=s.useFakeServer();S.autoRespond=true;for(w in U){S.respondWith("GET",w,U[w]);}S.respondWith("DELETE",/.*/,[204,{},""]);S.respondWith("POST",/.*/,o.bind(null,U));e=S.restore;S.restore=function(){sinon.FakeXMLHttpRequest.filters=[];e.apply(this,arguments);};sinon.xhr.supportsCORS=q.support.cors;sinon.FakeXMLHttpRequest.useFilters=true;sinon.FakeXMLHttpRequest.addFilter(function(x,w,A){return x!=="DELETE"&&x!=="POST"&&!(x==="GET"&&w in U);});}B=q.sap.getResourcePath(B).replace(/(^|\/)resources\/(~[-a-zA-Z0-9_.]*~\/)?/,"$1test-resources/")+"/";v();},withNormalizedMessages:function(C){sinon.test(function(){var o=sap.ui.getCore(),g=o.getLibraryResourceBundle;this.stub(o,"getLibraryResourceBundle").returns({getText:function(k,A){var s=k,t=g.call(o).getText(k),i;for(i=0;i<10;i+=1){if(t.indexOf("{"+i+"}")>=0){s+=" "+(i>=A.length?"{"+i+"}":A[i]);}}return s;}});C.apply(this);}).apply({});},isRealOData:function(){return b;},proxy:function(A){return p?q.sap.getResourcePath("sap/ui").replace("resources/sap/ui","proxy")+A:A;},setupODataV4Server:function(s,f,S,F){var e={};if(b){return;}F=F||"/";Object.keys(f).forEach(function(u){e[F+u]=f[u];});T.useFakeServer(s,S||"sap/ui/core/qunit/odata/v4/data",e);}};return T;},true);
