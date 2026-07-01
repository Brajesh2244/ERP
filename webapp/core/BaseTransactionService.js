sap.ui.define([
    "sap/erm/app/core/BaseService"
], function (BaseService) {
    "use strict";

    return BaseService.extend("sap.erm.app.core.BaseTransactionService", {
        constructor: function (oComponent, sModelName) {
            BaseService.prototype.constructor.call(this, oComponent);
            this.sModelName = sModelName;
        },
        createDraft: function (oData) {
            oData.status = "DRAFT";
            return this.createTransaction(oData);
        },
        submit: function (sId) {
            return this.updateTransactionStatus(sId, "SUBMITTED");
        },
        approve: function (sId) {
            return this.updateTransactionStatus(sId, "APPROVED");
        },
        post: function (sId) {
            return this.updateTransactionStatus(sId, "POSTED");
        },
        cancel: function (sId) {
            return this.updateTransactionStatus(sId, "CANCELLED");
        },
        updateTransactionStatus: function(sId, sStatus) {
            var oModel = this.getComponent().getModel(this.sModelName);
            var aData = oModel.getProperty("/") || [];
            var iIndex = aData.findIndex(function(r) { return r.id === sId; });
            if (iIndex !== -1) {
                aData[iIndex].status = sStatus;
                oModel.setProperty("/", aData);
                return Promise.resolve(aData[iIndex]);
            }
            return Promise.reject(new Error("Transaction not found"));
        },
        createTransaction: function(oData) {
            return Promise.resolve(oData); // Override in specific service
        }
    });
});
