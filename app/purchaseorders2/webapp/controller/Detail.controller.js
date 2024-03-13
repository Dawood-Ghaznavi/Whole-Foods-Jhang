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
                    }); 
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
                }); 
   
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
           
              let oDraftContext = this.getView().getBindingContext()
              let oModel = this.getView().getModel()
        
              const oRouter = this.getOwnerComponent().getRouter();
              let that = this;
            function gotoActiveContext(oActiveContext) {
              that.oActiveContext = null; // not needed anymore
              oDraftContext.delete("$auto", true);
        
              let path = oActiveContext.sPath
              oRouter.navTo("detail",{ PO: window.encodeURIComponent(path.substr("/".length))});
            }
      
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
        });
    });