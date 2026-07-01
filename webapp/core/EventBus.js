sap.ui.define([
    "sap/ui/base/Object"
], function (BaseObject) {
    "use strict";

    return BaseObject.extend("sap.erm.app.core.EventBus", {
        publish: function (sChannel, sEvent, oData) {
            sap.ui.getCore().getEventBus().publish(sChannel, sEvent, oData);
        },
        subscribe: function (sChannel, sEvent, fnFunction, oListener) {
            sap.ui.getCore().getEventBus().subscribe(sChannel, sEvent, fnFunction, oListener);
        },
        unsubscribe: function (sChannel, sEvent, fnFunction, oListener) {
            sap.ui.getCore().getEventBus().unsubscribe(sChannel, sEvent, fnFunction, oListener);
        }
    });
});
