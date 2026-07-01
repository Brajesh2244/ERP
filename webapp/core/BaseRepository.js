sap.ui.define([
    "sap/ui/base/Object"
], function (BaseObject) {
    "use strict";

    return BaseObject.extend("sap.erm.app.core.BaseRepository", {
        constructor: function (sModelName, oComponent) {
            this._sModelName = sModelName;
            this._oComponent = oComponent;
        },

        getModel: function () {
            return this._oComponent.getModel(this._sModelName);
        },

        getAll: function () {
            var oModel = this.getModel();
            return oModel ? oModel.getProperty("/") : [];
        },

        getById: function (sIdProperty, sIdValue) {
            var aItems = this.getAll();
            if (!aItems) return null;
            return aItems.find(function (item) {
                return item[sIdProperty] === sIdValue;
            });
        }
    });
});
