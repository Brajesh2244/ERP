sap.ui.define([
    "sap/ui/base/Object"
], function (BaseObject) {
    "use strict";

    return BaseObject.extend("sap.erm.app.core.BaseService", {
        constructor: function (oComponent) {
            this._oComponent = oComponent;
        },

        getComponent: function () {
            return this._oComponent;
        },

        getModel: function (sName) {
            if (this._oComponent) {
                return this._oComponent.getModel(sName);
            }
            return null;
        },
        
        getEventBus: function () {
            if (this._oComponent) {
                return this._oComponent.getEventBus();
            }
            return sap.ui.getCore().getEventBus();
        }
    });
});
