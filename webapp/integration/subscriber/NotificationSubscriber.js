sap.ui.define(["sap/ui/base/Object", "sap/m/MessageToast"], function (BaseObject, MessageToast) {
    "use strict";
    return BaseObject.extend("sap.erm.app.integration.subscriber.NotificationSubscriber", {
        constructor: function(oComponent) { this._oComponent = oComponent; },
        getChannel: function() { return "Audit"; },
        getEvent: function() { return "ProcessCompleted"; }, // Catch generic completions
        onEvent: function(sChannel, sEvent, oData) {
            // Global audit notifications could be pushed to user's inbox
            MessageToast.show("Business Process Completed: " + JSON.stringify(oData));
        }
    });
});
