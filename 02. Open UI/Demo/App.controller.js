sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, JSONModel) {
	"use strict";

	return Controller.extend("sap.ui.demo.wt.App", {

		onInit : function () {

			var oData = {
				data : {
					name : "World",
					value:"Asian"
				}
			};
			var oModel = new JSONModel(oData);
			this.getView().setModel(oModel);
		},

		onShowHello : function () {
			// show a native JavaScript alert
			var oInput = this.byId("InputPhanLoai");
			//oInput.getValue();
			
			
		
			alert("Hello World"+oInput.getValue());
		}
	});

});