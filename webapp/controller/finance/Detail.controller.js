sap.ui.define([
    "sap/erm/app/core/TransactionDetailController",
    "sap/erm/app/service/finance/FinanceService",
    "sap/erm/app/service/finance/AccountingValidationService"
], function (TransactionDetailController, FinanceService, AccountingValidationService) {
    "use strict";

    return TransactionDetailController.extend("sap.erm.app.controller.finance.Detail", {
        onInitHook: function () {
            this._oService = new FinanceService(this.getOwnerComponent());
            this._oValidationService = new AccountingValidationService(this.getOwnerComponent());
        },
        getRouteName: function () { return "financeDetail"; },
        getListRouteName: function () { return "financeList"; },
        getService: function () { return this._oService; },
        getEntityName: function () { return "Journal Entry"; },

        _loadData: function () {
            var oRecord = this.getService().getById(this._sId);
            if (!oRecord) {
                this._oMessageService.showError("Journal Entry not found.");
                this.getRouter().navTo(this.getListRouteName());
                return;
            }
            
            oRecord.items = this.getService().getItemsByHeaderId(this._sId);
            this.getModel("model").setData(oRecord);
        },

        onPostPress: function () {
            var oData = this.getModel("model").getData();
            var aErrors = this._oValidationService.validateJournal(oData, oData.items);
            if (aErrors.length > 0) {
                this._oMessageService.showError("Validation Failed:\n" + aErrors.join("\n"));
                return;
            }

            this.getService().postJournal(this._sId).then(function() {
                this._oMessageService.showSuccess("Journal Entry posted successfully. Ledger updated.");
                this._loadData();
            }.bind(this)).catch(function(err) {
                this._oMessageService.showError("Failed to post journal: " + err);
            }.bind(this));
        }
    });
});
