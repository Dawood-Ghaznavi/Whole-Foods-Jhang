sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,MessageToast) {
        "use strict";

        return Controller.extend("materials2.controller.Materials2", {
          /*  onShowHello() {
                // read msg from i18n model
                const oBundle = this.getView().getModel("i18n").getResourceBundle();
                const sRecipient = this.getView().getModel().getProperty("/recipient/name");
                const sMsg = oBundle.getText("helloMsg", [sRecipient]);
                  
                // show message
                MessageToast.show(sMsg);
             } */
        });
    });
