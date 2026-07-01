sap.ui.define([
    "sap/erm/app/core/BaseService"
], function (BaseService) {
    "use strict";

    return BaseService.extend("sap.erm.app.service.admin.AuditLogService", {
        constructor: function (oComponent) {
            BaseService.prototype.constructor.call(this, oComponent);
            this._oEventBus = oComponent.getEventBus();
            this._oEventBus.subscribe("Audit", "ProcessCompleted", this._onAuditLog, this);
            this._oEventBus.subscribe("Audit", "ProcessStarted", this._onAuditLog, this);
        },
        
        _onAuditLog: function(sChannel, sEvent, oData) {
            var oModel = this.getComponent().getModel("auditLogModel");
            if(oModel) {
                var aLogs = oModel.getProperty("/") || [];
                var sUser = this.getComponent().getModel("userModel").getProperty("/id") || "system";
                aLogs.unshift({
                    id: "AL-" + Date.now(),
                    timestamp: new Date().toISOString(),
                    user: sUser,
                    module: "Integration",
                    action: sEvent,
                    status: "Success",
                    documentId: oData.salesOrderId || oData.purchaseOrderId || "SYS",
                    oldValue: "",
                    newValue: JSON.stringify(oData)
                });
                oModel.setProperty("/", aLogs);
            }
        }
    });
});
