sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/FilterType",
	"sap/ui/model/json/JSONModel"
], (Controller, Filter,FilterOperator,FilterType,JSONModel) => {
	"use strict";
var temp
	return Controller.extend("materials2.controller.mat", {
		
		onInit: function () {
			var oModel = new JSONModel();
			this.getView().setModel(oModel, "material");
		  },
        onFilterMaterials(oEvent) {



/*
			var oView = this.getView(),
				sValue = oView.byId("sfield").getValue(),
				oFilter = new Filter("MATNR", FilterOperator.Contains, sValue);

			oView.byId("TableM").getBinding("items").filter(oFilter, FilterType.Application);
*/			

            // build filter array
			const aFilter = [];
			const sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("MATNR", FilterOperator.Contains, sQuery));	
				}
	// filter binding
			const oTable = this.byId("TableM");
			const oBinding = oTable.getBinding("items");
			console.log("@@@@@" + oBinding)
			oBinding.filter(aFilter); 
        } 
		,
		onPress2(oEvent) {
			console.log("ON PRESS ")
			const oItem = oEvent.getSource();
			const oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("detail", {
				matID: oItem.getBindingContext().getPath().substr("/Materials".length)
			});
		},
		onCreate(){
			temp = this.byId("TableM").getBinding("items")
			const oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("create")
			
		},
		onSave(){
			var oModelData = this.getView().getModel("material").getData();

			temp.create({
				     "MATNR": oModelData.MATNR,
				     "MAKTX": oModelData.MAKTX,
				     "GROUP": oModelData.GROUP,
			        "TYPE": oModelData.TYPE,
			        "UOM": oModelData.UOM
			      
			      })	
				  temp = null
				  const oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("RouteMaterials2", {}, true);

		},
		onAdd: function (oEvent) {                               //to add a new row
			var oItem = new sap.m.ColumnListItem({
			   cells: [new sap.m.Button({
				icon: "sap-icon://delete",
				type: "Reject",
				press: [this.remove, this]
			}), new sap.m.Input(), new sap.m.Input(), new sap.m.Input({
				   showValueHelp: true

			   }), ]
		   });

		   var oTable = this.byId("TableM");
		   oTable.addItem(oItem);
	},
	remove: function (oEvent) {
		var oTable = this.byId("TableM");
		oTable.removeItem(oEvent.getSource().getParent());
	}	
	});
});