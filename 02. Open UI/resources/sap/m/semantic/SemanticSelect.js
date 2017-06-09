/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/m/semantic/SemanticControl','sap/m/Select'],function(S,a){"use strict";var b=S.extend("sap.m.semantic.SemanticSelect",{metadata:{library:"sap.m","abstract":true,properties:{enabled:{type:"boolean",group:"Behavior",defaultValue:true},selectedKey:{type:"string",group:"Data",defaultValue:""}},defaultAggregation:"items",aggregations:{items:{type:"sap.ui.core.Item",multiple:true,singularName:"item",bindable:"bindable"}},associations:{selectedItem:{type:"sap.ui.core.Item",multiple:false}},events:{change:{parameters:{selectedItem:{type:"sap.ui.core.Item"}}}}}});b.prototype.setProperty=function(p,v,s){if(!this.getMetadata().getProperties()[p]&&!b.getMetadata().getProperties()[p]&&!S.getMetadata().getProperties()[p]){jQuery.sap.log.error("unknown property: "+p,this);return this;}S.prototype.setProperty.call(this,p,v,s);};b.prototype.getSelectedItem=function(){return this._getControl().getSelectedItem();};b.prototype.setSelectedItem=function(i){this._getControl().setSelectedItem(i);this.setSelectedKey(this._getControl().getSelectedKey());return this;};b.prototype.getItemAt=function(i){return this._getControl().getItemAt(i);};b.prototype._getControl=function(){var c=this.getAggregation('_control');if(!c){this.setAggregation('_control',new a({id:this.getId()+"-select",change:this._onInnerSelectChange.bind(this)}),true);c=this.getAggregation('_control');c.applySettings(this._getConfiguration().getSettings());if(typeof this._getConfiguration().getEventDelegates==="function"){c.addEventDelegate(this._getConfiguration().getEventDelegates(c));}}return c;};b.prototype._onInnerSelectChange=function(e){var s=e.getSource().getSelectedItem();this.setSelectedItem(s);this.fireChange({selectedItem:s});};return b;},true);
