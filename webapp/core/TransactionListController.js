sap.ui.define([
    "sap/erm/app/core/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/erm/app/services/shared/FormatterService"
], function (BaseController, JSONModel, FormatterService) {
    "use strict";

    return BaseController.extend("sap.erm.app.core.TransactionListController", {
        formatter: new FormatterService(),
        
        onInit: function () {
            this.getView().setModel(new JSONModel({ items: [] }), "model");
            this.getRouter().getRoute(this.getRouteName()).attachMatched(this._onRouteMatched, this);
            this.onInitHook();
        },
        
        onInitHook: function () {}, 
        getRouteName: function () { return ""; }, 
        getService: function () { return null; }, 
        getSearchService: function () { return null; }, 
        getDetailRouteName: function () { return ""; }, 
        getTableId: function () { return "idGenericTable"; },

        _onRouteMatched: function () {
            this._loadData();
        },

        _loadData: function () {
            var aData = this.getService().getAll();
            this.getModel("model").setProperty("/items", aData);
        },

        onGenericSearch: function (oEvent) {
            var sQuery = oEvent.getParameter("query");
            var aFilters = this.getSearchService().buildSearchFilter(sQuery);
            this.byId(this.getTableId()).getBinding("items").filter(aFilters);
        },

        onItemPress: function (oEvent) {
            var sPath = oEvent.getSource().getBindingContext("model").getPath();
            var oData = this.getModel("model").getProperty(sPath);
            this.getRouter().navTo(this.getDetailRouteName(), { id: oData.id });
        }
    });
});
