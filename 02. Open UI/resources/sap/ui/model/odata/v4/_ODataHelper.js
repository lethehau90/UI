/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./lib/_Cache","./lib/_Helper","./lib/_Parser","./lib/_SyncPromise","sap/ui/model/FilterOperator","sap/ui/model/odata/OperationMode","sap/ui/model/Sorter"],function(_,a,b,c,F,O,S){"use strict";var d,r=/^\w+$/,e=/\([^/]*|\/\d+|^\d+\//g;function f(G,A){if(typeof G==="string"&&r.test(G)){return true;}if(!A){return G===undefined||G==="$auto"||G==="$direct";}return false;}function g(D,s,E){var i;for(i=s;i<E;i+=1){if(D[i]===undefined){return true;}}return false;}d={aAllowedSystemQueryOptions:["$apply","$expand","$filter","$orderby","$select"],buildBindingParameters:function(p,A){var R={};if(p){Object.keys(p).forEach(function(k){var v=p[k];if(k.indexOf("$$")!==0){return;}if(!A||A.indexOf(k)<0){throw new Error("Unsupported binding parameter: "+k);}if(k==="$$groupId"||k==="$$updateGroupId"){if(!f(v)){throw new Error("Unsupported value '"+v+"' for binding parameter '"+k+"'");}}else if(k==="$$operationMode"){if(v!==O.Server){throw new Error("Unsupported operation mode: "+v);}}R[k]=v;});}return R;},buildOrderbyOption:function(s,o){var h=[];s.forEach(function(i){if(i instanceof S){h.push(i.sPath+(i.bDescending?" desc":""));}else{throw new Error("Unsupported sorter: '"+i+"' ("+typeof i+")");}});if(o){h.push(o);}return h.join(',');},buildQueryOptions:function(m,o,A,s){var R=JSON.parse(JSON.stringify(m||{}));function v(E){var i;if(typeof E==="object"){for(i in E){h(i,E[i]);}}}function h(i,V){var p;if(!A||A.indexOf(i)<0){throw new Error("System query option "+i+" is not supported");}if(i==="$expand"){for(p in V){v(V[p]);}}}if(o){Object.keys(o).forEach(function(k){var V=o[k];if(k.indexOf("$$")===0){return;}if(k[0]==="@"){throw new Error("Parameter "+k+" is not supported");}if(k[0]==="$"){if((k==="$expand"||k==="$select")&&typeof V==="string"){V=b.parseSystemQueryOption(k+"="+V)[k];}h(k,V);}else if(!s&&k.indexOf("sap-")===0){throw new Error("Custom query option "+k+" is not supported");}R[k]=V;});}return R;},checkGroupId:function(G,A,E){if(!f(G,A)){throw new Error((E||"Invalid group ID: ")+G);}},createCacheProxy:function(B,C,p,o){var h;if(B.oCache){B.oCache.deregisterChange();}h={deregisterChange:function(){},hasPendingChanges:function(){return false;},post:function(){throw new Error("POST request not allowed");},read:function(){var R=arguments;return this.promise.then(function(i){return i.read.apply(i,R);});},refresh:function(){},resetChanges:function(){},update:function(){throw new Error("PATCH request not allowed");}};h.promise=Promise.all([p,o]).then(function(R){var i,s=R[0];if(B.oCache!==h){return B.oCache;}B.mCacheByContext=B.mCacheByContext||{};i=s?B.mCacheByContext[s]=B.mCacheByContext[s]||C(s,R[1]):C(s,R[1]);i.$canonicalPath=s;return i;});return h;},createContextCacheProxy:function(B,C){var o,p;function h(P){return _.createSingle(B.oModel.oRequestor,a.buildPath(P,B.sPath).slice(1),d.getQueryOptions(B,"",C));}p=C&&(C.requestCanonicalPath?C.requestCanonicalPath():Promise.resolve(C.getPath()));o=d.createCacheProxy(B,h,p);o.promise.then(function(i){B.oCache=i;})["catch"](function(E){B.oModel.reportError("Failed to create cache for binding "+B,"sap.ui.model.odata.v4._ODataHelper",E);});return o;},createListCacheProxy:function(B,C){var o,h,p,q;function i(P,s){var j=d.buildOrderbyOption(B.aSorters,q&&q.$orderby);return _.create(B.oModel.oRequestor,a.buildPath(P,B.sPath).slice(1),d.mergeQueryOptions(q,j,s));}if(B.bRelative){if(!C||C.requestCanonicalPath&&!B.mQueryOptions&&!B.aSorters.length&&!B.aFilters.length&&!B.aApplicationFilters.length){return undefined;}}else{C=undefined;}q=d.getQueryOptions(B,"",C);p=C&&(C.requestCanonicalPath?C.requestCanonicalPath():Promise.resolve(C.getPath()));h=d.requestFilter(B,C,B.aApplicationFilters,B.aFilters,q&&q.$filter);o=d.createCacheProxy(B,i,p,h);o.promise.then(function(j){B.oCache=j;})["catch"](function(E){B.oModel.reportError("Failed to create cache for binding "+B,"sap.ui.model.odata.v4._ODataHelper",E);});return o;},fetchDiff:function(B,D,s,l){var m,M,n,R;function h(){var i=jQuery.sap.arraySymbolDiff(B.aPreviousData,n);B.aPreviousData=n;return{aDiff:i,iLength:l};}if(!B.bUseExtendedChangeDetection){return c.resolve();}if(!D){return c.resolve({aDiff:[],iLength:l});}if(B.bDetectUpdates){n=D.map(function(E){return JSON.stringify(E);});return c.resolve(h());}R=B.oModel.resolve(B.sPath,B.oContext);m=B.oModel.getMetaModel();M=m.getMetaContext(R);return m.fetchObject("$Type/$Key",M).then(function(k){var i={};if(k){n=D.map(function(E){return k.reduce(function(p,K){p[K]=E[K];if(E[K]===undefined){i[K]=true;}return p;},{});});}if(Object.keys(i).length>0||!k){B.aPreviousData=[];jQuery.sap.log.warning("Disable extended change detection as"+" diff computation failed: "+B,!k?"Type for path "+R+" has no keys":"Missing key(s): "+Object.keys(i),"sap.ui.model.odata.v4.ODataListBinding");return undefined;}return h();});},getKeyPredicate:function(E,o){var k=[],s=E.$Key.length===1;if(!o){throw new Error("No instance to calculate key predicate");}E.$Key.forEach(function(n){var v=o[n];if(v===undefined){throw new Error("Missing value for key property '"+n+"'");}v=encodeURIComponent(a.formatLiteral(v,E[n].$Type));k.push(s?v:encodeURIComponent(n)+"="+v);});return"("+k.join(",")+")";},getQueryOptions:function(B,p,C){var R=B.mQueryOptions;if(!R){return C&&C.getQueryOptions&&C.getQueryOptions(a.buildPath(B.sPath,p));}if(!p){return R;}p=p.replace(e,"");p.split("/").some(function(s){R=R.$expand&&R.$expand[s];if(!R||R===true){R=undefined;return true;}});return d.buildQueryOptions(B.oModel.mUriParameters,R,d.aAllowedSystemQueryOptions);},getReadRange:function(C,s,l,m){if(g(C,s+l,s+l+m/2)){l+=m;}if(g(C,Math.max(s-m/2,0),s)){l+=m;s-=m;if(s<0){l+=s;s=0;}}return{length:l,start:s};},hasPendingChanges:function(B,A,p){var R;if(p!==undefined){if(B.oCache){return B.oCache.hasPendingChanges(p);}if(B.oContext&&B.oContext.hasPendingChanges){return B.oContext.hasPendingChanges(a.buildPath(B.sPath,p));}return false;}if(B.oCache){R=B.oCache.hasPendingChanges("");}else if(A&&B.oContext&&B.oContext.hasPendingChanges){R=B.oContext.hasPendingChanges(B.sPath);}if(R){return R;}return B.oModel.getDependentBindings(B).some(function(D){return d.hasPendingChanges(D,false);});},isRefreshable:function(B){return(!B.bRelative||B.oContext&&!B.oContext.getBinding);},mergeQueryOptions:function(q,o,s){var R;function h(p,v){if(v&&(!q||q[p]!==v)){if(!R){R=q?JSON.parse(JSON.stringify(q)):{};}R[p]=v;}}h("$orderby",o);h("$filter",s);return R||q;},requestFilter:function(B,C,A,h,s){var n=[];function i(m,o){var p=m.join(o);return m.length>1?"("+p+")":p;}function j(o,E){var m,v=a.formatLiteral(o.oValue1,E),p=decodeURIComponent(o.sPath);switch(o.sOperator){case F.BT:m=p+" ge "+v+" and "+p+" le "+a.formatLiteral(o.oValue2,E);break;case F.EQ:case F.GE:case F.GT:case F.LE:case F.LT:case F.NE:m=p+" "+o.sOperator.toLowerCase()+" "+v;break;case F.Contains:case F.EndsWith:case F.StartsWith:m=o.sOperator.toLowerCase()+"("+p+","+v+")";break;default:throw new Error("Unsupported operator: "+o.sOperator);}return m;}function k(m,o){var p=[],q={};m.forEach(function(t){q[t.sPath]=q[t.sPath]||[];q[t.sPath].push(t);});m.forEach(function(t){var u;if(t.aFilters){p.push(k(t.aFilters,t.bAnd).then(function(v){return"("+v+")";}));return;}u=q[t.sPath];if(!u){return;}delete q[t.sPath];p.push(l(u));});return Promise.all(p).then(function(t){return t.join(o?" and ":" or ");});}function l(G){var m=B.oModel.oMetaModel,M=m.getMetaContext(B.oModel.resolve(B.sPath,C)),p=m.requestObject(G[0].sPath,M);return p.then(function(P){var o;if(!P){throw new Error("Type cannot be determined, no metadata for path: "+M.getPath());}o=G.map(function(q){return j(q,P.$Type);});return i(o," or ");});}return Promise.all([k(A,true),k(h,true)]).then(function(m){if(m[0]){n.push(m[0]);}if(m[1]){n.push(m[1]);}if(s){n.push(s);}return i(n,") and (");});},resetChanges:function(B,A,p){if(p!==undefined){if(B.oCache){B.oCache.resetChanges(p);}else if(B.oContext&&B.oContext.resetChanges){B.oContext.resetChanges(a.buildPath(B.sPath,p));}return;}if(B.oCache){B.oCache.resetChanges("");}else if(A&&B.oContext&&B.oContext.resetChanges){B.oContext.resetChanges(B.sPath);}B.oModel.getDependentBindings(B).forEach(function(D){d.resetChanges(D,false);});},toArray:function(E){if(E===undefined||E===null){return[];}if(Array.isArray(E)){return E;}return[E];}};return d;},false);
