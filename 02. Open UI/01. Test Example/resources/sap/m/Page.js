/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./library","sap/ui/core/Control","sap/ui/core/delegate/ScrollEnablement","sap/m/Title","sap/m/Button","sap/m/Bar"],function(q,l,C,S,T,B,a){"use strict";var P=C.extend("sap.m.Page",{metadata:{library:"sap.m",properties:{title:{type:"string",group:"Data",defaultValue:null},titleLevel:{type:"sap.ui.core.TitleLevel",group:"Appearance",defaultValue:sap.ui.core.TitleLevel.Auto},showNavButton:{type:"boolean",group:"Appearance",defaultValue:false},showHeader:{type:"boolean",group:"Appearance",defaultValue:true},showSubHeader:{type:"boolean",group:"Appearance",defaultValue:true},navButtonText:{type:"string",group:"Misc",defaultValue:null,deprecated:true},navButtonTooltip:{type:"string",group:"Misc",defaultValue:null},enableScrolling:{type:"boolean",group:"Behavior",defaultValue:true},icon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null,deprecated:true},backgroundDesign:{type:"sap.m.PageBackgroundDesign",group:"Appearance",defaultValue:sap.m.PageBackgroundDesign.Standard},navButtonType:{type:"sap.m.ButtonType",group:"Appearance",defaultValue:sap.m.ButtonType.Back,deprecated:true},showFooter:{type:"boolean",group:"Appearance",defaultValue:true},contentOnlyBusy:{type:"boolean",group:"Appearance",defaultValue:false},floatingFooter:{type:"boolean",group:"Appearance",defaultValue:false}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"},customHeader:{type:"sap.m.IBar",multiple:false},footer:{type:"sap.m.IBar",multiple:false},subHeader:{type:"sap.m.IBar",multiple:false},headerContent:{type:"sap.ui.core.Control",multiple:true,singularName:"headerContent"},landmarkInfo:{type:"sap.m.PageAccessibleLandmarkInfo",multiple:false},_internalHeader:{type:"sap.m.IBar",multiple:false,visibility:"hidden"}},events:{navButtonTap:{deprecated:true},navButtonPress:{}},designTime:true}});P.FOOTER_ANIMATION_DURATION=350;P.prototype._hasScrolling=function(){return this.getEnableScrolling();};P.prototype.onBeforeRendering=function(){if(this._oScroller&&!this._hasScrolling()){this._oScroller.destroy();this._oScroller=null;}else if(this._hasScrolling()&&!this._oScroller){this._oScroller=new S(this,null,{scrollContainerId:this.getId()+"-cont",horizontal:false,vertical:true});}if(this._headerTitle){this._headerTitle.setLevel(this.getTitleLevel());}};P.prototype.onAfterRendering=function(){q.sap.delayedCall(10,this,this._adjustFooterWidth);};P.prototype.exit=function(){if(this._oScroller){this._oScroller.destroy();this._oScroller=null;}if(this._headerTitle){this._headerTitle.destroy();this._headerTitle=null;}if(this._navBtn){this._navBtn.destroy();this._navBtn=null;}if(this._appIcon){this._appIcon.destroy();this._appIcon=null;}};P.prototype.setBackgroundDesign=function(b){var s=this.getBackgroundDesign();this.setProperty("backgroundDesign",b,true);this.$().removeClass("sapMPageBg"+s).addClass("sapMPageBg"+this.getBackgroundDesign());return this;};P.prototype.setTitle=function(t){var w=!this._headerTitle;this._headerTitle=this._headerTitle||new T(this.getId()+"-title",{text:t,level:this.getTitleLevel()});this._headerTitle.setText(t);if(w){this._updateHeaderContent(this._headerTitle,"middle",0);}this.setProperty("title",t,true);return this;};P.prototype._ensureNavButton=function(){var b=this.getNavButtonTooltip()||sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("PAGE_NAVBUTTON_TEXT");if(!this._navBtn){var n=this.getNavButtonType();this._navBtn=new B(this.getId()+"-navButton",{press:q.proxy(function(){this.fireNavButtonPress();this.fireNavButtonTap();},this)});if(sap.ui.Device.os.android&&n==sap.m.ButtonType.Back){this._navBtn.setType(sap.m.ButtonType.Up);}else{this._navBtn.setType(n);}}this._navBtn.setTooltip(b);};P.prototype.setShowNavButton=function(s){var o=!!this.getShowNavButton();if(s===o){return this;}this.setProperty("showNavButton",s,true);if(s){this._ensureNavButton();if(this._appIcon){this._updateHeaderContent(this._appIcon,"left",-1);}this._updateHeaderContent(this._navBtn,"left",0);}else if(this._navBtn){this._updateHeaderContent(this._navBtn,"left",-1);}return this;};P.prototype.setShowFooter=function(s){if(this.getDomRef()){(s)?this.$().addClass("sapMPageWithFooter"):this.$().removeClass("sapMPageWithFooter");}var $=q(this.getDomRef()).find(".sapMPageFooter").last(),u=sap.ui.getCore().getConfiguration().getAnimation();if(!this.getFloatingFooter()){this.setProperty("showFooter",s);return this;}this.setProperty("showFooter",s,true);$.toggleClass("sapMPageFooterControlShow",s);$.toggleClass("sapMPageFooterControlHide",!s);if(s){return this;}if(u){q.sap.delayedCall(P.FOOTER_ANIMATION_DURATION,this,function(){$.toggleClass("sapUiHidden",s);});}else{$.toggleClass("sapUiHidden",s);}return this;};P.prototype.setNavButtonType=function(n){this._ensureNavButton();if(!sap.ui.Device.os.ios&&n==sap.m.ButtonType.Back){this._navBtn.setType(sap.m.ButtonType.Up);}else{this._navBtn.setType(n);}this.setProperty("navButtonType",n,true);return this;};P.prototype.setNavButtonText=function(t){this._ensureNavButton();this.setProperty("navButtonText",t,true);return this;};P.prototype.setNavButtonTooltip=function(t){this.setProperty("navButtonTooltip",t,true);this._ensureNavButton();return this;};P.prototype.setIcon=function(i){var o=this.getIcon();if(o===i){return this;}this.setProperty("icon",i,true);return this;};P.prototype._adjustFooterWidth=function(){if(!this.getShowFooter()||!this.getFloatingFooter()||!this.getFooter()){return;}var $=q(this.getDomRef()).find(".sapMPageFooter").last();if(this._contentHasScroll()){$.css("right",q.position.scrollbarWidth()+"px");$.css("width","initial");}else{$.css("right",0);$.css("width","");}};P.prototype._contentHasScroll=function(){var $=q.sap.byId(this.getId()+"-cont",this.getDomRef());return $[0].scrollHeight>$.innerHeight();};P.prototype._updateHeaderContent=function(c,s,i){var I=this._getInternalHeader();if(I){switch(s){case"left":if(i==-1){if(I.getContentLeft()){I.removeContentLeft(c);}}else{if(I.indexOfContentLeft(c)!=i){I.insertContentLeft(c,i);I.invalidate();}}break;case"middle":if(i==-1){if(I.getContentMiddle()){I.removeContentMiddle(c);}}else{if(I.indexOfContentMiddle(c)!=i){I.insertContentMiddle(c,i);I.invalidate();}}break;case"right":if(i==-1){if(I.getContentRight()){I.removeContentRight(c);}}else{if(I.indexOfContentRight(c)!=i){I.insertContentRight(c,i);I.invalidate();}}break;default:break;}}};P.prototype._getInternalHeader=function(){var i=this.getAggregation("_internalHeader");if(!i){this.setAggregation("_internalHeader",new a(this.getId()+"-intHeader"),true);i=this.getAggregation("_internalHeader");if(this.getShowNavButton()&&this._navBtn){this._updateHeaderContent(this._navBtn,"left",0);}if(this.getTitle()&&this._headerTitle){this._updateHeaderContent(this._headerTitle,"middle",0);}}return i;};P.prototype._getAnyHeader=function(){var c=this.getCustomHeader();if(c){return c.addStyleClass("sapMPageHeader");}return this._getInternalHeader().addStyleClass("sapMPageHeader");};P.prototype.getScrollDelegate=function(){return this._oScroller;};P.prototype.scrollTo=function(y,t){if(this._oScroller){this._oScroller.scrollTo(0,y,t);}return this;};P.prototype.scrollToElement=function(e,t){if(e instanceof sap.ui.core.Element){e=e.getDomRef();}if(this._oScroller){this._oScroller.scrollToElement(e,t);}return this;};P.prototype.setContentOnlyBusy=function(c){this.setProperty("contentOnlyBusy",c,true);this.$().toggleClass("sapMPageBusyCoversAll",!c);return this;};P.prototype.getHeaderContent=function(){return this._getInternalHeader().getContentRight();};P.prototype.indexOfHeaderContent=function(c){return this._getInternalHeader().indexOfContentRight(c);};P.prototype.insertHeaderContent=function(c,i){return this._getInternalHeader().insertContentRight(c,i);};P.prototype.addHeaderContent=function(c){return this._getInternalHeader().addContentRight(c);};P.prototype.removeHeaderContent=function(c){return this._getInternalHeader().removeContentRight(c);};P.prototype.removeAllHeaderContent=function(){return this._getInternalHeader().removeAllContentRight();};P.prototype.destroyHeaderContent=function(){return this._getInternalHeader().destroyContentRight();};P.prototype.setCustomHeader=function(h){this.setAggregation("customHeader",h);if(h&&this.mEventRegistry["_adaptableContentChange"]){this.fireEvent("_adaptableContentChange",{"parent":this,"adaptableContent":h});}return this;};P.prototype._getAdaptableContent=function(){return this._getAnyHeader();};return P;},true);