sap.ui.define([
    "sap/ui/model/json/JSONModel"
], function (JSONModel) {
    "use strict";

    return JSONModel.extend("sap.erm.app.models.ApplicationStateModel", {
        constructor: function () {
            JSONModel.apply(this, [{
                isBusy: false,
                isSideNavExpanded: true
            }]);
        }
    });
});
