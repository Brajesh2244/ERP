sap.ui.define([
    "sap/erm/app/core/BaseService",
    "sap/erm/app/integration/process/OrderToCashProcess",
    "sap/erm/app/integration/process/ProcureToPayProcess",
    "sap/erm/app/integration/EventSubscriberManager"
], function (BaseService, OrderToCashProcess, ProcureToPayProcess, EventSubscriberManager) {
    "use strict";

    return BaseService.extend("sap.erm.app.integration.IntegrationService", {
        constructor: function (oComponent) {
            BaseService.prototype.constructor.call(this, oComponent);
            
            // Initialize Business Processes
            this._oOrderToCash = new OrderToCashProcess(oComponent);
            this._oProcureToPay = new ProcureToPayProcess(oComponent);
            
            // Initialize Event Subscriber Manager
            this._oSubscriberManager = new EventSubscriberManager(oComponent);
            this._oSubscriberManager.registerSubscribers();
        },
        
        getOrderToCashProcess: function() {
            return this._oOrderToCash;
        },
        
        getProcureToPayProcess: function() {
            return this._oProcureToPay;
        }
    });
});
