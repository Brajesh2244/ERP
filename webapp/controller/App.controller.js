sap.ui.define([
    "./BaseController"
], function (BaseController) {
    "use strict";

    return BaseController.extend("sap.erm.app.controller.App", {
        onInit: function () {
            this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
        }
    });
});
