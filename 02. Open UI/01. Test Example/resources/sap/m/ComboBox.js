/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./ComboBoxTextField','./ComboBoxBase','./ComboBoxRenderer','./Popover','./SelectList','./Dialog','./Toolbar','./Button','./library'],function(q,C,a,b,P,S,D,T,B,l){"use strict";var c=a.extend("sap.m.ComboBox",{metadata:{library:"sap.m",properties:{selectedKey:{type:"string",group:"Data",defaultValue:""},selectedItemId:{type:"string",group:"Misc",defaultValue:""},showSecondaryValues:{type:"boolean",group:"Misc",defaultValue:false}},associations:{selectedItem:{type:"sap.ui.core.Item",multiple:false}},events:{selectionChange:{parameters:{selectedItem:{type:"sap.ui.core.Item"}}}}}});function h(o,i){if(!i){return;}var d=o.getFocusDomRef(),e=d.selectionStart,g=d.selectionEnd,I=e!==g,t=d.value.substring(0,d.selectionStart),j=this.getSelectedItem();if(i!==j){o.updateDomValue(i.getText());this.setSelection(i);this.fireSelectionChange({selectedItem:i});i=this.getSelectedItem();if(!q.sap.startsWithIgnoreCase(i.getText(),t)||!I){e=0;}o.selectText(e,d.value.length);}this.scrollToItem(i);}function s(i,e){if(document.activeElement===this.getFocusDomRef()){this.selectText(i,e);}}function f(i){var I=this.getSelectedItem(),o=I&&I.getDomRef(),d=I&&o.offsetTop,e=I&&o.offsetHeight,p=this.getPicker(),g=p.getDomRef("cont"),j=g.clientHeight;if(I&&((d+e)>(j))){if(!i){this.getList().$().css("visibility","hidden");}else{g.scrollTop=d-e/2;this.getList().$().css("visibility","visible");}}}c.prototype._handleAriaActiveDescendant=function(i){var d=this.getFocusDomRef(),A="aria-activedescendant";if(d){if(i&&i.getDomRef()&&this.isOpen()){d.setAttribute(A,i.getId());}else{d.removeAttribute(A);}}};c.prototype._getSelectedItemText=function(i){i=i||this.getSelectedItem();if(!i){i=this.getDefaultSelectedItem();}if(i){return i.getText();}return"";};c.prototype._callMethodInControl=function(F,A){var L=this.getList();if(A[0]==="items"){if(L){return S.prototype[F].apply(L,A);}}else{return a.prototype[F].apply(this,A);}};c.prototype._setItemVisibility=function(i,v){var o=i&&i.$(),d="sapMSelectListItemBaseInvisible";if(v){i.bVisible=true;o.length&&o.removeClass(d);}else{i.bVisible=false;o.length&&o.addClass(d);}};c.prototype.setSelectedIndex=function(i,_){var I;_=_||this.getItems();i=(i>_.length-1)?_.length-1:Math.max(0,i);I=_[i];if(I){this.setSelection(I);}};c.prototype.createDropdown=function(){var t=this;var p=new P({showHeader:false,placement:sap.m.PlacementType.VerticalPreferredBottom,offsetX:0,offsetY:0,bounce:false,showArrow:false});p.setInitialFocus(this.isPlatformTablet()?p:this);p.open=function(){return this.openBy(t);};return p;};c.prototype.createPickerTextField=function(){var t=new C({width:"100%",showButton:false}).addEventDelegate({onsapenter:function(){this.updateDomValue(t.getValue());this.onChange();}},this);return t;};c.prototype.init=function(){a.prototype.init.apply(this,arguments);this.bOpenValueStateMessage=true;this._sValueBeforeOpen="";this._oSelectedItemBeforeOpen=null;};c.prototype.onBeforeRendering=function(){a.prototype.onBeforeRendering.apply(this,arguments);this.synchronizeSelection();};c.prototype.exit=function(){a.prototype.exit.apply(this,arguments);this._oSelectedItemBeforeOpen=null;};c.prototype.onBeforeRenderingPicker=function(){var o=this["onBeforeRendering"+this.getPickerType()];o&&o.call(this);};c.prototype.onBeforeRenderingDropdown=function(){var p=this.getPicker(),w=(this.$().outerWidth()/parseFloat(sap.m.BaseFontSize))+"rem";if(p){p.setContentMinWidth(w);}};c.prototype.onBeforeRenderingList=function(){if(this.bProcessingLoadItemsEvent){var L=this.getList(),F=this.getFocusDomRef();if(L){L.setBusy(true);}if(F){F.setAttribute("aria-busy","true");}}};c.prototype.onAfterRenderingPicker=function(){var o=this["onAfterRendering"+this.getPickerType()];o&&o.call(this);f.call(this,false);};c.prototype.onAfterRenderingList=function(){if(this.bProcessingLoadItemsEvent&&(this.getItems().length===0)){return;}var L=this.getList(),F=this.getFocusDomRef();if(L){L.setBusy(false);}if(F){F.removeAttribute("aria-busy");}};c.prototype.onBeforeOpenDialog=function(){var p=this.getPickerTextField();this._oSelectedItemBeforeOpen=this.getSelectedItem();this._sValueBeforeOpen=this.getValue();if(this.getSelectedItem()){this.filterItems({property:"text",value:""});}p.setValue(this._sValueBeforeOpen);};c.prototype.revertSelection=function(){var p,o=this.getPickerTextField();this.setSelectedItem(this._oSelectedItemBeforeOpen);this.setValue(this._sValueBeforeOpen);if(this.getSelectedItem()===null){p=this._sValueBeforeOpen;}else{p=this._oSelectedItemBeforeOpen.getText();}o&&o.setValue(p);};c.prototype.oninput=function(e){a.prototype.oninput.apply(this,arguments);if(e.isMarked("invalid")){return;}var t=(this.getPickerType()==="Dropdown");this.loadItems(function(){var o=this.getSelectedItem(),v=e.target.value,E=v==="",d=e.srcControl,V;if(E&&!this.bOpenedByKeyboardOrButton){V=this.getItems();}else{V=this.filterItems({property:"text",value:v});}var i=!!V.length;var F=V[0];if(!E&&F&&F.getEnabled()){if(d._bDoTypeAhead){d.updateDomValue(F.getText());}this.setSelection(F);if(o!==this.getSelectedItem()){this.fireSelectionChange({selectedItem:this.getSelectedItem()});}if(d._bDoTypeAhead){setTimeout(s.bind(d,v.length,d.getValue().length),0);}}if(E||!i){this.setSelection(null);if(o!==this.getSelectedItem()){this.fireSelectionChange({selectedItem:this.getSelectedItem()});}}if(i){if(E&&!this.bOpenedByKeyboardOrButton){this.close();}else if(t){this.open();this.scrollToItem(this.getSelectedItem());}}else if(this.isOpen()){if(t&&!this.bOpenedByKeyboardOrButton){this.close();}}else{this.clearFilter();}},{name:"input",busyIndicator:false});if(this.bProcessingLoadItemsEvent&&t){this.open();}};c.prototype.filterItems=function(o,I){var p=o.property,v=o.value,e=v==="",m=false,M="get"+p.charAt(0).toUpperCase()+p.slice(1),F=[],d=null;I=I||this.getItems();for(var i=0;i<I.length;i++){d=I[i];m=q.sap.startsWithIgnoreCase(d[M](),v)||e;if(m){F.push(d);}this._setItemVisibility(d,m);}return F;};c.prototype.onSelectionChange=function(o){var i=o.getParameter("selectedItem");this.setSelection(i);this.fireSelectionChange({selectedItem:this.getSelectedItem()});this.onChange();};c.prototype.onItemPress=function(o){var i=o.getParameter("item");this.close();this.updateDomValue(i.getText());this.setProperty("value",i.getText(),true);setTimeout(this.selectText.bind(this,this.getValue().length,this.getValue().length),0);};c.prototype.onkeydown=function(e){var o=e.srcControl;a.prototype.onkeydown.apply(o,arguments);if(!o.getEnabled()||!o.getEditable()){return;}var k=q.sap.KeyCodes;o._bDoTypeAhead=(e.which!==k.BACKSPACE)&&(e.which!==k.DELETE);};c.prototype.oncut=function(e){var o=e.srcControl;a.prototype.oncut.apply(o,arguments);o._bDoTypeAhead=false;};c.prototype.onsapenter=function(e){var o=e.srcControl;a.prototype.onsapenter.apply(o,arguments);if(!o.getEnabled()||!o.getEditable()){return;}if(o.isOpen()){o.close();}};c.prototype.onsapdown=function(e){var o=e.srcControl;if(!o.getEnabled()||!o.getEditable()){return;}e.setMarked();e.preventDefault();this.loadItems(function navigateToNextSelectableItem(){var d=this.getSelectableItems();var n=d[d.indexOf(this.getSelectedItem())+1];h.call(this,o,n);});};c.prototype.onsapup=function(e){var o=e.srcControl;if(!o.getEnabled()||!o.getEditable()){return;}e.setMarked();e.preventDefault();this.loadItems(function navigateToPrevSelectableItem(){var d=this.getSelectableItems();var p=d[d.indexOf(this.getSelectedItem())-1];h.call(this,o,p);});};c.prototype.onsaphome=function(e){var o=e.srcControl;if(!o.getEnabled()||!o.getEditable()){return;}e.setMarked();e.preventDefault();this.loadItems(function navigateToFirstSelectableItem(){var F=this.getSelectableItems()[0];h.call(this,o,F);});};c.prototype.onsapend=function(e){var o=e.srcControl;if(!o.getEnabled()||!o.getEditable()){return;}e.setMarked();e.preventDefault();this.loadItems(function navigateToLastSelectableItem(){var L=this.findLastEnabledItem(this.getSelectableItems());h.call(this,o,L);});};c.prototype.onsappagedown=function(e){var o=e.srcControl;if(!o.getEnabled()||!o.getEditable()){return;}e.setMarked();e.preventDefault();this.loadItems(function(){var d=this.getSelectableItems(),i=d.indexOf(this.getSelectedItem())+10,I;i=(i>d.length-1)?d.length-1:Math.max(0,i);I=d[i];h.call(this,o,I);});};c.prototype.onsappageup=function(e){var o=e.srcControl;if(!o.getEnabled()||!o.getEditable()){return;}e.setMarked();e.preventDefault();this.loadItems(function(){var d=this.getSelectableItems(),i=d.indexOf(this.getSelectedItem())-10,I;i=(i>d.length-1)?d.length-1:Math.max(0,i);I=d[i];h.call(this,o,I);});};c.prototype.onfocusin=function(e){var d=this.getPickerType()==="Dropdown";if(e.target===this.getOpenArea()){this.bOpenValueStateMessage=false;if(d&&!this.isPlatformTablet()){this.focus();}}else{if(d){setTimeout(function(){if(document.activeElement===this.getFocusDomRef()&&!this.bFocusoutDueRendering&&!this.getSelectedText()){this.selectText(0,this.getValue().length);}}.bind(this),0);}if(!this.isOpen()&&this.bOpenValueStateMessage&&this.shouldValueStateMessageBeOpened()){this.openValueStateMessage();}this.bOpenValueStateMessage=true;}this.$().addClass("sapMFocus");};c.prototype.onsapfocusleave=function(e){var t,p,r,F;a.prototype.onsapfocusleave.apply(this,arguments);if(this.getPickerType()==="Dialog"){return;}p=this.getAggregation("picker");if(!e.relatedControlId||!p){return;}t=this.isPlatformTablet();r=sap.ui.getCore().byId(e.relatedControlId);F=r&&r.getFocusDomRef();if(q.sap.containsOrEquals(p.getFocusDomRef(),F)&&!t){this.focus();}};c.prototype.setSelection=function(i){var L=this.getList(),k;if(L){L.setSelection(i);}this.setAssociation("selectedItem",i,true);this.setProperty("selectedItemId",(i instanceof sap.ui.core.Item)?i.getId():i,true);if(typeof i==="string"){i=sap.ui.getCore().byId(i);}k=i?i.getKey():"";this.setProperty("selectedKey",k,true);this._handleAriaActiveDescendant(i);};c.prototype.isSelectionSynchronized=function(){var i=this.getSelectedItem();return this.getSelectedKey()===(i&&i.getKey());};c.prototype.synchronizeSelection=function(){if(this.isSelectionSynchronized()){return;}var k=this.getSelectedKey(),i=this.getItemByKey(""+k);if(i&&(k!=="")){this.setAssociation("selectedItem",i,true);this.setProperty("selectedItemId",i.getId(),true);if(this._sValue===this.getValue()){this.setValue(i.getText());}}};c.prototype.isFiltered=function(){var L=this.getList();return L&&(L.getVisibleItems().length!==L.getItems().length);};c.prototype.isItemVisible=function(i){return i&&(i.bVisible===undefined||i.bVisible);};c.prototype.createPicker=function(p){var o=this.getAggregation("picker");if(o){return o;}o=this["create"+p]();this.setAggregation("picker",o,true);var d=this.getRenderer().CSS_CLASS_COMBOBOXBASE;o.setHorizontalScrolling(false).addStyleClass(d+"Picker").addStyleClass(d+"Picker-CTX").attachBeforeOpen(this.onBeforeOpen,this).attachAfterOpen(this.onAfterOpen,this).attachBeforeClose(this.onBeforeClose,this).attachAfterClose(this.onAfterClose,this).addEventDelegate({onBeforeRendering:this.onBeforeRenderingPicker,onAfterRendering:this.onAfterRenderingPicker},this).addContent(this.createList());return o;};c.prototype.createList=function(){var r=this.getRenderer();this._oList=new S({width:"100%",busyIndicatorDelay:0}).addStyleClass(r.CSS_CLASS_COMBOBOXBASE+"List").addStyleClass(r.CSS_CLASS_COMBOBOX+"List").addEventDelegate({ontap:function(e){this.close();},onBeforeRendering:this.onBeforeRenderingList,onAfterRendering:this.onAfterRenderingList},this).attachSelectionChange(this.onSelectionChange,this).attachItemPress(this.onItemPress,this);return this._oList;};c.prototype.onBeforeOpen=function(){var p=this["onBeforeOpen"+this.getPickerType()],d=this.getFocusDomRef();if(this.hasLoadItemsEventListeners()&&!this.bProcessingLoadItemsEvent){this.loadItems();}this.addStyleClass(this.getRenderer().CSS_CLASS_COMBOBOXBASE+"Pressed");if(d){d.setAttribute("aria-owns",this.getList().getId());}this.addContent();p&&p.call(this);};c.prototype.onBeforeOpenDropdown=function(){};c.prototype.onAfterOpen=function(){var d=this.getFocusDomRef(),i=this.getSelectedItem();if(d){d.setAttribute("aria-expanded","true");i&&d.setAttribute("aria-activedescendant",i.getId());}f.call(this,true);};c.prototype.onBeforeClose=function(){a.prototype.onBeforeClose.apply(this,arguments);var d=this.getFocusDomRef();if(d){d.removeAttribute("aria-owns");d.removeAttribute("aria-activedescendant");if(this.shouldValueStateMessageBeOpened()&&(document.activeElement===d)){this.openValueStateMessage();}}this.removeStyleClass(this.getRenderer().CSS_CLASS_COMBOBOXBASE+"Pressed");};c.prototype.onAfterClose=function(){var d=this.getFocusDomRef();if(d){d.setAttribute("aria-expanded","false");}this.clearFilter();};c.prototype.isItemSelected=function(i){return i&&(i.getId()===this.getAssociation("selectedItem"));};c.prototype.getDefaultSelectedItem=function(){return null;};c.prototype.clearSelection=function(){this.setSelection(null);};c.prototype.onPropertyChange=function(o,d){var n=o.getParameter("newValue"),p=o.getParameter("name"),m="set"+p.charAt(0).toUpperCase()+p.slice(1),e=(d&&d.srcControl)||this.getPickerTextField();if(/\bvalue\b|\benabled\b|\bname\b|\bplaceholder\b|\beditable\b|\btextAlign\b|\btextDirection\b/.test(p)&&e&&(typeof e[m]==="function")){e[m](n);}};c.prototype.onItemChange=function(o){var d=this.getAssociation("selectedItem"),n=o.getParameter("newValue"),p=o.getParameter("name");if(d===o.getParameter("id")){switch(p){case"text":if(!this.isBound("value")){this.setValue(n);}break;case"key":if(!this.isBound("selectedKey")){this.setSelectedKey(n);}break;}}};c.prototype.selectText=function(i,d){a.prototype.selectText.apply(this,arguments);this.textSelectionStart=i;this.textSelectionEnd=d;return this;};c.prototype.addAggregation=function(A,o,d){this._callMethodInControl("addAggregation",arguments);if(A==="items"&&!d&&!this.isInvalidateSuppressed()){this.invalidate(o);}return this;};c.prototype.getAggregation=function(){return this._callMethodInControl("getAggregation",arguments);};c.prototype.setAssociation=function(A,i,d){var L=this.getList();if(L&&(A==="selectedItem")){S.prototype.setAssociation.apply(L,arguments);}return a.prototype.setAssociation.apply(this,arguments);};c.prototype.indexOfAggregation=function(){return this._callMethodInControl("indexOfAggregation",arguments);};c.prototype.insertAggregation=function(){this._callMethodInControl("insertAggregation",arguments);return this;};c.prototype.removeAggregation=function(){return this._callMethodInControl("removeAggregation",arguments);};c.prototype.removeAllAggregation=function(){return this._callMethodInControl("removeAllAggregation",arguments);};c.prototype.destroyAggregation=function(A,d){this._callMethodInControl("destroyAggregation",arguments);return this;};c.prototype.setProperty=function(p,v,d){var L=this.getList();if(/selectedKey|selectedItemId/.test(p)){L&&S.prototype.setProperty.apply(L,arguments);}return a.prototype.setProperty.apply(this,arguments);};c.prototype.removeAllAssociation=function(A,d){var L=this.getList();if(L&&(A==="selectedItem")){S.prototype.removeAllAssociation.apply(L,arguments);}return a.prototype.removeAllAssociation.apply(this,arguments);};c.prototype.clone=function(I){var o=a.prototype.clone.apply(this,arguments),L=this.getList();if(!this.isBound("items")&&L){for(var i=0,d=L.getItems();i<d.length;i++){o.addItem(d[i].clone());}o.setSelectedIndex(this.indexOfItem(this.getSelectedItem()));}return o;};c.prototype.findAggregatedObjects=function(){var L=this.getList();if(L){return S.prototype.findAggregatedObjects.apply(L,arguments);}return[];};c.prototype.setShowSecondaryValues=function(A){this.setProperty("showSecondaryValues",A,true);var L=this.getList();if(L){L.setShowSecondaryValues(A);}return this;};c.prototype.getItems=function(){var L=this.getList();return L?L.getItems():[];};c.prototype.setSelectedItem=function(i){if(typeof i==="string"){this.setAssociation("selectedItem",i,true);i=sap.ui.getCore().byId(i);}if(!(i instanceof sap.ui.core.Item)&&i!==null){return this;}if(!i){i=this.getDefaultSelectedItem();}this.setSelection(i);this.setValue(this._getSelectedItemText(i));return this;};c.prototype.setSelectedItemId=function(i){i=this.validateProperty("selectedItemId",i);if(!i){i=this.getDefaultSelectedItem();}this.setSelection(i);i=this.getSelectedItem();this.setValue(this._getSelectedItemText(i));return this;};c.prototype.setSelectedKey=function(k){k=this.validateProperty("selectedKey",k);var d=(k==="");if(d){this.setSelection(null);this.setValue("");return this;}var i=this.getItemByKey(k);if(i){this.setSelection(i);this.setValue(this._getSelectedItemText(i));return this;}this._sValue=this.getValue();return this.setProperty("selectedKey",k);};c.prototype.getSelectedItem=function(){var v=this.getAssociation("selectedItem");return(v===null)?null:sap.ui.getCore().byId(v)||null;};c.prototype.removeItem=function(i){i=a.prototype.removeItem.apply(this,arguments);var I;if(this.isBound("items")&&!this.bItemsUpdated){return i;}var v=this.getValue();if(this.getItems().length===0){this.clearSelection();}else if(this.isItemSelected(i)){I=this.getDefaultSelectedItem();this.setSelection(I);this.setValue(v);}return i;};return c;},true);
