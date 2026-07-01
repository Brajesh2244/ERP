sap.ui.define([
    "sap/ui/model/json/JSONModel"
], function (JSONModel) {
    "use strict";

    return JSONModel.extend("sap.erm.app.models.SettingsModel", {
        constructor: function () {
            JSONModel.apply(this, [{
                language: "en",
                currency: "USD",
                timezone: "UTC"
            }]);
        }
    });
});
