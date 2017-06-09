/*
 * ! UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control','sap/ui/core/IconPool','sap/ui/layout/form/SimpleForm','sap/ui/layout/VerticalLayout','sap/ui/layout/HorizontalLayout','./Page','./Button','./ButtonType','./Bar','./Title','./Image','./Link','./Text','./QuickViewGroupElementType','./Label','./HBox','sap/ui/core/Icon','sap/ui/core/Title','sap/ui/core/TitleLevel','sap/ui/core/CustomData','sap/ui/layout/form/SimpleFormLayout'],function(q,l,C,I,S,V,H,P,B,a,b,T,c,L,d,Q,f,g,h,i,m,n,o){"use strict";var p=C.extend("sap.m.QuickViewPage",{metadata:{library:"sap.m",properties:{pageId:{type:"string",group:"Misc",defaultValue:""},header:{type:"string",group:"Misc",defaultValue:""},title:{type:"string",group:"Misc",defaultValue:""},titleUrl:{type:"string",group:"Misc",defaultValue:""},crossAppNavCallback:{type:"object",group:"Misc"},description:{type:"string",group:"Misc",defaultValue:""},icon:{type:"string",group:"Misc",defaultValue:""}},defaultAggregation:"groups",aggregations:{groups:{type:"sap.m.QuickViewGroup",multiple:true,singularName:"group",bindable:"bindable"}}}});p.prototype.init=function(){this._oResourceBundle=sap.ui.getCore().getLibraryResourceBundle('sap.m');var G=sap.ushell&&sap.ushell.Container&&sap.ushell.Container.getService;if(G){this.oCrossAppNavigator=G("CrossApplicationNavigation");}};p.prototype.onBeforeRendering=function(){this._destroyPageContent();this._createPageContent();};p.prototype.getPageContent=function(){return this._mPageContent;};p.prototype.setNavContext=function(e){this._mNavContext=e;};p.prototype.getNavContext=function(){return this._mNavContext;};p.prototype.setPageTitleControl=function(t){this._oPageTitle=t;};p.prototype.getPageTitleControl=function(){return this._oPageTitle;};p.prototype._createPage=function(){var e=this._createPageContent();var N=this.getNavContext();var j;if(this._oPage){j=this._oPage;j.destroyContent();j.setCustomHeader(new b());}else{j=this._oPage=new P(N.quickViewId+'-'+this.getPageId(),{customHeader:new b()});j.addEventDelegate({onAfterRendering:this.onAfterRenderingPage},this);}if(e.header){j.addContent(e.header);}j.addContent(e.form);var k=j.getCustomHeader();k.addContentMiddle(new T({text:this.getHeader()}).addStyleClass("sapMQuickViewTitle"));if(N.hasBackButton){k.addContentLeft(new B({type:a.Back,tooltip:this._oResourceBundle.getText("PAGE_NAVBUTTON_TEXT"),press:function(){if(N.navContainer){N.navContainer.back();}}}));}if(N.popover&&sap.ui.Device.system.phone){k.addContentRight(new B({icon:I.getIconURI("decline"),press:function(){N.popover.close();}}));}j.addStyleClass('sapMQuickViewPage');return j;};p.prototype.onAfterRenderingPage=function(){if(this._bItemsChanged){var N=this.getNavContext();if(N){N.quickView._restoreFocus();}this._bItemsChanged=false;}};p.prototype._createPageContent=function(){var F=this._createForm();var e=this._getPageHeaderContent();var j=this.getPageTitleControl();if(e&&j){F.addAriaLabelledBy(j);}this._mPageContent={form:F,header:e};return this._mPageContent;};p.prototype._createForm=function(){var G=this.getAggregation("groups"),F=new S({maxContainerCols:1,editable:false,layout:o.ResponsiveGridLayout});if(G){for(var j=0;j<G.length;j++){if(G[j].getVisible()){this._renderGroup(G[j],F);}}}return F;};p.prototype._getPageHeaderContent=function(){var e,v=new V(),j=new H();var s=this.getIcon();var t=this.getTitle();var D=this.getDescription();if(!s&&!t&&!D){return null;}if(s){if(this.getIcon().indexOf("sap-icon")==0){e=new h({src:s,useIconTooltip:false,tooltip:t});}else{e=new c({src:s,decorative:false,tooltip:t}).addStyleClass("sapUiIcon");}e.addStyleClass("sapMQuickViewThumbnail");if(this.getTitleUrl()){e.attachPress(this._crossApplicationNavigation(this));}j.addContent(e);}var k;if(this.getTitleUrl()){k=new L({text:t,href:this.getTitleUrl(),target:"_blank"});}else if(this.getCrossAppNavCallback()){k=new L({text:t});k.attachPress(this._crossApplicationNavigation(this));}else{k=new T({text:t,level:m.H1});}this.setPageTitleControl(k);var r=new d({text:D});v.addContent(k);v.addContent(r);j.addContent(v);return j;};p.prototype._renderGroup=function(G,F){var e=G.getAggregation("elements");var j,r,s;if(G.getHeading()){F.addContent(new i({text:G.getHeading(),level:m.H2}));}if(!e){return;}var N=this.getNavContext();for(var k=0;k<e.length;k++){j=e[k];if(!j.getVisible()){continue;}s=new f({text:j.getLabel()});var t;if(N){t=N.quickViewId;}r=j._getGroupElementValue(t);F.addContent(s);if(!r){F.addContent(new sap.m.Text({text:""}));continue;}if(r instanceof L){r.addAriaLabelledBy(r);}s.setLabelFor(r.getId());if(j.getType()==Q.pageLink){r.attachPress(this._attachPressLink(this));}if(j.getType()==Q.mobile&&!sap.ui.Device.system.desktop){var u=new h({src:I.getIconURI("post"),tooltip:this._oResourceBundle.getText("QUICKVIEW_SEND_SMS"),decorative:false,customData:[new n({key:"phoneNumber",value:j.getValue()})],press:this._mobilePress});var v=new g({items:[r,u]});F.addContent(v);}else{F.addContent(r);}}};p.prototype._crossApplicationNavigation=function(t){return function(){if(t.getCrossAppNavCallback()&&t.oCrossAppNavigator){var e=t.getCrossAppNavCallback();if(typeof e=="function"){var j=e();var k=t.oCrossAppNavigator.hrefForExternal({target:{semanticObject:j.target.semanticObject,action:j.target.action},params:j.params});sap.m.URLHelper.redirect(k);}}else if(t.getTitleUrl()){window.open(t.getTitleUrl(),"_blank");}};};p.prototype._destroyPageContent=function(){if(!this._mPageContent){return;}if(this._mPageContent.form){this._mPageContent.form.destroy();}if(this._mPageContent.header){this._mPageContent.header.destroy();}this._mPageContent=null;};p.prototype.exit=function(){this._oResourceBundle=null;if(this._oPage){this._oPage.destroy();this._oPage=null;}else{this._destroyPageContent();}this._mNavContext=null;};p.prototype._attachPressLink=function(t){var N=t.getNavContext();return function(e){e.preventDefault();var s=this.getCustomData()[0].getValue();if(N.navContainer&&s){N.navContainer.to(s);}};};p.prototype._mobilePress=function(){var s="sms://"+q.sap.encodeURL(this.getCustomData()[0].getValue());window.location.replace(s);};p.prototype._updatePage=function(){var N=this.getNavContext();if(N&&N.quickView._bRendered){this._bItemsChanged=true;N.popover.focus();N.quickView._clearContainerHeight();this._createPage();N.popover.$().css('display','block');N.quickView._restoreFocus();}};["setModel","bindAggregation","setAggregation","insertAggregation","addAggregation","removeAggregation","removeAllAggregation","destroyAggregation"].forEach(function(F){p.prototype["_"+F+"Old"]=p.prototype[F];p.prototype[F]=function(){var r=p.prototype["_"+F+"Old"].apply(this,arguments);this._updatePage();if(["removeAggregation","removeAllAggregation"].indexOf(F)!==-1){return r;}return this;};});p.prototype.setProperty=function(){C.prototype.setProperty.apply(this,arguments);this._updatePage();};return p;},true);
