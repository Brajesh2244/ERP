sap.ui.define([
    "sap/ui/base/Object",
    "sap/erm/app/integration/process/ProcureToPayProcess"
], function (BaseObject, ProcureToPayProcess) {
    "use strict";
    return BaseObject.extend("sap.erm.app.integration.subscriber.GoodsReceiptSubscriber", {
        constructor: function(oComponent) { 
            this._oComponent = oComponent;
            this._oProcess = new ProcureToPayProcess(oComponent);
        },
        getChannel: function() { return "Purchase"; },
        getEvent: function() { return "GoodsReceiptRequested"; },
        onEvent: function(sChannel, sEvent, oData) {
            // P2P orchestration is handled here if GoodsReceipt triggers AP
            // But since Goods Receipt is part of P2P, we just publish Journal posting requests here
            var oEventBus = this._oComponent.getEventBus();
            oEventBus.publish("Integration", "RequestJournalPosting", { documentId: oData.purchaseOrderId, type: "GoodsReceipt" });
        }
    });
});
