sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Filter,FilterOperator,JSONModel) {
        "use strict";
        var temp
        return Controller.extend("purchaseorders2.controller.PurchaseOrders2", {
            onInit: function () {
                var oModel = new JSONModel();
                this.getView().setModel(oModel, "orders");
            },
            onFilterOrders(oEvent) {
			
                            // build filter array
                            const aFilter = [];
                            const sQuery = oEvent.getParameter("query");
                            if (sQuery) {
                                aFilter.push(new Filter("PARTNER_PARTNER", FilterOperator.Contains, sQuery.toUpperCase()));
                                aFilter.push(new Filter("EBELN", FilterOperator.Contains, sQuery));	
                                }
                                let oFilter = new Filter({filters : aFilter ,
                                and : false})
                    // filter binding
                            const oTable = this.byId("TableP");
                            const oBinding = oTable.getBinding("items");
                            oBinding.filter(oFilter); 
                        },onObject(oEvent) {
                            console.log("ON PRESS ")
                            const oItem = oEvent.getSource();
                            const oRouter = this.getOwnerComponent().getRouter();
                            oRouter.navTo("detail", {
                                PO: oItem.getBindingContext().getPath().substr("/PO_HEAD".length)
                            });
                        } , onCreate(){
                            temp = this.byId("TableP").getBinding("items")
                            const oRouter = this.getOwnerComponent().getRouter();
                            oRouter.navTo("create");

                        },
                        onSave(){
                            var oModelData = this.getView().getModel("orders").getData();
                            const dropd = this.byId("sl")
                            oModelData.PARTNER_PARTNER = dropd.getSelectedItem().mProperties.key

                           
                            temp.create({
                                     "EBELN": oModelData.EBELN,
                                     "PARTNER_PARTNER": oModelData.PARTNER_PARTNER,
                                     
                                  })	
                                  temp = null
                                  let tbl = this.byId("TableM");
                                  let tbldata = tbl.getItems()
                                  console.log(tbldata[1])
                                  console.log(tbldata[1].aAriaOwns[0])
                                  const oRouter = this.getOwnerComponent().getRouter();
                                oRouter.navTo("RoutePurchaseOrders2", {}, true);
                
                        },
                        onAdd: function (oEvent) {                               //to add a new row
                            var oItem = new sap.m.ColumnListItem({
                               cells: [ new sap.m.Input(), new sap.m.Input(), /*new sap.m.Input({
                                   showValueHelp: true 
                
                               })*/  ]
                           });
                
                           var oTable = this.byId("TableM");
                           oTable.addItem(oItem);
                    }
        });
    });
