sap.ui.define([
    "sap/ui/model/json/JSONModel"
], function (JSONModel) {
    "use strict";

    return JSONModel.extend("sap.erm.app.models.UserModel", {
        constructor: function (oData) {
            JSONModel.apply(this, arguments);
        },
        getUserRole: function () {
            return this.getProperty("/role");
        },
        getUsername: function () {
            return this.getProperty("/username");
        }
    });
});
