sap.ui.define([
    "sap/ui/base/Object"
], function (BaseObject) {
    "use strict";

    return BaseObject.extend("sap.erm.app.service.core.BaseRepository", {
        constructor: function (sModelName, oComponent) {
            this._sModelName = sModelName;
            this._oComponent = oComponent;
        },

        getModel: function () {
            return this._oComponent.getModel(this._sModelName);
        },

        getAll: function () {
            return this.getModel().getProperty("/");
        },

        getById: function (sIdProperty, sIdValue) {
            var aItems = this.getAll();
            return aItems.find(function (item) {
                return item[sIdProperty] === sIdValue;
            });
        }
    });
});
