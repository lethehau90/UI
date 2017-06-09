/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Element','./StandardListItem','./StandardListItemRenderer','sap/ui/core/Renderer','./library','sap/ui/unified/library'],function(q,E,S,a,R,l,u){"use strict";var P=E.extend("sap.m.PlanningCalendarRow",{metadata:{library:"sap.m",properties:{title:{type:"string",group:"Data"},text:{type:"string",group:"Data"},icon:{type:"sap.ui.core.URI",group:"Data",defaultValue:null},nonWorkingDays:{type:"int[]",group:"Misc",defaultValue:null},nonWorkingHours:{type:"int[]",group:"Misc",defaultValue:null},selected:{type:"boolean",group:"Data",defaultValue:false},key:{type:"string",group:"Data",defaultValue:null}},aggregations:{appointments:{type:"sap.ui.unified.CalendarAppointment",multiple:true,singularName:"appointment"},intervalHeaders:{type:"sap.ui.unified.CalendarAppointment",multiple:true,singularName:"intervalHeader"}}}});var C=S.extend("CalenderRowHeader",{metadata:{associations:{parentRow:{type:"sap.m.PlanningCalendarRow",multiple:false}}},setParentRow:function(i){this.setAssociation("parentRow",i,true);if(!i){this._oRow=undefined;}else if(typeof i=="string"){this._oRow=sap.ui.getCore().byId(i);}else{this._oRow=i;}return this;},renderer:R.extend(a)});CalenderRowHeaderRenderer.openItemTag=function(r,L){r.write("<div");};CalenderRowHeaderRenderer.closeItemTag=function(r,L){r.write("</div>");};CalenderRowHeaderRenderer.renderTabIndex=function(r,L){};P.prototype.init=function(){var i=this.getId();var c=new C(i+"-Head",{parentRow:this});var o=new sap.ui.unified.CalendarRow(i+"-CalRow",{checkResize:false,updateCurrentTime:false,ariaLabelledBy:i+"-Head"});o._oPlanningCalendarRow=this;o.getAppointments=function(){if(this._oPlanningCalendarRow){return this._oPlanningCalendarRow.getAppointments();}else{return[];}};o.getIntervalHeaders=function(){if(this._oPlanningCalendarRow){return this._oPlanningCalendarRow.getIntervalHeaders();}else{return[];}};this._oColumnListItem=new sap.m.ColumnListItem(this.getId()+"-CLI",{cells:[c,o]});};P.prototype.exit=function(){this._oColumnListItem.destroy();this._oColumnListItem=undefined;};P.prototype.setTooltip=function(t){this.setAggregation("tooltip",t,true);this._oColumnListItem.getCells()[0].setTooltip(t);return this;};P.prototype.setTitle=function(t){this.setProperty("title",t,true);this._oColumnListItem.getCells()[0].setTitle(t);return this;};P.prototype.setText=function(t){this.setProperty("text",t,true);this._oColumnListItem.getCells()[0].setDescription(t);if(t){this._oColumnListItem.getCells()[1].addStyleClass("sapMPlanCalRowLarge");}else{this._oColumnListItem.getCells()[1].removeStyleClass("sapMPlanCalRowLarge");}return this;};P.prototype.setIcon=function(i){this.setProperty("icon",i,true);this._oColumnListItem.getCells()[0].setIcon(i);return this;};P.prototype.setNonWorkingDays=function(n){this.setProperty("nonWorkingDays",n,true);this.getCalendarRow().setNonWorkingDays(n);return this;};P.prototype.setNonWorkingHours=function(n){this.setProperty("nonWorkingHours",n,true);this.getCalendarRow().setNonWorkingHours(n);return this;};P.prototype.invalidate=function(o){if(!o||!(o instanceof sap.ui.unified.CalendarAppointment)){E.prototype.invalidate.apply(this,arguments);}else if(this._oColumnListItem){this.getCalendarRow().invalidate(o);}};P.prototype.removeAppointment=function(o){var r=this.removeAggregation("appointments",o,true);this.getCalendarRow().invalidate();return r;};P.prototype.removeAllAppointments=function(){var r=this.removeAllAggregation("appointments",true);this.getCalendarRow().invalidate();return r;};P.prototype.destroyAppointments=function(){var d=this.destroyAggregation("appointments",true);this.getCalendarRow().invalidate();return d;};P.prototype.removeIntervalHeader=function(o){var r=this.removeAggregation("intervalHeaders",o,true);this.getCalendarRow().invalidate();return r;};P.prototype.removeAllIntervalHeaders=function(){var r=this.removeAllAggregation("intervalHeaders",true);this.getCalendarRow().invalidate();return r;};P.prototype.destroyIntervalHeaders=function(){var d=this.destroyAggregation("intervalHeaders",true);this.getCalendarRow().invalidate();return d;};P.prototype.setSelected=function(s){this.setProperty("selected",s,true);this._oColumnListItem.setSelected(s);return this;};P.prototype.getColumnListItem=function(){return this._oColumnListItem;};P.prototype.getCalendarRow=function(){return this._oColumnListItem.getCells()[1];};P.prototype.applyFocusInfo=function(f){this.getCalendarRow().applyFocusInfo(f);return this;};return P;},true);