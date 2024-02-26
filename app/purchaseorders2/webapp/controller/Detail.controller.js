sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,History) {
        "use strict";

        return Controller.extend("purchaseorders2.controller.Detail", {
            onInit: function () {
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("detail").attachPatternMatched(this.onObjectMatched, this);
            },

            onObjectMatched(oEvent) {
                this.getView().bindElement("/PO_HEAD" + oEvent.getParameter("arguments").PO);
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
            }
        });
    });