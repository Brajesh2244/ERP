sap.ui.define([
    "sap/erm/app/core/BaseController",
    "sap/erm/app/service/admin/SystemHealthService"
], function (BaseController, SystemHealthService) {
    "use strict";

    return BaseController.extend("sap.erm.app.controller.admin.Dashboard", {
        onInit: function () {
            this._oHealthService = new SystemHealthService(this.getOwnerComponent());
            this.getRouter().getRoute("adminDashboard").attachPatternMatched(this._onRouteMatched, this);
        },
        _onRouteMatched: function () {
            this.getModel("systemHealthModel").setData(this._oHealthService.getHealthMetrics());
        },
        onNavigate: function (oEvent) {
            var sRoute = oEvent.getSource().data("route");
            this.getRouter().navTo(sRoute);
        }
    });
});
