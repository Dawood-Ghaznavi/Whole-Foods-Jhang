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
    
               
                    const oRouter = this.getOwnerComponent().getRouter();
                    oRouter.navTo("RoutePurchaseOrders2", {}, true);
         
            },
            onEdit() {

              /*let panel =  this.byId("p1")
              panel.setHeaderText("items") */

                let obj = this.getView()
                var oActiveContext = obj.getBindingContext()
               
                var that = this
                const oRouter = this.getOwnerComponent().getRouter();
    
                oActiveContext.getModel().bindContext("wholefoodService.draftEdit(...)" ,
                oActiveContext, {$$inheritExpandSelect : true}).execute("$auto", false, null)
              .then(function (oDraftContext) {
                    that.oActiveContext = oActiveContext; // remember for cancel
          
                   // obj.setBindingContext(oDraftContext);
                    let oDraft = oDraftContext.sPath
          
            
                   oRouter.navTo("detail", {
                        PO: window.encodeURIComponent(oDraft.substr("/".length))
                    },true); 
                    that.getView().getModel().refresh()
                }); 



            },
             async onSave() {
              let that = this
             let oModel = that.getView().getModel()
             oModel.submitBatch("POUpdateGroup")

     let x = await this.toggleDraft()/*.then( function(oDraftContext)  {
  
   
              oDraftContext.delete(null);
            }); */
        let Mdl = x.getModel()
        
            setTimeout( function(){   Mdl.refresh()    }, 100);
      

    // this.getView().getModel().refresh()
            //x.getModel().refresh()

             //   this.getView().getModel().refresh()
              //  let oContext = oModel.bindContext( '/'+id , null , {$$updateGroupId : 'POUpdateGroup'});
              //  let oContext2 = oContext.getBoundContext()
             // oContext2.setProperty("EBELP", "100033");

              //  oModel.submitBatch("POUpdateGroup").then(function(){MessageToast.show("Order Updated")} , function(){MessageToast.show("Updation Failed")})
                
            },
            toggleDraft(){


              
              let obj = this.getView()
              let oActiveContext = obj.getBindingContext()
              let that = this

              const oRouter = this.getOwnerComponent().getRouter();

              
           return   oActiveContext.getModel().bindContext("wholefoodService.draftActivate(...)" ,
              oActiveContext, {$$inheritExpandSelect : true}).execute()
            .then(function (oDraftContext) {
                //  that.oActiveContext = oActiveContext; // remember for cancel
                  let oDraft = oDraftContext.sPath

                 obj.setBindingContext(oDraftContext)
                  oRouter.navTo("detail", {
                    PO: window.encodeURIComponent(oDraft.substr("/".length))
                },true); 
   
               // that.getView().getModel().refresh()
                  return   oDraftContext
                // oModel.submitBatch("POUpdateGroup")
              // console.log(oDraftContext.sPath)
                //  oDraftContext.delete(null);
                  
              }); 

            },
            onTest() {
               // let tab = this.byId("TableP")
               let oDraftContext = this.getView().getBindingContext()
        
               //this.getView().getModel().refresh()
               // tab.getColumns()[0].setVisible(false)

            },
            onCancel(){
              let EBLN = this.byId("I1").getText()
              let oDraftContext = this.getView().getBindingContext()
              let oModel = this.getView().getModel()
              //let Dcontext = new sap.ui.generic.app.transaction.DraftContext(oModel)
              const oRouter = this.getOwnerComponent().getRouter();
              let that = this;
            function gotoActiveContext(oActiveContext) {
              that.oActiveContext = null; // not needed anymore
              oDraftContext.delete("$auto", true);
        
              let path = oActiveContext.sPath
              oRouter.navTo("detail",{ PO: window.encodeURIComponent(path.substr("/".length))},true);
              
             console.log(that.getView().getModel().refresh())
             
            
            }
            if(EBLN.length > 0){
            if (this.oActiveContext) {
         
              //oDraftContext.replaceWith(this.oActiveContext);
              gotoActiveContext(this.oActiveContext);
            } else {
              let path = oDraftContext.sPath.substr(0,48) + ',IsActiveEntity=true)'
             
           let Cbinding = oModel.bindContext(path)
           gotoActiveContext(Cbinding);
         
           /*
              oDraftContext.getModel().bindContext("SiblingEntity(...)", oDraftContext,
                  {$$inheritExpandSelect : true})
                .execute("$auto", false, null,false).then(gotoActiveContext); */
            }
          }
          else{
            oRouter.navTo("RoutePurchaseOrders2",{},true)
          }






            },
            onCreate(){
           let PO_ID =    this.getView().getBindingContext().sPath.substr(12,36)
           let len = this.byId("TableP").getItems().length
           let EBLP

           if(len === 0 )
           {
              EBLP = String("10").padStart(4,'0')
           }
           else{
            let tbl = this.byId("TableP").getItems()
            let txt = tbl[tbl.length-1].getAggregation("cells")[0].getText()
            EBLP = parseInt(txt) + 10
            EBLP = String(EBLP).padStart(4,'0')}
         
              let obj = {EBELP: EBLP,
              EBELN_ID : PO_ID,
                        WERKS_WERKS : '',
                        MATNR_MATNR : '' ,
                        MENGE : null}
                        
             this.byId("TableP").getBinding("items").create(obj,null,true) 




            },
            onDelete(){

              let oTable = this.getView().byId("TableP"),
              Porder = oTable.getSelectedItems()

              if(Porder.length === 0){
               MessageToast.show("No Item Selected");
               return
              }
              let order
              for(let x = 0 ; x < Porder.length ; x++){
                order = Porder[x].getBindingContext()
                order.delete().then(function(){ MessageToast.show("Item Deleted");})
               
                }
            },
            onChange(oEvent){
              let lineNumber = parseInt(oEvent.getParameters().id.substr(-1))
              let tbldata = this.byId("TableP").getItems()
              let oModel = this.getView().getModel()
              let test =  oEvent.getParameters().selectedItem.getBindingContext();
              console.log(test)
              
        
              let bindcontxt = oEvent.getParameters().selectedItem.mProperties.key;
              let unit = oModel.bindProperty(`/LISTMATERIALS(MATNR='${bindcontxt}',IsActiveEntity=true)/UOM`);
              unit.requestValue().then(function (sValue) {
                tbldata[lineNumber].getAggregation("cells")[6].setText(sValue)
                console.log(sValue)
            });
             

              //tbldata[lineNumber].getAggregation("cells")[6].setText("{UOM}")
             //tbldata[lineNumber].getAggregation("cells")[6].setBindingContext(bindcontxt)
         


            }
        });
    });