sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Filter,FilterOperator,JSONModel,MessageToast) {
        "use strict";
        var temp
     
        return Controller.extend("purchaseorders2.controller.PurchaseOrders2", {
            onInit: function () {
               // var oModel = new JSONModel();
               // this.getView().setModel(oModel, "orders");
        
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
                            console.log("***" + oItem.getBindingContext().getPath())
                            const oRouter = this.getOwnerComponent().getRouter();
                            oRouter.navTo("detail", {
                                PO: window.encodeURIComponent(oItem.getBindingContext().getPath().substr("/".length))
                            });
                        } , onCreate(){
                            temp = this.byId("TableP").getBinding("items") 
                          
                            
                            const oRouter = this.getOwnerComponent().getRouter();
                            oRouter.navTo("create");

                        },
                        onSave(){
                                
                          // let x =  new sap.ui.core.Element("TableP").getBinding("items")
                           //sap.ui.getCore().byId("THE_ID_OF_YOUR_VIEW").getModel().refresh(true);
                          
                           let oModel = this.getView().getModel()

                            //var oModelData = this.getView().getModel("orders").getData();
                            const dropd = this.byId("sl")
                            const EBLN = this.byId("I1")

                            
                            let data = []
                                  
                                  let tbl = this.byId("TableM");
                                  let tbldata = tbl.getItems()
                                  for(let x = 0 ; x < tbldata.length ; x++){
                                    let dataObj = {
                                        EBELP: tbldata[x].getAggregation("cells")[0].getText(),
                                        WERKS_WERKS: tbldata[x].getAggregation("cells")[2].getSelectedItem().mProperties.key,
                                        MATNR_MATNR: tbldata[x].getAggregation("cells")[1].getSelectedItem().mProperties.key,
                                        MENGE:parseInt(tbldata[x].getAggregation("cells")[3].getValue()),
                                        
                                    }

                                    data.push(dataObj)
                                  }
                              
                                  let info = {"EBELN": "" ,//oModelData.EBELN,EBLN.getValue()
                                  "PARTNER_PARTNER": dropd.getSelectedItem().mProperties.key,
                                  "EBELP" : data
                                  
                                 }
                                
                                  //  console.log("POGroup")
                                  // console.log(oModel.getUpdateGroupId()) //UpdateGroup
                                
                                 temp.create(info,null,true)

                                 oModel.submitBatch("POUpdateGroup")
                                 MessageToast.show("Order Created");

                                // let oList = oModel.bindList("/PO_HEAD");	
                                 //oList.create(info)

                                 //console.log(oModel.getUpdateGroupId())
                                // oModel.submitBatch(oModel.getUpdateGroupId())
                                
                                 this.byId("TableM").destroyItems()
                                
                                 //}})
                                        
                                  temp = null
                                  const oRouter = this.getOwnerComponent().getRouter();
                                oRouter.navTo("RoutePurchaseOrders2", {}, true);
                    

              
                        },
                        onAdd:  function () {   

                            //let Tid = sap.ui.getCore().byId("TableP")
             
                           
                           let len = this.byId("TableM").getItems().length
                           let EBLP

                           if(len === 0 )
                           {
                              EBLP = String("10").padStart(4,'0')
                           }
                           else{
                            let tbl = this.byId("TableM").getItems()
                            let txt = tbl[tbl.length-1].getAggregation("cells")[0].getText()
                            EBLP = parseInt(txt) + 10
                            EBLP = String(EBLP).padStart(4,'0')

                           }
                           let textID = parseInt(EBLP)
                           textID = `T${textID}`
                           let selID = `S${textID.substr(1)}`
                    
                            var oItem = new sap.m.ColumnListItem({
                               cells: [new sap.m.Text({text : EBLP}), new sap.m.Select(selID,{ items: {
                                path: "/LISTMATERIALS",         
                                template: new sap.ui.core.ListItem({
                                    key: '{MATNR}', 
                                    text: '{MAKTX}' 
                                 
                                })},width: "400px",change :(oEvent) => {
                                   let x = oEvent.getParameters().selectedItem.getBindingContext();
                                   let tbldata = this.byId("TableM").getItems()
                                   let NumId = oEvent.getParameters().id.substr(1)
                                  // let id =  tbldata[tbldata.length-1].getAggregation("cells")[4].getId()
                                  let id = 'T' +  NumId
                                   let y = sap.ui.getCore().byId(id).setBindingContext(x)
                                 



                                }
                            
                            
                            }),
                                new sap.m.Select({ items: {
                                    path: "/Plants", //Binding path model name along with array name
                                    template: new sap.ui.core.ListItem({
                                        key: '{WERKS}', // model name with property name
                                        text: '{NAME1}' // model name with property name
                                    })}, width: "400px"}),new sap.m.Input(),new sap.m.Text(textID,{
                                        text: "{UOM}"
                                    })/*new sap.m.Input({
                                   showValueHelp: true 
                
                               })*/  ]
                           });
                
                           var oTable = this.byId("TableM");
                           oTable.addItem(oItem);

                     
                          // let tbldata = oTable.getItems()
                         // let id =  tbldata[tbldata.length-1].getAggregation("cells")[4].getId()
                          //sap.ui.getCore().byId(id).setBindingContext(x)

                    }, onNavBack : function () {
                      
                        const oRouter = this.getOwnerComponent().getRouter();
                        oRouter.navTo("RoutePurchaseOrders2", {}, true);
                    },
                    Rfresh : function() {
                      //let model = this.getView().byId("TableP").getBinding("items")
                     //model.refresh()
                     this.getView().getModel().refresh()
                    MessageToast.show("Table Refreshed");

                        /*
                        let oList = oModel.bindList("/PO_ITEM");

                oList.requestContexts().then(function (aContexts) {
                aContexts.forEach(function (oContext) {
               // As we have fetched the data already, we can access "Note" through getProperty
               let POnumber = oContext.getProperty("EBELP"); 
               console.log(POnumber)
               
        
    }); 
}); */
                    },
                    onDelete : function(){
                        let oTable = this.getView().byId("TableP"),
                       Porder = oTable.getSelectedItems()
       
                       if(Porder.length === 0){
                        MessageToast.show("No Order Selected");
                        return
                       }
                       let order
                       for(let x = 0 ; x < Porder.length ; x++){
                       order = Porder[x].getBindingContext()
                       order.delete().then(function(){ MessageToast.show("Order Deleted");})
                       this.getView().getModel().submitBatch("POUpdateGroup")
                       }
                       


                    },
                    onDel () {

                        let oTable = this.getView().byId("TableM")
                        let Porder = oTable.getSelectedItems()

                        if(Porder.length === 0){
                         MessageToast.show("No Item Selected");
                         return
                        }
                    
                    

                        let order
                        for(let x = 0 ; x < Porder.length ; x++){
                       order = Porder[x]
                       order.destroy()
                      // oTable.removeItem(order)
                       MessageToast.show("Item Deleted");
                       }

                    }



        });
    });
