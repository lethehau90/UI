/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/Utils","sap/ui/base/ManagedObject"],function(U,M){"use strict";return{bySelector:function(s,a,v){var c=this.getControlIdBySelector(s,a);return this._byId(c,v);},getControlIdBySelector:function(s,a){if(!s){return undefined;}if(typeof s==="string"){s={id:s};}var c=s.id;if(s.idIsLocal){if(a){c=a.createId(c);}else{throw new Error("App Component instance needed to get a control's id from selector");}}else{var p=/^application-[^-]*-[^-]*-component---/igm;var h=!!p.exec(s.id);if(h){c=c.replace(/^application-[^-]*-[^-]*-component---/g,"");if(a){c=a.createId(c);}else{throw new Error("App Component instance needed to get a control's id from selector");}}}return c;},getSelector:function(c,a,A){var C=c;if(c instanceof M){C=c.getId();}else{if(!a){throw new Error("App Component instance needed to get a selector from string id");}}if(A&&(A.id||A.idIsLocal)){throw new Error("A selector of control with the id '"+C+"' was requested, "+"but core properties were overwritten by the additionally passed information.");}var v=U.checkControlId(c,a);if(!v){throw new Error("Generated id attribute found - to offer flexibility a stable control id is needed to assign the changes to, but for this control the id was generated by SAPUI5 "+C);}var s=jQuery.extend(A||{},{id:"",idIsLocal:false},true);if(U.hasLocalIdSuffix(c,a)){var l=a.getLocalId(C);s.id=l;s.idIsLocal=true;}else{s.id=C;}return s;}};});
