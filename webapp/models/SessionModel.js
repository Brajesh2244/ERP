sap.ui.define([
    "sap/ui/model/json/JSONModel"
], function (JSONModel) {
    "use strict";

    return JSONModel.extend("sap.erm.app.models.SessionModel", {
        constructor: function () {
            JSONModel.apply(this, [{
                token: null,
                expiresAt: null,
                isAuthenticated: false
            }]);
        }
    });
});
