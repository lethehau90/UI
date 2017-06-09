/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Control','sap/ui/core/LocaleData','sap/ui/model/type/Date','sap/ui/unified/calendar/CalendarUtils','./calendar/Header','./calendar/TimesRow','./calendar/DatesRow','./calendar/MonthPicker','./calendar/YearPicker','sap/ui/core/date/UniversalDate','./library'],function(q,C,L,D,a,H,T,b,M,Y,U,l){"use strict";var c=C.extend("sap.ui.unified.CalendarTimeInterval",{metadata:{library:"sap.ui.unified",properties:{width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},startDate:{type:"object",group:"Data"},intervalSelection:{type:"boolean",group:"Behavior",defaultValue:false},singleSelection:{type:"boolean",group:"Behavior",defaultValue:true},items:{type:"int",group:"Appearance",defaultValue:12},intervalMinutes:{type:"int",group:"Appearance",defaultValue:60},pickerPopup:{type:"boolean",group:"Appearance",defaultValue:false},minDate:{type:"object",group:"Misc",defaultValue:null},maxDate:{type:"object",group:"Misc",defaultValue:null}},aggregations:{selectedDates:{type:"sap.ui.unified.DateRange",multiple:true,singularName:"selectedDate"},specialDates:{type:"sap.ui.unified.DateTypeRange",multiple:true,singularName:"specialDate"},header:{type:"sap.ui.unified.calendar.Header",multiple:false,visibility:"hidden"},timesRow:{type:"sap.ui.unified.calendar.TimesRow",multiple:false,visibility:"hidden"},datesRow:{type:"sap.ui.unified.calendar.Month",multiple:false,visibility:"hidden"},monthPicker:{type:"sap.ui.unified.calendar.MonthPicker",multiple:false,visibility:"hidden"},yearPicker:{type:"sap.ui.unified.calendar.YearPicker",multiple:false,visibility:"hidden"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"},legend:{type:"sap.ui.unified.CalendarLegend",multiple:false}},events:{select:{},cancel:{},startDateChange:{}}}});c.prototype.init=function(){this._iMode=0;this._oYearFormat=sap.ui.core.format.DateFormat.getDateInstance({format:"y"});this.data("sap-ui-fastnavgroup","true",true);this._oMinDate=new U(new Date(Date.UTC(1,0,1)));this._oMinDate.getJSDate().setUTCFullYear(1);this._oMaxDate=new U(new Date(Date.UTC(9999,11,31,23,59,59)));var Q=new H(this.getId()+"--Head",{visibleButton0:true,visibleButton1:true,visibleButton2:true});Q.attachEvent("pressPrevious",this._handlePrevious,this);Q.attachEvent("pressNext",this._handleNext,this);Q.attachEvent("pressButton0",u,this);Q.attachEvent("pressButton1",v,this);Q.attachEvent("pressButton2",w,this);this.setAggregation("header",Q);var R=new T(this.getId()+"--TimesRow");R.attachEvent("focus",y,this);R.attachEvent("select",x,this);R._bNoThemeChange=true;this.setAggregation("timesRow",R);var S=new M(this.getId()+"--MP",{columns:0,months:6});S.attachEvent("select",B,this);S._bNoThemeChange=true;S.attachEvent("pageChange",O,this);this.setAggregation("monthPicker",S);var V=new Y(this.getId()+"--YP",{columns:0,years:6});V.attachEvent("select",E,this);V.attachEvent("pageChange",P,this);this.setAggregation("yearPicker",V);this.setPickerPopup(false);this._iItemsHead=15;};c.prototype.exit=function(){if(this._sInvalidateContent){q.sap.clearDelayedCall(this._sInvalidateContent);}};c.prototype.onBeforeRendering=function(){var Q=this.getAggregation("timesRow");var R=this._getFocusedDate();n.call(this);Q.setDate(a._createLocalDate(R,true));};c.prototype.setStartDate=function(S){if(!(S instanceof Date)){throw new Error("Date must be a JavaScript date object; "+this);}if(q.sap.equal(this.getStartDate(),S)){return this;}var Q=S.getFullYear();if(Q<1||Q>9999){throw new Error("Date must not be in valid range (between 0001-01-01 and 9999-12-31); "+this);}var R=this.getMinDate();if(R&&S.getTime()<R.getTime()){q.sap.log.warning("startDate < minDate -> minDate as startDate set",this);S=new Date(R);}var V=this.getMaxDate();if(V&&S.getTime()>V.getTime()){q.sap.log.warning("startDate > maxDate -> maxDate as startDate set",this);S=new Date(V);}this.setProperty("startDate",S,true);var W=this.getAggregation("timesRow");W.setStartDate(S);this._oUTCStartDate=new U(W._getStartDate().getTime());n.call(this);var X=a._createLocalDate(this._getFocusedDate(),true);if(!W.checkDateFocusable(X)){this._setFocusedDate(this._oUTCStartDate);W.displayDate(S);}return this;};c.prototype.invalidate=function(Q){if(!this._bDateRangeChanged&&(!Q||!(Q instanceof sap.ui.unified.DateRange))){if(!Q||(!(Q instanceof sap.ui.unified.calendar.DatesRow||Q instanceof sap.ui.unified.calendar.MonthPicker||Q instanceof sap.ui.unified.calendar.YearPicker||Q instanceof sap.ui.unified.calendar.Header))){C.prototype.invalidate.apply(this,arguments);}}else if(this.getDomRef()&&this._iMode==0&&!this._sInvalidateContent){this._sInvalidateContent=q.sap.delayedCall(0,this,F);}};c.prototype.removeAllSelectedDates=function(){this._bDateRangeChanged=true;var R=this.removeAllAggregation("selectedDates");return R;};c.prototype.destroySelectedDates=function(){this._bDateRangeChanged=true;var Q=this.destroyAggregation("selectedDates");return Q;};c.prototype.removeAllSpecialDates=function(){this._bDateRangeChanged=true;var R=this.removeAllAggregation("specialDates");return R;};c.prototype.destroySpecialDates=function(){this._bDateRangeChanged=true;var Q=this.destroyAggregation("specialDates");return Q;};c.prototype.setIntervalMinutes=function(Q){if(Q>=720){throw new Error("Only intervals < 720 minutes are allowed; "+this);}if(1440%Q>0){throw new Error("A day must be divisible by the interval size; "+this);}this.setProperty("intervalMinutes",Q,false);var R=this.getAggregation("timesRow");var S=a._createLocalDate(this._getFocusedDate(),true);if(!R.checkDateFocusable(S)){var V=d.call(this);this._setFocusedDate(V);R.setDate(a._createLocalDate(V,true));}return this;};c.prototype.setLocale=function(Q){if(this._sLocale!=Q){this._sLocale=Q;this._oLocaleData=undefined;this.invalidate();}return this;};c.prototype.getLocale=function(){if(!this._sLocale){this._sLocale=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale().toString();}return this._sLocale;};c.prototype._getFocusedDate=function(){if(!this._oFocusedDate){f.call(this);}return this._oFocusedDate;};c.prototype._setFocusedDate=function(Q){if(!(Q instanceof U)){throw new Error("Date must be a UniversalDate object "+this);}this._oFocusedDate=new U(Q.getTime());};c.prototype.focusDate=function(Q){var R=false;var S=this.getAggregation("timesRow");if(!S.checkDateFocusable(Q)){var V=a._createUniversalUTCDate(Q,undefined,true);G.call(this,V);R=true;}t.call(this,Q,false);if(R){this.fireStartDateChange();}return this;};c.prototype.displayDate=function(Q){t.call(this,Q,true);return this;};c.prototype.setItems=function(Q){this.setProperty("items",Q,true);Q=this._getItems();var R=this.getAggregation("timesRow");R.setItems(Q);var S=a._createLocalDate(this._getFocusedDate(),true);if(!R.checkDateFocusable(S)){var V=d.call(this);this._setFocusedDate(V);R.setDate(a._createLocalDate(V,true));}if(!this.getPickerPopup()){var W=this.getAggregation("datesRow");var X=Math.floor(Q*1.5);if(X>31){X=31;}W.setDays(X);var Z=this.getAggregation("monthPicker");var $=Math.floor(Q/2);if($>12){$=12;}Z.setMonths($);var a1=this.getAggregation("yearPicker");var b1=Math.floor(Q/2);if(b1>20){b1=20;}a1.setYears(b1);}n.call(this);if(this.getDomRef()){if(this._getShowItemHeader()){this.$().addClass("sapUiCalIntHead");}else{this.$().removeClass("sapUiCalIntHead");}}return this;};c.prototype._getItems=function(){var Q=this.getItems();if(sap.ui.Device.system.phone&&Q>6){return 6;}else{return Q;}};c.prototype._getLocaleData=function(){if(!this._oLocaleData){var Q=this.getLocale();var R=new sap.ui.core.Locale(Q);this._oLocaleData=L.getInstance(R);}return this._oLocaleData;};c.prototype.setPickerPopup=function(Q){this.setProperty("pickerPopup",Q,true);var R=this.getAggregation("datesRow");var S=this.getAggregation("monthPicker");var V=this.getAggregation("yearPicker");if(R){R.destroy();}if(Q){R=new sap.ui.unified.calendar.Month(this.getId()+"--DatesRow",{selectedDates:[new sap.ui.unified.DateRange(this.getId()+"--Range")]});this.setAggregation("datesRow",R);S.setColumns(3);S.setMonths(12);V.setColumns(4);V.setYears(20);}else{R=new b(this.getId()+"--DatesRow",{days:18,selectedDates:[new sap.ui.unified.DateRange(this.getId()+"--Range")]});this.setAggregation("datesRow",R);S.setColumns(0);S.setMonths(6);V.setColumns(0);V.setYears(6);}R.attachEvent("focus",A,this);R.attachEvent("select",z,this);R._bNoThemeChange=true;R.getIntervalSelection=function(){return this.getProperty("intervalSelection");};R.getSingleSelection=function(){return this.getProperty("singleSelection");};R.getSelectedDates=function(){return this.getAggregation("selectedDates",[]);};R.getSpecialDates=function(){return this.getAggregation("specialDates",[]);};R.getAriaLabelledBy=function(){return this.getAssociation("ariaLabelledBy",[]);};return this;};c.prototype.setMinDate=function(Q){if(q.sap.equal(Q,this.getMinDate())){return this;}if(!Q){this._oMinDate.getJSDate().setUTCFullYear(1);this._oMinDate.getJSDate().setUTCMonth(0);this._oMinDate.getJSDate().setUTCDate(1);this._oMinDate.getJSDate().setUTCHours(0);this._oMinDate.getJSDate().setUTCMinutes(0);this._oMinDate.getJSDate().setUTCSeconds(0);this._oMinDate.getJSDate().setUTCMilliseconds(0);}else{if(!(Q instanceof Date)){throw new Error("Date must be a JavaScript date object; "+this);}this._oMinDate=a._createUniversalUTCDate(Q,undefined,true);var R=this.getAggregation("timesRow");this._oMinDate=R._getIntervalStart(this._oMinDate);var S=this._oMinDate.getUTCFullYear();if(S<1||S>9999){throw new Error("Date must not be in valid range (between 0001-01-01 and 9999-12-31); "+this);}if(this._oMaxDate.getTime()<this._oMinDate.getTime()){q.sap.log.warning("minDate > maxDate -> maxDate set to end of the month",this);this._oMaxDate=a._createUniversalUTCDate(Q,undefined,true);this._oMaxDate.setUTCMonth(this._oMaxDate.getUTCMonth()+1,0);this._oMaxDate.setUTCHours(23);this._oMaxDate.setUTCMinutes(59);this._oMaxDate.setUTCSeconds(59);this._oMaxDate.setUTCMilliseconds(0);this.setProperty("maxDate",a._createLocalDate(this._oMaxDate,true),true);}if(this._oFocusedDate){if(this._oFocusedDate.getTime()<this._oMinDate.getTime()){q.sap.log.warning("focused date < minDate -> minDate focused",this);this.focusDate(Q);}}if(this._oUTCStartDate&&this._oUTCStartDate.getTime()<this._oMinDate.getTime()){q.sap.log.warning("start date < minDate -> minDate set as start date",this);_.call(this,new U(this._oMinDate.getTime()),true,true);}}this.setProperty("minDate",Q,false);var V=this.getAggregation("yearPicker");V._oMinDate.setUTCFullYear(this._oMinDate.getUTCFullYear());return this;};c.prototype.setMaxDate=function(Q){if(q.sap.equal(Q,this.getMaxDate())){return this;}if(!Q){this._oMaxDate.getJSDate().setUTCFullYear(9999);this._oMaxDate.getJSDate().setUTCMonth(11);this._oMaxDate.getJSDate().setUTCDate(31);this._oMaxDate.getJSDate().setUTCHours(23);this._oMaxDate.getJSDate().setUTCMinutes(59);this._oMaxDate.getJSDate().setUTCSeconds(59);this._oMaxDate.getJSDate().setUTCMilliseconds(0);}else{if(!(Q instanceof Date)){throw new Error("Date must be a JavaScript date object; "+this);}this._oMaxDate=a._createUniversalUTCDate(Q,undefined,true);var R=this.getAggregation("timesRow");this._oMaxDate=R._getIntervalStart(this._oMaxDate);this._oMaxDate.setUTCMinutes(this._oMaxDate.getUTCMinutes()+this.getIntervalMinutes());this._oMaxDate.setUTCMilliseconds(-1);var S=this._oMaxDate.getUTCFullYear();if(S<1||S>9999){throw new Error("Date must not be in valid range (between 0001-01-01 and 9999-12-31); "+this);}if(this._oMinDate.getTime()>this._oMaxDate.getTime()){q.sap.log.warning("maxDate < minDate -> minDate set to begin of the month",this);this._oMinDate=a._createUniversalUTCDate(Q,undefined,true);this._oMinDate.setUTCDate(1);this._oMinDate.setUTCHours(0);this._oMinDate.setUTCMinutes(0);this._oMinDate.setUTCSeconds(0);this._oMinDate.setUTCMilliseconds(0);this.setProperty("minDate",a._createLocalDate(this._oMinDate,true),true);}if(this._oFocusedDate){if(this._oFocusedDate.getTime()>this._oMaxDate.getTime()){q.sap.log.warning("focused date > maxDate -> maxDate focused",this);this.focusDate(Q);}}if(this._oUTCStartDate){var V=new U(this._oUTCStartDate.getTime());V.setUTCMinutes(V.getUTCMinutes()+this.getIntervalMinutes()*(this._getItems()-1));if(V.getTime()>this._oMaxDate.getTime()){var W=new U(this._oMaxDate.getTime());W.setUTCMinutes(W.getUTCMinutes()-this.getIntervalMinutes()*(this._getItems()-1));if(W.getTime()>=this._oMinDate.getTime()){q.sap.log.warning("end date > maxDate -> maxDate set as end date",this);_.call(this,W,true,true);}}}}this.setProperty("maxDate",Q,false);var X=this.getAggregation("yearPicker");X._oMaxDate.setUTCFullYear(this._oMaxDate.getUTCFullYear());return this;};c.prototype.onclick=function(Q){if(Q.isMarked("delayedMouseEvent")){return;}if(Q.target.id==this.getId()+"-cancel"){this.onsapescape(Q);}};c.prototype.onmousedown=function(Q){Q.preventDefault();Q.setMark("cancelAutoClose");};c.prototype.onsapescape=function(Q){switch(this._iMode){case 0:this.fireCancel();break;case 1:h.call(this);break;case 2:j.call(this);break;case 3:m.call(this);break;}};c.prototype.onsaptabnext=function(Q){var R=this.getAggregation("header");if(q.sap.containsOrEquals(this.getDomRef("content"),Q.target)){q.sap.focus(R.getDomRef("B0"));if(!this._bPoupupMode){var S=this.getAggregation("timesRow");var V=this.getAggregation("monthPicker");var W=this.getAggregation("yearPicker");q(S._oItemNavigation.getItemDomRefs()[S._oItemNavigation.getFocusedIndex()]).attr("tabindex","-1");if(V.getDomRef()){q(V._oItemNavigation.getItemDomRefs()[V._oItemNavigation.getFocusedIndex()]).attr("tabindex","-1");}if(W.getDomRef()){q(W._oItemNavigation.getItemDomRefs()[W._oItemNavigation.getFocusedIndex()]).attr("tabindex","-1");}}Q.preventDefault();}else if(Q.target.id==R.getId()+"-B0"){q.sap.focus(R.getDomRef("B1"));Q.preventDefault();}else if(Q.target.id==R.getId()+"-B1"){q.sap.focus(R.getDomRef("B2"));Q.preventDefault();}};c.prototype.onsaptabprevious=function(Q){var R=this.getAggregation("header");if(q.sap.containsOrEquals(this.getDomRef("content"),Q.target)){if(this._bPoupupMode){q.sap.focus(R.getDomRef("B2"));Q.preventDefault();}}else if(Q.target.id==R.getId()+"-B0"){var S=this.getAggregation("timesRow");var V=this.getAggregation("monthPicker");var W=this.getAggregation("yearPicker");switch(this._iMode){case 0:S._oItemNavigation.focusItem(S._oItemNavigation.getFocusedIndex());break;case 2:V._oItemNavigation.focusItem(V._oItemNavigation.getFocusedIndex());break;case 3:W._oItemNavigation.focusItem(W._oItemNavigation.getFocusedIndex());break;}Q.preventDefault();}else if(Q.target.id==R.getId()+"-B2"){q.sap.focus(R.getDomRef("B1"));Q.preventDefault();}else if(Q.target.id==R.getId()+"-B1"){q.sap.focus(R.getDomRef("B0"));Q.preventDefault();}};c.prototype.onfocusin=function(Q){if(Q.target.id==this.getId()+"-end"){var R=this.getAggregation("header");var S=this.getAggregation("timesRow");var V=this.getAggregation("monthPicker");var W=this.getAggregation("yearPicker");q.sap.focus(R.getDomRef("B2"));if(!this._bPoupupMode){q(S._oItemNavigation.getItemDomRefs()[S._oItemNavigation.getFocusedIndex()]).attr("tabindex","-1");if(V.getDomRef()){q(V._oItemNavigation.getItemDomRefs()[V._oItemNavigation.getFocusedIndex()]).attr("tabindex","-1");}if(W.getDomRef()){q(W._oItemNavigation.getItemDomRefs()[W._oItemNavigation.getFocusedIndex()]).attr("tabindex","-1");}}}this.$("end").attr("tabindex","-1");};c.prototype.onsapfocusleave=function(Q){if(!Q.relatedControlId||!q.sap.containsOrEquals(this.getDomRef(),sap.ui.getCore().byId(Q.relatedControlId).getFocusDomRef())){this.$("end").attr("tabindex","0");if(!this._bPoupupMode){var R=this.getAggregation("timesRow");var S=this.getAggregation("monthPicker");var V=this.getAggregation("yearPicker");switch(this._iMode){case 0:q(R._oItemNavigation.getItemDomRefs()[R._oItemNavigation.getFocusedIndex()]).attr("tabindex","0");break;case 2:q(S._oItemNavigation.getItemDomRefs()[S._oItemNavigation.getFocusedIndex()]).attr("tabindex","0");break;case 3:q(V._oItemNavigation.getItemDomRefs()[V._oItemNavigation.getFocusedIndex()]).attr("tabindex","0");break;}}}};c.prototype._handlePrevious=function(Q){var R=this._getFocusedDate();switch(this._iMode){case 0:var S=this._getItems();var V=new U(d.call(this).getTime());var W=this.getIntervalMinutes();V.setUTCMinutes(V.getUTCMinutes()-S*W);R.setUTCMinutes(R.getUTCMinutes()-S*W);this._setFocusedDate(R);_.call(this,V,true);break;case 1:var X=this.getAggregation("datesRow");var Z=a._createUniversalUTCDate(X.getDate());var $=X.getDays();if(Z.getUTCDate()<=$){Z.setUTCDate(1);}else{Z.setUTCDate(Z.getUTCDate()-$);}I.call(this,Z);break;case 2:var a1=this.getAggregation("monthPicker");if(a1.getMonths()<12){a1.previousPage();o.call(this);}else{R.setUTCFullYear(R.getUTCFullYear()-1);G.call(this,R);this._setFocusedDate(R);n.call(this);N.call(this,R.getUTCFullYear(),a1);this.fireStartDateChange();}break;case 3:var b1=this.getAggregation("yearPicker");b1.previousPage();p.call(this);break;}};c.prototype._handleNext=function(Q){var R=this._getFocusedDate();switch(this._iMode){case 0:var S=this._getItems();var V=new U(d.call(this).getTime());var W=this.getIntervalMinutes();V.setUTCMinutes(V.getUTCMinutes()+S*W);R.setUTCMinutes(R.getUTCMinutes()+S*W);this._setFocusedDate(R);_.call(this,V,true);break;case 1:var X=this.getAggregation("datesRow");var Z=a._createUniversalUTCDate(X.getDate());var $=new U(Z.getTime());$.setUTCDate(1);$.setUTCMonth($.getUTCMonth()+1);$.setUTCDate(0);var a1=X.getDays();if(Z.getUTCDate()+a1>$.getUTCDate()){Z.setUTCDate($.getUTCDate());}else{Z.setUTCDate(Z.getUTCDate()+a1);}I.call(this,Z);break;case 2:var b1=this.getAggregation("monthPicker");if(b1.getMonths()<12){b1.nextPage();o.call(this);}else{R.setUTCFullYear(R.getUTCFullYear()+1);G.call(this,R);this._setFocusedDate(R);n.call(this);N.call(this,R.getUTCFullYear(),b1);this.fireStartDateChange();}break;case 3:var c1=this.getAggregation("yearPicker");c1.nextPage();p.call(this);break;}};c.prototype._getShowItemHeader=function(){var Q=this.getItems();if(Q>this._iItemsHead){return true;}else{return false;}};function _(S,Q,R){var V=new U(this._oMaxDate.getTime());V.setUTCMinutes(V.getUTCMinutes()-this.getIntervalMinutes()*(this._getItems()-1));if(V.getTime()<this._oMinDate.getTime()){V=new U(this._oMinDate.getTime());V.setUTCMinutes(V.getUTCMinutes()+this.getIntervalMinutes()*(this._getItems()-1));}if(S.getTime()<this._oMinDate.getTime()){S=new U(this._oMinDate.getTime());}else if(S.getTime()>V.getTime()){S=V;}var W=this.getAggregation("timesRow");var X=a._createLocalDate(S,true);W.setStartDate(X);this._oUTCStartDate=new U(W._getStartDate().getTime());X=a._createLocalDate(this._oUTCStartDate,true);this.setProperty("startDate",X,true);n.call(this);if(Q){var Z=a._createLocalDate(this._getFocusedDate(),true);if(!W.checkDateFocusable(Z)){this._setFocusedDate(S);W.setDate(X);}else{W.setDate(Z);}}if(!R){this.fireStartDateChange();}}function d(){if(!this._oUTCStartDate){var Q=this.getAggregation("timesRow");Q.setStartDate(a._createLocalDate(this._getFocusedDate(),true));this._oUTCStartDate=new U(Q._getStartDate().getTime());this._setFocusedDate(this._oUTCStartDate);}return this._oUTCStartDate;}function e(Q){var R=this._getFocusedDate();var S=this.getAggregation("timesRow");if(!Q){S.setDate(a._createLocalDate(R,true));}else{S.displayDate(a._createLocalDate(R,true));}n.call(this);}function f(){var S=this.getSelectedDates();if(S&&S[0]&&S[0].getStartDate()){this._oFocusedDate=a._createUniversalUTCDate(S[0].getStartDate(),undefined,true);}else{var Q=new Date();this._oFocusedDate=a._createUniversalUTCDate(Q,undefined,true);}if(this._oFocusedDate.getTime()<this._oMinDate.getTime()){this._oFocusedDate=new U(this._oMinDate.getTime());}else if(this._oFocusedDate.getTime()>this._oMaxDate.getTime()){this._oFocusedDate=new U(this._oMaxDate.getTime());}}function g(){if(this._iMode==3){m.call(this,true);}else if(this._iMode==2){j.call(this,true);}var Q=this._getFocusedDate();var R=this._getItems();var S=this.getAggregation("datesRow");var V=S.getSelectedDates()[0];V.setStartDate(a._createLocalDate(Q,true));if(!this.getPickerPopup()){var W=new U(Q.getTime());W.setUTCDate(1);W.setUTCMonth(W.getUTCMonth()+1);W.setUTCDate(0);var X=W.getUTCDate();var Z=Math.floor(R*1.5);if(Z>X){Z=X;}S.setDays(Z);if(S.getDomRef()){S.$().css("display","");}else{var $=sap.ui.getCore().createRenderManager();var a1=this.$("content");$.renderControl(S);$.flush(a1[0],false,true);$.destroy();}}else{J.call(this,S);}this.$("contentOver").css("display","");I.call(this,Q);if(this._iMode==0){var b1=this.getAggregation("timesRow");q(b1._oItemNavigation.getItemDomRefs()[b1._oItemNavigation.getFocusedIndex()]).attr("tabindex","-1");}this._iMode=1;}function h(Q){this._iMode=0;if(!this.getPickerPopup()){var R=this.getAggregation("datesRow");R.$().css("display","none");}else if(this._oPopup.isOpen()){this._oPopup.close();}this.$("contentOver").css("display","none");if(!Q){e.call(this);var S=this.getAggregation("timesRow");q(S._oItemNavigation.getItemDomRefs()[S._oItemNavigation.getFocusedIndex()]).attr("tabindex","0");}}function i(){if(this._iMode==1){h.call(this,true);}else if(this._iMode==3){m.call(this,true);}var Q=this._getFocusedDate();var R=this.getAggregation("monthPicker");if(!this.getPickerPopup()){if(R.getDomRef()){R.$().css("display","");}else{var S=sap.ui.getCore().createRenderManager();var $=this.$("content");S.renderControl(R);S.flush($[0],false,true);S.destroy();}}else{J.call(this,R);}this.$("contentOver").css("display","");R.setMonth(Q.getUTCMonth());N.call(this,Q.getUTCFullYear(),R);if(this._iMode==0){var V=this.getAggregation("timesRow");q(V._oItemNavigation.getItemDomRefs()[V._oItemNavigation.getFocusedIndex()]).attr("tabindex","-1");}this._iMode=2;o.call(this);}function j(Q){this._iMode=0;if(!this.getPickerPopup()){var R=this.getAggregation("monthPicker");R.$().css("display","none");}else if(this._oPopup.isOpen()){this._oPopup.close();}this.$("contentOver").css("display","none");if(!Q){e.call(this);var S=this.getAggregation("timesRow");q(S._oItemNavigation.getItemDomRefs()[S._oItemNavigation.getFocusedIndex()]).attr("tabindex","0");}}function k(){if(this._iMode==1){h.call(this,true);}else if(this._iMode==2){j.call(this,true);}var Q=this._getFocusedDate();var R=this.getAggregation("yearPicker");if(!this.getPickerPopup()){if(R.getDomRef()){R.$().css("display","");}else{var S=sap.ui.getCore().createRenderManager();var $=this.$("content");S.renderControl(R);S.flush($[0],false,true);S.destroy();}}else{J.call(this,R);}this.$("contentOver").css("display","");R.setDate(Q.getJSDate());if(this._iMode==0){var V=this.getAggregation("timesRow");q(V._oItemNavigation.getItemDomRefs()[V._oItemNavigation.getFocusedIndex()]).attr("tabindex","-1");}p.call(this);this._iMode=3;}function m(Q){this._iMode=0;if(!this.getPickerPopup()){var R=this.getAggregation("yearPicker");R.$().css("display","none");}else if(this._oPopup.isOpen()){this._oPopup.close();}this.$("contentOver").css("display","none");if(!Q){e.call(this);var S=this.getAggregation("timesRow");q(S._oItemNavigation.getItemDomRefs()[S._oItemNavigation.getFocusedIndex()]).attr("tabindex","0");}}function n(){r.call(this);o.call(this,true);}function o(Q){var R=new U(d.call(this).getTime());var S=this._getItems();var V=R.getJSDate().getUTCFullYear();var W=this._oMaxDate.getJSDate().getUTCFullYear();var X=this._oMinDate.getJSDate().getUTCFullYear();var Z=R.getJSDate().getUTCMonth();var $=this._oMaxDate.getJSDate().getUTCMonth();var a1=this._oMinDate.getJSDate().getUTCMonth();var b1=R.getJSDate().getUTCDate();var c1=this._oMaxDate.getJSDate().getUTCDate();var d1=this._oMinDate.getJSDate().getUTCDate();var e1=R.getJSDate().getUTCHours();var f1=this._oMaxDate.getJSDate().getUTCHours();var g1=this._oMinDate.getJSDate().getUTCHours();var h1=R.getJSDate().getUTCMinutes();var i1=this._oMaxDate.getJSDate().getUTCMinutes();var j1=this._oMinDate.getJSDate().getUTCMinutes();var k1=this.getAggregation("header");if(this._iMode==2&&!Q){var l1=this.getAggregation("monthPicker");var m1=l1.getMonths();var n1=l1.getStartMonth();var o1=n1+m1-1;if(n1==0||(V==X&&n1<=a1)){k1.setEnabledPrevious(false);}else{k1.setEnabledPrevious(true);}if(o1>10||(V==W&&o1>=$)){k1.setEnabledNext(false);}else{k1.setEnabledNext(true);}return;}if((V<X||(V==X&&(!Q||(Z<a1||(Z==a1&&(b1<d1||(b1==d1&&(e1<g1||(e1==g1&&h1<=j1)))))))))||((this._iMode==1||this._iMode==2)&&this.getPickerPopup())){k1.setEnabledPrevious(false);}else{k1.setEnabledPrevious(true);}R.setUTCMinutes(R.getUTCMinutes()+(S)*this.getIntervalMinutes()-1);V=R.getJSDate().getUTCFullYear();Z=R.getJSDate().getUTCMonth();b1=R.getJSDate().getUTCDate();e1=R.getJSDate().getUTCHours();h1=R.getJSDate().getUTCMinutes();if((V>W||(V==W&&(!Q||(Z>$||(Z==$&&(b1>c1||(b1==c1&&(e1>f1||(e1==f1&&h1>=i1)))))))))||((this._iMode==1||this._iMode==2)&&this.getPickerPopup())){k1.setEnabledNext(false);}else{k1.setEnabledNext(true);}}function p(){var Q=this.getAggregation("yearPicker");var R=Q.getYears();var S=a._createUniversalUTCDate(Q.getFirstRenderedDate());S.setUTCFullYear(S.getUTCFullYear()+Math.floor(R/2));var V=this.getAggregation("header");var W=new U(this._oMaxDate);W.setUTCFullYear(W.getUTCFullYear()-Math.ceil(R/2));W.setUTCMonth(11,31);var X=new U(this._oMinDate);X.setUTCFullYear(X.getUTCFullYear()+Math.floor(R/2)+1);X.setUTCMonth(0,1);if(S.getTime()>W.getTime()){V.setEnabledNext(false);}else{V.setEnabledNext(true);}if(S.getTime()<X.getTime()){V.setEnabledPrevious(false);}else{V.setEnabledPrevious(true);}}function r(){var Q=this.getAggregation("header");var R;var S=d.call(this);Q.setTextButton0((S.getUTCDate()).toString());var V=this._getLocaleData();var W=[];var X=[];var Z;var $=false;if(this._bLongMonth||!this._bNamesLengthChecked){W=V.getMonthsStandAlone("wide");}else{$=true;W=V.getMonthsStandAlone("abbreviated");X=V.getMonthsStandAlone("wide");}var a1=S.getUTCMonth();R=W[a1];if($){Z=X[W[a1]];}Q.setTextButton1(R);if($){Q.setAriaLabelButton1(Z);}Q.setTextButton2(this._oYearFormat.format(S,true));}function s(Q,R){var S;var V=false;if(Q.getTime()<this._oMinDate.getTime()){S=this._oMinDate;V=true;}else if(Q.getTime()>this._oMaxDate.getTime()){S=this._oMaxDate;V=true;}else{S=Q;}this._setFocusedDate(S);if(V||R){G.call(this,S);e.call(this,false);this.fireStartDateChange();}}function t(Q,R){if(Q&&(!this._oFocusedDate||this._oFocusedDate.getTime()!=Q.getTime())){if(!(Q instanceof Date)){throw new Error("Date must be a JavaScript date object; "+this);}Q=a._createUniversalUTCDate(Q,undefined,true);var S=Q.getUTCFullYear();if(S<1||S>9999){throw new Error("Date must not be in valid range (between 0001-01-01 and 9999-12-31); "+this);}if(Q.getTime()<this._oMinDate.getTime()||Q.getTime()>this._oMaxDate.getTime()){throw new Error("Date must not be in valid range (minDate and maxDate); "+this);}this._setFocusedDate(Q);if(this.getDomRef()&&this._iMode==0){e.call(this,R);}}}function u(Q){if(this._iMode!=1){g.call(this);}else{h.call(this);}}function v(Q){if(this._iMode!=2){i.call(this);}else{j.call(this);}}function w(Q){if(this._iMode!=3){k.call(this);}else{m.call(this);}}function x(Q){this.fireSelect();}function y(Q){var R=a._createUniversalUTCDate(Q.getParameter("date"),undefined,true);var S=Q.getParameter("notVisible");s.call(this,R,S);}function z(Q){var R=new U(this._getFocusedDate().getTime());var S=Q.oSource;var V=S.getSelectedDates()[0];var W=a._createUniversalUTCDate(V.getStartDate());if(!this.getPickerPopup()||W.getUTCMonth()==R.getUTCMonth()){R.setUTCDate(W.getUTCDate());R.setUTCMonth(W.getUTCMonth());R.setUTCFullYear(W.getUTCFullYear());s.call(this,R,true);h.call(this);}}function A(Q){var R=new U(this._getFocusedDate().getTime());var S=a._createUniversalUTCDate(Q.getParameter("date"),undefined,true);var V=Q.getParameter("otherMonth");if(V&&S.getUTCMonth()==R.getUTCMonth()&&S.getUTCFullYear()==R.getUTCFullYear()){I.call(this,S);}}function B(Q){var R=new U(this._getFocusedDate().getTime());var S=this.getAggregation("monthPicker");var V=S.getMonth();R.setUTCMonth(V);if(V!=R.getUTCMonth()){R.setUTCDate(0);}s.call(this,R,true);j.call(this);}function E(Q){var R=new U(this._getFocusedDate().getTime());var S=this.getAggregation("yearPicker");var V=a._createUniversalUTCDate(S.getDate());var W=R.getUTCMonth();V.setUTCMonth(R.getUTCMonth(),R.getUTCDate());V.setUTCHours(R.getUTCHours());V.setUTCMinutes(R.getUTCMinutes());R=V;if(W!=R.getUTCMonth()){R.setUTCDate(0);}s.call(this,R,true);m.call(this);}function F(){this._sInvalidateContent=undefined;var Q=this.getAggregation("timesRow");Q._bDateRangeChanged=true;Q._bInvalidateSync=true;Q.invalidate();Q._bInvalidateSync=undefined;this._bDateRangeChanged=undefined;}function G(Q){var R=this.getAggregation("timesRow");var S=d.call(this);var V=R._oItemNavigation.getFocusedIndex();S=new U(Q.getTime());S.setUTCMinutes(S.getUTCMinutes()-V*this.getIntervalMinutes());_.call(this,S,false,true);}function I(Q){var R=this.getAggregation("datesRow");var S=this.getAggregation("header");if(!this.getPickerPopup()){var V=new U(Q.getTime());V.setUTCDate(1);V.setUTCMonth(V.getUTCMonth()+1);V.setUTCDate(0);var W=R.getDays();var X=new U(Q.getTime());X.setUTCDate(1+(Math.ceil(Q.getUTCDate()/W)-1)*W);if(V.getUTCDate()-X.getUTCDate()<W){X.setUTCDate(V.getUTCDate()-W+1);}R.setStartDate(a._createLocalDate(X,true));var Z=X.getJSDate().getUTCFullYear();var $=this._oMaxDate.getJSDate().getUTCFullYear();var a1=this._oMinDate.getJSDate().getUTCFullYear();var b1=X.getJSDate().getUTCMonth();var c1=this._oMaxDate.getJSDate().getUTCMonth();var d1=this._oMinDate.getJSDate().getUTCMonth();var e1=X.getJSDate().getUTCDate();var f1=this._oMaxDate.getJSDate().getUTCDate();var g1=this._oMinDate.getJSDate().getUTCDate();if(e1<=1||(Z==a1&&b1==d1&&e1<=g1)){S.setEnabledPrevious(false);}else{S.setEnabledPrevious(true);}if((e1+W)>=V.getUTCDate()||(Z==$&&b1==c1&&e1>=f1)){S.setEnabledNext(false);}else{S.setEnabledNext(true);}}else{S.setEnabledPrevious(false);S.setEnabledNext(false);}R.setDate(a._createLocalDate(Q,true));}function J(Q){if(!this._oPopup){q.sap.require("sap.ui.core.Popup");this._oPopup=new sap.ui.core.Popup();this._oPopup.setAutoClose(true);this._oPopup.setAutoCloseAreas([this.getDomRef()]);this._oPopup.setDurations(0,0);this._oPopup._oCalendar=this;this._oPopup.attachClosed(K,this);this._oPopup.onsapescape=function(V){this._oCalendar.onsapescape(V);};}this._oPopup.setContent(Q);var R=this.getAggregation("header");var S=sap.ui.core.Popup.Dock;this._oPopup.open(0,S.CenterTop,S.CenterBottom,R,null,"flipfit",true);}function K(Q){switch(this._iMode){case 0:break;case 1:h.call(this);break;case 2:j.call(this);break;case 3:m.call(this);break;}}function N(Q,R){var S=0;var V=11;if(Q==this._oMinDate.getUTCFullYear()){S=this._oMinDate.getUTCMonth();}if(Q==this._oMaxDate.getUTCFullYear()){V=this._oMaxDate.getUTCMonth();}R.setMinMax(S,V);}function O(Q){o.call(this);}function P(Q){p.call(this);}return c;},true);
