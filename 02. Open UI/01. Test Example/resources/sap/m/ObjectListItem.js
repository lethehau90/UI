/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./ListItemBase','./library','sap/ui/core/IconPool'],function(q,L,l,I){"use strict";var O=L.extend("sap.m.ObjectListItem",{metadata:{library:"sap.m",properties:{title:{type:"string",group:"Misc",defaultValue:null},number:{type:"string",group:"Misc",defaultValue:null},numberUnit:{type:"string",group:"Misc",defaultValue:null},intro:{type:"string",group:"Misc",defaultValue:null},icon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},activeIcon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},iconDensityAware:{type:"boolean",group:"Misc",defaultValue:true},markFavorite:{type:"boolean",group:"Misc",defaultValue:null,deprecated:true},markFlagged:{type:"boolean",group:"Misc",defaultValue:null,deprecated:true},showMarkers:{type:"boolean",group:"Misc",defaultValue:null,deprecated:true},numberState:{type:"sap.ui.core.ValueState",group:"Misc",defaultValue:sap.ui.core.ValueState.None},titleTextDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:sap.ui.core.TextDirection.Inherit},introTextDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:sap.ui.core.TextDirection.Inherit},numberTextDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:sap.ui.core.TextDirection.Inherit},markLocked:{type:"boolean",group:"Misc",defaultValue:false,deprecated:true}},defaultAggregation:"attributes",aggregations:{attributes:{type:"sap.m.ObjectAttribute",multiple:true,singularName:"attribute"},firstStatus:{type:"sap.m.ObjectStatus",multiple:false},secondStatus:{type:"sap.m.ObjectStatus",multiple:false},markers:{type:"sap.m.ObjectMarker",multiple:true,singularName:"marker"}},designTime:true}});O.prototype.exit=function(e){if(this._oImageControl){this._oImageControl.destroy();}if(this._oTitleText){this._oTitleText.destroy();this._oTitleText=undefined;}L.prototype.exit.apply(this);};O.prototype._hasAttributes=function(){var a=this.getAttributes();if(a.length>0){for(var i=0;i<a.length;i++){if(!a[i]._isEmpty()){return true;}}}return false;};O.prototype._hasStatus=function(){return((this.getFirstStatus()&&!this.getFirstStatus()._isEmpty())||(this.getSecondStatus()&&!this.getSecondStatus()._isEmpty()));};O.prototype._hasBottomContent=function(){return(this._hasAttributes()||this._hasStatus()||this.getShowMarkers()||this.getMarkLocked()||this._getVisibleMarkers().length>0);};O.prototype._getVisibleAttributes=function(){var a=this.getAttributes();var v=[];for(var i=0;i<a.length;i++){if(a[i].getVisible()){v.push(a[i]);}}return v;};O.prototype._getVisibleMarkers=function(){var a=this.getMarkers();var v=[];for(var i=0;i<a.length;i++){if(a[i].getVisible()){v.push(a[i]);}}return v;};O.prototype._getImageControl=function(){var i=this.getId()+'-img';var s="2.5rem";var p;if(I.isIconURI(this.getIcon())){p={src:this.getIcon(),height:s,width:s,size:s,useIconTooltip:false,densityAware:this.getIconDensityAware()};}else{p={src:this.getIcon(),useIconTooltip:false,densityAware:this.getIconDensityAware()};}var c=['sapMObjLIcon'];this._oImageControl=sap.m.ImageHelper.getImageControl(i,this._oImageControl,this,p,c);return this._oImageControl;};O.prototype._activeHandlingInheritor=function(){var a=this.getActiveIcon();if(!!this._oImageControl&&!!a){this._oImageControl.setSrc(a);}};O.prototype._inactiveHandlingInheritor=function(){var s=this.getIcon();if(!!this._oImageControl){this._oImageControl.setSrc(s);}};O.prototype.setMarkFavorite=function(m){return this._setOldMarkers(sap.m.ObjectMarkerType.Favorite,m);};O.prototype.setMarkFlagged=function(m){return this._setOldMarkers(sap.m.ObjectMarkerType.Flagged,m);};O.prototype.setMarkLocked=function(m){return this._setOldMarkers(sap.m.ObjectMarkerType.Locked,m);};O.prototype.setShowMarkers=function(m){var M;var a=this.getMarkers();this.setProperty("showMarkers",m,false);for(var i=0;i<a.length;i++){M=a[i].getType();if((M===sap.m.ObjectMarkerType.Flagged&&this.getMarkFlagged())||(M===sap.m.ObjectMarkerType.Favorite&&this.getMarkFavorite())||(M===sap.m.ObjectMarkerType.Locked&&this.getMarkLocked())){a[i].setVisible(m);}}return this;};O.prototype._setOldMarkers=function(m,M){var a=this.getMarkers();var h=false;var o={Flagged:"-flag",Favorite:"-favorite",Locked:"-lock"};this.setProperty("mark"+m,M,false);if(!this.getShowMarkers()){M=false;}for(var i=0;i<a.length;i++){if(a[i].getType()===m){h=true;a[i].setVisible(M);break;}}if(!h){this.insertAggregation("markers",new sap.m.ObjectMarker({id:this.getId()+o[m],type:m,visible:M}));}return this;};O.prototype._getTitleText=function(){if(!this._oTitleText){this._oTitleText=new sap.m.Text(this.getId()+"-titleText",{maxLines:2});this._oTitleText.setParent(this,null,true);}return this._oTitleText;};return O;},true);
