/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";return{name:{singular:function(){return sap.uxap.i18nModel.getResourceBundle().getText("LAYOUT_CONTROL_NAME");},plural:function(){return sap.uxap.i18nModel.getResourceBundle().getText("LAYOUT_CONTROL__PLURAL");}},aggregations:{sections:{domRef:":sap-domref > .sapUxAPObjectPageWrapper",childrenName:{singular:function(){return sap.uxap.i18nModel.getResourceBundle().getText("SECTION_CONTROL_NAME");},plural:function(){return sap.uxap.i18nModel.getResourceBundle().getText("SECTION_CONTROL_NAME_PLURAL");}},actions:{move:"moveControls"}}},cloneDomRef:":sap-domref > header"};},false);
