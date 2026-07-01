sap.ui.define(["sap/ui/base/Object"], function (BaseObject) {
    "use strict";
    return BaseObject.extend("sap.erm.app.integration.subscriber.JournalPostingSubscriber", {
        constructor: function(oComponent) { this._oComponent = oComponent; },
        getChannel: function() { return "Integration"; },
        getEvent: function() { return "RequestJournalPosting"; },
        onEvent: function(sChannel, sEvent, oData) {
            // Future placeholder to automatically create a Journal Entry via PostingService
        }
    });
});
