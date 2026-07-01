sap.ui.define(["sap/ui/base/Object"], function (BaseObject) {
    "use strict";
    return BaseObject.extend("sap.erm.app.integration.subscriber.InventoryReservationSubscriber", {
        constructor: function(oComponent) { this._oComponent = oComponent; },
        getChannel: function() { return "Sales"; },
        getEvent: function() { return "InventoryReserved"; },
        onEvent: function(sChannel, sEvent, oData) {
            // Trigger Journal Posting logic via IntegrationService eventually
        }
    });
});
