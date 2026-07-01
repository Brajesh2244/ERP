sap.ui.define([
    "sap/erm/app/core/BaseService"
], function (BaseService) {
    "use strict";

    return BaseService.extend("sap.erm.app.integration.BusinessProcessService", {
        constructor: function (oComponent, sProcessName) {
            BaseService.prototype.constructor.call(this, oComponent);
            this._sProcessName = sProcessName;
        },
        
        startProcess: function (oPayload) {
            this.publishAuditEvent("ProcessStarted", oPayload);
            return Promise.resolve(oPayload);
        },
        
        nextStep: function (sStepName, oPayload) {
            this.publishAuditEvent("StepExecuted_" + sStepName, oPayload);
            return Promise.resolve(oPayload);
        },
        
        completeProcess: function (oPayload) {
            this.publishAuditEvent("ProcessCompleted", oPayload);
            return Promise.resolve(oPayload);
        },
        
        cancelProcess: function (oPayload, sReason) {
            this.publishAuditEvent("ProcessCancelled", { payload: oPayload, reason: sReason });
            return Promise.reject(sReason);
        },
        
        rollbackProcess: function (oPayload, sReason) {
            // Placeholder for compensation transactions
            this.publishAuditEvent("ProcessRolledBack", { payload: oPayload, reason: sReason });
            return Promise.reject(sReason);
        },
        
        publishAuditEvent: function(sEvent, oData) {
            this.getComponent().getEventBus().publish("Audit", this._sProcessName + "_" + sEvent, oData);
        }
    });
});
