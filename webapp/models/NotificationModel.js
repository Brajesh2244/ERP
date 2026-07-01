sap.ui.define([
    "sap/ui/model/json/JSONModel"
], function (JSONModel) {
    "use strict";

    return JSONModel.extend("sap.erm.app.models.NotificationModel", {
        constructor: function () {
            JSONModel.apply(this, [{
                unreadCount: 0,
                items: []
            }]);
        }
    });
});
