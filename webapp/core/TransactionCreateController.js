sap.ui.define([
    "sap/erm/app/core/BaseController",
    "sap/erm/app/services/shared/MessageService",
    "sap/ui/model/json/JSONModel"
], function (BaseController, MessageService, JSONModel) {
    "use strict";

    return BaseController.extend("sap.erm.app.core.TransactionCreateController", {
        onInit: function () {
            this._oMessageService = new MessageService(this.getOwnerComponent());
            this.onInitHook();
        },
        onInitHook: function () {},
        getService: function () { return null; },
        
        // This is meant to be instantiated or mixed in, but since UI Strategy says use Dialog Fragments
        // We might just define helper methods for dialogs here, or use this as a Base for controllers managing Dialogs.
        openTransactionDialog: function(sFragmentName) {
            // Implementation for opening dialog
        }
    });
});
