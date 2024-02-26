sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,MessageToast) {
        "use strict";

        return Controller.extend("materials2.controller.panel", {
            onShowHello() {
                // read msg from i18n model
                const oBundle = this.getView().getModel("i18n").getResourceBundle();
                const sRecipient = this.getView().getModel().getProperty("/recipient/name");
                const sMsg = oBundle.getText("helloMsg", [sRecipient]);
                  
                // show message
                MessageToast.show(sMsg);
             },
             onOpenDialog() {
                // create dialog lazily
                this.pDialog ??= this.loadFragment({
                    name: "materials2.view.dialog"
                });
            
                this.pDialog.then((oDialog) => oDialog.open());
            },
            onCloseDialog() {
                // note: We don't need to chain to the pDialog promise, since this event handler
                // is only called from within the loaded dialog itself.
                this.byId("dlg").close();
            }
        });
    });