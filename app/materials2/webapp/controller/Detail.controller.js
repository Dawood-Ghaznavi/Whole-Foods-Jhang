sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], (Controller,History) => {
	"use strict";

	return Controller.extend("materials2.controller.Detail", {
		onInit() {
			const oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("detail").attachPatternMatched(this.onObjectMatched, this);
		},

		onObjectMatched(oEvent) {
			this.getView().bindElement("/Materials" + oEvent.getParameter("arguments").matID);
		},

		onNavBack() {
			const oHistory = History.getInstance();
			const sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				const oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("RouteMaterials2", {}, true);
			}
		},
		onSave(){

			this.byId("I1").setEditable(true);
		}
	});
});