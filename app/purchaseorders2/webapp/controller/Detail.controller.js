sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,History,MessageToast) {
        "use strict";
        let id

        return Controller.extend("purchaseorders2.controller.Detail", {
            onInit: function () {
                const oRouter = this.getOwnerComponent().getRouter();
                oRouter.getRoute("detail").attachPatternMatched(this.onObjectMatched, this);
                
            },

            onObjectMatched(oEvent) {
                this.getView().bindElement("/" + window.decodeURIComponent(oEvent.getParameter("arguments").PO));
                id = window.decodeURIComponent(oEvent.getParameter("arguments").PO)
            },
            onNavBack() {
                const oHistory = History.getInstance();
                const sPreviousHash = oHistory.getPreviousHash();
    
                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    const oRouter = this.getOwnerComponent().getRouter();
                    oRouter.navTo("RoutePurchaseOrders2", {}, true);
                }
            },
            onEdit() {

              /*let panel =  this.byId("p1")
              panel.setHeaderText("items") */

            },
            onSave() {
                let oModel = this.getView().getModel()

              //  let oContext = oModel.bindContext( '/'+id , null , {$$updateGroupId : 'POUpdateGroup'});
              //  let oContext2 = oContext.getBoundContext()
             // oContext2.setProperty("EBELP", "100033");

                oModel.submitBatch("POUpdateGroup").then(function(){MessageToast.show("Order Updated")} , function(){MessageToast.show("Updation Failed")})
                
            }
        });
    });