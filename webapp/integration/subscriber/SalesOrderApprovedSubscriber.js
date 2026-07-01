sap.ui.define([
    "sap/ui/base/Object",
    "sap/erm/app/integration/process/OrderToCashProcess"
], function (BaseObject, OrderToCashProcess) {
    "use strict";
    return BaseObject.extend("sap.erm.app.integration.subscriber.SalesOrderApprovedSubscriber", {
        constructor: function(oComponent) {
            this._oComponent = oComponent;
            this._oProcess = new OrderToCashProcess(oComponent);
        },
        getChannel: function() { return "Sales"; },
        getEvent: function() { return "SalesOrderApproved"; },
        onEvent: function(sChannel, sEvent, oData) {
            // Trigger O2C Process
            this._oProcess.processApprovedOrder(oData.id);
        }
    });
});
